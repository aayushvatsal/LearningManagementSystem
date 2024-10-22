import React from 'react';
import styles from '../../../Styles/InstructorMessage.module.css';

const InstructorMessage = () => {
  return (
    <div className={styles.messageContainer}>
      <h1 className={styles.pageTitle}>Instructor Messages</h1>

      <section className={styles.messageOverviewSection}>
        <h2 className={styles.sectionTitle}>Message Overview</h2>
        <div className={styles.messageStats}>
          <div className={styles.messageStatItem}>
            <h3>Total Messages</h3>
            <p>120</p>
          </div>
          <div className={styles.messageStatItem}>
            <h3>Unread Messages</h3>
            <p>45</p>
          </div>
          <div className={styles.messageStatItem}>
            <h3>Important Messages</h3>
            <p>10</p>
          </div>
        </div>
      </section>

      <section className={styles.messageListSection}>
        <h2 className={styles.sectionTitle}>Recent Messages</h2>
        <ul className={styles.messageList}>
          <li className={styles.messageItem}>
            <h3>John Doe</h3>
            <p>Subject: Project Update</p>
            <span className={styles.messageDate}>Sep 25, 2024</span>
          </li>
          <li className={styles.messageItem}>
            <h3>Jane Smith</h3>
            <p>Subject: Assignment Feedback</p>
            <span className={styles.messageDate}>Sep 24, 2024</span>
          </li>
          {/* Add more message items as needed */}
        </ul>
      </section>

      <section className={styles.messageActionsSection}>
        <h2 className={styles.sectionTitle}>Actions</h2>
        <div className={styles.actionButtons}>
          <button className={styles.composeButton}>Compose New Message</button>
          <button className={styles.archiveButton}>Archive Messages</button>
        </div>
      </section>
    </div>
  );
};

export default InstructorMessage;
