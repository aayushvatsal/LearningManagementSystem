"use client";

import React, { useState } from 'react';
import styles from '../../Styles/Dashboard.module.css';
import DefaultAdmin from './AdminDashboardLayout/DefaultAdmin';
import UserManagement from './AdminDashboardLayout/UserManagement';
import CourseManagement from './AdminDashboardLayout/CourseManagement';
import PlatformActivity from './AdminDashboardLayout/PlatformActivity';
import AnalyticsReports from './AdminDashboardLayout/AnalyticsReports';
import SystemSettings from './AdminDashboardLayout/SystemSettings';
import Notifications from './AdminDashboardLayout/Notifications';
import SupportRequest from './AdminDashboardLayout/SupportRequest';
import AuditLogs from './AdminDashboardLayout/AuditLogs';
import Feedback from './AdminDashboardLayout/Feedback';
import AdminSidenavbar from './AdminDashboardLayout/AdminSideNavbar';
import HeaderNavbar from './AdminDashboardLayout/HeaderNavbar';






function AdminDashboard() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [displaySection, setDisplaySection] = useState('Dashboard');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSectionChange = (item) => {
    setDisplaySection(item);
  };

  const renderComponent = () => {
    switch (displaySection) {
      case 'Dashboard':
        return <DefaultAdmin />;
      case 'UserManagement':
        return <UserManagement />;
      case 'CourseManagement':
        return <CourseManagement />;
      case 'PlatformActivity':
        return <PlatformActivity />;
      case 'AnalyticsReports':
        return <AnalyticsReports />;
      case 'SystemSettings':
        return <SystemSettings />;
      case 'Notifications':
        return <Notifications />;
      case 'SupportRequests':
        return <SupportRequest />;
      case 'AuditLogs':
        return <AuditLogs />;
      case 'Feedback':
        return <Feedback />;
      case 'Setting':
        return <Setting />;
      default:
        return <DefaultAdmin />;
    }
  };

  return (
    <div className={styles.MainDivOfDashboard}>
      <HeaderNavbar toggleMenu={toggleMenu} menuVisible={menuVisible} />
      <div className={styles.Container}>
        <AdminSidenavbar
          menuVisible={menuVisible}
          toggleMenu={toggleMenu}
          handleSectionChange={handleSectionChange}
          displaySection={displaySection}
        />

        <div className={styles.ContentSection}>
          {renderComponent()}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
