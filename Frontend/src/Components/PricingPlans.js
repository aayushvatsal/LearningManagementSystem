// components/PricingPlans.js
import styles from '../Styles/PricingPlans.module.css';

const pricingPlans = [
    {
      title: 'Basic Plan',
      price: '$19/month',
      features: ['1 Course', '10GB Storage', 'Email Support'],
      buttonText: 'Get Started',
    },
    {
      title: 'Pro Plan',
      price: '$49/month',
      features: ['5 Courses', '50GB Storage', 'Priority Support'],
      buttonText: 'Choose Plan',
    },
    {
      title: 'Enterprise Plan',
      price: '$99/month',
      features: ['Unlimited Courses', '100GB Storage', '24/7 Support'],
      buttonText: 'Contact Us',
    },
  ];
  
  const PricingPlans = () => {
    return (
      <section className={styles.pricingSection}>
        <div className={styles.wrapper}>
          <h2 className={styles.heading}>Our Pricing Plans</h2>
          <div className={styles.cardContainer}>
            {pricingPlans.map((plan, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  <p className={styles.planPrice}>{plan.price}</p>
                </div>
                <ul className={styles.featureList}>
                  {plan.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <svg className={styles.iconCheck} viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={styles.actionButton}>{plan.buttonText}</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PricingPlans;
