import React from 'react';
import styles from '../../Styles/LearnMoreSection.module.css';

const learnMoreItems = [
  {
    title: 'Grow UP Start Library',
    description: 'Videos, podcasts, and essays for startup founders',
    image: '/Images/Thumbnail1.jpg',
  },
  {
    title: 'Newsletter',
    description: 'Keep up with the latest news, launches, jobs, and events from the Grow UP Start community',
    image: '/Images/Thumbnail2.jpg',
  },
  {
    title: 'Launch YC',
    description: 'Discover new Grow UP Start companies and products',
    image: '/Images/Thumbnail3.jpg',
  },
  {
    title: 'Work at a Startup',
    description: 'Find your next role at a Grow UP Start startup',
    image: '/Images/Thumbnail4.jpg',
  },
  {
    title: 'Blog',
    description: 'Essays, events, and announcements from YC',
    image: '/Images/Thumbnail5.jpg',
  },
  {
    title: 'Co-Founder Matching',
    description: 'Meet a potential co-founder to start a startup with',
    image: '/Images/Thumbnail6.jpg',
  },
];

const LearnMoreSection = () => {
  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>Want to learn more?</h2>
      <div className={styles.itemsContainer}>
        {learnMoreItems.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMoreSection;
