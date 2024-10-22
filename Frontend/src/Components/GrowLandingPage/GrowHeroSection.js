import React from 'react';
import styles from '../../Styles/GrowHeroSection.module.css';

const GrowHeroSection = () => {
  return (
    <section className={styles.growHeroSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.textSection}>
          <h1 className={styles.heading}>
            Why <span className={styles.highlight}>Grow UP Start?</span>
          </h1>
          <p className={styles.description}>
            We give startups a disproportionate advantage.
          </p>
          <button className={styles.applyButton}>Apply to Grow UP Start</button>
        </div>
        <div className={styles.imageSection}>
          <img
            className={styles.heroImage}
            src="/Images/GrowHeroSection.png" 
            alt="Grow Up Start Event"
          />
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h2 className={styles.statValue}>5,000</h2>
              <p className={styles.statLabel}>funded startups</p>
            </div>
            <div className={styles.statBox}>
              <h2 className={styles.statValue}>$600B</h2>
              <p className={styles.statLabel}>combined valuation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowHeroSection;
