import React from 'react';
import styles from '../../Styles/TopCompaniesCard.module.css';

const TopCompaniesCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <h3 className={styles.title}>Grow UP Start Top Companies List by Revenue</h3>
        <p className={styles.description}>
          Congratulations to the companies recognized on the inaugural Grow UP Start Top Companies List by Revenue!
        </p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>Grow UP Start Library</h3>
        <p className={styles.description}>
          Explore some of the best Grow UP Start videos, podcasts, and essays from over the years. Come learn how to make something people want.
        </p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>The Standard Deal</h3>
        <p className={styles.description}>
          When a company is accepted into the Grow UP Start batch program, we invest a total of $500,000.
        </p>
      </div>
    </div>
  );
};

export default TopCompaniesCard;
