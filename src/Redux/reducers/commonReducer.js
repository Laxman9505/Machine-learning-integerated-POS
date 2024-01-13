/** @format */

const initialState = {
  isLoading: false,
  error: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_DASHBOARD_DATA_REQUEST":
      return {
        ...state,
        getDashboardDataLoading: true,
      };
    case "GET_DASHBOARD_DATA_SUCCESS":
      return {
        ...state,
        dashboardData: payload,
        getDashboardDataLoading: false,
      };
    case "GET_DASHBOARD_DATA_FAILURE":
      return {
        ...state,
        getDashboardDataLoading: false,
      };
    case "GET_RECOMENDED_PRODUCTS_REQUEST":
      return {
        ...state,
        getRecomendedProductsLoading: true,
      };
    case "GET_RECOMENDED_PRODUCTS_SUCCESS":
      return {
        ...state,
        getRecomendedProductsLoading: false,
        recomendedProducts: payload,
      };
    case "GET_RECOMENDED_PRODUCTS_FAILURE":
      return {
        ...state,
        getRecomendedProductsLoading: false,
      };
    case "GET_SALES_FORECASTING_REQUEST":
      return {
        ...state,
        getSalesForecastingDataLoading: true,
      };
    case "GET_SALES_FORECASTING_SUCCESS":
      return {
        ...state,
        getSalesForecastingDataLoading: false,
        salesForecastingData: payload,
      };
    case "GET_SALES_FORECASTING_FAILURE":
      return {
        ...state,
        getSalesForecastingDataLoading: false,
      };
    case "GET_FRAUD_DETECTION_DATA_REQUEST":
      return {
        ...state,
        getFraudDetectionDataLoading: true,
      };
    case "GET_FRAUD_DETECTION_DATA_SUCCESS":
      return {
        ...state,
        getFraudDetectionDataLoading: false,
        fraudDetectionData: payload,
      };
    case "GET_FRAUD_DETECTION_DATA_FAILURE":
      return {
        ...state,
        getFraudDetectionDataLoading: false,
      };
    default:
      return state;
  }
}
