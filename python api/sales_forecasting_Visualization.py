import matplotlib.pyplot as plt
from datetime import datetime
import pandas as pd

# Updated input data with more data points
input_data = [
    {'timestamp': '2024-01-10', 'sales': 900},
    {'timestamp': '2024-01-11', 'sales': 1100},
    {'timestamp': '2024-01-12', 'sales': 850},
    {'timestamp': '2024-01-13', 'sales': 1200},
    {'timestamp': '2024-01-14', 'sales': 950}
]

# Output data (unchanged)
output_data = [
   {
    "index": "2024-01-15T00:00:00.000",
    "forecast_sales": 1213.7658554831
},
   {
    "index": "2024-01-16T00:00:00.000",
    "forecast_sales": 954.1310331807
}

]

# Convert data to pandas DataFrame for easier manipulation
input_df = pd.DataFrame(input_data)
output_df = pd.DataFrame(output_data)

# Convert timestamp strings to datetime objects
input_df['timestamp'] = pd.to_datetime(input_df['timestamp'])
output_df['index'] = pd.to_datetime(output_df['index'])

# Plotting
plt.figure(figsize=(10, 6))

# Plotting input sales data
plt.plot(input_df['timestamp'], input_df['sales'], marker='o', label='Actual Sales')

# Plotting forecasted sales data
plt.plot(output_df['index'], output_df['forecast_sales'], marker='o', linestyle='dashed', label='Forecasted Sales')

# Adding labels and title
plt.xlabel('Date')
plt.ylabel('Sales')
plt.title('Sales Forecast')
plt.legend()
plt.grid(True)
plt.show()
