import React, { useState } from "react";
import styles from ".././../../Styles/AuditLogs.module.css";

const AuditLogs = () => {
  const [selectedLog, setSelectedLog] = useState(null);

  const handleSelectLog = (log) => {
    setSelectedLog(log);
  };

  return (
    <div className={styles.auditLogsContainer}>
      {/* Audit Logs Overview */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>Audit Logs Overview</h2>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Logs</span>
            <span className={styles.statValue}>567</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Errors</span>
            <span className={styles.statValue}>89</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Warnings</span>
            <span className={styles.statValue}>45</span>
          </div>
        </div>
      </section>

      {/* Date Range Picker */}
      <section className={styles.dateRangeSection}>
        <h2 className={styles.sectionTitle}>Date Range Picker</h2>
        <div className={styles.dateRangeContainer}>
          <input type="date" className={styles.dateInput} />
          <input type="date" className={styles.dateInput} />
          <button className={styles.filterButton}>Apply</button>
        </div>
      </section>

      {/* Log Filters */}
      <section className={styles.filtersSection}>
        <h2 className={styles.sectionTitle}>Log Filters</h2>
        <div className={styles.filtersContainer}>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Log Level</label>
            <select className={styles.filterSelect}>
              <option>All</option>
              <option>Info</option>
              <option>Warning</option>
              <option>Error</option>
            </select>
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>User</label>
            <input type="text" className={styles.filterInput} placeholder="Search user" />
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Action</label>
            <input type="text" className={styles.filterInput} placeholder="Search action" />
          </div>
        </div>
      </section>

      {/* Logs List */}
      <section className={styles.logsListSection}>
        <h2 className={styles.sectionTitle}>Logs List</h2>
        <div className={styles.logsListContainer}>
          {[1, 2, 3].map((log) => (
            <div
              key={log}
              className={styles.logItem}
              onClick={() => handleSelectLog(log)}
            >
              <span className={styles.logTimestamp}>2024-09-07 14:32</span>
              <span className={styles.logMessage}>Log message {log}</span>
              <span className={styles.logLevel}>INFO</span>
            </div>
          ))}
        </div>
      </section>

      {/* Log Details */}
      {selectedLog && (
        <section className={styles.logDetailsSection}>
          <h2 className={styles.sectionTitle}>Log Details</h2>
          <div className={styles.detailsContainer}>
            <p><strong>Log ID:</strong> #{selectedLog}</p>
            <p><strong>Timestamp:</strong> 2024-09-07 14:32</p>
            <p><strong>Message:</strong> Detailed message for log {selectedLog}</p>
            <p><strong>Level:</strong> INFO</p>
            <p><strong>User:</strong> Admin</p>
            <p><strong>Action:</strong> Action performed</p>
          </div>
        </section>
      )}

      {/* Export Logs */}
      <section className={styles.exportSection}>
        <h2 className={styles.sectionTitle}>Export Logs</h2>
        <div className={styles.exportContainer}>
          <button className={styles.exportButton}>Export as CSV</button>
          <button className={styles.exportButton}>Export as PDF</button>
        </div>
      </section>

      {/* Log History */}
      <section className={styles.historySection}>
        <h2 className={styles.sectionTitle}>Log History</h2>
        <div className={styles.historyContainer}>
          {/* Example log history items */}
          {[1, 2].map((history) => (
            <div key={history} className={styles.historyItem}>
              <span className={styles.historyDate}>2024-09-07</span>
              <span className={styles.historyAction}>Action performed {history}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AuditLogs;
