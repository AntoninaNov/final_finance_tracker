import React, { useState, useContext } from "react";
import { IncomeData } from "../DataContext/Context";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function ReportAndAnalysis() {
  const { expenseEntries, incomeEntries } = useContext(IncomeData);

  // Calculate total income for the month
  let totalIncomePerMonth = incomeEntries.reduce((total, obj) => {
    return total + Number(obj.amount);
  }, 0);

  // Calculate total expense for the month
  let totalExpensePerMonth = expenseEntries.reduce((acc, obj) => {
    return acc + Number(obj.amount);
  }, 0);

  // Data for bar chart
  const incomeVsExpense = {
    labels: ["Monthly Income", "Monthly Expense"],
    datasets: [
      {
        indexAxis: "y",
        fill: false,
        label: "Income Vs Expense",
        data: [totalIncomePerMonth, totalExpensePerMonth],
        backgroundColor: ["#293462", "#1CD6CE"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // Calculate net balance and expense as percentage of income
  let netBalance = totalIncomePerMonth - totalExpensePerMonth;
  let incomeVsExpensePercentage = (totalExpensePerMonth / totalIncomePerMonth) * 100;

  return (
      <div className="container mt-5">  {/* Bootstrap Container */}
        <div className="row">  {/* Bootstrap Row */}
          <div className="col">
            <h1 className="text-center mb-5">Income Vs Expense Graph</h1> {/* Bootstrap Text-Center and Margin-Bottom classes */}
            <div className="d-flex justify-content-center mb-5"> {/* Bootstrap Flexbox Centering */}
              <Bar data={incomeVsExpense} />
            </div>
            <div className="d-flex justify-content-center"> {/* Bootstrap Flexbox Centering */}
              <h2>
                Expense used from your income : {incomeVsExpensePercentage.toFixed(2)}%
              </h2>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ReportAndAnalysis;
