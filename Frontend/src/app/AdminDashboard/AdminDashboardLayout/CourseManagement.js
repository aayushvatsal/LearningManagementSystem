import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../Styles/CourseManagement.module.css';

// ChartJS setup (import as needed)
// import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', instructor: '', status: 'Active' });
  const [editCourseId, setEditCourseId] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MTI0OTkxLCJpYXQiOjE3MjcwMzg1OTEsImp0aSI6ImVmYWQ5MDUwZDUyYTQ1YTdiYTA4ZGU5YzE5MjkwOTVlIiwidXNlcl9pZCI6M30.iLAmEwJ05WJeWHJo1khMSJ_-Qbc9CvSOVLZBRr2G8vs';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/courses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Error fetching courses');
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.title,
        description: 'A new course',
        duration: 30, // Example duration
        prerequisites: 'Basic knowledge',
        instructor: formData.instructor,
        users: [6], // Example users array
      };

      const response = await axios.post(
        'http://localhost:8000/auth/courses/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCourses([...courses, response.data]); // Update the courses list
      setFormData({ title: '', instructor: '', status: 'Active' }); // Reset form
    } catch (err) {
      console.error('Error adding course:', err.response?.data || err.message);
      setError('Error adding course');
    }
  };

  // Edit course details
  const handleEditCourse = async (id) => {
    try {
      const payload = {
        name: formData.title,
        description: 'Updated course description',
        duration: 30,
        prerequisites: 'Basic knowledge',
        instructor: formData.instructor,
        users: [6], 
      };

      await axios.put(
        `http://localhost:8000/auth/courses/${id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCourses(courses.map((course) => (course.id === id ? { ...course, ...payload } : course)));
      setEditCourseId(null);
      setFormData({ title: '', instructor: '', status: 'Active' });
    } catch (err) {
      console.error('Error updating course:', err.response?.data || err.message);
      setError('Error updating course');
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/auth/courses/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err.response?.data || err.message);
      setError('Error deleting course');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.courseManagementContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Course Management</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.courseListSection}>
          <h2 className={styles.sectionTitle}>Course List</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.courseTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Instructor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.instructor}</td>
                    <td>{course.status}</td>
                    <td>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => {
                          setEditCourseId(course.id);
                          setFormData({ title: course.name, instructor: course.instructor, status: course.status });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className={styles.addCourseSection}>
          <h2 className={styles.sectionTitle}>{editCourseId ? 'Edit Course' : 'Add New Course'}</h2>
          <form className={styles.addCourseForm} onSubmit={editCourseId ? (e) => {e.preventDefault(); handleEditCourse(editCourseId);} : handleAddCourse}>
            <label htmlFor="title">Course Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="instructor">Instructor (ID):</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button type="submit" className={styles.submitButton}>
              {editCourseId ? 'Update Course' : 'Add Course'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CourseManagement;
