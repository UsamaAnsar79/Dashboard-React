import React from 'react';
import ChartComponent from '../charts/ChartComponent'; 
import DetailBoxes from './DetailBox/DetailBoxes';
import PerformanceChart from '../charts/PerformanceChart';
import CombinedComponent from './Table/CombinedComponent';
import SalesComponent from './SalesComponent';
import NavBarComponent from './Navbar';
import SideBarComponent from './SideBarComponent';


// Sample data and options for different charts
const chart1Data = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  datasets: [
    {
      label: " ",
      data: [80, 100, 70, 80, 120, 80],
      borderColor: "#1f8ef1",
      borderWidth: 2,
      pointBackgroundColor: "#1f8ef1",
      tension: 0.4,
    },
  ],
};

const chart1Options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      min: 60,
      max: 130,
      ticks: { stepSize: 10, autoSkip: false, precision: 0 },
    },
  },
};


const chart2Data = {
  labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
  datasets: [
    {
      label: "",
      data: [120, 90, 30, 50, 70, 100],
      backgroundColor: "#d62cd3",
    },
  ],
};

const chart2Options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { min: 0, max: 150, ticks: { stepSize: 30 } },
  },
};

const chart3Data = {
  labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      label: " ",
      data: [70, 90, 80, 110, 100, 120],
      borderColor: "#29c3be",
      backgroundColor: "rgba(41, 195, 190, 0.5)",
      borderWidth: 1.5,
      fill: true,
      tension: 0.3,
    },
  ],
};

const chart3Options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { min: 50, max: 130, ticks: { stepSize: 10 } },
  },
};

// Dashboard Component to Render Multiple Charts
const Dashboard = () => {
  return (
   
    <div className="container-fluid">
      {/* <NavBarComponent /> */}
      <SideBarComponent />
      <div className="home">
        <PerformanceChart />
      <DetailBoxes />
      <div className="row">
        <div className="col-md-4 ">
          <ChartComponent
            type="line"
            data={chart1Data}
            options={chart1Options}
            heading="Total Shipments"
            detail="763,215"
            iconClass="bi-people-fill"
            
          />
        </div>

        <div className="col-md-4">
          <ChartComponent
            type="bar"
            data={chart2Data}
            options={chart2Options}
            heading="Daily Sales"
            detail="3500"
            iconClass="bi-bar-chart"
          />
        </div>

        <div className="col-md-4">
          <ChartComponent
            type="line"
            data={chart3Data}
            options={chart3Options}
            heading="Completed Tasks"
            detail="12,100K"
            iconClass="bi-graph-up"
          />
        </div>
      </div>
      <CombinedComponent />
      <SalesComponent />
    </div>
    </div>
  );
};

export default Dashboard;


