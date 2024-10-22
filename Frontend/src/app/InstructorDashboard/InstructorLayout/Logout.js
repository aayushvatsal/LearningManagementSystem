import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../styles/auth.module.css'; 

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Retrieve the access and refresh tokens from localStorage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          // If tokens are not found, redirect to login
          toast.error('No active session found. Redirecting to login...');
          return router.push('/login');
        }

        // Log tokens to ensure they exist
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        // Send the refresh token in the body and the access token in the headers
        const response = await axios.post(
          'http://localhost:8000/auth/logout/',
          { refresh: refreshToken }, // Refresh token in the body
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Access token in the header
              'Content-Type': 'application/json',    // Ensure the request is sent as JSON
            },
          }
        );

        // Check if the response is successful (status code 200)
        if (response.status === 200) {
          // Remove tokens from localStorage after successful logout
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          // Show success toast message
          toast.success('Successfully logged out!');

          // Redirect to login page after a short delay
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          throw new Error('Logout failed.');
        }
      } catch (error) {
        // Log the exact error for debugging
        console.error('Logout failed:', error.response?.data || error.message);
        toast.error('Logout failed. Please try again.');
        router.push('/login');
      }
    };

    logoutUser();
  }, [router]);

  return (
    <div className={styles.authSection}>
      <p className={styles.successText}>Logging out...</p>
    </div>
  );
};

export default LogoutPage;
