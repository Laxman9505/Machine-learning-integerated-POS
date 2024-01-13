/** @format */

import { combineEpics } from "redux-observable";

import { addProduct, editProduct, getAllProducts } from "./inventoryEpics";

import {
  getDashboardDataEpic,
  getFraudDetectionDatapic,
  getRecomendedProductsEpic,
  getSalesForecastingDataEpic,
  loginEpic,
  registerOnBoardUserEpic,
  sendOTPtoMail,
} from "./myEpics";
import { getAllOrdersEpic, placeOrderEpic } from "./ordersEpic";

export const rootEpic = combineEpics(
  editProduct,
  getAllProducts,
  addProduct,
  loginEpic,
  getAllOrdersEpic,
  registerOnBoardUserEpic,
  getDashboardDataEpic,
  placeOrderEpic,
  sendOTPtoMail,
  getRecomendedProductsEpic,
  getSalesForecastingDataEpic,
  getFraudDetectionDatapic
);
