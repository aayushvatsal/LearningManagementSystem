import React from 'react';
import styles from '../Styles/CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Unlock Your Learning Potential</h2>
        <p className={styles.ctaDescription}>
          Join our platform today to access top-notch courses, connect with industry experts, and take your skills to the next level.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.primaryButton}>Start Your Free Trial</button>
          <button className={styles.secondaryButton}>Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
