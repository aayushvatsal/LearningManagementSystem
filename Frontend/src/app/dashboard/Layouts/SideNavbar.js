import React, { useState, useEffect } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboardCustomize, MdAssignmentTurnedIn, MdLocalLibrary } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaCalendar, FaAddressBook, FaHandsHelping } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiPresentationFill } from "react-icons/ri";
import { GiDiscussion } from "react-icons/gi";
import styles from '../../../Styles/SideNavbar.module.css';

const menuItems = [
  { id: 1, label: 'Dashboard', icon: <MdDashboardCustomize className={styles.IconOfDas} /> },
  { id: 2, label: 'Calendar', icon: <FaCalendar className={styles.IconOfDas} /> },
  { id: 3, label: 'Library', icon: <MdLocalLibrary className={styles.IconOfDas} /> },
  { id: 4, label: 'Classroom', icon: <SiGoogleclassroom className={styles.IconOfDas} /> },
  { id: 5, label: 'Courses', icon: <FaAddressBook className={styles.IconOfDas} /> },
  { id: 6, label: 'Assignment', icon: <MdAssignmentTurnedIn className={styles.IconOfDas} /> },
  { id: 7, label: 'Attendance', icon: <RiPresentationFill className={styles.IconOfDas} /> },
  { id: 8, label: 'Discussion', icon: <GiDiscussion className={styles.IconOfDas} /> },
  { id: 9, label: 'Message', icon: <BiMessageRoundedDetail className={styles.IconOfDas} /> },
  { id: 10, label: 'Help', icon: <FaHandsHelping className={styles.IconOfDas} /> },
  { id: 11, label: 'Setting', icon: <IoSettingsSharp className={styles.IconOfDas} /> },
  { id: 12, label: 'Logout', icon: <IoIosLogOut className={styles.IconOfDas} /> }
];

function SideNavbar({ menuVisible, handleSectionChange, displaySection, toggleMenu }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`${styles.Sidebar} ${menuVisible ? styles.Show : ''}`}
      style={{ display: isMobile && !menuVisible ? 'none' : 'block' }}
    >
      <div className={styles.SidebarContent}>
        <div className={styles.CloseIcon} onClick={toggleMenu}>
          &times;
        </div>
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`${styles.AnchorTag} ${displaySection === item.label ? styles.Active : ''}`}
            onClick={() => handleSectionChange(item.label)}
          >
            {item.icon}
            {!isMobile && <h3 className={styles.DashBoardOfh3}>{item.label}</h3>}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SideNavbar;
