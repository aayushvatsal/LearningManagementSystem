import React from "react";
import styles from "../../Styles/TopCompanies.module.css";

const companies = [
  { name: "Stripe", logo: "/Images/Stripe.png" },
  { name: "Airbnb", logo: "/Images/Stripe.png" },
  { name: "Instacart", logo: "/Images/Stripe.png" },
  { name: "Doordash", logo: "/Images/Stripe.png" },
  { name: "Cruise", logo: "/Images/Stripe.png" },
  { name: "Coinbase", logo: "/Images/Stripe.png" },
  { name: "Pagerduty", logo: "/Images/Stripe.png" },
  { name: "Faire", logo: "/Images/Stripe.png" },
  { name: "Brex", logo: "/Images/Stripe.png" },
  { name: "Deel", logo: "/Images/Stripe.png" },
  { name: "Rippling", logo: "/Images/Stripe.png" },
  { name: "Reddit", logo: "/Images/Stripe.png" },
  { name: "Gusto", logo: "/Images/Stripe.png" },
  { name: "Flexport", logo: "/Images/Stripe.png" },
  { name: "Dropbox", logo: "/Images/Stripe.png" },
  { name: "Razorpay", logo: "/Images/Stripe.png" },
  { name: "Scale", logo: "/Images/Stripe.png" },
  { name: "GitLab", logo: "/Images/Stripe.png" },
  { name: "Benchling", logo: "/Images/Stripe.png" },
  { name: "Fivetran", logo: "/Images/Stripe.png" },
  { name: "Rappi", logo: "/Images/Stripe.png" },
  { name: "Checkr", logo: "/Images/Stripe.png" },
  { name: "Zapier", logo: "/Images/Stripe.png" },
  { name: "Whatnot", logo: "/Images/Stripe.png" },
  { name: "Podium", logo: "/Images/Stripe.png" },
  { name: "Webflow", logo: "/Images/Stripe.png" },
  { name: "Zepto", logo: "/Images/Stripe.png" },
  { name: "Groww", logo: "/Images/Stripe.png" },
  { name: "Segment", logo: "/Images/Stripe.png" },
  { name: "Ironclad", logo: "/Images/Stripe.png" },
];

const TopCompanies = () => {
  return (
    <div className={styles.CompanyContainer}>
      <h2 className={styles.Title}>Top Grow UP Start Companies</h2>
      <div className={styles.CompanyGrid}>
        {companies.map((company, index) => (
          <div key={index} className={styles.CompanyCard}>
            <img
              src={company.logo}
              alt={company.name}
              className={styles.CompanyLogo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;

