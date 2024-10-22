import React from "react";
import styles from "../../../Styles/SystemSetting.module.css";

const SystemSetting = () => {
  return (
    <div className={styles.settingsContainer}>
      {/* General Settings */}
      <section className={styles.generalSettings}>
        <h2 className={styles.sectionTitle}>General Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>App Name</label>
          <input type="text" placeholder="Enter App Name" className={styles.input} />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Language</label>
          <select className={styles.select}>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Time Zone</label>
          <select className={styles.select}>
            <option>GMT</option>
            <option>PST</option>
            <option>IST</option>
          </select>
        </div>
      </section>

      {/* User Management Settings */}
      <section className={styles.userManagementSettings}>
        <h2 className={styles.sectionTitle}>User Management Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Default User Role</label>
          <select className={styles.select}>
            <option>Admin</option>
            <option>Instructor</option>
            <option>Student</option>
          </select>
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable User Registration</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>

      {/* Course Settings */}
      <section className={styles.courseSettings}>
        <h2 className={styles.sectionTitle}>Course Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Maximum Course Limit</label>
          <input type="number" placeholder="Enter max course limit" className={styles.input} />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Course Reviews</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>

      {/* Notification Settings */}
      <section className={styles.notificationSettings}>
        <h2 className={styles.sectionTitle}>Notification Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Email Notifications</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>SMS Notifications</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>

      {/* Security Settings */}
      <section className={styles.securitySettings}>
        <h2 className={styles.sectionTitle}>Security Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Password Policy</label>
          <select className={styles.select}>
            <option>Strong</option>
            <option>Medium</option>
            <option>Weak</option>
          </select>
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Two-Factor Authentication</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>

      {/* Payment Settings */}
      <section className={styles.paymentSettings}>
        <h2 className={styles.sectionTitle}>Payment Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>Payment Gateway</label>
          <select className={styles.select}>
            <option>PayPal</option>
            <option>Stripe</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Currency</label>
          <select className={styles.select}>
            <option>USD</option>
            <option>EUR</option>
            <option>INR</option>
          </select>
        </div>
      </section>

      {/* Advanced Settings */}
      <section className={styles.advancedSettings}>
        <h2 className={styles.sectionTitle}>Advanced Settings</h2>
        <div className={styles.settingItem}>
          <label className={styles.label}>API Key</label>
          <input type="text" placeholder="Enter API Key" className={styles.input} />
        </div>
        <div className={styles.settingItem}>
          <label className={styles.label}>Enable Backups</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </section>
    </div>
  );
};

export default SystemSetting;
