import pandas as pd
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import KNNBasic
from flask import Flask, request, jsonify
from statsmodels.tsa.arima.model import ARIMA
import json
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler


app = Flask(__name__)

# Sample orders data
# API endpoint for item recommendations
@app.route("/getItemRecommendationsForCustomer", methods=["POST"])
def get_item_recommendations_for_customer():
    try:
        # Get orders_data from the request body
        request_data = request.get_json()
        orders_data = request_data.get('orders_data', [])

        # Convert orders data to DataFrame
        df = pd.DataFrame(orders_data)

        # Create synthetic ratings for the training set
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

        customer_id = request_data.get('customer_id', None)

        if customer_id:
            # Customer-specific recommendations
            recommendations = get_item_recommendations(customer_id, model, df_surprise)
        else:
            # Overall recommendations
            recommendations = get_overall_item_recommendations(model, df_surprise)

        return jsonify({"customer_id": customer_id, "item_recommendations": recommendations})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ...



# ARIMA model
def train_arima_model(data):
    # Ensure data is 1-dimensional
    data = data.values.flatten() if isinstance(data, pd.Series) else data.flatten()
    
    model = ARIMA(data, order=(1, 1, 1))
    model_fit = model.fit()
    return model_fit

# Function to forecast future sales
def forecast_sales(model, data, steps):
    forecast = model.get_forecast(steps=steps)
    forecast_index = pd.date_range(start=data.index[-1] + pd.DateOffset(1), periods=steps)
    forecast_df = pd.DataFrame({'forecast_sales': forecast.predicted_mean}, index=forecast_index)
    return forecast_df

# API endpoint for sales forecasting
@app.route("/salesForecast", methods=["POST"])
def sales_forecast():
    request_data = request.get_json()
    print("Received request:", request_data) 

    # Check if the required parameters are present in the request
    if 'steps' not in request_data or not isinstance(request_data['steps'], int):
        return jsonify({"error": "Please provide a valid 'steps' parameter in the request."}), 400

    # Convert sales data to DataFrame
    df_sales = pd.DataFrame(request_data['sales_data'])
    df_sales['timestamp'] = pd.to_datetime(df_sales['timestamp'])
    df_sales.set_index('timestamp', inplace=True)

    # Train ARIMA model
    model_fit = train_arima_model(df_sales['sales'])

    # Forecast future sales
    steps = request_data['steps']
    forecast_df = forecast_sales(model_fit, df_sales, steps)

    # Convert forecast DataFrame to JSON
    forecast_json = forecast_df.reset_index().to_json(orient='records', date_format='iso')
    print("---this is running")
    return forecast_json

@app.route("/detectAnomalies", methods=["POST"])
def detect_anomalies():
    try:
        # Get transactions data from the request
        transactions = request.get_json()["transactions"]

        # Convert data to DataFrame
        df = pd.DataFrame(transactions)

        # Extract numerical features for anomaly detection (amount in this case)
        X = df[['amount']]

        # Standardize the data
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # Train the Isolation Forest model
        model = IsolationForest(contamination=0.05)  # Adjust contamination based on your data
        model.fit(X_scaled)

        # Predict anomalies
        df['anomaly_score'] = model.decision_function(X_scaled)
        df['is_anomaly'] = model.predict(X_scaled)

        # Return the results
        result = df[['transaction_id', 'amount', 'is_anomaly']].to_dict(orient='records')
        return jsonify({"result": result})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Something went wrong"}), 500

if __name__ == "__main__":
    app.run(debug=True)
