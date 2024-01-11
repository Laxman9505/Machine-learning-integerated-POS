/** @format */

import express, { Router } from "express";
import {
  getRecommendedProducts,
  getSalesForecastingData,
} from "../contollers/commonController";

const router: Router = express.Router();

router.post("/getRecommendedProducts", getRecommendedProducts);
router.post("/getSalesForecastingData", getSalesForecastingData);

export default router;
