import React from 'react';
import styles from '../Styles/HowitWorks.module.css'; 

const HowItWorks = () => {
  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>How It Works</h2>
        <div className={styles.stepContainer}>
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>1</div>
            <div className={styles.stepDescription}>
              <h3 className={styles.stepTitle}>Sign Up</h3>
              <p className={styles.stepText}>Create an account on our platform to start exploring various courses.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>2</div>
            <div className={styles.stepDescription}>
              <h3 className={styles.stepTitle}>Browse Courses</h3>
              <p className={styles.stepText}>Search for courses based on your interests and choose the ones you want to enroll in.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>3</div>
            <div className={styles.stepDescription}>
              <h3 className={styles.stepTitle}>Enroll and Learn</h3>
              <p className={styles.stepText}>Enroll in your chosen courses and start learning at your own pace.</p>
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>4</div>
            <div className={styles.stepDescription}>
              <h3 className={styles.stepTitle}>Complete and Certify</h3>
              <p className={styles.stepText}>Complete the courses and earn certificates to showcase your achievements.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
