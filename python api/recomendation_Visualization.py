import matplotlib.pyplot as plt

# Recommendation data from the model
recommendation_data = {
    "customer_id": None,
    "item_recommendations": [
        ["Samosa", 1],
        ["Dal Bhat", 1],
        ["Thukpa", 1],
        ["Momos", 1]
    ]
}

# Extracting items and scores from the recommendation data
items, scores = zip(*recommendation_data["item_recommendations"])

# Plotting the bar chart
plt.bar(items, scores, color='skyblue')
plt.xlabel('Recommended Items')
plt.ylabel('Score')
plt.title('Item Recommendations for Customers')
plt.show()
