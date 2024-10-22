import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { FaTrash, FaPlus } from 'react-icons/fa';
import styles from '../../../Styles/InstructorCalendar.module.css'; // Custom CSS

const InstructorCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [classSchedule, setClassSchedule] = useState([]); // Stores all scheduled classes
  const [reminders, setReminders] = useState([]); // Fetch and store reminders
  const [message, setMessage] = useState(null);
  const [newSchedule, setNewSchedule] = useState({ course: '', date: '', time: '' });
  const [newReminder, setNewReminder] = useState({ title: '', due_date: '' });
  const [courses, setCourses] = useState([]); // For selecting courses dynamically

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchMonthlyOverview();
    fetchCourses();
    fetchScheduledClasses(); // Fetch all scheduled classes on mount
    fetchReminders(); // Fetch reminders
  }, []);

  // Fetch all scheduled classes (GET method)
  const fetchScheduledClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/class-schedule/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassSchedule(response.data); // Set scheduled classes from response
    } catch (error) {
      console.error('Error fetching scheduled classes:', error);
    }
  };

  const fetchMonthlyOverview = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/monthly-overview/?month=10&year=2024',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassSchedule(response.data.class_schedules);
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching monthly overview:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data); // Assuming the response contains an array of courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchReminders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reminders/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(response.data); // Set reminders from response
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleAddClass = async () => {
    if (!newSchedule.course || !newSchedule.date || !newSchedule.time) {
      setMessage('All fields are required to schedule a class.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/class-schedule/',
        newSchedule,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassSchedule([...classSchedule, response.data]); // Add the new class to the schedule
      setMessage('Class scheduled successfully!');
      setNewSchedule({ course: '', date: '', time: '' });
    } catch (error) {
      console.error('Error adding class:', error);
      setMessage('Error adding class. Please try again.');
    }
  };

  const handleAddReminder = async () => {
    if (!newReminder.title || !newReminder.due_date) {
      setMessage('All fields are required to add a reminder.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/reminders/', newReminder, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders([...reminders, response.data]); // Add the new reminder to the list
      setMessage('Reminder added successfully!');
      setNewReminder({ title: '', due_date: '' });
    } catch (error) {
      console.error('Error adding reminder:', error);
      setMessage('Error adding reminder. Please try again.');
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/class-schedule/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassSchedule(classSchedule.filter((schedule) => schedule.id !== id)); // Remove class from schedule
      setMessage('Class deleted successfully!');
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/reminders/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(reminders.filter((reminder) => reminder.id !== id)); // Remove reminder from list
      setMessage('Reminder deleted successfully!');
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.pageTitle}>Instructor Calendar</h1>

      {message && <p className={styles.successMessage}>{message}</p>}

      <section className={styles.calendarSection}>
        <h2 className={styles.sectionTitle}>Monthly Overview</h2>
        <div className={styles.calendarWrapper}>
          <Calendar
            onChange={setDate}
            value={date}
            className={styles.reactCalendar}
          />
        </div>
      </section>

      <section className={styles.eventsSection}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <ul className={styles.eventsList}>
          {events.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <h3>{event.event_name}</h3>
              <p>Date: {event.event_date}</p>
              <p>Time: {event.event_time}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.scheduleSection}>
        <h2 className={styles.sectionTitle}>Class Schedule</h2>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classSchedule.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.course_name}</td>
                <td>{schedule.date}</td>
                <td>{schedule.time}</td>
                <td>
                  <FaTrash
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteClass(schedule.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.addClassForm}>
          <h3>Add New Class</h3>
          <select
            value={newSchedule.course}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, course: e.target.value })
            }
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
          />
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, time: e.target.value })
            }
          />
          <button onClick={handleAddClass}>
            <FaPlus /> Add Class
          </button>
        </div>
      </section>

      <section className={styles.remindersSection}>
        <h2 className={styles.sectionTitle}>Reminders</h2>
        <div className={styles.remindersList}>
          {reminders.map((reminder) => (
            <div key={reminder.id} className={styles.reminderItem}>
              <h3>{reminder.title}</h3>
              <p>Due: {reminder.due_date}</p>
              <FaTrash
                className={styles.deleteIcon}
                onClick={() => handleDeleteReminder(reminder.id)}
              />
            </div>
          ))}
        </div>

        <div className={styles.addReminderForm}>
          <h3>Add New Reminder</h3>
          <input
            type="text"
            placeholder="Reminder Title"
            value={newReminder.title}
            onChange={(e) =>
              setNewReminder({ ...newReminder, title: e.target.value })
            }
          />
          <input
            type="date"
            value={newReminder.due_date}
            onChange={(e) =>
              setNewReminder({ ...newReminder, due_date: e.target.value })
            }
          />
          <button onClick={handleAddReminder}>
            <FaPlus /> Add Reminder
          </button>
        </div>
      </section>
    </div>
  );
};

export default InstructorCalendar;
























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import { FaTrash, FaPlus } from 'react-icons/fa';
// import styles from '../../../Styles/InstructorCalendar.module.css'; // Custom CSS

// const InstructorCalendar = () => {
//   const [date, setDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [classSchedule, setClassSchedule] = useState([]); // Stores all scheduled classes
//   const [reminders, setReminders] = useState([]); // Fetch and store reminders
//   const [message, setMessage] = useState(null);
//   const [newSchedule, setNewSchedule] = useState({ course: '', date: '', time: '' });
//   const [newReminder, setNewReminder] = useState({ title: '', due_date: '' });
//   const [courses, setCourses] = useState([]); // For selecting courses dynamically
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1NTQ2LCJpYXQiOjE3MjczMjkxNDYsImp0aSI6ImMyNzBhNGM1ZDU0MDQ4ZDI4OTdiYmM3NGFkNmUxYjE3IiwidXNlcl9pZCI6Mn0.37TrebGRwGGRANMHNbVpLDN711SKW9srAxESPJm8cFA"; // Use the correct token

//   useEffect(() => {
//     fetchMonthlyOverview();
//     fetchCourses();
//     fetchScheduledClasses(); // Fetch all scheduled classes on mount
//     fetchReminders(); // Fetch reminders
//   }, []);

//   // Fetch all scheduled classes (GET method)
//   const fetchScheduledClasses = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassSchedule(response.data); // Set scheduled classes from response
//     } catch (error) {
//       console.error('Error fetching scheduled classes:', error);
//     }
//   };

//   const fetchMonthlyOverview = async () => {
//     try {
//       const response = await axios.get(
//         'http://localhost:8000/api/monthly-overview/?month=10&year=2024',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setClassSchedule(response.data.class_schedules);
//       setEvents(response.data.events);
//     } catch (error) {
//       console.error('Error fetching monthly overview:', error);
//     }
//   };

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/courses/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCourses(response.data); // Assuming the response contains an array of courses
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const fetchReminders = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/reminders/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setReminders(response.data); // Set reminders from response
//     } catch (error) {
//       console.error('Error fetching reminders:', error);
//     }
//   };

//   const handleAddClass = async () => {
//     if (!newSchedule.course || !newSchedule.date || !newSchedule.time) {
//       setMessage('All fields are required to schedule a class.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/class-schedule/',
//         newSchedule,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setClassSchedule([...classSchedule, response.data]); // Add the new class to the schedule
//       setMessage('Class scheduled successfully!');
//       setNewSchedule({ course: '', date: '', time: '' });
//     } catch (error) {
//       console.error('Error adding class:', error);
//       setMessage('Error adding class. Please try again.');
//     }
//   };

//   const handleAddReminder = async () => {
//     if (!newReminder.title || !newReminder.due_date) {
//       setMessage('All fields are required to add a reminder.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/reminders/', newReminder, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setReminders([...reminders, response.data]); // Add the new reminder to the list
//       setMessage('Reminder added successfully!');
//       setNewReminder({ title: '', due_date: '' });
//     } catch (error) {
//       console.error('Error adding reminder:', error);
//       setMessage('Error adding reminder. Please try again.');
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/class-schedule/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassSchedule(classSchedule.filter((schedule) => schedule.id !== id)); // Remove class from schedule
//       setMessage('Class deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting class:', error);
//     }
//   };

//   const handleDeleteReminder = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/reminders/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setReminders(reminders.filter((reminder) => reminder.id !== id)); // Remove reminder from list
//       setMessage('Reminder deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting reminder:', error);
//     }
//   };

//   return (
//     <div className={styles.calendarContainer}>
//       <h1 className={styles.pageTitle}>Instructor Calendar</h1>

//       {message && <p className={styles.successMessage}>{message}</p>}

//       <section className={styles.calendarSection}>
//         <h2 className={styles.sectionTitle}>Monthly Overview</h2>
//         <div className={styles.calendarWrapper}>
//           <Calendar
//             onChange={setDate}
//             value={date}
//             className={styles.reactCalendar}
//           />
//         </div>
//       </section>

//       <section className={styles.eventsSection}>
//         <h2 className={styles.sectionTitle}>Upcoming Events</h2>
//         <ul className={styles.eventsList}>
//           {events.map((event) => (
//             <li key={event.id} className={styles.eventItem}>
//               <h3>{event.event_name}</h3>
//               <p>Date: {event.event_date}</p>
//               <p>Time: {event.event_time}</p>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className={styles.scheduleSection}>
//         <h2 className={styles.sectionTitle}>Class Schedule</h2>
//         <table className={styles.scheduleTable}>
//           <thead>
//             <tr>
//               <th>Class</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classSchedule.map((schedule) => (
//               <tr key={schedule.id}>
//                 <td>{schedule.course_name}</td>
//                 <td>{schedule.date}</td>
//                 <td>{schedule.time}</td>
//                 <td>
//                   <FaTrash
//                     className={styles.deleteIcon}
//                     onClick={() => handleDeleteClass(schedule.id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className={styles.addClassForm}>
//           <h3>Add New Class</h3>
//           <select
//             value={newSchedule.course}
//             onChange={(e) =>
//               setNewSchedule({ ...newSchedule, course: e.target.value })
//             }
//           >
//             <option value="">Select Course</option>
//             {courses.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="date"
//             value={newSchedule.date}
//             onChange={(e) =>
//               setNewSchedule({ ...newSchedule, date: e.target.value })
//             }
//           />
//           <input
//             type="time"
//             value={newSchedule.time}
//             onChange={(e) =>
//               setNewSchedule({ ...newSchedule, time: e.target.value })
//             }
//           />
//           <button onClick={handleAddClass}>
//             <FaPlus /> Add Class
//           </button>
//         </div>
//       </section>

//       <section className={styles.remindersSection}>
//         <h2 className={styles.sectionTitle}>Reminders</h2>
//         <div className={styles.remindersList}>
//           {reminders.map((reminder) => (
//             <div key={reminder.id} className={styles.reminderItem}>
//               <h3>{reminder.title}</h3>
//               <p>Due: {reminder.due_date}</p>
//               <FaTrash
//                 className={styles.deleteIcon}
//                 onClick={() => handleDeleteReminder(reminder.id)}
//               />
//             </div>
//           ))}
//         </div>

//         <div className={styles.addReminderForm}>
//           <h3>Add New Reminder</h3>
//           <input
//             type="text"
//             placeholder="Reminder Title"
//             value={newReminder.title}
//             onChange={(e) =>
//               setNewReminder({ ...newReminder, title: e.target.value })
//             }
//           />
//           <input
//             type="date"
//             value={newReminder.due_date}
//             onChange={(e) =>
//               setNewReminder({ ...newReminder, due_date: e.target.value })
//             }
//           />
//           <button onClick={handleAddReminder}>
//             <FaPlus /> Add Reminder
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default InstructorCalendar;

