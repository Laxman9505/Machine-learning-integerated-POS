/** @format */

import axios from "axios";
import { Request, Response } from "express";
import InventoryModel from "../modal/inventoryModal";
import orderModel from "../modal/orderModal";
import { paginate } from "../utils/paginate";

export async function getRecommendedProducts(req: Request, res: Response) {
  try {
    const { CustomerName } = req.body;
    const allorders = await paginate(orderModel, {}, 1, 20);
    const formattedOrders = allorders?.items?.map((order) => {
      return {
        order_id: order.id,
        customer_id: order.CustomerName,
        items: order.ProductList?.map((product) => product.ProductName),
      };
    });
    console.log("---input data", formattedOrders);
    // Make a request to the Python API for recommended products
    const pythonApiUrl =
      "http://127.0.0.1:5000/getItemRecommendationsForCustomer";
    const response = await axios.post(pythonApiUrl, {
      orders_data: formattedOrders,
    });
    console.log("--response data", response.data);

    const recommendedProducts = response.data?.item_recommendations?.map(
      (item: any) => item[0]
    );
    const allProducts = await paginate(InventoryModel, {}, 1, 20);

    const filteredRecomendedProducts = allProducts.items.filter((product) =>
      recommendedProducts.includes(product.ItemName)
    );

    // Send the response to the React app
    res.json(filteredRecomendedProducts);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getSalesForecastingData(req: Request, res: Response) {
  try {
    const allOrders = await orderModel.find();

    const convertMongoDate = (mongoTimestamp: any) => {
      const date = new Date(parseInt(mongoTimestamp));
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Create a map to store total sales for each date
    const salesMap = new Map();

    // Calculate total sales for each date
    allOrders.forEach((order) => {
      const orderDate = convertMongoDate(order.OrderDate);
      const orderTotal = parseFloat(order.TotalAmount);

      if (!isNaN(orderTotal)) {
        if (salesMap.has(orderDate)) {
          // Add the order total to existing date entry
          salesMap.set(orderDate, salesMap.get(orderDate) + orderTotal);
        } else {
          // Create a new entry for the date
          salesMap.set(orderDate, orderTotal);
        }
      }
    });

    // Convert salesMap to the desired data structure
    const sales_data = Array.from(salesMap, ([timestamp, sales]) => ({
      timestamp,
      sales,
    }));

    console.log("---converted data", sales_data);

    const { NoOfSteps } = req.body;

    // Make a request to the Python API for sales forecasting
    const pythonApiUrl = "http://127.0.0.1:5000/salesForecast";
    const response = await axios.post(
      pythonApiUrl,
      { steps: NoOfSteps, sales_data: sales_data.splice(0, 1) },
      { headers: { "Content-Type": "application/json" } }
    );

    // Send the response to the React app
    res.json(response.data);
  } catch (error: any) {
    console.error("Error:", error.response.data.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function detectAnamolies(req: Request, res: Response) {
  try {
    // const transactionData = [
    //   { transaction_id: 1, amount: 100.0, customer_id: "C1" },
    //   { transaction_id: 2, amount: 100.0, customer_id: "C2" },
    //   { transaction_id: 3, amount: 100.0, customer_id: "C3" },
    //   { transaction_id: 4, amount: 1000.0, customer_id: "C1" },
    //   { transaction_id: 5, amount: 100.0, customer_id: "C2" },
    // ];
    const allOrders = await orderModel.find();
    const transactionData = allOrders.map((order) => {
      return {
        transaction_id: order.OrderId,
        amount: order.TotalAmount,
        customer_id: order.CustomerName,
      };
    });
    console.log("---transaction data", transactionData);

    // Make a request to the Python API for sales forecasting
    const pythonApiUrl = "http://127.0.0.1:5000/detectAnomalies";
    const response = await axios.post(
      pythonApiUrl,
      { transactions: transactionData },
      { headers: { "Content-Type": "application/json" } }
    );

    // Send the response to the React app
    res.json(response.data);
  } catch (error) {}
}
