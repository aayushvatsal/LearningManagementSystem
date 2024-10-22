import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  FaBell,
  FaUserCircle,
  FaGlobe,
  FaMoon,
  FaCommentDots,
  FaSun,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import styles from '../../../Styles/HeaderNavbar.module.css';

function HeaderNavbar({ toggleMenu }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState(''); // User name fetched from backend
  const [userRole, setUserRole] = useState(''); // User role fetched from backend
  const [profilePic, setProfilePic] = useState(null); // Profile picture
  const [showIcons, setShowIcons] = useState(false); // To show Update and Delete icons
  const fileInputRef = useRef(null); // Reference for the hidden file input

  // Define the backend base URL
  const baseURL = 'http://localhost:8000';

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('accessToken'); // Fetch access token from localStorage
      if (!token) {
        alert('You are not authorized. Please log in.');
        return; // If no token, stop further execution
      }

      try {
        const response = await axios.get(`${baseURL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use token in the Authorization header
          },
        });
        const { username, role, profile_picture } = response.data;
        setUserName(username);
        setUserRole(role);
        // Adjust the profile picture URL to be absolute
        setProfilePic(
          profile_picture ? `${baseURL}${profile_picture}` : null
        );
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Unauthorized! Please log in again.');
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        } else {
          alert('Failed to fetch user profile.');
          console.error('Error fetching user profile:', error);
        }
      }
    };
    fetchUserProfile();
  }, [baseURL]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle(styles.DarkMode);
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setShowIcons(false); // Hide icons when profile is clicked again
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('You are not authorized. Please log in.');
        return;
      }

      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const response = await axios.post(
          `${baseURL}/api/profile/picture/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        // Update the profile picture with the new URL from the server response
        setProfilePic(
          response.data.profile_picture_url
            ? `${baseURL}${response.data.profile_picture_url}`
            : null
        );
        alert('Profile picture uploaded successfully!');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Unauthorized! Please log in again.');
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        } else {
          alert('Error uploading profile picture.');
          console.error('Error uploading profile picture:', error);
        }
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('You are not authorized. Please log in.');
      return;
    }

    try {
      await axios.delete(`${baseURL}/api/profile/picture/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfilePic(null); // Remove the profile picture preview
      alert('Profile picture deleted successfully!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please log in again.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      } else {
        alert('Error deleting profile picture.');
        console.error('Error deleting profile picture:', error);
      }
    }
  };

  const handleUpdateProfilePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open the hidden file input when the button is clicked
    }
  };

  return (
    <header
      className={`${styles.Header} ${darkMode ? styles.Dark : styles.Light}`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef} // Hidden file input reference
        style={{ display: 'none' }} // Hide the file input
        onChange={handleProfilePictureChange}
      />

      {/* Search bar */}
      <div className={styles.SearchBar}>
        <input type="text" placeholder="Search.." />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>

      {/* Icons (Language, Theme Toggle, Notifications, Profile) */}
      <div className={styles.Icons}>
        <FaGlobe size={20} />
        <span>English</span>
        {darkMode ? (
          <FaSun size={20} onClick={toggleDarkMode} />
        ) : (
          <FaMoon size={20} onClick={toggleDarkMode} />
        )}
        <FaCommentDots size={20} />
        <FaBell size={20} />
        <div
          className={styles.ProfileSection}
          onClick={handleProfileClick}
          onMouseEnter={() => setShowIcons(true)}
          onMouseLeave={() => setShowIcons(false)}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className={styles.ProfilePic}
            />
          ) : (
            <FaUserCircle size={30} />
          )}
          {showIcons && (
            <div className={styles.ProfileIcons}>
              <FaEdit
                className={styles.EditIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateProfilePicture();
                }}
              />
              <FaTrashAlt
                className={styles.DeleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProfilePicture();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile card */}
      {profileOpen && (
        <div className={styles.ProfileCard}>
          <div className={styles.ProfileCardInner}>
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className={styles.ProfileCardPic}
              />
            ) : (
              <FaUserCircle size={60} />
            )}
            <h3>{userName}</h3>
            <p>{userRole}</p>
            <button onClick={handleUpdateProfilePicture}>
              Update Profile Picture
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderNavbar;