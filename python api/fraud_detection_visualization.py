import matplotlib.pyplot as plt

# Sample data
result_data = [
    {"amount": "160", "is_anomaly": 1, "transaction_id": "bd6bebd6-430f-4f77-bb7a-f708d6dab7f5"},
    {"amount": "160", "is_anomaly": 1, "transaction_id": "8aae901a-e5cd-48d1-b0f7-5ba2306d74ab"},
    {"amount": "290", "is_anomaly": 1, "transaction_id": "234f393c-9801-479c-a7a1-75cfcea02802"},
    {"amount": "290", "is_anomaly": 1, "transaction_id": "456bea0a-35f5-4282-b44c-2b32a387c4f2"},
    {"amount": "160", "is_anomaly": 1, "transaction_id": "5b6697a3-a1c4-4c76-a1e3-01c3d3174947"},
       {"amount": "500", "is_anomaly": 1, "transaction_id": "5b6697a3-a1c4-4c76-a1e3-01c3d3174947"},
    {"amount": "3220", "is_anomaly": -1, "transaction_id": "2816879a-5dff-4846-832b-cafb8cfceefa"}
]

# Separate normal and anomaly transactions
normal_transactions = [entry for entry in result_data if entry["is_anomaly"] == 1]
anomaly_transactions = [entry for entry in result_data if entry["is_anomaly"] == -1]

# Plot normal transactions in green
plt.scatter(
    [int(entry["amount"]) for entry in normal_transactions],
    [0] * len(normal_transactions),
    color='green',
    label='Normal Transactions'
)

# Plot anomaly transactions in red
plt.scatter(
    [int(entry["amount"]) for entry in anomaly_transactions],
    [0] * len(anomaly_transactions),
    color='red',
    label='Anomaly Transactions'
)

plt.xlabel('Transaction Amount')
plt.title('Visualization of Normal and Anomaly Transactions')
plt.legend()
plt.show()