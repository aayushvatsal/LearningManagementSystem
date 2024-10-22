'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../Styles/FounderIntrest.module.css'; // Import the CSS module

const FounderIntrest = () => {
  const [founderInterests, setFounderInterests] = useState({
    leftColumn: [],
    rightColumn: [],
    images: [],
  });

  useEffect(() => {
    // Simulating dynamic data fetching
    const fetchData = () => {
      const data = {
        leftColumn: [
          "We don't take a board seat.",
          "We don't take weeks/months to decide to invest.",
          "We don't require decks, business plans, or MBAs.",
        ],
        rightColumn: [
          "We don't demand 20% of your company.",
          "We don't charge fees.",
          "We don't tell you what to do. We only offer advice.",
        ],
        images: [
          "/Images/Investor network.jpg",
          "/Images/Investor network.jpg",
          "/Images/Investor network.jpg",
        ],
      };
      setFounderInterests(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.interestContainer}>
      <h2 className={styles.interestHeading}>
        We put <span className={styles.highlight}>founders' interests</span> first.
      </h2>
      <div className={styles.interestPoints}>
        <ul className={styles.pointsColumn}>
          {founderInterests.leftColumn.map((point, index) => (
            <li key={index} className={styles.pointItem}>
              <span className={styles.diamond}>♦</span> {point}
            </li>
          ))}
        </ul>
        <ul className={styles.pointsColumn}>
          {founderInterests.rightColumn.map((point, index) => (
            <li key={index} className={styles.pointItem}>
              <span className={styles.diamond}>♦</span> {point}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.imageGrid}>
        {founderInterests.images.map((image, index) => (
          <div className={styles.imageCard} key={index}>
            {/* Directly using the image path */}
            <img src={image} alt={`founders-${index}`} className={styles.cardImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FounderIntrest;
