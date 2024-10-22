import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Correct icon import
import { ToastContainer, toast } from 'react-toastify'; // React Toastify for notifications
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../styles/LibraryInstructor.module.css';

export default function LibraryInstructor() {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [newContent, setNewContent] = useState({
    title: '',
    content_type: 'HTML',
    file: null,
    text_content: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingContent, setEditingContent] = useState(null); // For editing content
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    filterAndSortContents();
  }, [searchQuery, sortType, contents]);

  const fetchContents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/contents/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Failed to load contents');
    }
  };

  const filterAndSortContents = () => {
    let filtered = contents;

    if (searchQuery) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortType) {
      filtered = filtered.sort((a, b) =>
        a.content_type.localeCompare(b.content_type)
      );
    }

    setFilteredContents(filtered);
  };

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewContent({ ...newContent, file: e.target.files[0] });
  };

  const validateForm = () => {
    if (!newContent.title) {
      toast.error('Title is required');
      return false;
    }
    if (
      ['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type) &&
      !newContent.file
    ) {
      toast.error('File is required for this content type');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', newContent.title);
    formData.append('content_type', newContent.content_type);

    if (['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type)) {
      formData.append('file', newContent.file);
    } else if (newContent.content_type === 'HTML') {
      formData.append('text_content', newContent.text_content);
    }

    try {
      setLoading(true);

      if (editingContent) {
        // Editing existing content
        await axios.put(
          `http://localhost:8000/api/contents/${editingContent.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('Content updated successfully');
      } else {
        // Creating new content
        await axios.post('http://localhost:8000/api/contents/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Content created successfully');
      }

      setLoading(false);
      setNewContent({
        title: '',
        content_type: 'HTML',
        file: null,
        text_content: '',
      });
      setEditingContent(null); // Reset editing state
      fetchContents(); // Refresh content list after creating
    } catch (error) {
      setLoading(false);
      toast.error('Error creating/updating content');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/contents/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Content deleted successfully');
      fetchContents(); // Refresh content list after deleting
    } catch (error) {
      toast.error('Error deleting content');
    }
  };

  const handleEdit = (content) => {
    setNewContent({
      title: content.title,
      content_type: content.content_type,
      text_content: content.text_content || '',
    });
    setEditingContent(content); // Set content to edit mode
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div className={styles.instructorContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className={styles.instructorTitle}>Instructor Content Library</h1>

      {/* Search and Sort */}
      <div className={styles.searchSortContainer}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <select value={sortType} onChange={handleSort} className={styles.sortSelect}>
          <option value="">Sort by type</option>
          <option value="HTML">HTML</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
          <option value="PDF">PDF</option>
        </select>
      </div>

      {/* Create New Content Form */}
      <form onSubmit={handleSubmit} className={styles.contentForm}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newContent.title}
          onChange={handleInputChange}
          required
          className={styles.formInput}
        />

        <select
          name="content_type"
          value={newContent.content_type}
          onChange={handleInputChange}
          className={styles.formSelect}
        >
          <option value="HTML">HTML</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
          <option value="PDF">PDF</option>
        </select>

        {newContent.content_type === 'HTML' && (
          <textarea
            name="text_content"
            placeholder="Enter HTML content"
            value={newContent.text_content}
            onChange={handleInputChange}
            className={styles.formTextarea}
          ></textarea>
        )}

        {['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type) && (
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        )}

        <button type="submit" className={styles.submitButton}>
          {loading ? 'Processing...' : editingContent ? 'Update Content' : 'Create Content'}
        </button>
      </form>

      {/* Display Contents */}
      <div className={styles.contentList}>
        {filteredContents.map((content) => (
          <div key={content.id} className={styles.contentCard}>
            <h3>{content.title}</h3>

            {/* Ensure content_type is handled properly */}
            <p>Type: {typeof content.content_type === 'object' ? content.content_type.type_name : content.content_type}</p>

            {content.content_type === 'HTML' && (
              <div dangerouslySetInnerHTML={{ __html: content.text_content }} />
            )}

            {['Image', 'Audio', 'Video', 'PDF'].includes(content.content_type) && (
              <a href={content.file} target="_blank" rel="noopener noreferrer">
                View {content.content_type}
              </a>
            )}

            <div className={styles.actionButtons}>
              <FaEdit className={styles.editButton} onClick={() => handleEdit(content)} />
              <FaTrashAlt className={styles.deleteButton} onClick={() => handleDelete(content.id)} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}




















// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Correct icon import
// import { ToastContainer, toast } from 'react-toastify'; // React Toastify for notifications
// import 'react-toastify/dist/ReactToastify.css';
// import styles from '../../../styles/LibraryInstructor.module.css';

// export default function LibraryInstructor() {
//   const [contents, setContents] = useState([]);
//   const [filteredContents, setFilteredContents] = useState([]);
//   const [newContent, setNewContent] = useState({
//     title: '',
//     content_type: 'HTML',
//     file: null,
//     text_content: '',
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortType, setSortType] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [editingContent, setEditingContent] = useState(null); // For editing content
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NDE1NTQ2LCJpYXQiOjE3MjczMjkxNDYsImp0aSI6ImMyNzBhNGM1ZDU0MDQ4ZDI4OTdiYmM3NGFkNmUxYjE3IiwidXNlcl9pZCI6Mn0.37TrebGRwGGRANMHNbVpLDN711SKW9srAxESPJm8cFA"; // Replace with actual token

//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchContents();
//   }, []);

//   useEffect(() => {
//     filterAndSortContents();
//   }, [searchQuery, sortType, contents]);

//   const fetchContents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/contents/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setContents(response.data);
//     } catch (error) {
//       console.error('Error fetching contents:', error);
//       toast.error('Failed to load contents');
//     }
//   };

//   const filterAndSortContents = () => {
//     let filtered = contents;

//     if (searchQuery) {
//       filtered = filtered.filter(content =>
//         content.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (sortType) {
//       filtered = filtered.sort((a, b) =>
//         a.content_type.localeCompare(b.content_type)
//       );
//     }

//     setFilteredContents(filtered);
//   };

//   const handleInputChange = (e) => {
//     setNewContent({ ...newContent, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setNewContent({ ...newContent, file: e.target.files[0] });
//   };

//   const validateForm = () => {
//     if (!newContent.title) {
//       toast.error('Title is required');
//       return false;
//     }
//     if (
//       ['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type) &&
//       !newContent.file
//     ) {
//       toast.error('File is required for this content type');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', newContent.title);
//     formData.append('content_type', newContent.content_type);

//     if (['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type)) {
//       formData.append('file', newContent.file);
//     } else if (newContent.content_type === 'HTML') {
//       formData.append('text_content', newContent.text_content);
//     }

//     try {
//       setLoading(true);

//       if (editingContent) {
//         // Editing existing content
//         await axios.put(
//           `http://localhost:8000/api/contents/${editingContent.id}/`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         toast.success('Content updated successfully');
//       } else {
//         // Creating new content
//         await axios.post('http://localhost:8000/api/contents/', formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         toast.success('Content created successfully');
//       }

//       setLoading(false);
//       setNewContent({
//         title: '',
//         content_type: 'HTML',
//         file: null,
//         text_content: '',
//       });
//       setEditingContent(null); // Reset editing state
//       fetchContents(); // Refresh content list after creating
//     } catch (error) {
//       setLoading(false);
//       toast.error('Error creating/updating content');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/contents/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success('Content deleted successfully');
//       fetchContents(); // Refresh content list after deleting
//     } catch (error) {
//       toast.error('Error deleting content');
//     }
//   };

//   const handleEdit = (content) => {
//     setNewContent({
//       title: content.title,
//       content_type: content.content_type,
//       text_content: content.text_content || '',
//     });
//     setEditingContent(content); // Set content to edit mode
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSort = (e) => {
//     setSortType(e.target.value);
//   };

//   const paginateContents = (contents) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return contents.slice(startIndex, startIndex + itemsPerPage);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className={styles.instructorContainer}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className={styles.instructorTitle}>Instructor Content Library</h1>

//       {/* Search and Sort */}
//       <div className={styles.searchSortContainer}>
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={searchQuery}
//           onChange={handleSearch}
//           className={styles.searchInput}
//         />
//         <select value={sortType} onChange={handleSort} className={styles.sortSelect}>
//           <option value="">Sort by type</option>
//           <option value="HTML">HTML</option>
//           <option value="Image">Image</option>
//           <option value="Audio">Audio</option>
//           <option value="Video">Video</option>
//           <option value="PDF">PDF</option>
//         </select>
//       </div>

//       {/* Create New Content Form */}
//       <form onSubmit={handleSubmit} className={styles.contentForm}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newContent.title}
//           onChange={handleInputChange}
//           required
//           className={styles.formInput}
//         />

//         <select
//           name="content_type"
//           value={newContent.content_type}
//           onChange={handleInputChange}
//           className={styles.formSelect}
//         >
//           <option value="HTML">HTML</option>
//           <option value="Image">Image</option>
//           <option value="Audio">Audio</option>
//           <option value="Video">Video</option>
//           <option value="PDF">PDF</option>
//         </select>

//         {newContent.content_type === 'HTML' && (
//           <textarea
//             name="text_content"
//             placeholder="Enter HTML content"
//             value={newContent.text_content}
//             onChange={handleInputChange}
//             className={styles.formTextarea}
//           ></textarea>
//         )}

//         {['Image', 'Audio', 'Video', 'PDF'].includes(newContent.content_type) && (
//           <input
//             type="file"
//             name="file"
//             onChange={handleFileChange}
//             className={styles.fileInput}
//           />
//         )}

//         <button type="submit" className={styles.submitButton}>
//           {loading ? 'Processing...' : editingContent ? 'Update Content' : 'Create Content'}
//         </button>
//       </form>

//       {/* Display Contents */}
//       <div className={styles.contentList}>
//         {paginateContents(filteredContents).map((content) => (
//           <div key={content.id} className={styles.contentCard}>
//             <h3>{content.title}</h3>
//             <p>Type: {content.content_type}</p>

//             {content.content_type === 'HTML' && (
//               <div dangerouslySetInnerHTML={{ __html: content.text_content }} />
//             )}

//             {['Image', 'Audio', 'Video', 'PDF'].includes(content.content_type) && (
//               <a href={content.file} target="_blank" rel="noopener noreferrer">
//                 View {content.content_type}
//               </a>
//             )}

//             <div className={styles.actionButtons}>
//               <FaEdit
//                 className={styles.editButton}
//                 onClick={() => handleEdit(content)}
//               />
//               <FaTrashAlt
//                 className={styles.deleteButton}
//                 onClick={() => handleDelete(content.id)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         {Array.from({ length: Math.ceil(filteredContents.length / itemsPerPage) }, (_, index) => (
//           <button
//             key={index}
//             className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
