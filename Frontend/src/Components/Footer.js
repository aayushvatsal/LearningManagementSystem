import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Services</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <p className="mb-4">1234 Street Name, City, Country</p>
            <p className="mb-4">Phone: (123) 456-7890</p>
            <p className="mb-4">Email: <a href="mailto:info@example.com" className="hover:text-gray-300 transition">info@example.com</a></p>
          </div>

          {/* Social Media Icons */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
