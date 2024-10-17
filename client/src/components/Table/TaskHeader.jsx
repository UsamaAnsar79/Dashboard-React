import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const TaskHeader = ({ taskCount,title }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      {/* Left Side of Header */}
      <div className="d-flex align-items-center">
      <div className="d-flex justify-content-between align-items-center">
      <h4 style={{fontSize:"15px",color:"#4c5666"}}>{title ? title : `Today (${taskCount}) Tasks`}</h4>
    </div>
      </div>

      {/* Right Side of Header */}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          onClick={toggleVisibility}
          aria-expanded={isVisible}
          style={{ background: "none", padding: "0", border: "none" }}
        >
          <i className="bi bi-gear"></i>
        </button>
        {isVisible && (
          <ul className="dropdown-menu show dropdown-menu-left"
          style={{
            right: "0",
            left: "auto",
          }}>
            <li><a className="dropdown-item" href="#!">Action</a></li>
            <li><a className="dropdown-item" href="#!">Another action</a></li>
            <li><a className="dropdown-item" href="#!">Something else</a></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
