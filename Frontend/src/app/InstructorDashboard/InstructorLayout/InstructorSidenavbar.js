import React, { useEffect, useState } from 'react';
import styles from '../../../Styles/SideNavbar.module.css';
import { MdDashboardCustomize, MdAssignmentTurnedIn, MdLocalLibrary, MdTopic } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { RiPresentationFill } from "react-icons/ri";

const menuItems = [
  { id: 1, label: 'Dashboard', icon: <MdDashboardCustomize className={styles.IconOfDas} /> },
  { id: 2, label: 'ManageCourse', icon: <MdTopic className={styles.IconOfDas} /> },
  { id: 3, label: 'ContentLibrary', icon: <MdLocalLibrary className={styles.IconOfDas} /> },
  { id: 4, label: 'Assignments', icon: <MdAssignmentTurnedIn className={styles.IconOfDas} /> },
  { id: 5, label: 'InstructorAttendance', icon: <RiPresentationFill className={styles.IconOfDas} /> },
  { id: 6, label: 'InstructorCalendar', icon: <FaCalendar className={styles.IconOfDas} /> },
  { id: 7, label: 'Logout', icon: <IoIosLogOut className={styles.IconOfDas} /> }
];

function InstructorSidenavbar({ menuVisible, handleSectionChange, displaySection, toggleMenu }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize); // Add event listener for resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
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

export default InstructorSidenavbar;

