"use client"; 

import React, { useState } from 'react';
import styles from '../Styles/FAQSection.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is this LMS about?",
      answer: "This LMS is designed to help educators and students manage, deliver, and track learning activities efficiently."
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button at the top right of the page, and fill in the required details to create your account."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, the LMS is fully responsive and can be accessed on mobile devices. A dedicated mobile app is also available for download."
    },
    {
      question: "Can I track my progress?",
      answer: "Absolutely! The LMS provides detailed progress tracking features to help you monitor your learning journey."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqQuestion}>
                {faq.question}
                <span className={styles.faqToggleIcon}>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
