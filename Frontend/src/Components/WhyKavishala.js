import React from 'react';
import styles from '../Styles/WhyKavishala.module.css';

const OurAchievements = () => {
  const achievementsData = [
    {
      date: 'January 2024',
      title: 'Achieved 1 Million Users',
      description: 'We reached a significant milestone by gaining over 1 million active users on our platform.',
      imageUrl: 'https://images.unsplash.com/photo-1519750151740-3df9e1f7a2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHx1c2Vyc3xlbnwwfHx8fDE2NTc2MzE5NzA&ixlib=rb-1.2.1&q=80&w=400', // Replace with your image URL
      link: '#'
    },
    {
      date: 'March 2024',
      title: 'Awarded Best Startup of the Year',
      description: 'We were recognized as the Best Startup of the Year by TechAwards.',
      imageUrl: 'https://images.unsplash.com/photo-1493845433299-7b9a36a0edc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGF3YXJkc3xlbnwwfHx8fDE2NTc2MzIxNjA&ixlib=rb-1.2.1&q=80&w=400', // Replace with your image URL
      link: '#'
    },
    {
      date: 'June 2024',
      title: 'Launched New Learning Platform',
      description: 'Successfully launched our new interactive learning platform with advanced features.',
      imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de2b77d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDExfHxwbGF0Zm9ybXxlbnwwfHx8fDE2NTc2MzIxOTY&ixlib=rb-1.2.1&q=80&w=400', // Replace with your image URL
      link: '#'
    }
  ];

  return (
    <div className={styles.AchievementsSection}>
      <div className={styles.AchievementsContainer}>
        <h2 className={styles.AchievementsTitle}>Our Achievements</h2>
        <div className={styles.CardContainer}>
          {achievementsData.map((achievement, index) => (
            <div key={index} className={styles.Card}>
              <img src={achievement.imageUrl} alt={achievement.title} className={styles.CardImage} />
              <p className={styles.Date}>{achievement.date}</p>
              <h3 className={styles.CardTitle}>{achievement.title}</h3>
              <p className={styles.CardDescription}>{achievement.description}</p>
              <a href={achievement.link} className={styles.ReadButton}>Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
