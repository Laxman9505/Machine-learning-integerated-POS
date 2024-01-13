/** @format */

import axios from "axios";
import { Request, Response } from "express";

export async function getRecommendedProducts(req: Request, res: Response) {
  try {
    const { CustomerName } = req.body;

    // Make a request to the Python API for recommended products
    const pythonApiUrl =
      "http://127.0.0.1:5000/getItemRecommendationsForCustomer";
    const response = await axios.get(pythonApiUrl, {
      params: { customer_id: CustomerName },
    });

    // Send the response to the React app
    res.json(response.data);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getSalesForecastingData(req: Request, res: Response) {
  try {
    const { NoOfSteps } = req.body;

    // Make a request to the Python API for sales forecasting
    const pythonApiUrl = "http://127.0.0.1:5000/salesForecast";
    const response = await axios.post(
      pythonApiUrl,
      { steps: NoOfSteps },
      { headers: { "Content-Type": "application/json" } }
    );

    // Send the response to the React app
    res.json(response.data);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function detectAnamolies(req: Request, res: Response) {
  try {
    const transactionData = [
      { transaction_id: 1, amount: 100.0, customer_id: "C1" },
      { transaction_id: 2, amount: 100.0, customer_id: "C2" },
      { transaction_id: 3, amount: 100.0, customer_id: "C3" },
      { transaction_id: 4, amount: 1000.0, customer_id: "C1" },
      { transaction_id: 5, amount: 100.0, customer_id: "C2" },
    ];

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
