/** @format */

import { Request, Response } from "express";

export async function getRecommendedProducts(req: Request, res: Response) {
  try {
    const { CustomerName } = req.body;
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Something Went Wrong !" });
  }
}
export async function getSalesForecastingData(req: Request, res: Response) {
  const { NoOfSteps } = req.body;
  try {
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Something Went Wrong !" });
  }
}
