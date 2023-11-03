import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import IncomeAndExpense from "./IncomeAndExpense";
import DashboardComponent from "./DashboardComponent";
import ReportAndAnalysis from "./ReportAndAnalysis";

function FeatureList(props) {
  return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <Link to="/IncomeAndExpense" className="list-group-item list-group-item-action">
                Income And Expense
              </Link>
              <Link to="/Dashboard" className="list-group-item list-group-item-action">
                Dashboard
              </Link>
              <Link to="/ReportAndAnalysis" className="list-group-item list-group-item-action">
                Report Analysis
              </Link>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                <Routes>
                  <Route path="/IncomeAndExpense" element={<IncomeAndExpense />} />
                  <Route path="/Dashboard" element={<DashboardComponent />} />
                  <Route path="/ReportAndAnalysis" element={<ReportAndAnalysis />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default FeatureList;
