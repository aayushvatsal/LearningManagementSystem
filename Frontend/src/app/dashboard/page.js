"use client";


import React, { useState } from 'react';
import styles from '../../Styles/Dashboard.module.css';
import DefaultDashboard from './Layouts/DefaultDashboard';
import Library from './Layouts/Library';
import Classroom from './Layouts/Classroom';
import Assignment from './Layouts/Assignment';
import Attendance from './Layouts/Attendance';
import Message from './Layouts/Message';
import Help from './Layouts/Help';
import Courses from './Layouts/Courses';
import Setting from './Layouts/Setting';
import SideNavbar from './Layouts/SideNavbar';
import Calendar from './Layouts/Calendar';
import Discussion from './Layouts/Discussion';
import HeaderNavbar from './Layouts/HeaderNavbar';
import Logout from './Layouts/Logout';

function DashboardUpdated() {
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
        return <DefaultDashboard />;
      case 'Calendar':
        return <Calendar />;
      case 'Library':
        return <Library />;
      case 'Classroom':
        return <Classroom />;
      case 'Assignment':
        return <Assignment />;
      case 'Attendance':
        return <Attendance />;
      case 'Discussion':
        return <Discussion />;
      case 'Message':
        return <Message />;
      case 'Help':
        return <Help />;
      case 'Courses':
        return <Courses />;
      case 'Setting':
        return <Setting />;
      case 'Logout':
        return <Logout />;  
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <div className={styles.MainDivOfDashboard}>
      <HeaderNavbar toggleMenu={toggleMenu} menuVisible={menuVisible} />
      <div className={styles.Container}>
        <SideNavbar
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

export default DashboardUpdated;
