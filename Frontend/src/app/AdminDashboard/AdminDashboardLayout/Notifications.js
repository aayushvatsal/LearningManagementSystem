import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../Styles/Notifications.module.css";

const Notifications = () => {
  const [notificationPreferences, setNotificationPreferences] = useState(null);
  const [notificationChannels, setNotificationChannels] = useState({
    email: false,
    sms: false,
    push: false,
  });
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2ODA4MDE5LCJpYXQiOjE3MjY3MjE2MTksImp0aSI6IjNiNjQ2OTcwY2U1OTRhODRiZmMyNzQzZDRmYmJkNGJhIiwidXNlcl9pZCI6N30.xts7VMxUxzZe8wSlGBBWpg8dVBMxnrOQSPU2ceARzss';

  // Fetch preferences and channels on component mount
  useEffect(() => {
    // Fetch Notification Preferences
    const fetchNotificationPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications/preferences/', {
          headers: { Authorization: token }
        });
        setNotificationPreferences(response.data);
      } catch (error) {
        console.error("Error fetching notification preferences", error);
      }
    };

    // Fetch Notification Channels
    const fetchNotificationChannels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications/channels/1/', {
          headers: { Authorization: token }
        });
        setNotificationChannels(response.data);
      } catch (error) {
        console.error("Error fetching notification channels", error);
      }
    };

    fetchNotificationPreferences();
    fetchNotificationChannels();
  }, [token]);

  // Handle updating notification channels
  const handleChannelChange = async (channel, value) => {
    const updatedChannels = { ...notificationChannels, [channel]: value };
    setNotificationChannels(updatedChannels);
    
    try {
      await axios.put('http://localhost:8000/api/notifications/channels/1/', updatedChannels, {
        headers: { Authorization: token },
      });
      alert("Channels updated successfully!");
    } catch (error) {
      console.error("Error updating notification channels", error);
    }
  };

  // Handle changing notification preferences
  const handlePreferenceChange = async (preference) => {
    try {
      await axios.put('http://localhost:8000/api/notifications/preferences/', { default_preference: preference }, {
        headers: { Authorization: token }
      });
      alert("Notification preferences updated!");
    } catch (error) {
      console.error("Error updating preferences", error);
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      {/* Notification Channels */}
      <section className={styles.notificationChannels}>
        <h2 className={styles.sectionTitle}>Notification Channels</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Email Notifications</label>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            checked={notificationChannels.email} 
            onChange={(e) => handleChannelChange('email', e.target.checked)} 
          />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable SMS Notifications</label>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            checked={notificationChannels.sms} 
            onChange={(e) => handleChannelChange('sms', e.target.checked)} 
          />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Push Notifications</label>
          <input 
            type="checkbox" 
            className={styles.checkbox} 
            checked={notificationChannels.push} 
            onChange={(e) => handleChannelChange('push', e.target.checked)} 
          />
        </div>
      </section>

      {/* User Notification Preferences */}
      <section className={styles.userPreferences}>
        <h2 className={styles.sectionTitle}>User Notification Preferences</h2>
        {notificationPreferences && (
          <div className={styles.settingItem}>
            <label className={styles.label}>Default Notification Preferences</label>
            <select
              className={styles.select}
              value={notificationPreferences[0].default_preference}
              onChange={(e) => handlePreferenceChange(e.target.value)}
            >
              <option value="Email Only">Email Only</option>
              <option value="SMS Only">SMS Only</option>
              <option value="Push Only">Push Only</option>
              <option value="All Channels">All Channels</option>
            </select>
          </div>
        )}
      </section>

      {/* System Alerts Section */}
      <section className={styles.systemAlerts}>
        <h2 className={styles.sectionTitle}>System Alerts</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Send Critical Alerts to All Users</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Downtime Notifications</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>

      {/* Notification Templates */}
      <section className={styles.notificationTemplates}>
        <h2 className={styles.sectionTitle}>Notification Templates</h2>
        <div className={styles.templateItem}>
          <label className={styles.label}>Welcome Email Template</label>
          <button className={styles.editButton}>Edit Template</button>
        </div>
        <div className={styles.templateItem}>
          <label className={styles.label}>Password Reset Template</label>
          <button className={styles.editButton}>Edit Template</button>
        </div>
      </section>

      {/* Scheduled Notifications */}
      <section className={styles.scheduledNotifications}>
        <h2 className={styles.sectionTitle}>Scheduled Notifications</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>View Scheduled Notifications</label>
          <button className={styles.viewButton}>View</button>
        </div>
      </section>

      {/* Bulk Notifications */}
      <section className={styles.bulkNotifications}>
        <h2 className={styles.sectionTitle}>Bulk Notifications</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Send Bulk Notification</label>
          <button className={styles.bulkButton}>Send Now</button>
        </div>
      </section>

      {/* Notification Logs */}
      <section className={styles.notificationLogs}>
        <h2 className={styles.sectionTitle}>Notification Logs</h2>
        <div className={styles.logItem}>
          <label className={styles.label}>View Notification Logs</label>
          <button className={styles.viewButton}>View Logs</button>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
