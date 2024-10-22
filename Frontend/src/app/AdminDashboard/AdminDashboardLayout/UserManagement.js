import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../Styles/UserManagement.module.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [editUserId, setEditUserId] = useState(null);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MTI0OTkxLCJpYXQiOjE3MjcwMzg1OTEsImp0aSI6ImVmYWQ5MDUwZDUyYTQ1YTdiYTA4ZGU5YzE5MjkwOTVlIiwidXNlcl9pZCI6M30.iLAmEwJ05WJeWHJo1khMSJ_-Qbc9CvSOVLZBRr2G8vs'); // Replace with valid JWT token
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Prepare the correct payload for the request
      const payload = {
        email: formData.email,
        username: formData.name,
        password: 'password123', // You can modify the password dynamically
        confirm_password: 'password123',
        role: formData.role.toLowerCase(), // Ensure the role is in the correct case (e.g., 'user')
      };

      const response = await axios.post(
        'http://localhost:8000/auth/users/add/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUsers([...users, response.data]); // Update users state with new user
      setFormData({ name: '', email: '', role: 'User' }); // Reset form
      setError(''); // Clear any previous errors
    } catch (err) {
      // Capture detailed error message returned from the backend
      console.error('Error adding user:', err.response?.data || err.message);
      setError(err.response?.data || 'Error adding user');
    }
  };

  // Edit user role
  const handleEditUser = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/auth/users/update-role/${id}/`,
        { role: formData.role.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUsers(users.map((user) => (user.id === id ? { ...user, role: formData.role } : user)));
      setEditUserId(null); // Reset edit user ID
      setFormData({ name: '', email: '', role: 'User' }); // Reset form
    } catch (err) {
      console.error('Error updating user:', err.response?.data || err.message);
      setError(err.response?.data || 'Error updating user');
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/auth/users/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(users.filter((user) => user.id !== id)); // Remove user from state
    } catch (err) {
      console.error('Error deleting user:', err.response?.data || err.message);
      setError(err.response?.data || 'Error deleting user');
    }
  };

  // Conditional rendering
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.userManagementContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Management</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.userListSection}>
          <h2 className={styles.sectionTitle}>User List</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => {
                          setEditUserId(user.id);
                          setFormData({ name: user.username, email: user.email, role: user.role });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteUser(user.id)}
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

        <section className={styles.addUserSection}>
          <h2 className={styles.sectionTitle}>{editUserId ? 'Edit User' : 'Add New User'}</h2>
          <form className={styles.addUserForm} onSubmit={editUserId ? () => handleEditUser(editUserId) : handleAddUser}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <label htmlFor="role">Role:</label>
            <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Instructor">Instructor</option>
            </select>

            <button type="submit" className={styles.submitButton}>
              {editUserId ? 'Update User' : 'Add User'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UserManagement;
