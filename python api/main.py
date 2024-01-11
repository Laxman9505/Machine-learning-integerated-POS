import pandas as pd
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import KNNBasic
from flask import Flask, request, jsonify
from statsmodels.tsa.arima.model import ARIMA
import json

app = Flask(__name__)

# Sample orders data
orders_data = [
    {"order_id": 1, "customer_id": "C1", "items": ["item1", "item2", "item3"]},
    {"order_id": 2, "customer_id": "C2", "items": ["item2", "item3", "item4"]},
    {"order_id": 3, "customer_id": "C3", "items": ["item2", "item4", "item1"]},
    {"order_id": 4, "customer_id": "C1", "items": ["item3", "item4", "item5"]},
    {"order_id": 5, "customer_id": "C2", "items": ["item1", "item3", "item5"]},
    {"order_id": 6, "customer_id": "C3", "items": ["item1", "item2", "item5"]},
    {"order_id": 7, "customer_id": "C1", "items": ["item2", "item3", "item4"]},
    {"order_id": 8, "customer_id": "C2", "items": ["item4", "item5", "item1"]},
    {"order_id": 9, "customer_id": "C3", "items": ["item1", "item3", "item4"]},
    {"order_id": 10, "customer_id": "C1", "items": ["item2", "item4", "item5"]},
    {"order_id": 11, "customer_id": "C2", "items": ["item1", "item2", "item3"]},
    {"order_id": 12, "customer_id": "C3", "items": ["item3", "item4", "item5"]},
    {"order_id": 13, "customer_id": "C1", "items": ["item1", "item4", "item5"]},
    {"order_id": 14, "customer_id": "C2", "items": ["item1", "item2", "item5"]},
    {"order_id": 15, "customer_id": "C3", "items": ["item2", "item3", "item5"]},
    {"order_id": 16, "customer_id": "C1", "items": ["item1", "item3", "item4"]},
    {"order_id": 17, "customer_id": "C2", "items": ["item2", "item4", "item5"]},
    {"order_id": 18, "customer_id": "C3", "items": ["item1", "item2", "item3"]},
    {"order_id": 19, "customer_id": "C1", "items": ["item3", "item4", "item5"]},
    {"order_id": 20, "customer_id": "C2", "items": ["item1", "item4", "item5"]},
    # Add more orders as needed
]

# Convert orders data to DataFrame
df = pd.DataFrame(orders_data)

# Create synthetic ratings for training set
df['rating'] = 1

# Transform DataFrame for Surprise
df_surprise = df.explode('items')[['customer_id', 'items', 'rating']]
reader = Reader()
data = Dataset.load_from_df(df_surprise, reader)

# Split data into train and test sets
trainset, testset = train_test_split(data, test_size=0.2, random_state=42)

# Build the collaborative filtering model (Item-based)
sim_options = {'name': 'cosine', 'user_based': False}
model = KNNBasic(sim_options=sim_options)
model.fit(trainset)

# Function to get item recommendations for a specific customer
def get_item_recommendations(customer_id, model, df):
    items_bought = set(df[df['customer_id'] == customer_id]['items'])
    all_items = set(df['items'].explode().unique())
    items_to_predict = list(all_items - items_bought)

    # Create a test set for the user with items not bought
    testset_user = [(customer_id, item, 0) for item in items_to_predict]

    # Make predictions
    predictions_user = model.test(testset_user)

    # Get top recommendations
    top_recommendations = [(prediction.iid, prediction.est) for prediction in predictions_user]
    top_recommendations.sort(key=lambda x: x[1], reverse=True)

    return top_recommendations

# ...

# Function to get overall item recommendations
def get_overall_item_recommendations(model, df):
    all_items = set(df['items'].explode().unique())
    items_to_predict = list(all_items)

    # Create a test set for overall recommendations
    testset_all = [(None, item, 0) for item in items_to_predict]

    # Make predictions
    predictions_all = model.test(testset_all)

    # Get top recommendations
    top_recommendations = [(prediction.iid, prediction.est) for prediction in predictions_all]
    top_recommendations.sort(key=lambda x: x[1], reverse=True)

    return top_recommendations

# API endpoint for item recommendations
@app.route("/getItemRecommendationsForCustomer", methods=["GET"])
def get_item_recommendations_for_customer():
    customer_id = request.args.get('customer_id')

    if customer_id:
        # Customer-specific recommendations
        recommendations = get_item_recommendations(customer_id, model, df_surprise)
    else:
        # Overall recommendations
        recommendations = get_overall_item_recommendations(model, df_surprise)

    return jsonify({"customer_id": customer_id, "item_recommendations": recommendations})

# ...

sales_data = [
    {"timestamp": "2023-01-01", "sales": 100},
    {"timestamp": "2023-01-02", "sales": 120},
    {"timestamp": "2023-01-03", "sales": 130},
    # Add more data as needed
]

# Convert sales data to DataFrame
df_sales = pd.DataFrame(sales_data)
df_sales['timestamp'] = pd.to_datetime(df_sales['timestamp'])
df_sales.set_index('timestamp', inplace=True)

# ARIMA model
def train_arima_model(data):
    model = ARIMA(data, order=(1, 1, 1))
    model_fit = model.fit()
    return model_fit

# Function to forecast future sales
def forecast_sales(model, steps):
    forecast = model.get_forecast(steps=steps)
    forecast_index = pd.date_range(start=df_sales.index[-1] + pd.DateOffset(1), periods=steps)
    forecast_df = pd.DataFrame({'forecast_sales': forecast.predicted_mean}, index=forecast_index)
    return forecast_df


# API endpoint for sales forecasting
@app.route("/salesForecast", methods=["POST"])
def sales_forecast():
    request_data = request.get_json()

    # Check if the required parameters are present in the request
    if 'steps' not in request_data or not isinstance(request_data['steps'], int):
        return jsonify({"error": "Please provide a valid 'steps' parameter in the request."}), 400

    # Train ARIMA model
    model_fit = train_arima_model(df_sales['sales'])

    # Forecast future sales
    steps = request_data['steps']
    forecast_df = forecast_sales(model_fit, steps)

    # Convert forecast DataFrame to JSON
    forecast_json = forecast_df.reset_index().to_json(orient='records', date_format='iso')

    return forecast_json


if __name__ == "__main__":
    app.run(debug=True)
