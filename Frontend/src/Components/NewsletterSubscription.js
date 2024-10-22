// components/NewsletterSubscription.js
'use client';

import { useState } from 'react';
import styles from '../Styles/NewsletterSubscription.module.css'

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the email to a backend API
    console.log('Email submitted:', email);
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>Subscribe to Our Newsletter</h2>
        <p className={styles.newsletterDescription}>
          Stay updated with the latest news and special offers!
        </p>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.newsletterInput}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
