import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../Styles/ManageCourses.module.css";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  // Fetch courses from the backend API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/courses/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
      toast.success("Courses loaded successfully!");
    } catch (error) {
      setError("Failed to load courses");
      toast.error("Error fetching courses");
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, [token]);

  // Filter courses based on the active tab
  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.status === activeTab);

  if (loading) {
    return <div className={styles.loading}>Loading courses...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.lmsManageCoursesContainer}>
      {/* Toast notifications */}
      <ToastContainer />

      {/* Header */}
      <header className={styles.lmsHeader}>
        <h1 className={styles.lmsManageCoursesTitle}>Manage Your Courses</h1>
        <nav className={styles.lmsCourseTabNavigation}>
          {['all', 'active', 'draft', 'archived'].map((tab) => (
            <button
              key={tab}
              className={`${styles.lmsCourseTabButton} ${activeTab === tab ? styles.lmsCourseTabButtonActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Courses
            </button>
          ))}
        </nav>
      </header>

      {/* Courses Table */}
      <section className={styles.lmsCourseListSection}>
        <table className={styles.lmsCourseTable}>
          <thead className={styles.lmsCourseTableHeader}>
            <tr>
              <th className={styles.lmsCourseTableHeaderCell}>Course Title</th>
              <th className={styles.lmsCourseTableHeaderCell}>Students Enrolled</th>
              <th className={styles.lmsCourseTableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <tr key={course.id} className={styles.lmsCourseTableRow}>
                <td className={styles.lmsCourseTableCell}>{course.name}</td>
                <td className={styles.lmsCourseTableCell}>
                  {course.user_names.map(user => (
                    <div key={user.id} className={styles.lmsStudentName}>
                      {user.name}
                    </div>
                  ))}
                </td>
                <td className={styles.lmsCourseTableCell}>
                  <span className={`${styles.lmsCourseStatus} ${styles[`lmsCourseStatus${course.status}`]}`}>
                    {course.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Course Analytics */}
      <section className={styles.lmsCourseAnalyticsSection}>
        <h2 className={styles.lmsSectionTitle}>Course Analytics</h2>
        <div className={styles.lmsAnalyticsGrid}>
          <div className={styles.lmsAnalyticsCard}>
            <h3 className={styles.lmsAnalyticsCardTitle}>Total Courses</h3>
            <p className={styles.lmsAnalyticsCardNumber}>{courses.length}</p>
          </div>
          <div className={styles.lmsAnalyticsCard}>
            <h3 className={styles.lmsAnalyticsCardTitle}>Active Courses</h3>
            <p className={styles.lmsAnalyticsCardNumber}>
              {courses.filter(course => course.status === 'active').length}
            </p>
          </div>
          <div className={styles.lmsAnalyticsCard}>
            <h3 className={styles.lmsAnalyticsCardTitle}>Total Students</h3>
            <p className={styles.lmsAnalyticsCardNumber}>
              {courses.reduce((total, course) => total + course.users.length, 0)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageCourses;






















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "../../../Styles/ManageCourses.module.css";

// const ManageCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('all');

//   // Instructor's JWT token
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1NTQ2LCJpYXQiOjE3MjczMjkxNDYsImp0aSI6ImMyNzBhNGM1ZDU0MDQ4ZDI4OTdiYmM3NGFkNmUxYjE3IiwidXNlcl9pZCI6Mn0.37TrebGRwGGRANMHNbVpLDN711SKW9srAxESPJm8cFA';

//   // Fetch courses from the backend API
//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/auth/courses/', {
//         headers: { Authorization: token }
//       });
//       setCourses(response.data);
//       toast.success("Courses loaded successfully!");
//     } catch (error) {
//       setError("Failed to load courses");
//       toast.error("Error fetching courses");
//       console.error("Error fetching courses", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Effect to fetch courses on component mount
//   useEffect(() => {
//     fetchCourses();
//   }, [token]);

//   // Filter courses based on the active tab
//   const filteredCourses = activeTab === 'all'
//     ? courses
//     : courses.filter(course => course.status === activeTab);

//   if (loading) {
//     return <div className={styles.loading}>Loading courses...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   return (
//     <div className={styles.lmsManageCoursesContainer}>
//       {/* Toast notifications */}
//       <ToastContainer />

//       {/* Header */}
//       <header className={styles.lmsHeader}>
//         <h1 className={styles.lmsManageCoursesTitle}>Manage Your Courses</h1>
//         <nav className={styles.lmsCourseTabNavigation}>
//           {['all', 'active', 'draft', 'archived'].map((tab) => (
//             <button
//               key={tab}
//               className={`${styles.lmsCourseTabButton} ${activeTab === tab ? styles.lmsCourseTabButtonActive : ''}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)} Courses
//             </button>
//           ))}
//         </nav>
//       </header>

//       {/* Courses Table */}
//       <section className={styles.lmsCourseListSection}>
//         <table className={styles.lmsCourseTable}>
//           <thead className={styles.lmsCourseTableHeader}>
//             <tr>
//               <th className={styles.lmsCourseTableHeaderCell}>Course Title</th>
//               <th className={styles.lmsCourseTableHeaderCell}>Students Enrolled</th>
//               <th className={styles.lmsCourseTableHeaderCell}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCourses.map(course => (
//               <tr key={course.id} className={styles.lmsCourseTableRow}>
//                 <td className={styles.lmsCourseTableCell}>{course.name}</td>
//                 <td className={styles.lmsCourseTableCell}>
//                   {course.user_names.map(user => (
//                     <div key={user.id} className={styles.lmsStudentName}>
//                       {user.name}
//                     </div>
//                   ))}
//                 </td>
//                 <td className={styles.lmsCourseTableCell}>
//                   <span className={`${styles.lmsCourseStatus} ${styles[`lmsCourseStatus${course.status}`]}`}>
//                     {course.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Course Analytics */}
//       <section className={styles.lmsCourseAnalyticsSection}>
//         <h2 className={styles.lmsSectionTitle}>Course Analytics</h2>
//         <div className={styles.lmsAnalyticsGrid}>
//           <div className={styles.lmsAnalyticsCard}>
//             <h3 className={styles.lmsAnalyticsCardTitle}>Total Courses</h3>
//             <p className={styles.lmsAnalyticsCardNumber}>{courses.length}</p>
//           </div>
//           <div className={styles.lmsAnalyticsCard}>
//             <h3 className={styles.lmsAnalyticsCardTitle}>Active Courses</h3>
//             <p className={styles.lmsAnalyticsCardNumber}>
//               {courses.filter(course => course.status === 'active').length}
//             </p>
//           </div>
//           <div className={styles.lmsAnalyticsCard}>
//             <h3 className={styles.lmsAnalyticsCardTitle}>Total Students</h3>
//             <p className={styles.lmsAnalyticsCardNumber}>
//               {courses.reduce((total, course) => total + course.users.length, 0)}
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ManageCourses;

