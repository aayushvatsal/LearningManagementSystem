"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/Images/LogoGrowUPStart.png';
import { useRouter } from 'next/navigation'; // For Next.js App Router

const GrowNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSkillDevelopmentClick = () => {
    router.push('/landing'); // Navigate to the LandingPage
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src={logo} alt="Logo" width={213} height={50} />
            </div>

            {/* Menu for medium and larger screens - positioned next to the logo */}
            <div className="hidden md:flex space-x-2 lg:space-x-4 items-center ml-4">
              {['About', 'Companies', 'Startup Jobs', 'Find a Co-Founder', 'Library'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Skill Development Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleSkillDevelopmentClick}
              className="bg-green-600 text-white px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm lg:text-base rounded-lg"
            >
              Skill Development
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          {['About', 'Companies', 'Startup Jobs', 'Find a Co-Founder', 'Library'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleSkillDevelopmentClick}
            className="w-auto mx-auto bg-green-600 text-white px-3 py-1 rounded-lg mt-2 text-sm sm:text-base lg:text-lg"
          >
            Skill Development
          </button>
        </div>
      )}

      {/* Custom Media Query for 767px to 810px */}
      <style jsx>{`
        @media (max-width: 810px) and (min-width: 767px) {
          .h-16 {
            height: auto; /* Adjust height to auto */
          }
          .ml-4 {
            margin-left: 1rem; /* Adjust margin as needed */
          }
          .text-xs {
            font-size: 0.9rem; /* Slightly larger text for smaller screens */
          }
          .px-2,
          .px-3 {
            padding-left: 0.75rem; /* Adjust padding for smaller screens */
            padding-right: 0.75rem;
          }
          .leading-[18.56px] {
            line-height: 1.25rem; /* Adjust line height for readability */
          }
        }
      `}</style>
    </nav>
  );
};

export default GrowNavbar;

















// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';
// import logo from '../../../public/Images/LogoGrowUPStart.png';

// const GrowNavbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md w-full">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and Navigation Section */}
//           <div className="flex items-center">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Image src={logo} alt="Logo" width={213} height={50} />
//             </div>

//             {/* Menu for medium and larger screens - positioned next to the logo */}
//             <div className="hidden md:flex space-x-2 lg:space-x-4 items-center ml-4">
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
//               >
//                 About
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
//               >
//                 Companies
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
//               >
//                 Startup Jobs
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
//               >
//                 Find a Co-Founder
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm lg:text-base font-normal leading-[18.56px] text-left"
//               >
//                 Library
//               </a>
//             </div>
//           </div>

//           {/* Skill Development Button */}
//           <div className="hidden md:flex items-center">
//             <button className="bg-green-600 text-white px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm lg:text-base rounded-lg">
//               Skill Development
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-gray-800 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={
//                     isOpen
//                       ? 'M6 18L18 6M6 6l12 12'
//                       : 'M4 6h16M4 12h16M4 18h16'
//                   }
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <a
//             href="#"
//             className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
//           >
//             About
//           </a>
//           <a
//             href="#"
//             className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
//           >
//             Companies
//           </a>
//           <a
//             href="#"
//             className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
//           >
//             Startup Jobs
//           </a>
//           <a
//             href="#"
//             className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
//           >
//             Find a Co-Founder
//           </a>
//           <a
//             href="#"
//             className="block px-4 py-2 text-gray-700 hover:text-green-600 font-gilroy text-xs sm:text-sm font-normal leading-[18.56px] text-left"
//           >
//             Library
//           </a>
//           <button className="w-auto mx-auto bg-green-600 text-white px-3 py-1 rounded-lg mt-2 text-sm sm:text-base lg:text-lg">
//             Skill Development
//           </button>
//         </div>
//       )}

//       {/* Custom Media Query for 767px to 810px */}
//       <style jsx>{`
//         @media (max-width: 810px) and (min-width: 767px) {
//           .h-16 {
//             height: auto; /* Adjust height to auto */
//           }
//           .ml-4 {
//             margin-left: 1rem; /* Adjust margin as needed */
//           }
//           .text-xs {
//             font-size: 0.9rem; /* Slightly larger text for smaller screens */
//           }
//           .px-2, .px-3 {
//             padding-left: 0.75rem; /* Adjust padding for smaller screens */
//             padding-right: 0.75rem;
//           }
//           .leading-[18.56px] {
//             line-height: 1.25rem; /* Adjust line height for readability */
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default GrowNavbar;


