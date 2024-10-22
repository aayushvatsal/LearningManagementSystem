import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../Styles/InstructorAttendance.module.css';

const InstructorAttendance = () => {
  const [classScheduleData, setClassScheduleData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [savedAttendance, setSavedAttendance] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchClassSchedules();
    fetchSavedAttendanceRecords();
  }, []);

  // Fetch class schedule data
  const fetchClassSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/class-schedule/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassScheduleData(response.data);
      toast.success('Class schedule data fetched successfully!');
    } catch (error) {
      toast.error('Error fetching class schedule data.');
    }
  };

  // Fetch saved attendance for all classes
  const fetchSavedAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/attendance/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedAttendance(response.data);
      toast.success('Saved attendance records fetched successfully!');
    } catch (error) {
      toast.error('Error fetching saved attendance records.');
    }
  };

  // Handle radio button change for marking attendance
  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prevState => ({
      ...prevState,
      [studentId]: status,
    }));
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (!selectedClass) {
      toast.error('Please select a class schedule.');
      return;
    }

    setIsSubmitting(true);

    try {
      const promises = Object.keys(attendance).map(studentId => {
        return axios.post('http://localhost:8000/api/attendance/', {
          class_schedule: selectedClass,
          student: studentId,
          status: attendance[studentId],
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      await Promise.all(promises);
      toast.success('Attendance records saved successfully!');
      setAttendance({});  // Reset attendance
      fetchSavedAttendanceRecords();  // Refresh saved attendance
    } catch (error) {
      toast.error('Error saving attendance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.attendanceContainer}>
      <ToastContainer />
      <h1 className={styles.heading}>Instructor Attendance</h1>

      <div className={styles.classScheduleContainer}>
        <h2 className={styles.subHeading}>Select Class Schedule</h2>
        <select
          className={styles.selectClassSchedule}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select a class</option>
          {classScheduleData.map(schedule => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.course_name} - {schedule.date} at {schedule.time}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className={styles.attendanceList}>
          <h3 className={styles.subHeading}>Mark Attendance</h3>
          {classScheduleData
            .find(schedule => schedule.id === parseInt(selectedClass))
            .students.map(studentId => (
              <div key={studentId} className={styles.attendanceCard}>
                <p><strong>Student ID:</strong> {studentId}</p>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${studentId}`}
                      value="PRESENT"
                      checked={attendance[studentId] === 'PRESENT'}
                      onChange={() => handleAttendanceChange(studentId, 'PRESENT')}
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${studentId}`}
                      value="ABSENT"
                      checked={attendance[studentId] === 'ABSENT'}
                      onChange={() => handleAttendanceChange(studentId, 'ABSENT')}
                    />
                    Absent
                  </label>
                </div>
              </div>
          ))}
          <button
            className={styles.submitBtn}
            onClick={submitAttendance}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>
      )}

      {savedAttendance.length > 0 && (
        <div className={styles.savedAttendanceContainer}>
          <h3 className={styles.subHeading}>Saved Attendance Records</h3>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Class Schedule</th>
                <th>Status</th>
                <th>Scheduled Date</th>
              </tr>
            </thead>
            <tbody>
              {savedAttendance.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.student}</td>
                  <td>{record.student_name}</td>
                  <td>{record.class_schedule_info}</td>
                  <td className={record.status === 'PRESENT' ? styles.presentStatus : styles.absentStatus}>
                    {record.status}
                  </td>
                  <td>{record.scheduled_class_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructorAttendance;
























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAttendance.module.css';

// const InstructorAttendance = () => {
//   const [classScheduleData, setClassScheduleData] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [attendance, setAttendance] = useState({});
//   const [savedAttendance, setSavedAttendance] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     fetchClassSchedules();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchSavedAttendance(selectedClass);
//     }
//   }, [selectedClass]);

//   // Fetch class schedule data
//   const fetchClassSchedules = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassScheduleData(response.data);
//       toast.success('Class schedule data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching class schedule data.');
//     }
//   };

//   // Fetch saved attendance for a class schedule
//   const fetchSavedAttendance = async (classScheduleId) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/attendance/?class_schedule=${classScheduleId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSavedAttendance(response.data);
//       toast.success('Saved attendance data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching saved attendance data.');
//     }
//   };

//   // Handle radio button change for marking attendance
//   const handleAttendanceChange = (studentId, status) => {
//     setAttendance(prevState => ({
//       ...prevState,
//       [studentId]: status,
//     }));
//   };

//   // Submit attendance
//   const submitAttendance = async () => {
//     if (!selectedClass) {
//       toast.error('Please select a class schedule.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const promises = Object.keys(attendance).map(studentId => {
//         return axios.post('http://localhost:8000/api/attendance/', {
//           class_schedule: selectedClass,
//           student: studentId,
//           status: attendance[studentId],
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       });

//       await Promise.all(promises);
//       toast.success('Attendance records saved successfully!');
//       setAttendance({});  // Reset attendance
//       fetchSavedAttendance(selectedClass);  // Refresh saved attendance
//     } catch (error) {
//       toast.error('Error saving attendance.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.attendanceContainer}>
//       <ToastContainer />
//       <h1 className={styles.heading}>Instructor Attendance</h1>

//       <div className={styles.classScheduleContainer}>
//         <h2 className={styles.subHeading}>Select Class Schedule</h2>
//         <select
//           className={styles.selectClassSchedule}
//           onChange={(e) => setSelectedClass(e.target.value)}
//         >
//           <option value="">Select a class</option>
//           {classScheduleData.map(schedule => (
//             <option key={schedule.id} value={schedule.id}>
//               {schedule.course_name} - {schedule.date} at {schedule.time}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedClass && (
//         <div className={styles.attendanceList}>
//           <h3 className={styles.subHeading}>Mark Attendance</h3>
//           {classScheduleData
//             .find(schedule => schedule.id === parseInt(selectedClass))
//             .students.map(studentId => (
//               <div key={studentId} className={styles.attendanceCard}>
//                 <p><strong>Student ID:</strong> {studentId}</p>
//                 <div className={styles.radioGroup}>
//                   <label>
//                     <input
//                       type="radio"
//                       name={`attendance-${studentId}`}
//                       value="PRESENT"
//                       checked={attendance[studentId] === 'PRESENT'}
//                       onChange={() => handleAttendanceChange(studentId, 'PRESENT')}
//                     />
//                     Present
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name={`attendance-${studentId}`}
//                       value="ABSENT"
//                       checked={attendance[studentId] === 'ABSENT'}
//                       onChange={() => handleAttendanceChange(studentId, 'ABSENT')}
//                     />
//                     Absent
//                   </label>
//                 </div>
//               </div>
//           ))}
//           <button
//             className={styles.submitBtn}
//             onClick={submitAttendance}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
//           </button>
//         </div>
//       )}

//       {savedAttendance.length > 0 && (
//         <div className={styles.savedAttendanceContainer}>
//           <h3 className={styles.subHeading}>Saved Attendance Records</h3>
//           <table className={styles.attendanceTable}>
//             <thead>
//               <tr>
//                 <th>Student ID</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedAttendance.map(record => (
//                 <tr key={record.id}>
//                   <td>{record.student}</td>
//                   <td className={record.status === 'PRESENT' ? styles.presentStatus : styles.absentStatus}>
//                     {record.status}
//                   </td>
//                   <td>{record.scheduled_class_date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorAttendance;


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAttendance.module.css';

// const InstructorAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [classScheduleData, setClassScheduleData] = useState([]);
//   const [selectedAttendance, setSelectedAttendance] = useState(null);
//   const [status, setStatus] = useState('PRESENT');

//   // Fetch the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     fetchAttendance();
//     fetchClassSchedules();
//   }, []);

//   // Fetch attendance data
//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/attendance/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(response.data);
//       toast.success('Attendance data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching attendance data.');
//     }
//   };

//   // Fetch class schedule data
//   const fetchClassSchedules = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassScheduleData(response.data);
//     } catch (error) {
//       toast.error('Error fetching class schedule data.');
//     }
//   };

//   // Handle marking attendance (with class schedule validation)
//   const markAttendance = async (studentId, classScheduleId, attendanceStatus) => {
//     // Find the scheduled class and check if it matches today's date
//     const scheduledClass = classScheduleData.find(schedule => schedule.id === classScheduleId);
//     const today = new Date().toISOString().split('T')[0];

//     if (scheduledClass && scheduledClass.date === today) {
//       try {
//         const response = await axios.post('http://localhost:8000/api/attendance/', {
//           class_schedule: classScheduleId,
//           student: studentId,
//           status: attendanceStatus,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAttendanceData([...attendanceData, response.data]); // Update UI with new data
//         toast.success('Attendance marked successfully!');
//       } catch (error) {
//         toast.error('Failed to mark attendance.');
//       }
//     } else {
//       toast.error('Attendance can only be marked for scheduled classes on today\'s date.');
//     }
//   };

//   // Handle updating attendance
//   const updateAttendance = async (attendanceId, newStatus) => {
//     const attendanceToUpdate = attendanceData.find(att => att.id === attendanceId);
//     const today = new Date().toISOString().split('T')[0];

//     // Check if the attendance is for today's date
//     if (attendanceToUpdate && attendanceToUpdate.scheduled_class_date === today) {
//       try {
//         const response = await axios.put(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//           status: newStatus,
//           student: selectedAttendance.student,
//           class_schedule: selectedAttendance.class_schedule,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAttendanceData(
//           attendanceData.map(attendance =>
//             attendance.id === attendanceId ? { ...attendance, status: newStatus } : attendance
//           )
//         );
//         setSelectedAttendance(null);
//         toast.success('Attendance updated successfully!');
//       } catch (error) {
//         toast.error('Failed to update attendance.');
//       }
//     } else {
//       toast.error('Attendance can only be updated for today\'s date.');
//     }
//   };

//   // Handle deleting attendance
//   const deleteAttendance = async (attendanceId) => {
//     const attendanceToDelete = attendanceData.find(att => att.id === attendanceId);
//     const today = new Date().toISOString().split('T')[0];

//     // Check if the attendance is for today's date
//     if (attendanceToDelete && attendanceToDelete.scheduled_class_date === today) {
//       try {
//         await axios.delete(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAttendanceData(attendanceData.filter(attendance => attendance.id !== attendanceId));
//         toast.success('Attendance deleted successfully!');
//       } catch (error) {
//         toast.error('Failed to delete attendance.');
//       }
//     } else {
//       toast.error('Attendance can only be deleted for today\'s date.');
//     }
//   };

//   return (
//     <div className={styles.attendanceContainer}>
//       <ToastContainer />
//       <h1 className={styles.heading}>Instructor Attendance</h1>

//       <div className={styles.attendanceList}>
//         {attendanceData.map(attendance => (
//           <div key={attendance.id} className={styles.attendanceCard}>
//             <p><strong>Student Name:</strong> {attendance.student_name}</p>
//             <p><strong>Class:</strong> {attendance.class_schedule_info}</p>
//             <p><strong>Scheduled Class Date:</strong> {attendance.scheduled_class_date}</p> {/* Display Scheduled Class Date */}
//             <p><strong>Status:</strong> {attendance.status}</p>
//             <button
//               className={styles.updateBtn}
//               onClick={() => {
//                 setSelectedAttendance(attendance);
//                 setStatus(attendance.status);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className={styles.deleteBtn}
//               onClick={() => deleteAttendance(attendance.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedAttendance && (
//         <div className={styles.updateForm}>
//           <h2>Update Attendance</h2>
//           <label>
//             New Status:
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option value="PRESENT">Present</option>
//               <option value="ABSENT">Absent</option>
//             </select>
//           </label>
//           <button
//             className={styles.submitBtn}
//             onClick={() => updateAttendance(selectedAttendance.id, status)}
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorAttendance;

























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAttendance.module.css';

// const InstructorAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [classScheduleData, setClassScheduleData] = useState([]);
//   const [selectedAttendance, setSelectedAttendance] = useState(null);
//   const [status, setStatus] = useState('PRESENT');

//   // Fetch the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   useEffect(() => {
//     fetchAttendance();
//     fetchClassSchedules();
//   }, []);

//   // Fetch attendance data
//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/attendance/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(response.data);
//       toast.success('Attendance data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching attendance data.');
//     }
//   };

//   // Fetch class schedule data
//   const fetchClassSchedules = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassScheduleData(response.data);
//     } catch (error) {
//       toast.error('Error fetching class schedule data.');
//     }
//   };

//   // Handle marking attendance (with class schedule validation)
//   const markAttendance = async (studentId, classScheduleId, attendanceStatus) => {
//     // Find the scheduled class and check if it matches today's date
//     const scheduledClass = classScheduleData.find(schedule => schedule.id === classScheduleId);
//     const today = new Date().toISOString().split('T')[0];

//     if (scheduledClass && scheduledClass.date === today) {
//       try {
//         const response = await axios.post('http://localhost:8000/api/attendance/', {
//           class_schedule: classScheduleId,
//           student: studentId,
//           status: attendanceStatus,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAttendanceData([...attendanceData, response.data]); // Update UI with new data
//         toast.success('Attendance marked successfully!');
//       } catch (error) {
//         toast.error('Failed to mark attendance.');
//       }
//     } else {
//       toast.error('Attendance can only be marked for scheduled classes on today\'s date.');
//     }
//   };

//   // Handle updating attendance
//   const updateAttendance = async (attendanceId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         status: newStatus,
//         student: selectedAttendance.student,
//         class_schedule: selectedAttendance.class_schedule,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(
//         attendanceData.map(attendance =>
//           attendance.id === attendanceId ? { ...attendance, status: newStatus } : attendance
//         )
//       );
//       setSelectedAttendance(null);
//       toast.success('Attendance updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update attendance.');
//     }
//   };

//   // Handle deleting attendance
//   const deleteAttendance = async (attendanceId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(attendanceData.filter(attendance => attendance.id !== attendanceId));
//       toast.success('Attendance deleted successfully!');
//     } catch (error) {
//       toast.error('Failed to delete attendance.');
//     }
//   };

//   return (
//     <div className={styles.attendanceContainer}>
//       <ToastContainer />
//       <h1 className={styles.heading}>Instructor Attendance</h1>

//       <div className={styles.attendanceList}>
//         {attendanceData.map(attendance => (
//           <div key={attendance.id} className={styles.attendanceCard}>
//             <p><strong>Student Name:</strong> {attendance.student_name}</p>
//             <p><strong>Class:</strong> {attendance.class_schedule_info}</p>
//             <p><strong>Date:</strong> {attendance.date}</p>
//             <p><strong>Status:</strong> {attendance.status}</p>
//             <button
//               className={styles.updateBtn}
//               onClick={() => {
//                 setSelectedAttendance(attendance);
//                 setStatus(attendance.status);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className={styles.deleteBtn}
//               onClick={() => deleteAttendance(attendance.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedAttendance && (
//         <div className={styles.updateForm}>
//           <h2>Update Attendance</h2>
//           <label>
//             New Status:
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option value="PRESENT">Present</option>
//               <option value="ABSENT">Absent</option>
//             </select>
//           </label>
//           <button
//             className={styles.submitBtn}
//             onClick={() => updateAttendance(selectedAttendance.id, status)}
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorAttendance;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAttendance.module.css';

// const InstructorAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [classScheduleData, setClassScheduleData] = useState([]);
//   const [selectedAttendance, setSelectedAttendance] = useState(null);
//   const [status, setStatus] = useState('PRESENT');
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1NTQ2LCJpYXQiOjE3MjczMjkxNDYsImp0aSI6ImMyNzBhNGM1ZDU0MDQ4ZDI4OTdiYmM3NGFkNmUxYjE3IiwidXNlcl9pZCI6Mn0.37TrebGRwGGRANMHNbVpLDN711SKW9srAxESPJm8cFA'; // Replace with actual JWT token

//   useEffect(() => {
//     fetchAttendance();
//     fetchClassSchedules();
//   }, []);

//   // Fetch attendance data
//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/attendance/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(response.data);
//       toast.success('Attendance data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching attendance data.');
//     }
//   };

//   // Fetch class schedule data
//   const fetchClassSchedules = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/class-schedule/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setClassScheduleData(response.data);
//     } catch (error) {
//       toast.error('Error fetching class schedule data.');
//     }
//   };

//   // Handle marking attendance (with class schedule validation)
//   const markAttendance = async (studentId, classScheduleId, attendanceStatus) => {
//     // Find the scheduled class and check if it matches today's date
//     const scheduledClass = classScheduleData.find(schedule => schedule.id === classScheduleId);
//     const today = new Date().toISOString().split('T')[0];

//     if (scheduledClass && scheduledClass.date === today) {
//       try {
//         const response = await axios.post('http://localhost:8000/api/attendance/', {
//           class_schedule: classScheduleId,
//           student: studentId,
//           status: attendanceStatus,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAttendanceData([...attendanceData, response.data]); // Update UI with new data
//         toast.success('Attendance marked successfully!');
//       } catch (error) {
//         toast.error('Failed to mark attendance.');
//       }
//     } else {
//       toast.error('Attendance can only be marked for scheduled classes on today\'s date.');
//     }
//   };

//   // Handle updating attendance
//   const updateAttendance = async (attendanceId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         status: newStatus,
//         student: selectedAttendance.student,
//         class_schedule: selectedAttendance.class_schedule,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(
//         attendanceData.map(attendance =>
//           attendance.id === attendanceId ? { ...attendance, status: newStatus } : attendance
//         )
//       );
//       setSelectedAttendance(null);
//       toast.success('Attendance updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update attendance.');
//     }
//   };

//   // Handle deleting attendance
//   const deleteAttendance = async (attendanceId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(attendanceData.filter(attendance => attendance.id !== attendanceId));
//       toast.success('Attendance deleted successfully!');
//     } catch (error) {
//       toast.error('Failed to delete attendance.');
//     }
//   };

//   return (
//     <div className={styles.attendanceContainer}>
//       <ToastContainer />
//       <h1 className={styles.heading}>Instructor Attendance</h1>

//       <div className={styles.attendanceList}>
//         {attendanceData.map(attendance => (
//           <div key={attendance.id} className={styles.attendanceCard}>
//             <p><strong>Student Name:</strong> {attendance.student_name}</p>
//             <p><strong>Class:</strong> {attendance.class_schedule_info}</p>
//             <p><strong>Date:</strong> {attendance.date}</p>
//             <p><strong>Status:</strong> {attendance.status}</p>
//             <button
//               className={styles.updateBtn}
//               onClick={() => {
//                 setSelectedAttendance(attendance);
//                 setStatus(attendance.status);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className={styles.deleteBtn}
//               onClick={() => deleteAttendance(attendance.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedAttendance && (
//         <div className={styles.updateForm}>
//           <h2>Update Attendance</h2>
//           <label>
//             New Status:
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option value="PRESENT">Present</option>
//               <option value="ABSENT">Absent</option>
//             </select>
//           </label>
//           <button
//             className={styles.submitBtn}
//             onClick={() => updateAttendance(selectedAttendance.id, status)}
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorAttendance;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAttendance.module.css';

// const InstructorAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [selectedAttendance, setSelectedAttendance] = useState(null);
//   const [status, setStatus] = useState('PRESENT');
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MzM0NTE1LCJpYXQiOjE3MjcyNDgxMTUsImp0aSI6IjMwODBhMWFhZDcwNDQ0NjQ4Mzk4YWQyZWQxNDIwY2ZhIiwidXNlcl9pZCI6Mn0.47fvN19WcMKBiweIVh6NffhKz1VkpbhSigII2LzKBxw';

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   // Fetch attendance data
//   const fetchAttendance = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/attendance/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(response.data);
//       toast.success('Attendance data fetched successfully!');
//     } catch (error) {
//       toast.error('Error fetching attendance data.');
//     }
//   };

//   // Handle marking attendance
//   const markAttendance = async (studentId, classScheduleId, attendanceStatus) => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/attendance/', {
//         class_schedule: classScheduleId,
//         student: studentId,
//         status: attendanceStatus,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData([...attendanceData, response.data]); // Update UI with new data
//       toast.success('Attendance marked successfully!');
//     } catch (error) {
//       toast.error('Failed to mark attendance.');
//     }
//   };

//   // Handle updating attendance
//   const updateAttendance = async (attendanceId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         status: newStatus,
//         student: selectedAttendance.student,
//         class_schedule: selectedAttendance.class_schedule,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(
//         attendanceData.map(attendance =>
//           attendance.id === attendanceId ? { ...attendance, status: newStatus } : attendance
//         )
//       );
//       setSelectedAttendance(null);
//       toast.success('Attendance updated successfully!');
//     } catch (error) {
//       toast.error('Failed to update attendance.');
//     }
//   };

//   // Handle deleting attendance
//   const deleteAttendance = async (attendanceId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/attendance/${attendanceId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAttendanceData(attendanceData.filter(attendance => attendance.id !== attendanceId));
//       toast.success('Attendance deleted successfully!');
//     } catch (error) {
//       toast.error('Failed to delete attendance.');
//     }
//   };

//   return (
//     <div className={styles.attendanceContainer}>
//       <ToastContainer />
//       <h1 className={styles.heading}>Instructor Attendance</h1>
//       <div className={styles.attendanceList}>
//         {attendanceData.map(attendance => (
//           <div key={attendance.id} className={styles.attendanceCard}>
//             <p><strong>Student Name:</strong> {attendance.student_name}</p>
//             <p><strong>Class:</strong> {attendance.class_schedule_info}</p>
//             <p><strong>Status:</strong> {attendance.status}</p>
//             <button
//               className={styles.updateBtn}
//               onClick={() => {
//                 setSelectedAttendance(attendance);
//                 setStatus(attendance.status);
//               }}
//             >
//               Update
//             </button>
//             <button
//               className={styles.deleteBtn}
//               onClick={() => deleteAttendance(attendance.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedAttendance && (
//         <div className={styles.updateForm}>
//           <h2>Update Attendance</h2>
//           <label>
//             New Status:
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option value="PRESENT">Present</option>
//               <option value="ABSENT">Absent</option>
//             </select>
//           </label>
//           <button
//             className={styles.submitBtn}
//             onClick={() => updateAttendance(selectedAttendance.id, status)}
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorAttendance;
