import React, { useState } from "react";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import IncomeAndExpense from "./components/IncomeAndExpense";
import FeatureList from "./components/FeatureList";
import GetIncomeData from "./DataContext/IncomeContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <GetIncomeData>
      <div className="App">
          <HeaderComponent />
        <div className="showFeature">
          <FeatureList />
        </div>
          <FooterComponent />
      </div>
    </GetIncomeData>
  );
}

export default App;
