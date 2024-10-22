import React, { useEffect, useState } from 'react';
import styles from '../../../Styles/Calendar.module.css'; // Import the CSS module

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  // Fetch scheduled classes
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/class-schedule/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setSchedule(data);
      } catch (error) {
        console.error('Error fetching class schedule:', error);
      }
    };
    fetchSchedule();
  }, [token]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/events/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [token]);

  // Fetch reminders
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/reminders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };
    fetchReminders();
  }, [token]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Student Dashboard</h1>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Class Schedule</h2>
        {schedule.length > 0 ? (
          <ul className={styles.itemList}>
            {schedule.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <span className={styles.courseName}><strong>{item.course_name}</strong></span> - {item.date} at {item.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No scheduled classes.</p>
        )}
      </section>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Events</h2>
        {events.length > 0 ? (
          <ul className={styles.itemList}>
            {events.map((event) => (
              <li key={event.id} className={styles.listItem}>
                <span className={styles.eventName}><strong>{event.event_name}</strong></span> - {event.event_date} at {event.event_time}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No upcoming events.</p>
        )}
      </section>

      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>Reminders</h2>
        {reminders.length > 0 ? (
          <ul className={styles.itemList}>
            {reminders.map((reminder) => (
              <li key={reminder.id} className={styles.listItem}>
                <span className={styles.reminderTitle}><strong>{reminder.title}</strong></span> - Due by {reminder.due_date}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No reminders available.</p>
        )}
      </section>
    </div>
  );
};

export default StudentSchedule;



























// import React, { useEffect, useState } from 'react';
// import styles from '../../../Styles/Calendar.module.css'; // Import the CSS module

// const StudentSchedule = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [reminders, setReminders] = useState([]);
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1MzMyLCJpYXQiOjE3MjczMjg5MzIsImp0aSI6IjE5YzgyMWEzMzMzOTRlZDU4ODE4ZThhZGYzYWVkZDkwIiwidXNlcl9pZCI6OH0.1g7wZCQePqDFrT4T3fxfUb3dv3QH39mrhwzlq_ksz0M';

//   // Fetch scheduled classes
//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const res = await fetch('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       const data = await res.json();
//       setSchedule(data);
//     };
//     fetchSchedule();
//   }, []);

//   // Fetch events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       const res = await fetch('http://localhost:8000/api/events/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       const data = await res.json();
//       setEvents(data);
//     };
//     fetchEvents();
//   }, []);

//   // Fetch reminders
//   useEffect(() => {
//     const fetchReminders = async () => {
//       const res = await fetch('http://localhost:8000/api/reminders/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       const data = await res.json();
//       setReminders(data);
//     };
//     fetchReminders();
//   }, []);

//   return (
//     <div className={styles.dashboardContainer}>
//       <h1 className={styles.dashboardTitle}>Student Dashboard</h1>

//       <section className={styles.sectionContainer}>
//         <h2 className={styles.sectionHeader}>Class Schedule</h2>
//         {schedule.length > 0 ? (
//           <ul className={styles.itemList}>
//             {schedule.map((item) => (
//               <li key={item.id} className={styles.listItem}>
//                 <span className={styles.courseName}><strong>{item.course_name}</strong></span> - {item.date} at {item.time}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className={styles.emptyMessage}>No scheduled classes.</p>
//         )}
//       </section>

//       <section className={styles.sectionContainer}>
//         <h2 className={styles.sectionHeader}>Events</h2>
//         {events.length > 0 ? (
//           <ul className={styles.itemList}>
//             {events.map((event) => (
//               <li key={event.id} className={styles.listItem}>
//                 <span className={styles.eventName}><strong>{event.event_name}</strong></span> - {event.event_date} at {event.event_time}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className={styles.emptyMessage}>No upcoming events.</p>
//         )}
//       </section>

//       <section className={styles.sectionContainer}>
//         <h2 className={styles.sectionHeader}>Reminders</h2>
//         {reminders.length > 0 ? (
//           <ul className={styles.itemList}>
//             {reminders.map((reminder) => (
//               <li key={reminder.id} className={styles.listItem}>
//                 <span className={styles.reminderTitle}><strong>{reminder.title}</strong></span> - Due by {reminder.due_date}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className={styles.emptyMessage}>No reminders available.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default StudentSchedule;
