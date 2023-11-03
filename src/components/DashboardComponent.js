import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { IncomeData } from "../DataContext/Context";

function DashboardComponent() {
  const { expenseEntries, incomeEntries } = useContext(IncomeData);

  const incomeDataBarChart = {
    labels: incomeEntries.map((item) => item.category),
    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Total Income",
        data: incomeEntries.map((item) => item.amount),
        backgroundColor: ["#293462", "#1CD6CE", "#FEDB39", "#D61C4E"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const expenseDataBarChart = {
    labels: expenseEntries.map((item) => item.category),

    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Total Income",
        data: expenseEntries.map((item) => item.amount),
        backgroundColor: ["#293462", "#1CD6CE", "#FEDB39", "#D61C4E"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  let totalSalaryPerMonth = incomeEntries.reduce((total, obj) => {
    return total + Number(obj.amount);
  }, 0);

  let totalExpensePerMonth = expenseEntries.reduce((acc, obj) => {
    return acc + Number(obj.amount);
  }, 0);

  let netBalance = totalSalaryPerMonth - totalExpensePerMonth;

  return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Salary Per Month</h5>
                <p className="card-text h2">{totalSalaryPerMonth}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">Expense Per Month</h5>
                <p className="card-text h2">{totalExpensePerMonth}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Net Balance</h5>
                <p className="card-text h2">{netBalance}</p>
              </div>
            </div>
          </div>
        </div>
      <div className="mt-5">
          <h3 className="text-center">Bar Graphs</h3>
          <div className="row mt-3">
            <div className="col-md-6">
              <h4>Income Graph</h4>
              <Bar data={incomeDataBarChart}/>
            </div>
            <div className="col-md-6">
              <h4>Expense Graph</h4>
              <Bar data={expenseDataBarChart} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default DashboardComponent;
