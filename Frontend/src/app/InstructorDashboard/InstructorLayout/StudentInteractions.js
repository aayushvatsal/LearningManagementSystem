// components/StudentInteraction.js
import React from 'react';
import styles from '../../../Styles/StudentInteraction.module.css';

const StudentInteraction = () => {
  return (
    <div className={styles.interactionContainer}>
      <h1 className={styles.pageTitle}>Student Interaction Dashboard</h1>

      <section className={styles.messagesSection}>
        <h2 className={styles.sectionTitle}>Recent Messages</h2>
        <div className={styles.messageList}>
          <div className={styles.messageItem}>
            <h3>John Doe</h3>
            <p>Can you provide feedback on my last assignment?</p>
            <span className={styles.timestamp}>10 mins ago</span>
            <button className={styles.replyButton}>Reply</button>
          </div>
          <div className={styles.messageItem}>
            <h3>Jane Smith</h3>
            <p>When is the next class scheduled?</p>
            <span className={styles.timestamp}>1 hour ago</span>
            <button className={styles.replyButton}>Reply</button>
          </div>
          {/* Add more message items as needed */}
        </div>
      </section>

      <section className={styles.forumSection}>
        <h2 className={styles.sectionTitle}>Forum Discussions</h2>
        <div className={styles.discussionList}>
          <div className={styles.discussionItem}>
            <h3>How to improve coding skills?</h3>
            <p>Started by Alice Brown</p>
            <button className={styles.viewButton}>View Discussion</button>
          </div>
          <div className={styles.discussionItem}>
            <h3>Best practices for project management</h3>
            <p>Started by Bob Johnson</p>
            <button className={styles.viewButton}>View Discussion</button>
          </div>
          {/* Add more discussion items as needed */}
        </div>
      </section>

      <section className={styles.assignmentsSection}>
        <h2 className={styles.sectionTitle}>Pending Assignments</h2>
        <div className={styles.assignmentList}>
          <div className={styles.assignmentItem}>
            <h3>React Project</h3>
            <p>Due Date: Sept 30, 2024</p>
            <button className={styles.reviewButton}>Review</button>
          </div>
          <div className={styles.assignmentItem}>
            <h3>JavaScript Basics</h3>
            <p>Due Date: Oct 5, 2024</p>
            <button className={styles.reviewButton}>Review</button>
          </div>
          {/* Add more assignment items as needed */}
        </div>
      </section>

      <section className={styles.quizSection}>
        <h2 className={styles.sectionTitle}>Quizzes</h2>
        <div className={styles.quizList}>
          <div className={styles.quizItem}>
            <h3>JavaScript Fundamentals Quiz</h3>
            <p>Status: Not Started</p>
            <button className={styles.takeQuizButton}>Take Quiz</button>
          </div>
          <div className={styles.quizItem}>
            <h3>React Advanced Quiz</h3>
            <p>Status: Completed</p>
            <button className={styles.reviewResultsButton}>Review Results</button>
          </div>
          {/* Add more quiz items as needed */}
        </div>
      </section>

      <section className={styles.notificationsSection}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        <div className={styles.notificationList}>
          <div className={styles.notificationItem}>
            <h3>New Module Available</h3>
            <p>Module 4: Advanced Topics in React</p>
            <span className={styles.timestamp}>2 hours ago</span>
          </div>
          <div className={styles.notificationItem}>
            <h3>Class Schedule Updated</h3>
            <p>The next class will be held on Oct 10, 2024</p>
            <span className={styles.timestamp}>3 hours ago</span>
          </div>
          {/* Add more notification items as needed */}
        </div>
      </section>
    </div>
  );
};

export default StudentInteraction;
