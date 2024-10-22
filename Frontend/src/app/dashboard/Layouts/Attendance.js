import { useEffect, useState } from 'react';
import styles from '../../../Styles/AttendanceCalendar.module.css';

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [heading, setHeading] = useState('');

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    // Fetch the attendance data
    const fetchAttendance = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/attendance/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAttendanceData(data);

        // Set dynamic heading based on data (For example, a range of dates from the data)
        if (data.length > 0) {
          const startDate = new Date(data[0].scheduled_class_date).toLocaleDateString();
          const endDate = new Date(data[data.length - 1].scheduled_class_date).toLocaleDateString();
          setHeading(`Attendance Records from ${startDate} to ${endDate}`);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, [token]);

  return (
    <div className={styles.AttendanceContainer}>
      <h2 className={styles.AttendanceHeading}>{heading}</h2>
      <table className={styles.AttendanceTable}>
        <thead>
          <tr>
            <th>Class Time</th>
            <th>Class Date</th>
            <th>Status</th>
            <th>Class Info</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.class_time}</td>
              <td>{new Date(record.scheduled_class_date).toLocaleDateString()}</td>
              <td>
                <span
                  className={
                    record.status === 'PRESENT'
                      ? styles.PresentStatus
                      : styles.AbsentStatus
                  }
                >
                  {record.status === 'PRESENT' ? 'P' : 'A'}
                </span>
              </td>
              <td>{record.class_schedule_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCalendar;
































// import { useEffect, useState } from 'react';
// import styles from '../../../Styles/AttendanceCalendar.module.css';

// const AttendanceCalendar = () => {
//   const [attendanceData, setAttendanceData] = useState([]);

//   // Fetch the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     // Fetch the attendance data
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/attendance/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setAttendanceData(data);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//       }
//     };

//     fetchAttendance();
//   }, [token]);

//   return (
//     <div className={styles.AttendanceContainer}>
//       <h2 className={styles.AttendanceHeading}>Attendance Record</h2>
//       <table className={styles.AttendanceTable}>
//         <thead>
//           <tr>
//             <th>Class Schedule</th>
//             <th>Date</th> {/* Added Date Column */}
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((record) => (
//             <tr key={record.id}>
//               <td>{record.class_schedule_info}</td>
//               <td>{record.scheduled_class_date}</td> {/* Display Scheduled Class Date */}
//               <td className={record.status === 'PRESENT' ? styles.PresentStatus : styles.AbsentStatus}>
//                 {record.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceCalendar;
















// import { useEffect, useState } from 'react';
// import styles from '../../../Styles/AttendanceCalendar.module.css';

// const AttendanceCalendar = () => {
//   const [attendanceData, setAttendanceData] = useState([]);

//   // Fetch the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     // Fetch the attendance data
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/attendance/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setAttendanceData(data);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//       }
//     };

//     fetchAttendance();
//   }, [token]);

//   return (
//     <div className={styles.AttendanceContainer}>
//       <h2 className={styles.AttendanceHeading}>Attendance Record</h2>
//       <table className={styles.AttendanceTable}>
//         <thead>
//           <tr>
//             <th>Class Schedule</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((record) => (
//             <tr key={record.id}>
//               <td>{record.class_schedule_info}</td>
//               <td className={record.status === 'PRESENT' ? styles.PresentStatus : styles.AbsentStatus}>
//                 {record.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceCalendar;
















// import { useEffect, useState } from 'react';
// import styles from '../../../Styles/AttendanceCalendar.module.css';

// const AttendanceCalendar = () => {
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     // Fetch the attendance data with hardcoded token
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/attendance/', {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1MzMyLCJpYXQiOjE3MjczMjg5MzIsImp0aSI6IjE5YzgyMWEzMzMzOTRlZDU4ODE4ZThhZGYzYWVkZDkwIiwidXNlcl9pZCI6OH0.1g7wZCQePqDFrT4T3fxfUb3dv3QH39mrhwzlq_ksz0M`,
//           },
//         });
//         const data = await response.json();
//         setAttendanceData(data);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   return (
//     <div className={styles.AttendanceContainer}>
//       <h2 className={styles.AttendanceHeading}>Attendance Record</h2>
//       <table className={styles.AttendanceTable}>
//         <thead>
//           <tr>
//             <th>Class Schedule</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceData.map((record) => (
//             <tr key={record.id}>
//               <td>{record.class_schedule_info}</td>
//               <td className={record.status === 'PRESENT' ? styles.PresentStatus : styles.AbsentStatus}>
//                 {record.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AttendanceCalendar;
