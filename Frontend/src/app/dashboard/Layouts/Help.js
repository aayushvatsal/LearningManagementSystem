import React, { useState } from 'react';
import styles from '../../../Styles/Help.module.css'; 
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions provided in the email you receive to create a new password."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach out to our support team via the 'Contact Us' section. Alternatively, you can email us at support@example.com or call us at 123-456-7890."
  },
  {
    question: "Where can I find course materials?",
    answer: "Course materials can be found under the 'Courses' section in your dashboard. Click on the relevant course to access lectures, notes, and other resources."
  },
  {
    question: "What should I do if I encounter a technical issue?",
    answer: "If you encounter a technical issue, please visit our 'Help' section and check for troubleshooting guides. You can also contact our support team for further assistance."
  },
  {
    question: "How do I update my profile information?",
    answer: "To update your profile information, go to the 'Profile' section of your dashboard. Here, you can edit your personal details, change your profile picture, and update your contact information."
  }
];

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showFAQ, setShowFAQ] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const handleToggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleSection = (section) => {
    if (section === 'faq') {
      setShowFAQ(true);
      setShowContact(false);
    } else if (section === 'contact') {
      setShowFAQ(false);
      setShowContact(true);
    }
  };

  return (
    <div className={styles.helpContainer}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${showFAQ ? styles.activeTab : ''}`}
          onClick={() => toggleSection('faq')}
        >
          FAQ
        </button>
        <button
          className={`${styles.tab} ${showContact ? styles.activeTab : ''}`}
          onClick={() => toggleSection('contact')}
        >
          Contact Us
        </button>
      </div>

      {showFAQ && (
        <div className={styles.faqSection}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqHeader} onClick={() => handleToggleFAQ(index)}>
                <span className={styles.faqQuestion}>{faq.question}</span>
                {expandedIndex === index ? (
                  <FaMinus className={styles.toggleIcon} />
                ) : (
                  <FaPlus className={styles.toggleIcon} />
                )}
              </div>
              {expandedIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showContact && (
        <div className={styles.section}>
          <h2>Contact Us</h2>
          <form className={styles.contactForm}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit" className={styles.submitButton}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Help;
