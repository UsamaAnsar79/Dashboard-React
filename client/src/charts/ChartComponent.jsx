import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartComponent = ({ type, data, options, heading, detail, iconClass,backgroundColor }) => {
  const ChartType = type === "bar" ? Bar : Line;

  return (
    <div className="component"  style={{ backgroundColor: backgroundColor || "#27293d",marginBottom:"1rem"}}>
      <div className="component-header p-3">
        <h5 className="component-heading" style={{ fontSize: '13px',color:"#4c5666" }}>{heading}</h5>
        <div className="d-flex align-items-center">
        <i className={`bi ${iconClass}`} style={{ fontSize: '24px' }}></i> 
          <h3 className="mb-0 me-2" style={{ fontSize: '20px' }}>{detail}</h3> 
         
        </div>
      </div>
      <div className="components-chart">
        <ChartType data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
