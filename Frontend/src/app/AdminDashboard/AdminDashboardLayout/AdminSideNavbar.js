import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../../Styles/SideNavbar.module.css';
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboardCustomize, MdAssignmentTurnedIn, MdLocalLibrary } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaCalendar, FaHandsHelping } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiPresentationFill } from "react-icons/ri";
import { MdTopic } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { AiFillInteraction } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { GiOffshorePlatform } from "react-icons/gi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiListSettingsLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { FcOnlineSupport } from "react-icons/fc";
import { MdFeedback } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";

const menuItems = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'UserManagement' },
  { id: 3, label: 'CourseManagement' },
  { id: 4, label: 'PlatformActivity' },
  { id: 5, label: 'AnalyticsReports' },
  { id: 6, label: 'SystemSettings' },
  { id: 7, label: 'Notifications' },
  { id: 8, label: 'SupportRequests' },
  { id: 9, label: 'AuditLogs' },
  { id: 10, label: 'Feedback' },
  { id: 11, label: 'Help' },
  { id: 12, label: 'Setting' },
  { id: 13, label: 'Logout' }
];

function AdminSidenavbar({ menuVisible, toggleMenu, handleSectionChange, displaySection }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className={`${styles.Sidebar} ${menuVisible ? styles.Show : ''}`} style={{ display: isMobile ? (menuVisible ? 'block' : 'none') : '' }}>
      <div className={styles.toggle} onClick={toggleMenu}>
        <div className={styles.logo}>
          {isMobile && <span className={styles.Close}>☰</span>}
        </div>
      </div>
      <div className={styles.SidebarContent}>
        {menuItems.map(item => (
          item.label === 'Logout' ? (
            <div
              key={item.id}
              className={`${styles.AnchorTag} ${displaySection === item.label ? styles.Active : ''}`}
              onClick={() => window.location.href = '/logout'} 
            >
              <IoIosLogOut className={styles.IconOfDas} />
              {!isMobile && <h3 className={styles.DashBoardOfh3}>{item.label}</h3>}
            </div>
          ) : (
            <div
              key={item.id}
              className={`${styles.AnchorTag} ${displaySection === item.label ? styles.Active : ''}`}
              onClick={() => handleSectionChange(item.label)}
            >
              {item.label === 'AnalyticsReports' ? (
                <TbBrandGoogleAnalytics className={styles.IconOfDas} />
              ) : item.label === 'Setting' ? (
                <IoSettingsSharp className={styles.IconOfDas} />
              ) : item.label === 'UserManagement' ? (
                <MdManageAccounts className={styles.IconOfDas} />
              ) : item.label === 'SystemSettings' ? (
                <RiListSettingsLine className={styles.IconOfDas} />
              ) : item.label === 'Notifications' ? (
                <IoMdNotifications className={styles.IconOfDas} />
              ) : item.label === 'SupportRequests' ? (
                <FcOnlineSupport className={styles.IconOfDas} />
              ) : item.label === 'AuditLogs' ? (
                <AiOutlineAudit className={styles.IconOfDas} />
            ) : item.label === 'Feedback' ? (
                <MdFeedback className={styles.IconOfDas} />
              ) : item.label === 'Help' ? (
                <FaHandsHelping className={styles.IconOfDas} />
              ) : item.label === 'CourseManagement' ? (
                <MdTopic className={styles.IconOfDas} />
              ) : item.label === 'PlatformActivity' ? (
                <GiOffshorePlatform className={styles.IconOfDas} />
              ) : (
                <MdDashboardCustomize className={styles.IconOfDas} />
              )}
              {!isMobile && <h3 className={styles.DashBoardOfh3}>{item.label}</h3>}
            </div>
          )
        ))}
      </div>
    </aside>
  );
}

export default AdminSidenavbar;