/** @format */

import { Empty, Statistic } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SalesForecasting = () => {
  const dispatch = useDispatch();
  const { getSalesForecastingDataLoading, salesForecastingData } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_SALES_FORECASTING_REQUEST",
      payload: {
        NoOfSteps: 2,
      },
    });
  }, []);

  return (
    <div className="menu_right">
      <>
        <div className="right_top mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="m-auto text-center">
                ARIMA Model for Sales Forecasting
              </h5>
              <p className="text-center mt-3">
                Using the ARIMA (AutoRegressive Integrated Moving Average)
                model, this sales forecasting leverages historical sales data to
                make predictions about future sales trends.
              </p>
              <div className="row mt-3">
                {salesForecastingData?.length > 0 ? (
                  salesForecastingData?.map((item, index) => {
                    return (
                      <Statistic
                        className="col-md-3 border mt-2 ms-2 d-flex justify-content-center align-items-center flex-column"
                        key={index}
                        valueStyle={{ color: "#3f8600" }}
                        title={moment(item.index).format("YYYY-MM-DD")}
                        value={item.forecast_sales}
                        precision={2}
                      />
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SalesForecasting;
