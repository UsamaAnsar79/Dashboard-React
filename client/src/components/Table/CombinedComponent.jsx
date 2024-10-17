import React from "react";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import TaskHeader from "./TaskHeader"; // Import the TaskHeader component
import "bootstrap-icons/font/bootstrap-icons.css"; // For Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";

const CombinedComponent = () => {
  const tasks = [
    {
      title: "Update the documentation",
      detail: "Dwuamish Head, Seattle, WA 8:47 AM",
    },
    {
      title: "GDPR Compliance",
      detail:
        "The GDPR is a regulation that requires businesses to protect the personal data and privacy of Europe citizens for transactions that occur within EU member states.",
    },
    {
      title: "Solve the issues",
      detail:
        "Fifty percent of all respondents said they would be more likely to shop at a company.",
    },
    {
      title: "Release v2.0.0",
      detail: "Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM",
    },
    {
      title: "Export the processed files",
      detail:
        "The report also shows that consumers will not easily forgive a company once a breach exposing their personal data occurs.",
    },
    {
      title: "Arrival at export process",
      detail: "Capitol Hill, Seattle, WA 12:34 AM",
    },
  ];

  const employees = [
    { name: "Tania Mike", position: "Developer", milestone: 25, salary: 99225 },
    { name: "John Doe", position: "CEO", milestone: 77, salary: 89241 },
    { name: "Alexa Mike", position: "Designer", milestone: 41, salary: 92144 },
    { name: "Jana Monday", position: "Marketing", milestone: 50, salary: 49290 },
    { name: "Paul Dickens", position: "Developer", milestone: 100, salary: 69201 },
    { name: "Manuela Rico", position: "Manager", milestone: 15, salary: 99201 },
    { name: "Manuela Rico", position: "Manager", milestone: 15, salary: 99201 },
  ];

  return (
    <div className=" my-4 task-table-container">
      {/* Task List Section */}
      <div className="task-list-container">
        <div
          className="p-3 rounded"
          style={{
            height: "400px",
            overflowY: "auto",
            backgroundColor: "#27293d",
            color: "white",
          }}
        >
          <TaskHeader taskCount={tasks.length} />
          {tasks.map((task, index) => (
            <div
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
              style={{
                backgroundColor: "#27293d",
                color: "white",
                borderBottom: "1px solid #ffffff33",
                padding:"10px"
              }}
            >
              <div className="form-check d-flex align-items-center">
                <input type="checkbox" className="form-check-input me-4" style={{ margin: "0 auto",cursor:"pointer" }} />
                <label className="form-check-label">
                  <h5>{task.title}</h5>
                  <p className="mb-0">{task.detail}</p>
                </label>
              </div>
              <i className="bi bi-pencil-fill"></i>
            </div>
          ))}
        </div>
      </div>

      {/* Managed Table Section */}
      <div className="table-container">
        <div
          className="table-responsive"
          style={{
            height: "400px",
            overflowY: "auto",
            backgroundColor: "#27293d",
            color: "white",
          }}
        >
          <Table
            className="table"
            style={{
              backgroundColor: "#27293d",
              color: "white",
              border: "none",
            }}
          >
            <thead>
              <tr>
                <td colSpan="6" style={{ padding: "0"}}>
                  <div
                    style={{
                      backgroundColor: "#27293d",
                      color: "white",
                      padding: "20px 20px 3px 10px",
                    }}
                  >
                    {/* Pass custom title for the Managed Table */}
                    <TaskHeader taskCount={employees.length} title="Management Table" />
                  </div>
                </td>
              </tr>
              <tr>
                <th className="tableHead-hash" style={{ backgroundColor: "#27293d", color: "white" }}>#</th>
                <th style={{ backgroundColor: "#27293d", color: "white" }}>Name</th>
                <th style={{ backgroundColor: "#27293d", color: "white" }}>Job Position</th>
                <th style={{ backgroundColor: "#27293d", color: "white" }}>Milestone</th>
                <th style={{ backgroundColor: "#27293d", color: "white" }}>Salary</th>
                <th style={{ backgroundColor: "#27293d", color: "white" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ffffff33" }}>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>{index + 1}</td>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>{employee.name}</td>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>{employee.position}</td>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>
                    <ProgressBar now={employee.milestone} />
                  </td>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td style={{ backgroundColor: "#27293d", color: "white" }}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    <i className="bi bi-x-lg"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;



