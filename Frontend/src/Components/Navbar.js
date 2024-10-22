"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

import Logo from '../Images/Main Logo.png';

const Nav = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-800 shadow-md font-sans">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link href="https://EduTech.com/">
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <Image
                                src={Logo}
                                alt="logo"
                                width={80}
                                height={100}
                                className="rounded-full shadow-lg"
                            />
                            <span className="self-center text-3xl font-bold text-white">EduTech</span>
                        </div>
                    </Link>
                    <div className="lg:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle Menu"
                            className="relative z-30"
                        >
                            {open ? (
                                <FiX className="h-8 w-8 text-white" />
                            ) : (
                                <FiMenu className="h-8 w-8 text-white" />
                            )}
                        </button>
                    </div>
                    <nav
                        className={`${
                            open ? 'flex' : 'hidden'
                        } lg:flex lg:space-x-8 w-full lg:w-auto bg-gray-900 lg:bg-transparent fixed lg:static top-0 left-0 z-20`}
                    >
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 w-full lg:w-auto text-lg text-white">
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/about">About Us</Link>
                            </li>
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/contact">Contact Us</Link>
                            </li>
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/signup">Register</Link>
                            </li>
                            <li className="py-2 lg:py-0 hover:text-gray-300 transition duration-300 ease-in-out text-center lg:text-left">
                                <Link href="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Nav;












// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Logo from '../Images/Main Logo.png';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-700 font-sans">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link href="https://EduTech.com/">
//           <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
//             <Image
//               src={Logo}
//               alt="logo"
//               width={40}
//               height={30}
//               className="cursor-pointer"
//             />
//             <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">EduTech</span>
//           </div>
//         </Link>
//         <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
//           <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
//             Get started
//           </button>
//           <button type="button" className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
//             Login
//           </button>
//           <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//             </svg>
//           </button>
//         </div>
//         <div className={`${isOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-600 rounded-lg bg-gray-700 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800">
//             <li>
//               <Link href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-blue-500">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-blue-500">
//               About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-blue-500">
//                 Blog
//               </Link>
//             </li>
//             <li>
//               <Link href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-blue-500">
//               Contact Us
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
