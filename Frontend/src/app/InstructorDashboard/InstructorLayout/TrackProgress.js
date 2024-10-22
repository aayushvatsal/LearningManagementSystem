import React from 'react';
import styles from '../../../Styles/TrackProgress.module.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const TrackProgress = () => {
  // Sample data for the chart
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Completed Assignments',
        data: [5, 10, 8, 15, 20],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Completed: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className={styles.trackProgressContainer}>
      <h1 className={styles.pageTitle}>Track Your Progress</h1>

      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <div className={styles.overviewDetails}>
          <div className={styles.overviewItem}>
            <h3>Total Assignments</h3>
            <p>25</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Completed Assignments</h3>
            <p>18</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Pending Assignments</h3>
            <p>7</p>
          </div>
        </div>
      </section>

      <section className={styles.progressDetailsSection}>
        <h2 className={styles.sectionTitle}>Progress Details</h2>
        <div className={styles.chartCard}>
          <Line data={data} options={options} />
        </div>
      </section>

      <section className={styles.upcomingDeadlinesSection}>
        <h2 className={styles.sectionTitle}>Upcoming Deadlines</h2>
        <ul className={styles.deadlinesList}>
          <li className={styles.deadlineItem}>
            <h3>Math Assignment</h3>
            <p>Due: Sep 30, 2024</p>
          </li>
          <li className={styles.deadlineItem}>
            <h3>History Project</h3>
            <p>Due: Oct 5, 2024</p>
          </li>
        </ul>
      </section>

      <section className={styles.recentActivitiesSection}>
        <h2 className={styles.sectionTitle}>Recent Activities</h2>
        <ul className={styles.activitiesList}>
          <li className={styles.activityItem}>
            <h3>Completed Math Assignment</h3>
            <p>Submitted on: Sep 20, 2024</p>
          </li>
          <li className={styles.activityItem}>
            <h3>Started History Project</h3>
            <p>Started on: Sep 22, 2024</p>
          </li>
        </ul>
      </section>

      <section className={styles.actionButtonsSection}>
        <h2 className={styles.sectionTitle}>Actions</h2>
        <div className={styles.actionButtons}>
          <button className={styles.addAssignmentButton}>Add Assignment</button>
          <button className={styles.viewProgressButton}>View Detailed Progress</button>
        </div>
      </section>
    </div>
  );
};

export default TrackProgress;