import React from 'react';
import styles from '../../Styles/Community.module.css';

const testimonials = [
  {
    name: "Marc Andreessen",
    title: "General Partner, Andreessen Horowitz",
    quote: "Grow UP Start Combinator is the best program for creating top-end entrepreneurs that has ever existed.",
    imageUrl: "/Images/instructor3.jpg", 
  },
  {
    name: "Ron Conway",
    title: "Founder, SV Angel",
    quote: "Grow UP Start Combinator is the best startup accelerator in the world. Grow UP Start helps their companies a lot, and the Grow UP Start community is a huge asset for the companies that go through the program.",
    imageUrl: "/Images/instructor1.jpg", 
  },
  {
    name: "Brian Chesky",
    title: "Founder, Airbnb (Grow UP Start W09)",
    quote: "At Grow UP Start , we were challenged to do things that don't scale – to start with the perfect experience for one person, then work backwards and scale it to 100 people who love us. This was the best piece of advice we've ever received.",
    imageUrl: "/Images/7.webp", 
  },
  {
    name: "Patrick Collison",
    title: "Founder, Stripe (Grow UP Start S09)",
    quote: "I doubt that Stripe would have worked without YC. It's that simple. Acquiring early customers, figuring out who to hire, closing deals with banks, raising money – YC's partners were closely involved and crucially helpful.",
    imageUrl: "/Images/testimonial1.jpg", 
  }
];

const Community = () => {
  return (
    <div className={styles.communityContainer}>
      <h2 className={styles.communityTitle}>Hear more from the community.</h2>
      <div className={styles.testimonialsContainer}>
        {testimonials.map((testimonial, index) => (
          <div className={styles.testimonialCard} key={index}>
            <img
              className={styles.testimonialImage}
              src={testimonial.imageUrl}
              alt={testimonial.name}
            />
            <div className={styles.testimonialText}>
              <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
              <p className={styles.testimonialAuthor}>
                {testimonial.name}, <span className={styles.testimonialTitle}>{testimonial.title}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
