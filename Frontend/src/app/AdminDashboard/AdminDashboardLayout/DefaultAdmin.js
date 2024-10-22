import React from 'react';
import { Line, Bar, Pie, Radar, Doughnut, PolarArea as Polar, Scatter, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale, PolarAreaController, ScatterController, BubbleController } from 'chart.js';
import styles from '../../../Styles/DefaultAdminDashboard.module.css';

// Registering the components needed for the charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale,
  PolarAreaController,
  ScatterController,
  BubbleController
);

const DefaultDashboard = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [40, 45, 55, 60, 70, 80, 90],
        backgroundColor: '#66BB6A',
      },
    ],
  };

  const pieChartData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const radarChartData = {
    labels: ['Speed', 'Strength', 'Agility', 'Stamina', 'Skill'],
    datasets: [
      {
        label: 'Player A',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        borderColor: '#42A5F5',
      },
      {
        label: 'Player B',
        data: [28, 48, 40, 19, 96],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Marketing', 'Sales', 'Development', 'Support'],
    datasets: [
      {
        data: [200, 150, 300, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  const polarChartData = {
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    datasets: [
      {
        data: [10, 20, 30, 40],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: 'Data Set 1',
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 2 },
        ],
        backgroundColor: '#42A5F5',
      },
    ],
  };

  const bubbleChartData = {
    datasets: [
      {
        label: 'Project A',
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 20, y: 30, r: 20 },
          { x: 30, y: 40, r: 25 },
        ],
        backgroundColor: '#66BB6A',
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      </div>
      <div className={styles.dashboardSections}>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Sales Overview</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Revenue Overview</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Product Distribution</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Player Performance Radar</h2>
          <Radar data={radarChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Budget Allocation</h2>
          <Doughnut data={doughnutChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Item Popularity</h2>
          <Polar data={polarChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Project Progress</h2>
          <Scatter data={scatterChartData} options={{ responsive: true }} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.sectionTitle}>Bubble Chart Example</h2>
          <Bubble data={bubbleChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
