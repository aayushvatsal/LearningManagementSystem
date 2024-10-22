import React, { useState } from 'react';
import styles from '../../../Styles/Classroom.module.css';
import { FaMicrophone, FaVideo } from 'react-icons/fa';

const Classroom = () => {
  const [view, setView] = useState('live');
  const [presentStudents, setPresentStudents] = useState(28);
  const [absentStudents, setAbsentStudents] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleExit = () => {
    alert('Exiting the classroom');
    // Handle the exit functionality
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.classroomContainer}>
      <div className={styles.header}>
        <button 
          className={`${styles.toggleButton} ${view === 'live' ? styles.active : ''}`} 
          onClick={() => setView('live')}
        >
          Live Classroom
        </button>
        <button 
          className={`${styles.toggleButton} ${view === 'classroom' ? styles.active : ''}`} 
          onClick={() => setView('classroom')}
        >
          Classroom
        </button>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.videoSection}>
          <div className={styles.videoOptions}>
            <button className={styles.dropdownButton} onClick={toggleDropdown}>
              Video Options
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  <li>Video Call</li>
                  <li>Video</li>
                  <li>Whiteboard</li>
                </ul>
              </div>
            )}
          </div>
          <div className={styles.videoPlayer}>
            <img src="/Images/teacher.jpg" alt="Teacher" />
            <div className={styles.timer}>01:10:30</div>
          </div>
          <div className={styles.studentStatus}>
            <span className={styles.present}>Present students: {presentStudents}</span>
            <span className={styles.absent}>Absent students: {absentStudents}</span>
          </div>
        </div>

        <div className={styles.participantsSection}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${view === 'participants' ? styles.activeTab : ''}`}
              onClick={() => setView('participants')}
            >
              Participants
            </button>
            <button
              className={`${styles.tab} ${view === 'chat' ? styles.activeTab : ''}`}
              onClick={() => setView('chat')}
            >
              Chat
            </button>
          </div>
          <div className={styles.participantsList}>
            <h4>Teachers (2)</h4>
            <ul>
              <li>
                <img src="/Images/instructor1.webp" alt="Teacher" className={styles.participantImg} />
                Robin Smith
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
              <li>
                <img src="/Images/instructor2.webp" alt="Teacher" className={styles.participantImg} />
                Arun Kumar
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
            </ul>

            <h4>Students ({presentStudents})</h4>
            <ul>
              <li>
                <img src="/Images/jane_smith.jpg" alt="Student" className={styles.participantImg} />
                Clara John
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
              <li>
                <img src="/Images/john_doe.jpg" alt="Student" className={styles.participantImg} />
                Clara John
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
              <li>
                <img src="/Images/jane_smith.jpg" alt="Student" className={styles.participantImg} />
                Clara John
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
              <li>
                <img src="/Images/jane_smith.jpg" alt="Student" className={styles.participantImg} />
                Clara John
                <FaMicrophone className={styles.icon} />
                <FaVideo className={styles.icon} />
              </li>
              {/* Add more student names if needed */}
            </ul>
          </div>

          <button className={styles.exitButton} onClick={handleExit}>
            Exit Classroom
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
