import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../../../Styles/PlatformActivity.module.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PlatformActivity = () => {
  const [platformUsageData, setPlatformUsageData] = useState(null);
  const [userActivityData, setUserActivityData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MTI0OTkxLCJpYXQiOjE3MjcwMzg1OTEsImp0aSI6ImVmYWQ5MDUwZDUyYTQ1YTdiYTA4ZGU5YzE5MjkwOTVlIiwidXNlcl9pZCI6M30.iLAmEwJ05WJeWHJo1khMSJ_-Qbc9CvSOVLZBRr2G8vs';

  // Fetch Platform Usage Data
  const fetchPlatformUsage = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/platform-usage/', {
        headers: {
          Authorization: token,
        },
      });
      setPlatformUsageData(response.data);
    } catch (err) {
      console.error('Error fetching platform usage data:', err);
      setError('Error fetching platform usage data');
    }
  };

  // Fetch User Activity Data
  const fetchUserActivity = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user-activity/', {
        headers: {
          Authorization: token,
        },
      });
      setUserActivityData(response.data);
    } catch (err) {
      console.error('Error fetching user activity data:', err);
      setError('Error fetching user activity data');
    }
  };

  // Fetch Logs
  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/logs/', {
        headers: {
          Authorization: token,
        },
      });
      setLogs(response.data);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError('Error fetching logs');
    }
  };

  useEffect(() => {
    fetchPlatformUsage();
    fetchUserActivity();
    fetchLogs();
    setLoading(false);
  }, [token]);

  // Conditional rendering for loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Prepare chart data for rendering
  const lineChartData = platformUsageData
    ? {
        labels: platformUsageData.labels,
        datasets: [
          {
            label: 'Platform Usage',
            data: platformUsageData.data,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
          },
        ],
      }
    : null;

  const barChartData = userActivityData
    ? {
        labels: userActivityData.labels,
        datasets: [
          {
            label: 'User Activity',
            data: userActivityData.data,
            backgroundColor: '#66BB6A',
          },
        ],
      }
    : null;

  const pieChartData = {
    labels: ['Logins', 'Uploads', 'Comments'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className={styles.platformActivityContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Platform Activity</h1>
      </header>
      <main className={styles.mainContent}>
        {/* Recent Activities Section */}
        <section className={styles.activityListSection}>
          <h2 className={styles.sectionTitle}>Recent Activities</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.activityTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0
                  ? logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.activity}</td>
                        <td>{log.user}</td>
                        <td>{log.date}</td>
                        <td>
                          <button className={`${styles.actionButton} ${styles.viewButton}`}>
                            View
                          </button>
                          <button className={`${styles.actionButton} ${styles.clearButton}`}>
                            Clear
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activity Statistics Section */}
        <section className={styles.activityStatsSection}>
          <h2 className={styles.sectionTitle}>Activity Statistics</h2>
          {lineChartData && (
            <div className={styles.chartContainer}>
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>
          )}
          {barChartData && (
            <div className={styles.chartContainer}>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          )}
          <div className={styles.chartContainer}>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Recent Logs Section */}
        <section className={styles.recentLogsSection}>
          <h2 className={styles.sectionTitle}>Recent Logs</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.activityTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Log</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0
                  ? logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.activity}</td>
                        <td>{log.date}</td>
                        <td>{log.details}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlatformActivity;
