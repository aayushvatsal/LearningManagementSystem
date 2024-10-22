'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../styles/auth.module.css'; // Corrected CSS import
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Logo from '../../Images/Main Logo.png';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        } else {
            setPasswordError('');
        }

        try {
            setLoading(true);
            
            // Make the API request
            const response = await axios.post('http://localhost:8000/auth/login/', {
                email: email,
                password: password,
            });

            // Log the full response to inspect it
            console.log('Login Response:', response);

            // Extract tokens from response data
            const { access, refresh, role } = response.data;

            // Check if the tokens exist in the response
            if (access && refresh) {
                // Store the tokens in localStorage
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);

                // Log tokens to console for verification
                console.log('Access Token:', access);
                console.log('Refresh Token:', refresh);

                setSuccessMessage('Login successful! Redirecting to your dashboard...');

                setTimeout(() => {
                    if (role === 'user') {
                        router.push('/dashboard');
                    } else if (role === 'instructor') {
                        router.push('/InstructorDashboard');
                    } else if (role === 'admin') {
                        router.push('/AdminDashboard');
                    }
                }, 2000);
            } else {
                throw new Error('Tokens not found in response.');
            }

        } catch (error) {
            setLoading(false);
            setLoginError('Invalid email or password');
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <section className={styles.authSection}>
            <div className={styles.authGrid}>
                <div className={styles.authFormCard}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src={Logo}
                            alt="logo"
                            width={150}
                            height={140}
                            className="rounded-full shadow-lg"
                        />
                    </div>
                    <h1 className={styles.authHeading}>Welcome back!</h1>
                    <form onSubmit={handleSignIn} className={styles.authForm}>
                        <div className={styles.inputContainer}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={styles.textInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className={styles.errorText}>{emailError}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={styles.textInput}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className={styles.passwordToggle}
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
                            </span>
                            {passwordError && <p className={styles.errorText}>{passwordError}</p>}
                        </div>
                        {loginError && <p className={styles.errorText}>{loginError}</p>}
                        {successMessage && <p className={styles.successText}>{successMessage}</p>}
                        
                        {loading && (
                            <div className={styles.loader}>
                                <div className={styles.spinner}></div>
                                <p className={styles.loaderText}>Loading...</p>
                            </div>
                        )}

                        <div className={styles.forgotPasswordWrapper}>
                            <p className={styles.forgotPasswordText}>Forgot Password?</p>
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            Sign In
                        </button>
                    </form>
                    <div className={styles.switchAuthWrapper}>
                        <p className={styles.switchAuthText}>
                            Don't have an account? <Link href="/signup" className={styles.switchAuthLink}>Sign up</Link>
                        </p>
                    </div>
                </div>
                <div className={styles.secondaryCard}></div>
            </div>
        </section>
    );
}

export default Login;



















// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../styles/auth.module.css'; // Corrected CSS import
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import Logo from '../../Images/Main Logo.png';

// function Login() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [loading, setLoading] = useState(false);
    
//     const router = useRouter();

//     const handleTogglePassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleSignIn = async (e) => {
//         e.preventDefault();

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.match(emailRegex)) {
//             setEmailError('Please enter a valid email address.');
//             return;
//         } else {
//             setEmailError('');
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             return;
//         } else {
//             setPasswordError('');
//         }

//         try {
//             setLoading(true);
//             const response = await axios.post('http://localhost:8000/auth/login/', {
//                 email: email,
//                 password: password,
//             });
            
//             const { access, refresh, role } = response.data;
//             localStorage.setItem('accessToken', access);
//             localStorage.setItem('refreshToken', refresh);

//             setSuccessMessage('Login successful! Redirecting to your dashboard...');

//             setTimeout(() => {
//                 if (role === 'user') {
//                     router.push('/dashboard');
//                 } else if (role === 'instructor') {
//                     router.push('/InstructorDashboard');
//                 } else if (role === 'admin') {
//                     router.push('/AdminDashboard');
//                 }
//             }, 2000);

//         } catch (error) {
//             setLoading(false);
//             setLoginError('Invalid email or password');
//         }
//     };

//     return (
//         <section className={styles.authSection}>
//             <div className={styles.authGrid}>
//                 <div className={styles.authFormCard}>
//                     <div className={styles.logoWrapper}>
//                         <Image
//                             src={Logo}
//                             alt="logo"
//                             width={50}
//                             height={40}
//                             className="rounded-full shadow-lg"
//                         />
//                     </div>
//                     <h1 className={styles.authHeading}>Welcome back!</h1>
//                     <form onSubmit={handleSignIn} className={styles.authForm}>
//                         <div className={styles.inputContainer}>
//                             <input
//                                 type="email"
//                                 placeholder="Email Address"
//                                 className={styles.textInput}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {emailError && <p className={styles.errorText}>{emailError}</p>}
//                         </div>
//                         <div className={styles.inputContainer}>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Password"
//                                 className={styles.textInput}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <span
//                                 className={styles.passwordToggle}
//                                 onClick={handleTogglePassword}
//                             >
//                                 {showPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
//                             </span>
//                             {passwordError && <p className={styles.errorText}>{passwordError}</p>}
//                         </div>
//                         {loginError && <p className={styles.errorText}>{loginError}</p>}
//                         {successMessage && <p className={styles.successText}>{successMessage}</p>}
                        
//                         {loading && (
//                             <div className={styles.loader}>
//                                 <div className={styles.spinner}></div>
//                                 <p className={styles.loaderText}>Loading...</p>
//                             </div>
//                         )}

//                         <div className={styles.forgotPasswordWrapper}>
//                             <p className={styles.forgotPasswordText}>Forgot Password?</p>
//                         </div>
//                         <button type="submit" className={styles.submitButton} disabled={loading}>
//                             Sign In
//                         </button>
//                     </form>
//                     <div className={styles.switchAuthWrapper}>
//                         <p className={styles.switchAuthText}>
//                             Don't have an account? <Link href="/signup" className={styles.switchAuthLink}>Sign up</Link>
//                         </p>
//                     </div>
//                 </div>
//                 <div className={styles.secondaryCard}></div>
//             </div>
//         </section>
//     );
// }

// export default Login;



















// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from '../../styles/auth.module.css';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import Logo from '../../Images/Main Logo.png';

// function Login() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [loginError, setLoginError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [loading, setLoading] = useState(false);  // New loader state
    
//     const router = useRouter();  // For navigation

//     const handleTogglePassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleSignIn = async (e) => {
//         e.preventDefault();

//         // Basic validation for email and password
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.match(emailRegex)) {
//             setEmailError('Please enter a valid email address.');
//             return;
//         } else {
//             setEmailError('');
//         }

//         if (!password.trim()) {
//             setPasswordError('Password is required');
//             return;
//         } else {
//             setPasswordError('');
//         }

//         // Login logic using Axios
//         try {
//             setLoading(true);  // Start loader
//             const response = await axios.post('http://localhost:8000/auth/login/', {
//                 email: email,
//                 password: password,
//             });
            
//             const { access, refresh, role } = response.data;
//             console.log('Login successful', response.data);

//             // Store the tokens in localStorage
//             localStorage.setItem('accessToken', access);
//             localStorage.setItem('refreshToken', refresh);

//             // Show success message
//             setSuccessMessage('Login successful! Redirecting to your dashboard...');

//             // Redirect based on the role
//             setTimeout(() => {
//                 if (role === 'user') {
//                     router.push('/dashboard');
//                 } else if (role === 'instructor') {
//                     router.push('/InstructorDashboard');
//                 } else if (role === 'admin') {
//                     router.push('/AdminDashboard');
//                 }
//             }, 2000);  // Delay to show the success message for 2 seconds

//         } catch (error) {
//             setLoading(false);  // Stop loader in case of error
//             setLoginError('Invalid email or password');
//             console.error('Login error', error);
//         }
//     };

//     return (
//         <section className={styles.authSection}>
//             <div className={styles.authGrid}>
//                 <div className={styles.authFormCard}>
//                     <div className={styles.logoWrapper}>
//                         <Image
//                             src={Logo}
//                             alt="logo"
//                             width={50}
//                             height={40}
//                             className="rounded-full shadow-lg"
//                         />
//                     </div>
//                     <h1 className={styles.authHeading}>Welcome back!</h1>
//                     <form onSubmit={handleSignIn} className={styles.authForm}>
//                         <div className={styles.inputContainer}>
//                             <input
//                                 type="email"
//                                 placeholder="Email Address"
//                                 className={styles.textInput}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {emailError && <p className={styles.errorText}>{emailError}</p>}
//                         </div>
//                         <div className={styles.inputContainer}>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Password"
//                                 className={styles.textInput}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <span
//                                 className={styles.passwordToggle}
//                                 onClick={handleTogglePassword}
//                             >
//                                 {showPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
//                             </span>
//                             {passwordError && <p className={styles.errorText}>{passwordError}</p>}
//                         </div>
//                         {loginError && <p className={styles.errorText}>{loginError}</p>}
//                         {successMessage && <p className={styles.successText}>{successMessage}</p>}
                        
//                         {/* Loader */}
//                         {loading && (
//                             <div className={styles.loader}>
//                                 <div className={styles.spinner}></div>
//                                 <p className={styles.loaderText}>Loading...</p>
//                             </div>
//                         )}

//                         <div className={styles.forgotPasswordWrapper}>
//                             <p className={styles.forgotPasswordText}>Forgot Password?</p>
//                         </div>
//                         <button type="submit" className={styles.submitButton} disabled={loading}>
//                             Sign In
//                         </button>
//                     </form>
//                     <div className={styles.switchAuthWrapper}>
//                         <p className={styles.switchAuthText}>
//                             Don't have an account? <Link href="/signup" className={styles.switchAuthLink}>Sign up</Link>
//                         </p>
//                     </div>
//                 </div>
//                 <div className={styles.secondaryCard}>
//                     {/* Optional: Add content here if needed */}
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Login;
