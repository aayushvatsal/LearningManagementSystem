import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../Styles/InstructorAssignment.module.css';

const InstructorAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    due_date: '',
    resources: ''
  });
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
  const [submissions, setSubmissions] = useState([]); // Holds all submissions
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [submissionId, setSubmissionId] = useState(''); // For entering the submission ID
  const [submissionDetails, setSubmissionDetails] = useState(null); // Holds the details of the fetched submission
  const [isEditMode, setIsEditMode] = useState(false);

  const token = localStorage.getItem('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Fetch all assignments
  useEffect(() => {
    axios.get('http://localhost:8000/api/assignments/', { headers })
      .then((response) => {
        setAssignments(response.data);
        toast.success('Assignments fetched successfully');
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to fetch assignments');
        }
      });
  }, [token]);

  // Fetch all submissions
  useEffect(() => {
    axios.get('http://localhost:8000/api/instructor/submissions/', { headers })
      .then((response) => {
        setSubmissions(response.data);
        toast.success('Submissions fetched successfully');
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to fetch submissions');
        }
      });
  }, [token]);

  // Handle input change for creating/editing assignments
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  // Create a new assignment
  const createAssignment = () => {
    axios.post('http://localhost:8000/api/assignments/', newAssignment, { headers })
      .then((response) => {
        toast.success('Assignment created successfully!');
        setAssignments([...assignments, response.data]);
        setNewAssignment({ title: '', description: '', due_date: '', resources: '' });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to create assignment');
        }
      });
  };

  // Edit an existing assignment
  const editAssignment = (assignmentId) => {
    axios.put(`http://localhost:8000/api/assignments/${assignmentId}/`, newAssignment, { headers })
      .then((response) => {
        toast.success('Assignment updated successfully!');
        const updatedAssignments = assignments.map((assignment) =>
          assignment.id === assignmentId ? response.data : assignment
        );
        setAssignments(updatedAssignments);
        setNewAssignment({ title: '', description: '', due_date: '', resources: '' });
        setIsEditMode(false);
        setSelectedAssignmentId(null);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to update assignment');
        }
      });
  };

  // Delete an assignment
  const deleteAssignment = (assignmentId) => {
    axios.delete(`http://localhost:8000/api/assignments/${assignmentId}/`, { headers })
      .then(() => {
        toast.success('Assignment deleted successfully!');
        const remainingAssignments = assignments.filter((assignment) => assignment.id !== assignmentId);
        setAssignments(remainingAssignments);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to delete assignment');
        }
      });
  };

  // Fetch submission details using submission ID
  const fetchSubmissionById = () => {
    if (!submissionId) {
      toast.error('Please enter a submission ID');
      return;
    }

    axios
      .get(`http://localhost:8000/api/submissions/${submissionId}/`, { headers })
      .then((response) => {
        setSubmissionDetails(response.data);
        toast.success('Submission fetched successfully');
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          toast.error('Submission not found');
        } else if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else {
          toast.error('Failed to fetch submission');
        }
      });
  };

  // Handle grading input change
  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setGradeData({ ...gradeData, [name]: value });
  };

  // Submit the grade for an assignment
  const gradeAssignment = (submissionId) => {
    axios.post(`http://localhost:8000/api/assignments/${submissionId}/grade/`, gradeData, { headers })
      .then(() => {
        toast.success('Assignment graded successfully!');
        setGradeData({ grade: '', feedback: '' });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please check your token');
        } else if (error.response?.status === 403) {
          toast.error('Forbidden: You don\'t have permission to grade submissions');
        } else {
          toast.error('Failed to grade assignment');
        }
      });
  };

  return (
    <div className={styles.assignmentContainer}>
      <ToastContainer />
      <h1>Instructor Assignments</h1>

      {/* Form for creating/editing assignments */}
      <section>
        <h2>{isEditMode ? 'Edit Assignment' : 'Create Assignment'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAssignment.title}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newAssignment.description}
          onChange={handleInputChange}
          className={styles.textareaField}
        />
        <input
          type="date"
          name="due_date"
          value={newAssignment.due_date}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <input
          type="text"
          name="resources"
          placeholder="Resources (URL)"
          value={newAssignment.resources}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        <button
          className={styles.createAssignmentButton}
          onClick={isEditMode ? () => editAssignment(selectedAssignmentId) : createAssignment}
        >
          {isEditMode ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </section>

      {/* Display existing assignments */}
      <section className={styles.assignmentSection}>
        <h2>Assignments</h2>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id} className={styles.assignmentItem}>
              <h3>{assignment.title}</h3>
              <button
                className={styles.editButton}
                onClick={() => {
                  setIsEditMode(true);
                  setSelectedAssignmentId(assignment.id);
                  setNewAssignment({
                    title: assignment.title,
                    description: assignment.description,
                    due_date: assignment.due_date,
                    resources: assignment.resources,
                  });
                }}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteAssignment(assignment.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Display submissions in tabular format */}
      <section className={styles.submissionSection}>
        <h2>Submitted Assignments</h2>
        <table className={styles.submissionTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Assignment</th>
              <th>Submitted On</th>
              <th>Submission File</th>
              <th>Grade</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.id}</td>
                <td>{submission.student}</td>
                <td>{submission.assignment}</td>
                <td>{new Date(submission.submitted_on).toLocaleString()}</td>
                <td>
                  <a href={submission.submission_file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </td>
                <td>{submission.grade ? submission.grade : 'Not Graded'}</td>
                <td>{submission.feedback ? submission.feedback : 'No Feedback'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Input for fetching a submission by ID */}
      <section className={styles.submissionSection}>
        <h2>View Submission by ID</h2>
        <input
          type="text"
          placeholder="Enter Submission ID"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
          className={styles.inputField}
        />
        <button
          className={styles.viewSubmissionButton}
          onClick={fetchSubmissionById}
        >
          View Submission
        </button>
      </section>

      {/* Display submission details */}
      {submissionDetails && (
        <section className={styles.submissionDetailsSection}>
          <h2>Submission Details</h2>
          <p><strong>Student:</strong> {submissionDetails.student}</p>
          <p><strong>Assignment ID:</strong> {submissionDetails.assignment}</p>
          <p><strong>Submitted On:</strong> {new Date(submissionDetails.submitted_on).toLocaleString()}</p>
          <a href={submissionDetails.submission_file} target="_blank" rel="noopener noreferrer">
            View Submission File
          </a>
          {submissionDetails.grade ? (
            <>
              <p><strong>Grade:</strong> {submissionDetails.grade}</p>
              <p><strong>Feedback:</strong> {submissionDetails.feedback}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={gradeData.grade}
                onChange={handleGradeChange}
                className={styles.inputField}
              />
              <textarea
                name="feedback"
                placeholder="Feedback"
                value={gradeData.feedback}
                onChange={handleGradeChange}
                className={styles.textareaField}
              />
              <button
                className={styles.submitGradeButton}
                onClick={() => gradeAssignment(submissionDetails.id)}
              >
                Submit Grade
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default InstructorAssignment;


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAssignment.module.css';

// const InstructorAssignment = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [newAssignment, setNewAssignment] = useState({
//     title: '',
//     description: '',
//     due_date: '',
//     resources: ''
//   });
//   const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
//   const [submissions, setSubmissions] = useState([]); // Holds submissions fetched for a specific assignment
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
//   const [submissionId, setSubmissionId] = useState(''); // For entering the submission ID
//   const [submissionDetails, setSubmissionDetails] = useState(null); // Holds the details of the fetched submission
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isGraded, setIsGraded] = useState(false);

//   // Get the access token from localStorage
//   const token = localStorage.getItem('accessToken');

//   // Common headers with Authorization
//   const headers = {
//     Authorization: `Bearer ${token}`, // Use dynamic token from localStorage
//     'Content-Type': 'application/json',
//   };

//   // Fetch all assignments
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/assignments/', { headers })
//       .then((response) => {
//         setAssignments(response.data);
//         toast.success('Assignments fetched successfully');
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to fetch assignments');
//         }
//       });
//   }, [token]);

//   // Handle input change for creating/editing assignments
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment({ ...newAssignment, [name]: value });
//   };

//   // Create a new assignment
//   const createAssignment = () => {
//     axios.post('http://localhost:8000/api/assignments/', newAssignment, { headers })
//       .then((response) => {
//         toast.success('Assignment created successfully!');
//         setAssignments([...assignments, response.data]); // Update state with new assignment
//         setNewAssignment({ title: '', description: '', due_date: '', resources: '' }); // Clear form
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to create assignment');
//         }
//       });
//   };

//   // Edit an existing assignment
//   const editAssignment = (assignmentId) => {
//     axios.put(`http://localhost:8000/api/assignments/${assignmentId}/`, newAssignment, { headers })
//       .then((response) => {
//         toast.success('Assignment updated successfully!');
//         const updatedAssignments = assignments.map((assignment) =>
//           assignment.id === assignmentId ? response.data : assignment
//         );
//         setAssignments(updatedAssignments); // Update state
//         setNewAssignment({ title: '', description: '', due_date: '', resources: '' }); // Clear form
//         setIsEditMode(false); // Exit edit mode
//         setSelectedAssignmentId(null); // Clear selected assignment ID
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to update assignment');
//         }
//       });
//   };

//   // Delete an assignment
//   const deleteAssignment = (assignmentId) => {
//     axios.delete(`http://localhost:8000/api/assignments/${assignmentId}/`, { headers })
//       .then(() => {
//         toast.success('Assignment deleted successfully!');
//         const remainingAssignments = assignments.filter((assignment) => assignment.id !== assignmentId);
//         setAssignments(remainingAssignments); // Update state
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to delete assignment');
//         }
//       });
//   };

//   // Fetch submission details using submission ID
//   const fetchSubmissionById = () => {
//     if (!submissionId) {
//       toast.error('Please enter a submission ID');
//       return;
//     }

//     axios
//       .get(`http://localhost:8000/api/submissions/${submissionId}/`, { headers })
//       .then((response) => {
//         setSubmissionDetails(response.data);
//         toast.success('Submission fetched successfully');
//       })
//       .catch((error) => {
//         if (error.response?.status === 404) {
//           toast.error('Submission not found');
//         } else if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to fetch submission');
//         }
//       });
//   };

//   // Handle grading input change
//   const handleGradeChange = (e) => {
//     const { name, value } = e.target;
//     setGradeData({ ...gradeData, [name]: value });
//   };

//   // Submit the grade for an assignment
//   const gradeAssignment = (submissionId) => {
//     axios.post(`http://localhost:8000/api/assignments/${submissionId}/grade/`, gradeData, { headers })
//       .then(() => {
//         toast.success('Assignment graded successfully!');
//         setGradeData({ grade: '', feedback: '' }); // Clear grade form
//         setIsGraded(true); // Mark the assignment as graded
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else if (error.response?.status === 403) {
//           toast.error('Forbidden: You don\'t have permission to grade submissions');
//         } else {
//           toast.error('Failed to grade assignment');
//         }
//       });
//   };

//   return (
//     <div className={styles.assignmentContainer}>
//       <ToastContainer />
//       <h1>Instructor Assignments</h1>

//       {/* Form for creating/editing assignments */}
//       <section>
//         <h2>{isEditMode ? 'Edit Assignment' : 'Create Assignment'}</h2>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newAssignment.title}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={newAssignment.description}
//           onChange={handleInputChange}
//           className={styles.textareaField}
//         />
//         <input
//           type="date"
//           name="due_date"
//           value={newAssignment.due_date}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <input
//           type="text"
//           name="resources"
//           placeholder="Resources (URL)"
//           value={newAssignment.resources}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <button
//           className={styles.createAssignmentButton}
//           onClick={isEditMode ? () => editAssignment(selectedAssignmentId) : createAssignment}
//         >
//           {isEditMode ? 'Update Assignment' : 'Create Assignment'}
//         </button>
//       </section>

//       {/* Display existing assignments */}
//       <section className={styles.AssignmentSection}>
//         <h2>Assignments</h2>
//         <ul>
//           {assignments.map((assignment) => (
//             <li key={assignment.id} className={styles.assignmentItem}>
//               <h3>{assignment.title}</h3>
//               <button
//                 className={styles.editButton}
//                 onClick={() => {
//                   setIsEditMode(true);
//                   setSelectedAssignmentId(assignment.id);
//                   setNewAssignment({
//                     title: assignment.title,
//                     description: assignment.description,
//                     due_date: assignment.due_date,
//                     resources: assignment.resources,
//                   });
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className={styles.deleteButton}
//                 onClick={() => deleteAssignment(assignment.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Input for fetching a submission by ID */}
//       <section className={styles.submissionSection}>
//         <h2>View Submission by ID</h2>
//         <input
//           type="text"
//           placeholder="Enter Submission ID"
//           value={submissionId}
//           onChange={(e) => setSubmissionId(e.target.value)}
//           className={styles.inputField}
//         />
//         <button
//           className={styles.viewSubmissionButton}
//           onClick={fetchSubmissionById}
//         >
//           View Submission
//         </button>
//       </section>

//       {/* Display submission details */}
//       {submissionDetails && (
//         <section className={styles.submissionDetailsSection}>
//           <h2>Submission Details</h2>
//           <p><strong>Student:</strong> {submissionDetails.student}</p>
//           <p><strong>Assignment ID:</strong> {submissionDetails.assignment}</p>
//           <p><strong>Submitted On:</strong> {new Date(submissionDetails.submitted_on).toLocaleString()}</p>
//           <a href={submissionDetails.submission_file} target="_blank" rel="noopener noreferrer">
//             View Submission File
//           </a>
//           {submissionDetails.grade ? (
//             <>
//               <p><strong>Grade:</strong> {submissionDetails.grade}</p>
//               <p><strong>Feedback:</strong> {submissionDetails.feedback}</p>
//             </>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 name="grade"
//                 placeholder="Grade"
//                 value={gradeData.grade}
//                 onChange={handleGradeChange}
//                 className={styles.inputField}
//               />
//               <textarea
//                 name="feedback"
//                 placeholder="Feedback"
//                 value={gradeData.feedback}
//                 onChange={handleGradeChange}
//                 className={styles.textareaField}
//               />
//               <button
//                 className={styles.submitGradeButton}
//                 onClick={() => gradeAssignment(submissionDetails.id)}
//               >
//                 Submit Grade
//               </button>
//             </>
//           )}
//         </section>
//       )}
//     </div>
//   );
// };

// export default InstructorAssignment;
































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAssignment.module.css';

// const InstructorAssignment = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [newAssignment, setNewAssignment] = useState({
//     title: '',
//     description: '',
//     due_date: '',
//     resources: ''
//   });
//   const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
//   const [submissions, setSubmissions] = useState([]); // Holds submissions fetched for a specific assignment
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isGraded, setIsGraded] = useState(false);

//   // Hardcoded JWT token
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1NTQ2LCJpYXQiOjE3MjczMjkxNDYsImp0aSI6ImMyNzBhNGM1ZDU0MDQ4ZDI4OTdiYmM3NGFkNmUxYjE3IiwidXNlcl9pZCI6Mn0.37TrebGRwGGRANMHNbVpLDN711SKW9srAxESPJm8cFA';

//   // Common headers with Authorization
//   const headers = {
//     Authorization: token,
//     'Content-Type': 'application/json',
//   };

//   // Fetch all assignments
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/assignments/', { headers })
//       .then((response) => {
//         setAssignments(response.data);
//         toast.success('Assignments fetched successfully');
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to fetch assignments');
//         }
//       });
//   }, []);

//   // Handle input change for creating/editing assignments
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment({ ...newAssignment, [name]: value });
//   };

//   // Create a new assignment
//   const createAssignment = () => {
//     axios.post('http://localhost:8000/api/assignments/', newAssignment, { headers })
//       .then((response) => {
//         toast.success('Assignment created successfully!');
//         setAssignments([...assignments, response.data]); // Update state with new assignment
//         setNewAssignment({ title: '', description: '', due_date: '', resources: '' });
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to create assignment');
//         }
//       });
//   };

//   // Edit an existing assignment
//   const editAssignment = (assignmentId) => {
//     axios.put(`http://localhost:8000/api/assignments/${assignmentId}/`, newAssignment, { headers })
//       .then((response) => {
//         toast.success('Assignment updated successfully!');
//         const updatedAssignments = assignments.map((assignment) =>
//           assignment.id === assignmentId ? response.data : assignment
//         );
//         setAssignments(updatedAssignments); // Update state
//         setIsEditMode(false);
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to update assignment');
//         }
//       });
//   };

//   // Delete an assignment
//   const deleteAssignment = (assignmentId) => {
//     axios.delete(`http://localhost:8000/api/assignments/${assignmentId}/`, { headers })
//       .then(() => {
//         toast.success('Assignment deleted successfully!');
//         const remainingAssignments = assignments.filter((assignment) => assignment.id !== assignmentId);
//         setAssignments(remainingAssignments); // Update state
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to delete assignment');
//         }
//       });
//   };

//   // Fetch submission by assignment ID
//   const fetchSubmissionByAssignmentId = (assignmentId) => {
//     axios.get(`http://localhost:8000/api/submissions/${assignmentId}/`, { headers }) // Use the correct endpoint for submission
//       .then((response) => {
//         setSubmissions([response.data]); // Set the submissions for the specific assignment
//         toast.success('Submission fetched successfully');
//       })
//       .catch((error) => {
//         if (error.response?.status === 404) {
//           toast.error('No submissions found for this assignment');
//         } else if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else {
//           toast.error('Failed to fetch submissions');
//         }
//       });
//   };

//   // Handle grading input change
//   const handleGradeChange = (e) => {
//     const { name, value } = e.target;
//     setGradeData({ ...gradeData, [name]: value });
//   };

//   // Submit the grade for an assignment
//   const gradeAssignment = (submissionId) => {
//     axios.post(`http://localhost:8000/api/submissions/${submissionId}/grade/`, gradeData, { headers })
//       .then(() => {
//         toast.success('Assignment graded successfully!');
//         setIsGraded(true); // Mark the assignment as graded
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please check your token');
//         } else if (error.response?.status === 403) {
//           toast.error('Forbidden: You don\'t have permission to grade submissions');
//         } else {
//           toast.error('Failed to grade assignment');
//         }
//       });
//   };

//   return (
//     <div className={styles.assignmentContainer}>
//       <ToastContainer />
//       <h1>Instructor Assignments</h1>

//       {/* Form for creating/editing assignments */}
//       <section>
//         <h2>{isEditMode ? 'Edit Assignment' : 'Create Assignment'}</h2>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newAssignment.title}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={newAssignment.description}
//           onChange={handleInputChange}
//           className={styles.textareaField}
//         />
//         <input
//           type="date"
//           name="due_date"
//           value={newAssignment.due_date}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <input
//           type="text"
//           name="resources"
//           placeholder="Resources (URL)"
//           value={newAssignment.resources}
//           onChange={handleInputChange}
//           className={styles.inputField}
//         />
//         <button
//           className={styles.createAssignmentButton}
//           onClick={isEditMode ? () => editAssignment(selectedAssignmentId) : createAssignment}
//         >
//           {isEditMode ? 'Update Assignment' : 'Create Assignment'}
//         </button>
//       </section>

//       {/* Display existing assignments and fetch their submissions */}
//       <section className={styles.AssignmentSection}>
//         <h2>Assignments</h2>
//         <ul>
//           {assignments.map((assignment) => (
//             <li key={assignment.id} className={styles.assignmentItem}>
//               <h3>{assignment.title}</h3>
//               <button
//                 className={styles.viewSubmissionButton}
//                 onClick={() => fetchSubmissionByAssignmentId(assignment.id)}
//               >
//                 View Submissions
//               </button>
//               <button
//                 className={styles.editButton}
//                 onClick={() => {
//                   setIsEditMode(true);
//                   setSelectedAssignmentId(assignment.id);
//                   setNewAssignment({
//                     title: assignment.title,
//                     description: assignment.description,
//                     due_date: assignment.due_date,
//                     resources: assignment.resources,
//                   });
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className={styles.deleteButton}
//                 onClick={() => deleteAssignment(assignment.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Section for grading submissions */}
//       <section>
//         <h2>Submissions</h2>
//         <ul>
//           {submissions.map((submission) => (
//             <li key={submission.id}>
//               <p>Student: {submission.student}</p>
//               <p>Assignment: {submission.assignment}</p>
//               <a href={submission.submission_file} target="_blank" rel="noopener noreferrer">View Submission</a>
//               {submission.grade ? (
//                 <>
//                   <p>Grade: {submission.grade}</p>
//                   <p>Feedback: {submission.feedback}</p>
//                 </>
//               ) : (
//                 <>
//                   <input
//                     type="text"
//                     name="grade"
//                     placeholder="Grade"
//                     value={gradeData.grade}
//                     onChange={handleGradeChange}
//                     className={styles.inputField}
//                   />
//                   <textarea
//                     name="feedback"
//                     placeholder="Feedback"
//                     value={gradeData.feedback}
//                     onChange={handleGradeChange}
//                     className={styles.textareaField}
//                   />
//                   <button
//                     className={styles.submitGradeButton}
//                     onClick={() => gradeAssignment(submission.id)}
//                   >
//                     Submit Grade
//                   </button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default InstructorAssignment;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/InstructorAssignment.module.css';

// const Assignment = () => {
//   const [assignments, setAssignments] = useState([]); // All assignments
//   const [selectedAssignment, setSelectedAssignment] = useState(null); // Assignment details
//   const [isEditMode, setIsEditMode] = useState(false); // Flag to toggle between edit and create mode
//   const [newAssignment, setNewAssignment] = useState({
//     title: '',
//     description: '',
//     due_date: '',
//     resources: ''
//   });
//   const [gradeData, setGradeData] = useState({ grade: '', feedback: '' }); // Grading data
//   const [error, setError] = useState(null);
//   const [submissions, setSubmissions] = useState([]); // Store all submissions
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MjQ0OTk5LCJpYXQiOjE3MjcxNTg1OTksImp0aSI6IjQ2NTljYjdjNDBlYTQyNmI5M2NmMTA1MGUzZGNlMGFiIiwidXNlcl9pZCI6Mn0.35GMD51edfnr_CuHD1xwbeSKPlwfPW7h6GFlQPblg9c';

//   // Fetch all assignments from the backend
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/assignments/', {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then((response) => {
//       setAssignments(response.data);
//     })
//     .catch((error) => {
//       toast.error('Failed to fetch assignments.');
//       setError('Failed to fetch assignments.');
//     });
//   }, [token]);

//   // Fetch specific assignment details when clicked on "View Details"
//   const viewAssignmentDetails = (assignmentId) => {
//     axios.get(`http://localhost:8000/api/assignments/${assignmentId}/`, {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then((response) => {
//       setSelectedAssignment(response.data);  // Store the selected assignment details
//     })
//     .catch((error) => {
//       toast.error('Failed to fetch assignment details.');
//       setError('Failed to fetch assignment details.');
//     });
//   };

//   // Close assignment details
//   const closeDetails = () => {
//     setSelectedAssignment(null);  // Close the modal by resetting the selected assignment
//   };

//   // Handle input change for creating/editing assignments
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment({ ...newAssignment, [name]: value });
//   };

//   // Create a new assignment
//   const createAssignment = () => {
//     axios.post('http://localhost:8000/api/assignments/', newAssignment, {
//       headers: {
//         Authorization: token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((response) => {
//       toast.success('Assignment created successfully!');
//       setAssignments([...assignments, response.data]); // Update the state with the new assignment
//       setNewAssignment({ title: '', description: '', due_date: '', resources: '' });
//     })
//     .catch((error) => {
//       toast.error('Failed to create assignment.');
//       setError('Failed to create assignment.');
//     });
//   };

//   // Edit an existing assignment
//   const editAssignment = (assignmentId) => {
//     axios.put(`http://localhost:8000/api/assignments/${assignmentId}/`, newAssignment, {
//       headers: {
//         Authorization: token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((response) => {
//       toast.success('Assignment updated successfully!');
//       const updatedAssignments = assignments.map((assignment) =>
//         assignment.id === assignmentId ? response.data : assignment
//       );
//       setAssignments(updatedAssignments); // Update the state with the updated assignment
//       setIsEditMode(false);
//       setNewAssignment({ title: '', description: '', due_date: '', resources: '' });
//     })
//     .catch((error) => {
//       toast.error('Failed to update assignment.');
//       setError('Failed to update assignment.');
//     });
//   };

//   // Delete an assignment
//   const deleteAssignment = (assignmentId) => {
//     axios.delete(`http://localhost:8000/api/assignments/${assignmentId}/`, {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then(() => {
//       toast.success('Assignment deleted successfully!');
//       const remainingAssignments = assignments.filter((assignment) => assignment.id !== assignmentId);
//       setAssignments(remainingAssignments); // Remove the deleted assignment from the state
//     })
//     .catch((error) => {
//       toast.error('Failed to delete assignment.');
//       setError('Failed to delete assignment.');
//     });
//   };

//   // Handle grading input change
//   const handleGradeChange = (e) => {
//     const { name, value } = e.target;
//     setGradeData({ ...gradeData, [name]: value });
//   };

//   // Submit the grade for an assignment
//   const gradeAssignment = (submissionId) => {
//     axios.post(`http://localhost:8000/api/assignments/${submissionId}/grade/`, gradeData, {
//       headers: {
//         Authorization: token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((response) => {
//       toast.success('Assignment graded successfully!');
//     })
//     .catch((error) => {
//       toast.error('Failed to grade assignment.');
//       setError('Failed to grade assignment.');
//     });
//   };

//   // Fetch all submissions for grading
//   const fetchSubmissions = () => {
//     axios.get('http://localhost:8000/api/submissions/', {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then((response) => {
//       setSubmissions(response.data);
//     })
//     .catch((error) => {
//       toast.error('Failed to fetch submissions.');
//       setError('Failed to fetch submissions.');
//     });
//   };

//   // Handle Edit Button Click
//   const handleEditClick = (assignment) => {
//     setNewAssignment(assignment);
//     setIsEditMode(true); // Set to edit mode
//   };

//   useEffect(() => {
//     fetchSubmissions(); // Fetch submissions on component mount
//   }, []);

//   return (
//     <div className={styles.assignmentContainer}>
//       <ToastContainer />
//       <h1 className={styles.pageTitle}>Assignment Overview</h1>

//       {/* Section for creating/editing a new assignment */}
//       <section className={styles.createAssignmentSection}>
//         <h2 className={styles.sectionTitle}>{isEditMode ? 'Edit Assignment' : 'Create New Assignment'}</h2>
//         <div className={styles.formGroup}>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={newAssignment.title}
//             onChange={handleInputChange}
//             className={styles.inputField}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={newAssignment.description}
//             onChange={handleInputChange}
//             className={styles.textareaField}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Due Date:</label>
//           <input
//             type="date"
//             name="due_date"
//             value={newAssignment.due_date}
//             onChange={handleInputChange}
//             className={styles.inputField}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Resources:</label>
//           <input
//             type="text"
//             name="resources"
//             value={newAssignment.resources}
//             onChange={handleInputChange}
//             className={styles.inputField}
//           />
//         </div>
//         <button className={styles.createAssignmentButton} onClick={isEditMode ? () => editAssignment(newAssignment.id) : createAssignment}>
//           {isEditMode ? 'Update Assignment' : 'Create Assignment'}
//         </button>
//       </section>

//       {/* Display upcoming assignments */}
//       <section className={styles.upcomingAssignmentsSection}>
//         <h2 className={styles.sectionTitle}>Upcoming Assignments</h2>
//         <div className={styles.assignmentList}>
//           {assignments.map((assignment) => (
//             <div className={styles.assignmentItem} key={assignment.id}>
//               <h3>{assignment.title}</h3>
//               <p>Due Date: {assignment.due_date}</p>
//               <button className={styles.viewDetailsButton} onClick={() => viewAssignmentDetails(assignment.id)}>
//                 View Details
//               </button>
//               <button className={styles.editButton} onClick={() => handleEditClick(assignment)}>
//                 Edit
//               </button>
//               <button className={styles.deleteButton} onClick={() => deleteAssignment(assignment.id)}>
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modal or Section to Display Assignment Details */}
//       {selectedAssignment && (
//         <div className={styles.assignmentDetailsModal}>
//           <h2>Assignment Details</h2>
//           <h3>{selectedAssignment.title}</h3>
//           <p><strong>Description:</strong> {selectedAssignment.description}</p>
//           <p><strong>Due Date:</strong> {selectedAssignment.due_date}</p>
//           <p><strong>Resources:</strong> <a href={selectedAssignment.resources} target="_blank" rel="noopener noreferrer">View Resources</a></p>
//           <p><strong>Instructor ID:</strong> {selectedAssignment.instructor}</p>
//           <button className={styles.closeDetailsButton} onClick={closeDetails}>
//             Close
//           </button>
//         </div>
//       )}

//       {/* Section for grading an assignment */}
//       <section className={styles.gradingSection}>
//         <h2 className={styles.sectionTitle}>Grade Assignment</h2>
//         <div className={styles.formGroup}>
//           <label>Grade:</label>
//           <input
//             type="text"
//             name="grade"
//             value={gradeData.grade}
//             onChange={handleGradeChange}
//             className={styles.inputField}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Feedback:</label>
//           <textarea
//             name="feedback"
//             value={gradeData.feedback}
//             onChange={handleGradeChange}
//             className={styles.textareaField}
//           />
//         </div>
//         <button className={styles.submitGradeButton} onClick={() => gradeAssignment(1)}>
//           Submit Grade
//         </button>
//       </section>

//       {/* Display assignment submissions */}
//       <section className={styles.submissionsSection}>
//         <h2 className={styles.sectionTitle}>Student Submissions</h2>
//         <div className={styles.submissionList}>
//           {submissions.map((submission) => (
//             <div key={submission.id} className={styles.submissionItem}>
//               <p><strong>Student:</strong> {submission.student}</p>
//               <p><strong>Assignment:</strong> {submission.assignment}</p>
//               <p><strong>Submitted On:</strong> {submission.submitted_on}</p>
//               <p><strong>Grade:</strong> {submission.grade ? submission.grade : 'Not graded yet'}</p>
//               <p><strong>Feedback:</strong> {submission.feedback ? submission.feedback : 'No feedback yet'}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {error && <p className={styles.errorText}>{error}</p>}
//     </div>
//   );
// };

// export default Assignment;
