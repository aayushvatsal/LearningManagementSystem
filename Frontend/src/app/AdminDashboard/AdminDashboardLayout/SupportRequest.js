import React, { useState } from "react";
import styles from "../../../Styles/SupportRequest.module.css";

const SupportRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className={styles.supportRequestContainer}>
      {/* Support Requests Overview */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>Support Requests Overview</h2>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Requests</span>
            <span className={styles.statValue}>123</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Pending Requests</span>
            <span className={styles.statValue}>45</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Resolved Requests</span>
            <span className={styles.statValue}>78</span>
          </div>
        </div>
      </section>

      {/* Request Filters */}
      <section className={styles.filtersSection}>
        <h2 className={styles.sectionTitle}>Request Filters</h2>
        <div className={styles.filtersContainer}>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Status</label>
            <select className={styles.filterSelect}>
              <option>All</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Priority</label>
            <select className={styles.filterSelect}>
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Date Range</label>
            <input type="date" className={styles.dateInput} />
            <input type="date" className={styles.dateInput} />
          </div>
        </div>
      </section>

      {/* Request List */}
      <section className={styles.requestListSection}>
        <h2 className={styles.sectionTitle}>Request List</h2>
        <div className={styles.requestListContainer}>
          {/* Example request items */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={styles.requestItem}
              onClick={() => handleSelectRequest(item)}
            >
              <span className={styles.requestId}>#00{item}</span>
              <span className={styles.requestSummary}>Summary of Request {item}</span>
              <span className={styles.requestDate}>2024-09-07</span>
            </div>
          ))}
        </div>
      </section>

      {/* Request Details */}
      {selectedRequest && (
        <section className={styles.requestDetailsSection}>
          <h2 className={styles.sectionTitle}>Request Details</h2>
          <div className={styles.detailsContainer}>
            <p><strong>Request ID:</strong> #{selectedRequest}</p>
            <p><strong>Subject:</strong> Subject of the request {selectedRequest}</p>
            <p><strong>Description:</strong> Detailed description of the request {selectedRequest}</p>
            <p><strong>Status:</strong> Pending</p>
            <p><strong>Priority:</strong> High</p>
          </div>
        </section>
      )}

      {/* Response Templates */}
      <section className={styles.templatesSection}>
        <h2 className={styles.sectionTitle}>Response Templates</h2>
        <div className={styles.templatesContainer}>
          <div className={styles.templateItem}>
            <span className={styles.templateName}>Template 1</span>
            <button className={styles.useTemplateButton}>Use Template</button>
          </div>
          <div className={styles.templateItem}>
            <span className={styles.templateName}>Template 2</span>
            <button className={styles.useTemplateButton}>Use Template</button>
          </div>
        </div>
      </section>

      {/* Assign Requests */}
      <section className={styles.assignSection}>
        <h2 className={styles.sectionTitle}>Assign Requests</h2>
        <div className={styles.assignContainer}>
          <label className={styles.assignLabel}>Assign to</label>
          <select className={styles.assignSelect}>
            <option>Staff 1</option>
            <option>Staff 2</option>
            <option>Staff 3</option>
          </select>
          <button className={styles.assignButton}>Assign</button>
        </div>
      </section>

      {/* Request Logs */}
      <section className={styles.logsSection}>
        <h2 className={styles.sectionTitle}>Request Logs</h2>
        <div className={styles.logsContainer}>
          {/* Example log items */}
          {[1, 2].map((log) => (
            <div key={log} className={styles.logItem}>
              <span className={styles.logDate}>2024-09-07</span>
              <span className={styles.logMessage}>Log message for request {log}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SupportRequest;
