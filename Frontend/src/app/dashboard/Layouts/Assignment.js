import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../Styles/AssignmentForm.module.css';

const StudentAssignmentForm = () => {
  const [files, setFiles] = useState([]); // Files selected by the student
  const [assignments, setAssignments] = useState([]); // List of assignments
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Selected assignment

  // Fetch the access token from localStorage
  const token = localStorage.getItem('accessToken');

  // Fetch assignments
  useEffect(() => {
    axios.get('http://localhost:8000/api/assignments/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAssignments(response.data);
        toast.success('Assignments fetched successfully!');
      })
      .catch((error) => {
        toast.error('Failed to fetch assignments');
      });
  }, [token]);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // Submit assignment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignment) {
      toast.error('Please select an assignment.');
      return;
    }

    const formData = new FormData();
    formData.append('assignment', selectedAssignment.id); // Add the selected assignment ID
    files.forEach((file) => {
      formData.append('submission_file', file); // Add each file to the formData
    });

    axios.post('http://localhost:8000/api/submissions/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Ensure this for file upload
      },
    })
      .then((response) => {
        toast.success('Assignment submitted successfully!');
        setFiles([]); // Clear file selection
      })
      .catch((error) => {
        toast.error('Failed to submit assignment.');
      });
  };

  return (
    <div className={styles.assignmentFormContainer}>
      <ToastContainer />
      <h2 className={styles.assignmentFormTitle}>Submit Assignment</h2>

      {/* Assignment List Section */}
      <div className={styles.assignmentList}>
        <ul>
          {assignments.map((assignment) => (
            <li
              key={assignment.id}
              className={`${styles.assignmentItem} ${selectedAssignment?.id === assignment.id ? styles.selectedAssignment : ''}`}
              onClick={() => setSelectedAssignment(assignment)}
            >
              <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
              <p className={styles.assignmentDescription}>{assignment.description}</p>
              <p><strong>Due Date:</strong> {assignment.due_date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Assignment Submission Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.uploadFilesContainer}>
          <div className={styles.dragFileArea}>
            <span className={styles.uploadIcon}>📁</span>
            <h3 className={styles.dynamicMessage}>Drag & drop any file here</h3>
            <label className={styles.label}>
              or{' '}
              <span className={styles.browseFiles}>
                <input type="file" className={styles.defaultFileInput} multiple onChange={handleFileChange} />
                <span className={styles.browseFilesText}>browse file</span> <span>from device</span>
              </span>
            </label>
          </div>

          <div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileBlock}>
                <span className={styles.fileIcon}>📄</span>
                <span className={styles.fileName}>{file.name}</span> | <span className={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            ))}
          </div>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.uploadButton}>Submit Assignment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentAssignmentForm;
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../Styles/AssignmentForm.module.css';

// const StudentAssignmentForm = () => {
//   const [files, setFiles] = useState([]); // Files selected by the student
//   const [assignments, setAssignments] = useState([]); // List of assignments
//   const [selectedAssignment, setSelectedAssignment] = useState(null); // Selected assignment
//   const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1MzMyLCJpYXQiOjE3MjczMjg5MzIsImp0aSI6IjE5YzgyMWEzMzMzOTRlZDU4ODE4ZThhZGYzYWVkZDkwIiwidXNlcl9pZCI6OH0.1g7wZCQePqDFrT4T3fxfUb3dv3QH39mrhwzlq_ksz0M'; // Use student's token

//   // Fetch assignments
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/assignments/', {
//       headers: {
//         Authorization: token
//       }
//     })
//       .then((response) => {
//         setAssignments(response.data);
//         toast.success('Assignments fetched successfully!');
//       })
//       .catch((error) => {
//         toast.error('Failed to fetch assignments');
//       });
//   }, [token]);

//   // Handle file input change
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   // Submit assignment
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedAssignment) {
//       toast.error('Please select an assignment.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('assignment', selectedAssignment.id); // Add the selected assignment ID
//     files.forEach((file) => {
//       formData.append('submission_file', file); // Add each file to the formData
//     });

//     axios.post('http://localhost:8000/api/submissions/', formData, {
//       headers: {
//         Authorization: token,
//         'Content-Type': 'multipart/form-data' // Ensure this for file upload
//       }
//     })
//       .then((response) => {
//         toast.success('Assignment submitted successfully!');
//         setFiles([]); // Clear file selection
//       })
//       .catch((error) => {
//         toast.error('Failed to submit assignment.');
//       });
//   };

//   return (
//     <div className={styles.assignmentFormContainer}>
//       <ToastContainer />
//       <h2 className={styles.assignmentFormTitle}>Submit Assignment</h2>

//       {/* Assignment List Section */}
//       <div className={styles.assignmentList}>
//         <ul>
//           {assignments.map((assignment) => (
//             <li
//               key={assignment.id}
//               className={`${styles.assignmentItem} ${selectedAssignment?.id === assignment.id ? styles.selectedAssignment : ''}`}
//               onClick={() => setSelectedAssignment(assignment)}
//             >
//               <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
//               <p className={styles.assignmentDescription}>{assignment.description}</p>
//               <p><strong>Due Date:</strong> {assignment.due_date}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Assignment Submission Form */}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className={styles.uploadFilesContainer}>
//           <div className={styles.dragFileArea}>
//             <span className={styles.uploadIcon}>📁</span>
//             <h3 className={styles.dynamicMessage}>Drag & drop any file here</h3>
//             <label className={styles.label}>
//               or{' '}
//               <span className={styles.browseFiles}>
//                 <input type="file" className={styles.defaultFileInput} multiple onChange={handleFileChange} />
//                 <span className={styles.browseFilesText}>browse file</span> <span>from device</span>
//               </span>
//             </label>
//           </div>

//           <div className={styles.fileList}>
//             {files.map((file, index) => (
//               <div key={index} className={styles.fileBlock}>
//                 <span className={styles.fileIcon}>📄</span>
//                 <span className={styles.fileName}>{file.name}</span> | <span className={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</span>
//               </div>
//             ))}
//           </div>

//           <div className={styles.buttonWrapper}>
//             <button type="submit" className={styles.uploadButton}>Submit Assignment</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StudentAssignmentForm;
