/** @format */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FraudDetection = () => {
  const dispatch = useDispatch();
  const { getFraudDetectionDataLoading, fraudDetectionData } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    dispatch({
      type: "",
    });
  }, []);
  return (
    <div className="menu_right">
      <>
        <div className="right_top mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="m-auto text-center">
                Anomaly Detection for Fraud Prevention
              </h5>
              <p className="text-center mt-3">
                The "detectAnomalies" API employs the Isolation Forest model to
                identify anomalies in transaction data, specifically focusing on
                the "amount" feature.
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default FraudDetection;
