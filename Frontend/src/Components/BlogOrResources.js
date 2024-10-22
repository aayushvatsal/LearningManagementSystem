
import React from 'react';
import styles from '../Styles/BlogOrResources.module.css';

const BlogOrResources = () => {
  const resources = [
    {
      title: 'Understanding Online Learning Platforms',
      description: 'An in-depth look at how online learning platforms work and their benefits.',
      link: '#',
    },
    {
      title: 'Effective Strategies for Online Education',
      description: 'Strategies and best practices for engaging online education.',
      link: '#',
    },
    {
      title: 'Top Tools for Online Learning',
      description: 'A guide to the most effective tools and resources for online learning.',
      link: '#',
    },
  ];

  return (
    <section className={styles.resourcesSection}>
      <div className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>Recent Blog Posts & Resources</h2>
        <div className={styles.cardGrid}>
          {resources.map((resource, index) => (
            <div key={index} className={styles.resourceCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardDescription}>{resource.description}</p>
                <a href={resource.link} className={styles.cardButton}>Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogOrResources;