"use client";

import React, { useState } from 'react';
import styles from '../../Styles/Dashboard.module.css';
import DefaultInstructor from './InstructorLayout/DefaultInstructor';
// import TrackProgress from './InstructorLayout/TrackProgress';
import ContentLibrary from './InstructorLayout/ContentLibrary';
// import StudentInteractions from './InstructorLayout/StudentInteractions';
import InstructorAssignment from './InstructorLayout/InstructorAssignment';
import InstuctorAttendance from './InstructorLayout/InstuctorAttendance';
import InstructorCalendar from './InstructorLayout/InstructorCalendar';
import InstructorSidenavbar from './InstructorLayout/InstructorSidenavbar';
import ManageCourses from './InstructorLayout/ManageCourses';
// import InstructorMessages from './InstructorLayout/InstructorMessages';
import HeaderNavbar from './InstructorLayout/HeaderNavbar';
import Logout from './InstructorLayout/Logout';




function InstructorDashboard() {
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
        return <DefaultInstructor />;
      case 'ManageCourse':
        return <ManageCourses />;
      // case 'TrackProgress':
      //   return <TrackProgress />;
      case 'ContentLibrary':
        return <ContentLibrary />;
      // case 'StudentInteractions':
      //   return <StudentInteractions />;
      case 'Assignments':
        return <InstructorAssignment />;
      case 'InstructorAttendance':
        return <InstuctorAttendance />;
      case 'InstructorCalendar':
        return <InstructorCalendar />;
      // case 'InstructorMessage':
      //   return <InstructorMessages />;
      case 'Logout':
        return <Logout />;
      default:
        return <DefaultInstructor />;
    }
  };

  return (
    <div className={styles.MainDivOfDashboard}>
      <HeaderNavbar toggleMenu={toggleMenu} menuVisible={menuVisible} />
      <div className={styles.Container}>
        <InstructorSidenavbar
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

export default InstructorDashboard;
