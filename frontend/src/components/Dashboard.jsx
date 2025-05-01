import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome back, Murugan M! You have 1 document</h2>
        <button className="create-btn">+ Create New</button>
      </header>

      <nav className="tabs">
       
        <button className="active">Resumes (1)</button>

      </nav>

      <div className="top-controls">
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="view-options">
          <span>View:</span>
          <button className="grid-view active">▦</button>
          <button className="list-view">≣</button>
        </div>
      </div>

      <div className="card-grid">
        <div className="new-card">
          <div className="plus-box">+</div>
          <div>
            <strong>New resume</strong>
            <p><b>TIP:</b> Tailoring your resume doubles your interview chances.</p>
          </div>
        </div>
        <div className="resume-card">
          <div className="resume-preview"></div>
          <div className="resume-info">
            <span className="label">RESUME #1</span>
            <h3>New Resume (2)</h3>
            <p>Edited 2 hours ago</p>
            <ul className="resume-actions">
              <li>Edit</li>
              <li>Duplicate</li>
              <li>Tailor for a job</li>
              <li>Download</li>
              <li>Delete</li>
            </ul>
            <span className="date">Created on May 1, 2025</span>
            <a href="#">View old versions</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
