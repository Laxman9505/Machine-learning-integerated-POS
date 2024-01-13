/** @format */

import express, { Router } from "express";
import {
  getRecommendedProducts,
  getSalesForecastingData,
} from "../contollers/commonController";

const router: Router = express.Router();

router.get("/getRecommendedProducts", getRecommendedProducts);
router.post("/getSalesForecastingData", getSalesForecastingData);
router.get("/detectAnamolies", getSalesForecastingData);

export default router;
