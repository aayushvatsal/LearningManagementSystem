import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../../Styles/InstructorDashboard.module.css';

const InstructorDashboard = () => {
  const enrollmentChartRef = useRef(null);
  const performanceChartRef = useRef(null);

  useEffect(() => {
    const enrollmentChartCtx = enrollmentChartRef.current.getContext('2d');
    const performanceChartCtx = performanceChartRef.current.getContext('2d');

    const enrollmentChart = new Chart(enrollmentChartCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Enrollments',
            data: [50, 75, 60, 90, 120, 150],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const performanceChart = new Chart(performanceChartCtx, {
      type: 'bar',
      data: {
        labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4'],
        datasets: [
          {
            label: 'Average Grades',
            data: [85, 90, 78, 92],
            backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
            borderColor: '#34495e',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup chart instances when component unmounts
    return () => {
      enrollmentChart.destroy();
      performanceChart.destroy();
    };
  }, []);

  return (
    <div className={styles.instructorDashboard}>
      <h1 className={styles.dashboardTitle}>Instructor Dashboard</h1>

      {/* Quick Stats Section */}
      <div className={styles.quickStatsSection}>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Active Courses</h2>
          <p className={styles.statValue}>8</p>
        </div>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Pending Assignments</h2>
          <p className={styles.statValue}>12</p>
        </div>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Student Messages</h2>
          <p className={styles.statValue}>5 Unread</p>
        </div>
        <div className={styles.statCard}>
          <h2 className={styles.statTitle}>Upcoming Classes</h2>
          <p className={styles.statValue}>3 This Week</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className={styles.notificationsSection}>
        <h2 className={styles.notificationsTitle}>Notifications</h2>
        <ul className={styles.notificationsList}>
          <li>New student enrolled in <strong>Math 101</strong></li>
          <li>Assignment deadline extended for <strong>Physics 202</strong></li>
          <li>Reminder: Grade submissions due for <strong>Chemistry 101</strong></li>
        </ul>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.recentActivitySection}>
        <h2 className={styles.activityTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <p>Submitted Assignment: <strong>John Doe</strong> in <em>Math 101</em></p>
            <span>2 hours ago</span>
          </div>
          <div className={styles.activityItem}>
            <p>New Message from: <strong>Jane Smith</strong></p>
            <span>4 hours ago</span>
          </div>
          <div className={styles.activityItem}>
            <p>New Course Created: <strong>Physics 202</strong></p>
            <span>1 day ago</span>
          </div>
          <div className={styles.activityItem}>
            <p>Attendance Updated for <strong>History 101</strong></p>
            <span>2 days ago</span>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className={styles.analyticsSection}>
        <h2 className={styles.analyticsTitle}>Platform Analytics</h2>
        <div className={styles.analyticsContent}>
          <div className={styles.chartContainer}>
            <p>Course Enrollment Trends</p>
            <canvas ref={enrollmentChartRef}></canvas>
          </div>
          <div className={styles.chartContainer}>
            <p>Student Performance Overview</p>
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Enhanced Featured Tips Section */}
      <div className={styles.featuredTipsSection}>
        <h2 className={styles.featuredTipsTitle}>Featured Tips</h2>
        <div className={styles.tipCards}>
          <div className={styles.tipCard}>
            <h3>Improve Student Engagement</h3>
            <p>Use interactive assignments and live discussions to keep students motivated.</p>
          </div>
          <div className={styles.tipCard}>
            <h3>Optimize Course Structure</h3>
            <p>Break down lessons into smaller modules to improve comprehension.</p>
          </div>
          <div className={styles.tipCard}>
            <h3>Use Quizzes for Quick Assessments</h3>
            <p>Quizzes help students retain information better and provide instant feedback.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
