import React, { useState, useEffect } from 'react';
import styles from '../../../Styles/Library.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {
  const [contents, setContents] = useState([]);

  // Function to fetch contents
  const fetchContents = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8000/api/contents/', {
        headers: {
          Authorization: `Bearer ${token}`, // Dynamic token
        }
      });
      setContents(response.data);
      toast.success('Contents fetched successfully');
    } catch (error) {
      toast.error('Failed to fetch contents');
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const renderContent = (content) => {
    switch (content.content_type) {
      case 'HTML':
        return <div dangerouslySetInnerHTML={{ __html: content.text_content }}></div>;
      case 'IMAGE':
        return <img src={content.file} alt={content.title} className={styles.contentImage} />;
      case 'AUDIO':
        return <audio controls src={content.file} className={styles.contentAudio}></audio>;
      case 'VIDEO':
        return <video controls src={content.file} className={styles.contentVideo}></video>;
      case 'PDF':
        return <a href={content.file} className={styles.contentPDF} target="_blank" rel="noopener noreferrer">Download PDF</a>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.libraryTitle}>Explore Our Media Library</h1>
        <p className={styles.libraryDescription}>Browse through various types of content including images, videos, audio, and documents.</p>
      </div>
      <div className={styles.contentsGrid}>
        {contents.map((content) => (
          <div key={content.id} className={styles.contentCard}>
            <h2 className={styles.contentTitle}>{content.title}</h2>
            <div className={styles.contentBody}>
              {renderContent(content)}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Library;




















// import React, { useState, useEffect } from 'react';
// import styles from '../../../Styles/Library.module.css';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Library = () => {
//   const [contents, setContents] = useState([]);

//   // Function to fetch contents
//   const fetchContents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/contents/', {
//         headers: {
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1MzMyLCJpYXQiOjE3MjczMjg5MzIsImp0aSI6IjE5YzgyMWEzMzMzOTRlZDU4ODE4ZThhZGYzYWVkZDkwIiwidXNlcl9pZCI6OH0.1g7wZCQePqDFrT4T3fxfUb3dv3QH39mrhwzlq_ksz0M'
//         }
//       });
//       setContents(response.data);
//       toast.success('Contents fetched successfully');
//     } catch (error) {
//       toast.error('Failed to fetch contents');
//     }
//   };

//   useEffect(() => {
//     fetchContents();
//   }, []);

//   const renderContent = (content) => {
//     switch (content.content_type) {
//       case 'HTML':
//         return <div dangerouslySetInnerHTML={{ __html: content.text_content }}></div>;
//       case 'IMAGE':
//         return <img src={content.file} alt={content.title} className={styles.contentImage} />;
//       case 'AUDIO':
//         return <audio controls src={content.file} className={styles.contentAudio}></audio>;
//       case 'VIDEO':
//         return <video controls src={content.file} className={styles.contentVideo}></video>;
//       case 'PDF':
//         return <a href={content.file} className={styles.contentPDF} target="_blank" rel="noopener noreferrer">Download PDF</a>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={styles.libraryContainer}>
//       <div className={styles.heroSection}>
//         <h1 className={styles.libraryTitle}>Explore Our Media Library</h1>
//         <p className={styles.libraryDescription}>Browse through various types of content including images, videos, audio, and documents.</p>
//       </div>
//       <div className={styles.contentsGrid}>
//         {contents.map((content) => (
//           <div key={content.id} className={styles.contentCard}>
//             <h2 className={styles.contentTitle}>{content.title}</h2>
//             <div className={styles.contentBody}>
//               {renderContent(content)}
//             </div>
//           </div>
//         ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Library;
