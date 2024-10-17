import React, { useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const verticalLinesPlugin = {
  id: "verticalLines",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x },
    } = chart;
    const xValues = [
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const offsetTop = 10;
    const offsetBottom = 10;

    ctx.save();
    ctx.strokeStyle = "#2f3669";
    ctx.lineWidth = 0.4;
    xValues.forEach((xValue) => {
      const xPosition = x.getPixelForValue(xValue);
      ctx.beginPath();
      ctx.moveTo(xPosition, top + offsetTop);
      ctx.lineTo(xPosition, bottom - offsetBottom);
      ctx.stroke();
    });
    ctx.restore();
  },
};

// Sample data directly defined in the component
const sampleData = [
    { label: "JAN", accountsValue: 100, purchaseValue: 80, sessionsValue: 60 },
  { label: "FEB", accountsValue: 70, purchaseValue: 120, sessionsValue: 80 },
  { label: "MAR", accountsValue: 90, purchaseValue: 105, sessionsValue: 65 },
  { label: "APR", accountsValue: 70, purchaseValue: 110, sessionsValue: 130 },
  { label: "MAY", accountsValue: 85, purchaseValue: 95, sessionsValue: 80 },
  { label: "JUN", accountsValue: 60, purchaseValue: 105, sessionsValue: 105 },
  { label: "JUL", accountsValue: 75, purchaseValue: 90, sessionsValue: 90 },
  { label: "AUG", accountsValue: 60, purchaseValue: 100, sessionsValue: 130 },
  { label: "SEP", accountsValue: 90, purchaseValue: 80, sessionsValue: 70 },
  { label: "OCT", accountsValue: 80, purchaseValue: 95, sessionsValue: 115 },
  { label: "NOV", accountsValue: 110, purchaseValue: 70, sessionsValue: 60 },
  { label: "DEC", accountsValue: 100, purchaseValue: 120, sessionsValue: 130 },
];

export default function PerformanceChart() {
  const [chartData, setChartData] = useState({
    labels: sampleData.map((data) => data.label),
    datasets: [
      {
        data: sampleData.map((data) => data.accountsValue),
        borderColor: "#1f8ef1",
        borderWidth: 2,
      },
    ],
  });

  const [activeButton, setActiveButton] = useState("accounts");

  // Handlers for button clicks
  const handleAccountsClick = () => {
    setChartData({
      labels: sampleData.map((data) => data.label),
      datasets: [
        {
          data: sampleData.map((data) => data.accountsValue),
          borderColor: "#1f8ef1",
          borderWidth: 2,
        },
      ],
    });
    setActiveButton("accounts");
  };

  const handlePurchaseClick = () => {
    setChartData({
      labels: sampleData.map((data) => data.label),
      datasets: [
        {
          data: sampleData.map((data) => data.purchaseValue),
          borderColor: "#1f8ef1",
          borderWidth: 2,
        },
      ],
    });
    setActiveButton("purchase");
  };

  const handleSessionsClick = () => {
    setChartData({
      labels: sampleData.map((data) => data.label),
      datasets: [
        {
          data: sampleData.map((data) => data.sessionsValue),
          borderColor: "#1f8ef1",
          borderWidth: 2,
        },
      ],
    });
    setActiveButton("sessions");
  };

  // Dynamic button class
  const buttonClass = (buttonClass) =>
    `btn ${activeButton === buttonClass ? "btn-primary" : "btn-outline-primary"}`;

  return (
    <div className=" text-white rounded p-3 mb-4 mf-3 chart-container">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start">
        <div className="mb-2">
          <h5 className="text" style={{ fontSize: '15px', fontWeight: 200}}>Total Shipments</h5>
          <h2 className="mb-0" style={{ fontSize: '28px', fontWeight: 200 }}>Performance</h2>
        </div>
        <div>
          <button className={buttonClass("accounts")} onClick={handleAccountsClick}>
            Accounts
          </button>
          <button className={buttonClass("purchase")} onClick={handlePurchaseClick}>
            Purchase
          </button>
          <button className={buttonClass("sessions")} onClick={handleSessionsClick}>
            Sessions
          </button>
        </div>
      </div>

      {/* CHART PERFORMANCE */}
      <div style={{ height: "230px" }}>
        <Line
          data={chartData}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                ticks: {
                  padding: 20,
                  color: " rgba(255, 255, 255, 0.473)",
                },
              },
              y: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                ticks: {
                  padding: 5,
                  font: {
                    size: "12",
                  },
                  color: "rgba(255, 255, 255, 0.473)",
                  callback: function (yAxisValues) {
                    return yAxisValues + "     ";
                  },
                },
                suggestedMin: 60,
                suggestedMax: 130,
              },
            },
          }}
          plugins={[verticalLinesPlugin]}
        />
      </div>
    </div>
  );
}
