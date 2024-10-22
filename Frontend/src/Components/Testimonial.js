// components/Testimonials.jsx

import React from 'react';
import Image from 'next/image';
import styles from '../Styles/Testimonial.module.css';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Student',
    feedback: 'The LMS has transformed the way I learn. The courses are engaging and interactive.',
    imageUrl: '/Images/john_doe.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Instructor',
    feedback: 'As an instructor, I find the LMS platform incredibly intuitive and easy to use.',
    imageUrl: '/Images/jane_smith.jpg',
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Student',
    feedback: 'A fantastic platform with excellent resources and support for students.',
    imageUrl: '/Images/michael_brown.jpg',
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'Instructor',
    feedback: 'The LMS has made managing courses and interacting with students seamless and efficient.',
    imageUrl: '/Images/emily_johnson.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonialsWrapper}>
      <div className={styles.testimonialsContainer}>
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.profileImageWrapper}>
                <Image
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className={styles.profileImage}
                />
              </div>
              <h3 className={styles.testimonialName}>{testimonial.name}</h3>
              <p className={styles.testimonialRole}>{testimonial.role}</p>
              <p className={styles.testimonialFeedback}>&ldquo;{testimonial.feedback}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
