import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserGraduate } from 'react-icons/fa';
import styles from '../../../Styles/dashboardcourses.module.css';

const StudentCourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState(null); // Store student ID based on token

  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!token) {
          throw new Error("No access token found");
        }

        // Decode JWT token to extract the user ID
        const tokenParts = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(tokenParts));
        const userId = decodedPayload.user_id;
        setStudentId(userId);

        const response = await axios.get('http://localhost:8000/auth/courses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Filter courses where the student is enrolled
        const enrolledCourses = response.data.filter(course => 
          course.users.includes(userId)
        );
        setCourses(enrolledCourses);

        toast.success('Courses loaded successfully!');
      } catch (error) {
        toast.error('Failed to load courses');
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className={styles.courseDashboard}>
      {/* Toast Container */}
      <ToastContainer />
      <div className={styles.courseGrid}>
        {courses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseIcon}><FaUserGraduate /></div> {/* Student-focused icon */}
              <h3 className={styles.courseName}>{course.name}</h3>
              <p className={styles.courseDescription}>{course.description}</p>
              <div className={styles.courseInstructor}>
                <strong>Instructor:</strong> {course.instructor_name}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentCourseDashboard;




















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUserGraduate } from 'react-icons/fa';
// import styles from '../../../Styles/dashboardcourses.module.css';

// const StudentCourseDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [studentId, setStudentId] = useState(null); // Store student ID based on token
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1MzMyLCJpYXQiOjE3MjczMjg5MzIsImp0aSI6IjE5YzgyMWEzMzMzOTRlZDU4ODE4ZThhZGYzYWVkZDkwIiwidXNlcl9pZCI6OH0.1g7wZCQePqDFrT4T3fxfUb3dv3QH39mrhwzlq_ksz0M'; // Replace with actual token

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         // Extract the user ID from the token payload
//         const tokenParts = token.split('.')[1];
//         const decodedPayload = JSON.parse(atob(tokenParts));
//         setStudentId(decodedPayload.user_id); // Set student ID

//         const response = await axios.get('http://localhost:8000/auth/courses/', {
//           headers: {
//             Authorization: token,
//           },
//         });
        
//         // Filter courses where the student is enrolled
//         const enrolledCourses = response.data.filter(course => 
//           course.users.includes(decodedPayload.user_id)
//         );
//         setCourses(enrolledCourses);

//         toast.success('Courses loaded successfully!');
//       } catch (error) {
//         toast.error('Failed to load courses');
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, [token]);

//   return (
//     <div className={styles.courseDashboard}>
//       {/* Toast Container */}
//       <ToastContainer />
//       <div className={styles.courseGrid}>
//         {courses.length === 0 ? (
//           <p>No courses enrolled yet.</p>
//         ) : (
//           courses.map(course => (
//             <div key={course.id} className={styles.courseCard}>
//               <div className={styles.courseIcon}><FaUserGraduate /></div> {/* Student-focused icon */}
//               <h3 className={styles.courseName}>{course.name}</h3>
//               <p className={styles.courseDescription}>{course.description}</p>
//               <div className={styles.courseInstructor}>
//                 <strong>Instructor:</strong> {course.instructor_name}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentCourseDashboard;

