import React from 'react';
import styles from '../../Styles/LatestGrow.module.css';

const LatestContent = () => {
  const videos = [
    {
      image: '/Images/Thumbnail1.jpg', // Replace with actual image link
      title: 'How To Find A Co-Founder',
      daysAgo: '2 days ago',
    },
    {
      image: '/Images/Thumbnail2.jpg', // Replace with actual image link
      title: 'What Founder Mode Really Means',
      daysAgo: '2 days ago',
    },
    {
      image: '/Images/Thumbnail3.jpg', // Replace with actual image link
      title: 'Building The World\'s Best Image Diffusion Model',
      daysAgo: '2 days ago',
    }
  ];

  return (
    <div className={styles.latestContentContainer}>
      <h2 className={styles.latestTitle}>The Latest from Grow UP Start </h2>
      <div className={styles.videoCards}>
        {videos.map((video, index) => (
          <div className={styles.videoCard} key={index}>
            <img src={video.image} alt={video.title} className={styles.videoImage} />
            <h3 className={styles.videoTitle}>{video.title}</h3>
            <p className={styles.videoTime}>{video.daysAgo}</p>
          </div>
        ))}
      </div>
      <div className={styles.contentLinks}>
        <div className={styles.contentLink}>
          <h4>Startup School</h4>
          <p>Grow UP Start's Group Partners teach you to build the foundation of a billion dollar company</p>
        </div>
        <div className={styles.contentLink}>
          <h4>Essays by Paul Graham</h4>
          <p>A collection of essays by Y Combinator co-founder Paul Graham</p>
        </div>
        <div className={styles.contentLink}>
          <h4>Explore more content</h4>
          <p>Visit the Grow UP Start Library, the hub for Grow UP Start's startup videos, essays, podcasts, and more</p>
        </div>
      </div>
    </div>
  );
};

export default LatestContent;
