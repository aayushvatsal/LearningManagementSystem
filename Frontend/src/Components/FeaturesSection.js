import styles from '../Styles/FeaturesSection.module.css';
import Image from 'next/image'; 

const features = [
  {
    icon: '/Images/OnlineLearning.jpg',
    title: 'Online Learning',
    description: 'Access courses anytime, anywhere with our fully responsive platform.',
  },
  {
    icon: '/Images/Certification.png',
    title: 'Certification',
    description: 'Earn certifications to showcase your skills and enhance your career.',
  },
  {
    icon: '/Images/Community.jpg',
    title: 'Community Support',
    description: 'Join a vibrant community of learners and educators to exchange knowledge.',
  },
  {
    icon: '/Images/Progress.webp',
    title: 'Progress Tracking',
    description: 'Track your learning progress with detailed analytics and reports.',
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.heading}>Our Features</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <Image 
              src={feature.icon} 
              alt={feature.title} 
              className={styles.icon} 
              width={100} 
              height={100} 
              layout="intrinsic" 
            />
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
