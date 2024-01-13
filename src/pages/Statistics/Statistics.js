/** @format */

import React from "react";
import Loadable from "react-loadable";
import { Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SIdeBarPage from "../../components/SideBarPage/SIdeBarPage";

function Statistics() {
  const Recomendation = Loadable({
    loader: () => import("./Recomendation"),
    loading: () => null,
  });

  const SalesForecasting = Loadable({
    loader: () => import("./SalesForecasting"),
    loading: () => null,
  });
  const FraudDetection = Loadable({
    loader: () => import("./FraudDetection"),
    loading: () => null,
  });

  return (
    <div className="container-fluid page-body-wrapper1">
      {/* partial:partials/_sidebar.html */}
      {/* Sidebar */}
      {/* End sidebar */}
      {/* partial */}
      <div className=" main_panel_inner">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row  d-flex justify-content-center">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="breadcrumb_top ">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-custom">
                      <Link to="/" className="breadcrumb-item fw-bold">
                        Home
                      </Link>
                      <li
                        className="breadcrumb-item active fw-bold"
                        aria-current="page"
                      >
                        <span>Statistics</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myvendors">
              <div className="row">
                <SIdeBarPage
                  pages={[
                    {
                      name: "Recomendation",
                      path: "Statistics/recomendation",
                      loadable: Recomendation,
                    },
                    {
                      name: "Sales Forecasting",
                      path: "Statistics/sales-forecasting",
                      loadable: SalesForecasting,
                    },
                    {
                      name: "Fraud Detection",
                      path: "Statistics/fraud-detection",
                      loadable: FraudDetection,
                    },
                  ]}
                />

                {/* end menu left */}
                {/* start menu right */}
                <div className="col-md-10 col-xxl-10">
                  <Outlet />
                  <React.Suspense fallback={null}>
                    <Routes>
                      <Route
                        path="/recomendation"
                        element={<Recomendation />}
                      />
                      <Route
                        path="/sales-forecasting"
                        element={<SalesForecasting />}
                      />
                      <Route
                        path="/fraud-detection"
                        element={<FraudDetection />}
                      />
                      <Route
                        path="/*"
                        element={<Navigate to="/404" replace />}
                      />
                    </Routes>
                  </React.Suspense>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer ">
            <div className="container-fluid clearfix ">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block "></span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}

export default Statistics;
