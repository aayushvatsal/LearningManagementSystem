import React from 'react';
import styles from '../Styles/Instructors.module.css';

const instructors = [
  {
    name: 'Ravi Kumar',
    title: 'Data Science Expert',
    image: '/Images/instructor1.webp',
    bio: 'An experienced data scientist with a passion for teaching complex concepts in a simplified manner.',
  },
  {
    name: 'Priya Singh',
    title: 'Full-Stack Developer',
    image: '/Images/instructor2.webp',
    bio: 'A full-stack developer specializing in modern web technologies with a knack for hands-on learning.',
  },
  {
    name: 'Amit Sharma',
    title: 'AI Specialist',
    image: '/Images/instructor3.webp',
    bio: 'AI specialist with years of experience in building intelligent systems and teaching cutting-edge technologies.',
  },
];

const Instructors = () => {
  return (
    <section className={styles.instructorsSection}>
      <h2 className={styles.heading}>Meet Our Top Instructors</h2>
      <div className={styles.instructorsContainer}>
        {instructors.map((instructor, index) => (
          <div key={index} className={styles.instructorCard}>
            <img src={instructor.image} alt={instructor.name} className={styles.instructorImage} />
            <div className={styles.instructorContent}>
              <h3 className={styles.instructorName}>{instructor.name}</h3>
              <p className={styles.instructorTitle}>{instructor.title}</p>
              <p className={styles.instructorBio}>{instructor.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;