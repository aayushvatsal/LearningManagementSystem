// components/CoursesOverview.js
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from '../Styles/Courses.module.css';

// Import course images
import card1 from '../../public/Images/Card1.jpg';
import card2 from '../../public/Images/Card2.png';
import card3 from '../../public/Images/Card3.jpg';
import card4 from '../../public/Images/Card4.jpg';
import card5 from '../../public/Images/Card5.jpg';
import card6 from '../../public/Images/Card6.jpg';
import card7 from '../../public/Images/Card7.jpg';
import card8 from '../../public/Images/Card8.png';
import card9 from '../../public/Images/Card9.jpg';
import card10 from '../../public/Images/Card10.jpg';
const courses = [
  {
    title: 'Mastering Full Stack Development',
    author: 'Rajesh Kumar',
    description: 'Learn to build robust and scalable full stack web applications using modern technologies like React, Node.js, and MongoDB.',
    rating: '4.9 (1,250)',
    price: 'FREE',
    imgSrc: card1,
  },
  {
    title: 'Advanced JavaScript Bootcamp',
    author: 'Neha Sharma',
    description: 'Deep dive into advanced JavaScript concepts, including closures, async programming, and ES6+ features to enhance your development skills.',
    rating: '4.8 (3,400)',
    price: '$59.00',
    imgSrc: card2,
  },
  {
    title: 'Data Science with Python',
    author: 'Amit Singh',
    description: 'Unlock the power of data analysis and visualization with Python. This course covers Pandas, NumPy, Matplotlib, and more.',
    rating: '4.7 (4,500)',
    price: '$49.00',
    imgSrc: card3,
  },
  {
    title: 'Web Development from Scratch',
    author: 'Priya Verma',
    description: 'Begin your journey into web development with HTML, CSS, and JavaScript. Learn how to create responsive websites from scratch.',
    rating: '5.0 (2,800)',
    price: 'FREE',
    imgSrc: card4,
  },
  {
    title: 'Machine Learning A-Z',
    author: 'Ravi Patel',
    description: 'Comprehensive guide to machine learning algorithms, from theory to practice, using Python and real-world datasets.',
    rating: '4.9 (6,200)',
    price: '$79.00',
    imgSrc: card5,
  },
  {
    title: 'Mobile App Development with Flutter',
    author: 'Sneha Jain',
    description: 'Build beautiful and high-performance mobile applications using Flutter. Learn Dart and create cross-platform apps with ease.',
    rating: '4.8 (3,750)',
    price: '$39.00',
    imgSrc: card6,
  },
  {
    title: 'Cybersecurity Fundamentals',
    author: 'Ankit Gupta',
    description: 'Protect yourself and your organization from cyber threats. This course covers the essentials of cybersecurity practices.',
    rating: '4.6 (2,900)',
    price: '$45.00',
    imgSrc: card7,
  },
  {
    title: 'Cloud Computing with AWS',
    author: 'Shweta Pandey',
    description: 'Get started with AWS and learn how to design, deploy, and manage scalable cloud solutions using Amazon Web Services.',
    rating: '4.7 (5,100)',
    price: '$99.00',
    imgSrc: card8,
  },
  {
    title: 'Digital Marketing Masterclass',
    author: 'Kunal Mehta',
    description: 'Learn the art and science of digital marketing, including SEO, SEM, content marketing, and social media strategies.',
    rating: '4.8 (4,350)',
    price: '$69.00',
    imgSrc: card9,
  },
  {
    title: 'AI & Deep Learning with TensorFlow',
    author: 'Pooja Desai',
    description: 'Dive into artificial intelligence and deep learning using TensorFlow. Master neural networks, CNNs, and more.',
    rating: '4.9 (7,800)',
    price: '$129.00',
    imgSrc: card10,
  }
];

const CoursesOverview = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Featured Courses</h2>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={course.imgSrc}
              alt={course.title}
              layout="responsive"
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.info}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.author}>by {course.author}</p>
              <p className={styles.description}>{course.description}</p>
              <div className={styles.details}>
                <span className={styles.price}>{course.price}</span>
                <span className={styles.rating}>{course.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CoursesOverview;








// "use client";

// import React, { useEffect, useState } from 'react';
// import styles from '../Styles/Courses.module.css';

// import card1 from '../../public/Images/Card1.jpg';
// import card2 from '../../public/Images/Card2.png';
// import card3 from '../../public/Images/Card3.jpg';
// import card4 from '../../public/Images/Card4.jpg';
// import card5 from '../../public/Images/Card5.jpg';
// import card6 from '../../public/Images/Card6.jpg';
// import card7 from '../../public/Images/Card7.jpg';
// import card8 from '../../public/Images/Card8.png';
// import card9 from '../../public/Images/Card9.jpg';
// import card10 from '../../public/Images/Card10.jpg';

// const cards = [
//     {
//       title: 'Mastering Full Stack Development',
//       author: 'Rajesh Kumar',
//       description: 'Learn to build robust and scalable full stack web applications using modern technologies like React, Node.js, and MongoDB.',
//       rating: '4.9 (1,250)',
//       price: 'FREE',
//       imgSrc: card1,
//     },
//     {
//       title: 'Advanced JavaScript Bootcamp',
//       author: 'Neha Sharma',
//       description: 'Deep dive into advanced JavaScript concepts, including closures, async programming, and ES6+ features to enhance your development skills.',
//       rating: '4.8 (3,400)',
//       price: '$59.00',
//       imgSrc: card2,
//     },
//     {
//       title: 'Data Science with Python',
//       author: 'Amit Singh',
//       description: 'Unlock the power of data analysis and visualization with Python. This course covers Pandas, NumPy, Matplotlib, and more.',
//       rating: '4.7 (4,500)',
//       price: '$49.00',
//       imgSrc: card3,
//     },
//     {
//       title: 'Web Development from Scratch',
//       author: 'Priya Verma',
//       description: 'Begin your journey into web development with HTML, CSS, and JavaScript. Learn how to create responsive websites from scratch.',
//       rating: '5.0 (2,800)',
//       price: 'FREE',
//       imgSrc: card4,
//     },
//     {
//       title: 'Machine Learning A-Z',
//       author: 'Ravi Patel',
//       description: 'Comprehensive guide to machine learning algorithms, from theory to practice, using Python and real-world datasets.',
//       rating: '4.9 (6,200)',
//       price: '$79.00',
//       imgSrc: card5,
//     },
//     {
//       title: 'Mobile App Development with Flutter',
//       author: 'Sneha Jain',
//       description: 'Build beautiful and high-performance mobile applications using Flutter. Learn Dart and create cross-platform apps with ease.',
//       rating: '4.8 (3,750)',
//       price: '$39.00',
//       imgSrc: card6,
//     },
//     {
//       title: 'Cybersecurity Fundamentals',
//       author: 'Ankit Gupta',
//       description: 'Protect yourself and your organization from cyber threats. This course covers the essentials of cybersecurity practices.',
//       rating: '4.6 (2,900)',
//       price: '$45.00',
//       imgSrc: card7,
//     },
//     {
//       title: 'Cloud Computing with AWS',
//       author: 'Shweta Pandey',
//       description: 'Get started with AWS and learn how to design, deploy, and manage scalable cloud solutions using Amazon Web Services.',
//       rating: '4.7 (5,100)',
//       price: '$99.00',
//       imgSrc: card8,
//     },
//     {
//       title: 'Digital Marketing Masterclass',
//       author: 'Kunal Mehta',
//       description: 'Learn the art and science of digital marketing, including SEO, SEM, content marketing, and social media strategies.',
//       rating: '4.8 (4,350)',
//       price: '$69.00',
//       imgSrc: card9,
//     },
//     {
//       title: 'AI & Deep Learning with TensorFlow',
//       author: 'Pooja Desai',
//       description: 'Dive into artificial intelligence and deep learning using TensorFlow. Master neural networks, CNNs, and more.',
//       rating: '4.9 (7,800)',
//       price: '$129.00',
//       imgSrc: card10,
//     }
//   ];
  

// export default function Carousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
//   };

//   const displayedCards = cards.slice(currentIndex, currentIndex + 3);

//   return (
    
//     <div className={styles.carouselWrapper}>
//         <h2 className={styles.heading}>Featured Courses</h2>
//         <p className={styles.subheading}>Enhance your skills with our top-rated courses</p>
//       <div className={styles.carousel}>
//         <div className={styles.controls}>
//           <button className={styles.prev} onClick={handlePrev}>‹</button>
//           <button className={styles.next} onClick={handleNext}>›</button>
//         </div>
//         <div className={styles.cardContainer}>
//           {displayedCards.map((card, index) => (
//             <div className={styles.card} key={index}>
//               <img src={card.imgSrc.src} alt={card.title} className={styles.cardImg} />
//               <div className={styles.cardContent}>
//                 <h3>{card.title}</h3>
//                 <p>{card.author}</p>
//                 <p>{card.description}</p>
//                 <p className={styles.rating}>
//                   {'★'.repeat(Math.round(parseFloat(card.rating)))}
//                   {'☆'.repeat(5 - Math.round(parseFloat(card.rating)))}
//                   {card.rating}
//                 </p>
//                 <p className={styles.price}>{card.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
