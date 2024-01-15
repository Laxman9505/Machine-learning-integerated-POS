/** @format */

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";

const FraudDetection = () => {
  const dispatch = useDispatch();
  const { getFraudDetectionDataLoading, fraudDetectionData } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_FRAUD_DETECTION_DATA_REQUEST",
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
              {getFraudDetectionDataLoading ? (
                <TableSkeleton />
              ) : (
                <table className="table table-hover  align-middle table-nowrap mb-0 mt-4">
                  <thead>
                    <tr className="table-light">
                      <th>Transaction Id</th>
                      <th>Transaction Amount</th>
                      <th>Is Fraud ?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fraudDetectionData &&
                    fraudDetectionData?.result?.length > 0 ? (
                      fraudDetectionData?.result?.map((transaction, index) => {
                        return (
                          <tr key={index}>
                            <td>{transaction.transaction_id}</td>
                            <td>Rs {transaction.amount}</td>
                            <td>
                              {transaction.is_anomaly == 1 ? (
                                <Tag
                                  icon={<CheckCircleOutlined />}
                                  color="success"
                                >
                                  Not Likely To Be Fraud
                                </Tag>
                              ) : (
                                <Tag
                                  icon={<ExclamationCircleOutlined />}
                                  color="warning"
                                >
                                  Highly Likely To Be Fraud
                                </Tag>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr style={{ textAlign: "center" }}>
                        <td colSpan={3}>No Transaction Found !</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default FraudDetection;
