/** @format */

import express, { Router } from "express";
import {
  detectAnamolies,
  getRecommendedProducts,
  getSalesForecastingData,
} from "../contollers/commonController";

const router: Router = express.Router();

router.get("/getRecommendedProducts", getRecommendedProducts);
router.post("/getSalesForecastingData", getSalesForecastingData);
router.get("/detectAnamolies", detectAnamolies);

export default router;
