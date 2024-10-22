"use client";

import Image from "next/image";
import HerosectionImage from "../Images/Herosectionimage.png";
import styles from "../Styles/Hero.module.css"; 

export default function Hero() {
  return (
    <section className={styles.HeroSection}>
      <div className={styles.HeroContainer}>
        {/* Text Section */}
        <div className={styles.HeroContentWrapper}>
          <div className={styles.HeroContent}>
            <h1 className={styles.HeroTitle}>
              Empower Your Learning Journey
            </h1>
            <p className={`${styles.textLg} ${styles.mdTextXl} ${styles.textGray300}`}>
              Discover the world’s most trusted open-source learning management
              system. Our platform is designed to help educators streamline
              teaching and efficiently track student progress. Unlock your
              potential and learn from anywhere, anytime.
            </p>
            <button className={styles.HeroButton}>
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.HeroImageWrapper}>
          <div className={styles.ImageOverlay}></div>
          <Image
            src={HerosectionImage}
            alt="Hero Image"
            className={`${styles.HeroImage} animate-slideInRight`}
            width={500}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}








// "use client";

// import Image from "next/image";
// import HerosectionImage from "../Images/Herosectionimage.png";

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-r from-gray-100 to-blue-50 flex items-center min-h-screen py-10 px-4 md:px-16">
//       <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
//         {/* Text Section */}
//         <div className="md:w-1/2 space-y-6 animate-slideIn">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//             Empower Your Learning Journey
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600">
//             Discover the world’s most trusted open-source learning management
//             system. Our platform is designed to help educators streamline
//             teaching and efficiently track student progress. Unlock your
//             potential and learn from anywhere, anytime.
//           </p>
//           <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transform hover:scale-105 transition duration-300">
//             Learn More
//           </button>
//         </div>

//         {/* Image Section */}
//         <div className="md:w-1/2 flex justify-center">
//           <div className="relative group">
//             {/* Enhanced Border Frame */}
//             <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
//             <Image
//               src={HerosectionImage}
//               alt="Hero Image"
//               className="relative rounded-lg shadow-lg border-8 border-white transform group-hover:scale-105 transition duration-500 animate-slideInRight"
//               width={500}
//               height={400}
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
