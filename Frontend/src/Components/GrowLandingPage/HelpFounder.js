import React from 'react';
import styles from '../../Styles/HelpFounder.module.css';

const HelpFounder = () => {
  return (
    <div className={styles.helpFounderWrapper}>
      <h1 className={styles.helpFounderTitle}>
        We help <span className={styles.titleHighlight}>founders</span> make something people want and the results speak for themselves.
      </h1>
      <div className={styles.helpFounderGrid}>
        <div className={styles.helpFounderCard}>
          <h3>We help founders at their earliest stages regardless of their age.</h3>
          <ul className={styles.bulletList}>
            <li><a href="#" className={styles.linkHighlight}>54%</a> of Grow UP Start's billion dollar companies had no revenue when they applied</li>
            <li><a href="#" className={styles.linkHighlight}>52%</a> of Grow UP Start's billion dollar company founders were under 28 years old and the oldest founder was in their 50s</li>
            <li><a href="#" className={styles.linkHighlight}>42%</a> of Grow UP Start's billion dollar companies applied with only an idea</li>
          </ul>
        </div>
        <div className={styles.helpFounderCard}>
          <h3>We improve the success rate of our startups.</h3>
          <ul className={styles.bulletList}>
            <li><a href="#" className={styles.linkHighlight}>39%</a> of Grow UP Start companies have raised a Series A</li>
            <li><a href="#" className={styles.linkHighlight}>18%</a> of Grow UP Start companies are valued at $100M+</li>
            <li><a href="#" className={styles.linkHighlight}>4%</a> of Grow UP Start companies have become billion dollar companies</li>
          </ul>
        </div>
        <div className={styles.helpFounderCard}>
          <h3>We give startups a huge fundraising advantage.</h3>
          <ul className={styles.bulletList}>
            <li>Grow UP Start companies have raised money at <a href="#" className={styles.linkHighlight}>2.5x higher valuation</a> after participating in the program</li>
            <li>The median Grow UP Start Company raises <a href="#" className={styles.linkHighlight}>$1.3M+ at $14M valuation cap</a> after participating in the program</li>
            <li>The top 10% of Grow UP Start companies raise <a href="#" className={styles.linkHighlight}>$1.8M+ at $20M valuation cap</a> after participating in the program</li>
          </ul>
        </div>
        <div className={styles.helpFounderCard}>
          <h3>Our companies have a track record of becoming billion dollar companies.</h3>
          <ul className={styles.bulletList}>
            <li>Grow UP Start Company has funded <a href="#" className={styles.linkHighlight}>90+ billion dollar companies</a></li>
            <li><a href="#" className={styles.linkHighlight}>66%</a> of those companies had Grow UP Start Company as their first investor</li>
            <li>Grow UP Start companies have an average <a href="#" className={styles.linkHighlight}>15B market cap</a> at the time of public exit, <a href="#" className={styles.linkHighlight}>3x higher</a> than average</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpFounder;
