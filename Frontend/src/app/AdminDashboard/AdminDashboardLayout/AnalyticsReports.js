import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../../../Styles/AnalyticsReport.module.css";

const AnalyticsReport = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalCourses, setTotalCourses] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // To store specific user details
  const [revenueData, setRevenueData] = useState([]); // To store revenue data
  const [revenueBreakdown, setRevenueBreakdown] = useState([]); // To store revenue breakdown
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For updating users
  const [selectedUserId, setSelectedUserId] = useState(''); // To store dynamic user ID

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2ODA4MDE5LCJpYXQiOjE3MjY3MjE2MTksImp0aSI6IjNiNjQ2OTcwY2U1OTRhODRiZmMyNzQzZDRmYmJkNGJhIiwidXNlcl9pZCI6N30.xts7VMxUxzZe8wSlGBBWpg8dVBMxnrOQSPU2ceARzss';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total revenue
        const revenueRes = await axios.get('http://localhost:8000/api/analytics/revenues/', {
          headers: { Authorization: token },
        });
        setRevenueData(revenueRes.data);

        // Fetch revenue breakdown
        const revenueBreakdownRes = await axios.get('http://localhost:8000/api/analytics/revenues/revenue_breakdown/', {
          headers: { Authorization: token },
        });
        setRevenueBreakdown(revenueBreakdownRes.data.revenue_breakdown);

        // Fetch total courses using the correct API endpoint
        const coursesRes = await axios.get('http://localhost:8000/auth/courses/', {
          headers: { Authorization: token },
        });
        setTotalCourses(coursesRes.data.total_courses);

        // Fetch system alerts
        const systemAlertsRes = await axios.get('http://localhost:8000/api/analytics/alerts/', {
          headers: { Authorization: token },
        });
        setSystemAlerts(systemAlertsRes.data.alerts);

        // Fetch all users
        const usersRes = await axios.get('http://localhost:8000/api/analytics/users/', {
          headers: { Authorization: token },
        });
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Fetch user details dynamically when the user ID is set
  const fetchUserDetails = async () => {
    if (selectedUserId) {
      try {
        const userRes = await axios.get(`http://localhost:8000/api/analytics/users/${selectedUserId}/`, {
          headers: { Authorization: token },
        });
        setUserDetails(userRes.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  // Handle adding a new user
  const handleAddUser = async (username) => {
    try {
      await axios.post(
        'http://localhost:8000/api/analytics/users/',
        { username },
        { headers: { Authorization: token } }
      );
      alert('User added successfully!');
      // Re-fetch users after adding
      const res = await axios.get('http://localhost:8000/api/analytics/users/', {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle updating a user
  const handleUpdateUser = async (userId, updatedUsername) => {
    try {
      await axios.put(
        `http://localhost:8000/api/analytics/users/${userId}/`,
        { username: updatedUsername },
        { headers: { Authorization: token } }
      );
      alert('User updated successfully!');
      // Re-fetch users after updating
      const res = await axios.get('http://localhost:8000/api/analytics/users/', {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/analytics/users/${userId}/`, {
        headers: { Authorization: token },
      });
      alert('User deleted successfully!');
      // Re-fetch users after deleting
      const res = await axios.get('http://localhost:8000/api/analytics/users/', {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={styles.analyticsContainer}>
      {/* Overview Section */}
      <section className={styles.overviewSection}>
        <h2 className={styles.sectionTitle}>Admin Dashboard Overview</h2>
        <div className={styles.metricsContainer}>
          <div className={styles.metricBox}>
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className={styles.metricBox}>
            <h3>Total Courses</h3>
            <p>{totalCourses ? totalCourses : 'Loading...'}</p>
          </div>
          <div className={styles.metricBox}>
            <h3>Total Revenue</h3>
            <p>{revenueData ? `$${revenueData.reduce((acc, revenue) => acc + parseFloat(revenue.amount), 0)}` : 'Loading...'}</p>
          </div>
        </div>
      </section>

      {/* User Details Section */}
      <section className={styles.userDetailsSection}>
        <h2 className={styles.sectionTitle}>User Details</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        />
        <button onClick={fetchUserDetails}>Fetch User Details</button>
        {userDetails ? (
          <div>
            <p>User ID: {userDetails.id}</p>
            <p>Username: {userDetails.username}</p>
          </div>
        ) : (
          <p>Enter a User ID and click "Fetch User Details" to see user information.</p>
        )}
      </section>

      {/* Revenue Breakdown Section */}
      <section className={styles.revenueBreakdownSection}>
        <h2 className={styles.sectionTitle}>Revenue Breakdown</h2>
        {revenueBreakdown.length > 0 ? (
          <ul className={styles.revenueList}>
            {revenueBreakdown.map((revenue, index) => (
              <li key={index}>
                <p>Date: {revenue.date}</p>
                <p>Amount: ${revenue.amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading revenue breakdown...</p>
        )}
      </section>

      {/* System Alerts Section */}
      <section className={styles.systemAlertsSection}>
        <h2 className={styles.sectionTitle}>System Alerts</h2>
        <ul className={styles.alertList}>
          {systemAlerts.length > 0 ? (
            systemAlerts.map((alert, index) => (
              <li key={index}>
                <span className={styles.alertIcon}></span>
                {alert}
              </li>
            ))
          ) : (
            <li className={styles.alertItem}>Loading Alerts...</li>
          )}
        </ul>
      </section>

      {/* Add User Form */}
      <section className={styles.addUserSection}>
        <h2 className={styles.sectionTitle}>Add User</h2>
        <input
          type="text"
          placeholder="Username"
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAddUser(e.target.value);
          }}
        />
      </section>

      {/* Update/Delete Users */}
      <section className={styles.manageUsersSection}>
        <h2 className={styles.sectionTitle}>Manage Users</h2>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id}>
              <input
                type="text"
                defaultValue={user.username}
                onChange={(e) => setSelectedUser({ ...user, username: e.target.value })}
              />
              <button onClick={() => handleUpdateUser(user.id, selectedUser.username)}>Update</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AnalyticsReport;
