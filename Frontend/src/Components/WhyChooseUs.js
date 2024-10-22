// components/WhyChooseUs.js
import styles from '../Styles/WhyChooseUs.module.css';

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection}>
      <div className={styles.whyChooseUsContainer}>
        <h2 className={styles.whyChooseUsTitle}>Why Choose Our LMS?</h2>
        <div className={styles.whyChooseUsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>📚</div>
            <div className={styles.benefitCardContent}>
              <h3 className={styles.benefitTitle}>Comprehensive Content</h3>
              <p className={styles.benefitDescription}>
                Our LMS offers a wide range of courses, from fundamental topics to advanced specializations, ensuring you have everything you need in one place.
              </p>
            </div>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🛠️</div>
            <div className={styles.benefitCardContent}>
              <h3 className={styles.benefitTitle}>Easy Integration</h3>
              <p className={styles.benefitDescription}>
                Seamlessly integrate with various tools and platforms, making it easy to incorporate into your existing workflow.
              </p>
            </div>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>📈</div>
            <div className={styles.benefitCardContent}>
              <h3 className={styles.benefitTitle}>Advanced Analytics</h3>
              <p className={styles.benefitDescription}>
                Gain insights into learner progress and performance with our advanced analytics and reporting tools.
              </p>
            </div>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🔒</div>
            <div className={styles.benefitCardContent}>
              <h3 className={styles.benefitTitle}>Robust Security</h3>
              <p className={styles.benefitDescription}>
                Our platform prioritizes security with data encryption and compliance with industry standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
