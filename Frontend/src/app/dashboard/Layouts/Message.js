import React, { useState } from 'react';
import { FiSearch, FiPhoneCall, FiVideo, FiMoreHorizontal } from 'react-icons/fi';
import styles from '../../../Styles/MessageComponent.module.css';

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState('Akash Manohar');
  const [messages, setMessages] = useState([
    { sender: 'Akash Manohar', text: 'Hey There?', time: '3:00 pm', self: false },
    { sender: 'Akash Manohar', text: 'How are you?', time: '3:01 pm', self: false },
    { sender: 'You', text: 'Hello!', time: '3:02 pm', self: true },
    { sender: 'You', text: 'I am fine and how are you?', time: '3:03 pm', self: true },
    { sender: 'Akash Manohar', text: 'Good', time: '3:04 pm', self: false },
    { sender: 'You', text: 'Have you submitted your assignments?', time: '3:05 pm', self: true },
    { sender: 'Akash Manohar', text: 'Yes.', time: '3:06 pm', self: false },
  ]);

  return (
    <div className={styles.chatAppContainer}>
      <div className={styles.chatSidebar}>
        <h2>Messages</h2>
        <div className={styles.chatSearchContainer}>
          <FiSearch className={styles.chatSearchIcon} />
          <input type="text" placeholder="Search" className={styles.chatSearchInput} />
        </div>
        <div className={styles.chatList}>
          <div className={styles.chatListItem}>
            <img src="/Images/teacher.jpg" alt="profile" className={styles.chatProfileImage} />
            <div>
              <p className={styles.chatUserName}>Robin Smith</p>
              <span className={styles.chatUserTime}>1d</span>
            </div>
          </div>
          <div className={styles.chatListItem}>
            <img src="/Images/instructor1.webp" alt="profile" className={styles.chatProfileImage} />
            <div>
              <p className={styles.chatUserName}>Akash Manohar</p>
              <span className={styles.chatUserTime}>2d</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chatWindow}>
        <div className={styles.chatHeader}>
          <div className={styles.chatUserInfo}>
            <img src="/Images/teacher.jpg" alt="profile" className={styles.chatProfileImage} />
            <div>
              <p className={styles.chatUserName}>{selectedUser}</p>
              <span className={styles.chatUserStatus}>Online • Last seen 3:00 pm</span>
            </div>
          </div>
          <div className={styles.chatHeaderIcons}>
            <FiPhoneCall className={styles.chatIcon} />
            <FiVideo className={styles.chatIcon} />
            <FiMoreHorizontal className={styles.chatIcon} />
          </div>
        </div>

        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.self ? styles.chatMessageSent : styles.chatMessageReceived}>
              <p className={styles.chatMessageText}>{msg.text}</p>
              <span className={styles.chatMessageTime}>{msg.time}</span>
            </div>
          ))}
        </div>

        <div className={styles.chatInputContainer}>
          <input type="text" placeholder="Type a message..." className={styles.chatInput} />
          <button className={styles.chatSendButton}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
