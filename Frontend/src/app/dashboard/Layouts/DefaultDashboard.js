import React from 'react';
import Head from 'next/head';
import { 
  FaBell, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaBook, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaClipboard, 
  FaUsers, 
  FaCheckCircle, 
  FaExclamationCircle 
} from 'react-icons/fa';
import styles from '../../../Styles/DefaultDashboard.module.css'; 

const DefaultDashboard = () => {
  return (
    <>
      {/* <Head>
        <title>Dashboard</title>
        <meta name="description" content="LMS Dashboard" />
      </Head> */}
      <div className={styles.DashboardContainer}>
        <div className={styles.ContentWrapper}>
          {/* <div className={styles.HeaderSection}>
            <h1 className={styles.HeaderTitle}>Dashboard</h1>
            <input type="text" placeholder="Search" className={styles.SearchInput} />
            <div className={styles.IconGroup}>
              <FaBell className={styles.NotificationIcon} />
              <FaEnvelope className={styles.MessageIcon} />
            </div>
          </div> */}
          <h1 className={styles.MainHeading}>Welcome to the LMS Dashboard</h1>
          <div className={styles.OverviewSection}>
            <div className={styles.OverviewCard}>
              <FaCalendarAlt className={styles.CardIcon} />
              <h2 className={styles.CardTitle}>Upcoming Classes</h2>
              <p>You have 3 classes today</p>
            </div>
            <div className={styles.OverviewCard}>
              <FaClipboard className={styles.CardIcon} />
              <h2 className={styles.CardTitle}>Assignments Due</h2>
              <p>2 assignments are due this week</p>
            </div>
            <div className={styles.OverviewCard}>
              <FaEnvelope className={styles.CardIcon} />
              <h2 className={styles.CardTitle}>Messages</h2>
              <p>You have 5 new messages</p>
            </div>
          </div>
          <div className={styles.WidgetsSection}>
            <div className={styles.WidgetCard}>
              <FaCalendarAlt className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Calendar</h3>
              <div className={styles.WidgetContent}>Calendar Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaBook className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Library</h3>
              <div className={styles.WidgetContent}>Library Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaChalkboardTeacher className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Classroom</h3>
              <div className={styles.WidgetContent}>Classroom Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaGraduationCap className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Courses</h3>
              <div className={styles.WidgetContent}>Courses Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaClipboard className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Assignment</h3>
              <div className={styles.WidgetContent}>Assignment Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaEnvelope className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Messages</h3>
              <div className={styles.WidgetContent}>Messages Widget Content</div>
            </div>
            <div className={styles.WidgetCard}>
              <FaUsers className={styles.WidgetIcon} />
              <h3 className={styles.WidgetTitle}>Attendance</h3>
              <div className={styles.WidgetContent}>Attendance Widget Content</div>
            </div>
          </div>
          <div className={styles.RecentActivitiesSection}>
            <h2 className={styles.RecentActivitiesTitle}>Recent Activities</h2>
            <ul className={styles.ActivitiesList}>
              <li className={styles.ActivityItem}>
                <FaCheckCircle className={styles.ActivityIcon} />
                Completed Assignment 1
              </li>
              <li className={styles.ActivityItem}>
                <FaExclamationCircle className={styles.ActivityIcon} />
                Upcoming Exam on Monday
              </li>
            </ul>
          </div>
          <div className={styles.NotificationsSection}>
            <h2 className={styles.NotificationsTitle}>Notifications</h2>
            <ul className={styles.NotificationsList}>
              <li className={styles.NotificationItem}>
                <FaCheckCircle className={styles.NotificationIcon} />
                Class scheduled at 10 AM
              </li>
              <li className={styles.NotificationItem}>
                <FaExclamationCircle className={styles.NotificationIcon} />
                Deadline for project submission
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDashboard;
