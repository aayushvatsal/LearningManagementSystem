'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../styles/signUp.module.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Logo from '../../Images/Main Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');  // Default role is 'user'
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill("")); // Store each OTP digit

    const otpInputRefs = useRef([]);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const router = useRouter();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
        if (!password.match(passwordRegex)) {
            setPasswordError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
            return;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else {
            setConfirmPasswordError('');
        }

        try {
            setLoading(true);  // Show loader
            const response = await axios.post('http://localhost:8000/auth/register/', {
                username: username,
                email: email,
                password: password,
                confirm_password: confirmPassword,
                role: role,
            });
            setOtpSent(true);  // Indicate OTP was sent
            toast.success(response.data.detail);  // Display response message
        } catch (error) {
            setLoading(false);  // Stop loader in case of error
            console.error(error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const handleVerifyOtp = async () => {
        const otpCode = otp.join("");  // Combine the OTP array into a string
        try {
            const response = await axios.post('http://localhost:8000/auth/verify-otp/', {
                email: email,
                otp_code: otpCode,
            });
            toast.success('OTP verified successfully!');
            setTimeout(() => {
                if (role === 'user') {
                    router.push('/dashboard');
                } else if (role === 'instructor') {
                    router.push('/InstructorDashboard');
                }
            }, 2000);
        } catch (error) {
            toast.error('Invalid OTP. Please try again.');
            console.error(error);
        }
    };

    // Handle OTP input and auto-focus logic
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value !== "" && index < 5) {
            otpInputRefs.current[index + 1].focus();  // Move to the next box
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1].focus();  // Move to the previous box on backspace
        }
    };

    return (
        <>
            <ToastContainer />
            {!otpSent ? (
                <section className={styles.signUpSection}>
                    <div className={styles.signUpGrid}>
                        <div className={styles.signUpFormCard}>
                            <div className={styles.logoWrapper}>
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={150}
                                    height={140}
                                    className={styles.logoImage}
                                />
                            </div>
                            <h1 className={styles.heading}>Create an Account!</h1>
                            <form onSubmit={handleSignUp} className={styles.signUpForm}>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className={styles.inputField}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && <p className={styles.errorText}>{emailError}</p>}
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className={styles.inputField}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className={styles.inputField}
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
                                <div className={styles.inputGroup}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        className={styles.inputField}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className={styles.passwordToggle}
                                        onClick={handleToggleConfirmPassword}
                                    >
                                        {showConfirmPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
                                    </span>
                                    {confirmPasswordError && <p className={styles.errorText}>{confirmPasswordError}</p>}
                                </div>
                                <div className={styles.inputGroup}>
                                    <select className={styles.selectField} value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="instructor">Instructor</option>
                                    </select>
                                </div>
                                <button type="submit" className={styles.submitButton} disabled={loading}>
                                    {loading ? 'Processing...' : 'Sign Up'}
                                </button>
                            </form>
                            <div className={styles.alreadyMemberText}>
                                <Link href="/login">I am already a member</Link>
                            </div>
                        </div>
                        <div className={styles.imageSection}>
                            <div className={styles.imageContainer}></div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={styles.otpSection}>
                    <div className={styles.otpBox}>
                        <h2>Verify OTP</h2>
                        <p>Enter the OTP sent to your email.</p>
                        <div className={styles.otpInputWrapper}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className={styles.otpInput}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => otpInputRefs.current[index] = el}
                                />
                            ))}
                        </div>
                        <button onClick={handleVerifyOtp} className={styles.otpVerifyButton}>
                            Verify OTP
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}

export default SignUp;


















// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Correct import for 'use client' components
// import styles from '../../styles/signUp.module.css'; 
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import Logo from '../../Images/Main Logo.png';

// function SignUp() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [role, setRole] = useState('user');  // Default role is 'user'
//     const [otp, setOtp] = useState('');
//     const [otpSent, setOtpSent] = useState(false);
//     const [otpVerified, setOtpVerified] = useState(false); // OTP verified state
//     const [loading, setLoading] = useState(false);  // Loader state

//     const [emailError, setEmailError] = useState('');
//     const [usernameError, setUsernameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');

//     const router = useRouter();  // Correct use of useRouter hook

//     const handleTogglePassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleToggleConfirmPassword = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     // Handle sending OTP as part of the registration request
//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         // Basic validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.match(emailRegex)) {
//             setEmailError('Please enter a valid email address.');
//             return;
//         } else {
//             setEmailError('');
//         }

//         const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
//         if (!password.match(passwordRegex)) {
//             setPasswordError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
//             return;
//         } else {
//             setPasswordError('');
//         }

//         if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             return;
//         } else {
//             setConfirmPasswordError('');
//         }

//         try {
//             setLoading(true);  // Show loader
//             const response = await axios.post('http://localhost:8000/auth/register/', {
//                 username: username,
//                 email: email,
//                 password: password,
//                 confirm_password: confirmPassword,
//                 role: role,
//             });
//             setOtpSent(true);  // Indicate OTP was sent
//             alert(response.data.detail);  // Display response message
//         } catch (error) {
//             setLoading(false);  // Stop loader in case of error
//             console.error(error);
//         }
//     };

//     // Handle verifying OTP after registration
//     const handleVerifyOtp = async () => {
//         try {
//             const response = await axios.post('http://localhost:8000/auth/verify-otp/', {
//                 email: email,
//                 otp_code: otp,
//             });
//             setOtpVerified(true);  // OTP verified
//             alert('OTP verified successfully!');  // Display OTP verification message

//             // Redirect based on the role after OTP verification
//             setTimeout(() => {
//                 if (role === 'user') {
//                     router.push('/dashboard');
//                 } else if (role === 'instructor') {
//                     router.push('/InstructorDashboard');
//                 }
//             }, 2000);  // Delay to show the success message for 2 seconds
//         } catch (error) {
//             setOtpVerified(false);
//             alert('Invalid OTP. Please try again.');
//             console.error(error);
//         }
//     };

//     return (
//         <section className={styles.signUpSection}>
//             <div className={styles.signUpGrid}>
//                 <div className={styles.signUpFormCard}>
//                     <div className={styles.logoWrapper}>
//                         <Image
//                             src={Logo}
//                             alt="Logo"
//                             width={50}
//                             height={40}
//                             className={styles.logoImage}
//                         />
//                     </div>
//                     <h1 className={styles.heading}>Create an Account!</h1>
//                     <form onSubmit={handleSignUp} className={styles.signUpForm}>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type="email"
//                                 placeholder="Email Address"
//                                 className={styles.inputField}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {emailError && <p className={styles.errorText}>{emailError}</p>}
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type="text"
//                                 placeholder="Username"
//                                 className={styles.inputField}
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             {usernameError && <p className={styles.errorText}>{usernameError}</p>}
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Password"
//                                 className={styles.inputField}
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
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 placeholder="Confirm Password"
//                                 className={styles.inputField}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <span
//                                 className={styles.passwordToggle}
//                                 onClick={handleToggleConfirmPassword}
//                             >
//                                 {showConfirmPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
//                             </span>
//                             {confirmPasswordError && <p className={styles.errorText}>{confirmPasswordError}</p>}
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <select className={styles.selectField} value={role} onChange={(e) => setRole(e.target.value)}>
//                                 <option value="user">User</option>
//                                 <option value="instructor">Instructor</option>
//                             </select>
//                         </div>
//                         {/* Loader */}
//                         {loading && (
//                             <div className={styles.loader}>
//                                 <div className={styles.spinner}></div>
//                                 <p className={styles.loaderText}>Processing...</p>
//                             </div>
//                         )}
//                         <button type="submit" className={styles.submitButton} disabled={loading}>
//                             Sign Up
//                         </button>
//                     </form>

//                     {/* OTP verification section */}
//                     {otpSent && (
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type="text"
//                                 placeholder="Enter OTP"
//                                 className={styles.inputField}
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                             />
//                             <button type="button" onClick={handleVerifyOtp} className={styles.otpButton}>
//                                 Verify OTP
//                             </button>
//                         </div>
//                     )}

//                     <div className={styles.switchAuthWrapper}>
//                         <p className={styles.switchAuthText}>
//                             Already have an account? <Link href="/login" className={styles.switchAuthLink}>Login</Link>
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

// export default SignUp;

















// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Correct import for 'use client' components
// import styles from '../../styles/signUp.module.css'; 
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import Logo from '../../Images/Main Logo.png';

// function SignUp({ onSwitchToLogin }) {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [role, setRole] = useState('user');  // Default role is 'user'
//     const [otp, setOtp] = useState('');
//     const [otpSent, setOtpSent] = useState(false);

//     const [emailError, setEmailError] = useState('');
//     const [usernameError, setUsernameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');

//     const router = useRouter();  // Correct use of useRouter hook

//     const handleTogglePassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleToggleConfirmPassword = () => {
//         setShowConfirmPassword(!showConfirmPassword);
//     };

//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/auth/request-otp/', {
//                 email: email,
//             });
//             setOtpSent(true);
//             alert(response.data.detail);  // Display response message
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleVerifyOtp = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/auth/verify-otp/', {
//                 otp: otp,
//             });
//             alert(response.data.detail);  // Display response message
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         // Basic validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.match(emailRegex)) {
//             setEmailError('Please enter a valid email address.');
//             return;
//         } else {
//             setEmailError('');
//         }

//         const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
//         if (!password.match(passwordRegex)) {
//             setPasswordError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
//             return;
//         } else {
//             setPasswordError('');
//         }

//         if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match');
//             return;
//         } else {
//             setConfirmPasswordError('');
//         }

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/auth/register/', {
//                 username: username,
//                 email: email,
//                 password: password,
//                 confirm_password: confirmPassword,
//                 role: role,
//             });
//             alert(response.data.detail);  // Display response message

//             // Redirect based on the role
//             if (role === 'user') {
//                 router.push('/dashboard');
//             } else if (role === 'instructor') {
//                 router.push('/InstructorDashboard');
//             } else if (role === 'admin') {
//                 router.push('/AdminDashboard');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <section className={styles.signUpSection}>
//             <div className={styles.signUpGrid}>
//                 <div className={styles.signUpFormCard}>
//                     <div className={styles.logoWrapper}>
//                         <Image
//                             src={Logo}
//                             alt="Logo"
//                             width={50}
//                             height={40}
//                             className={styles.logoImage}
//                         />
//                     </div>
//                     <h1 className={styles.heading}>Create an Account!</h1>
//                     <form onSubmit={handleSignUp} className={styles.signUpForm}>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type="email"
//                                 placeholder="Email Address"
//                                 className={styles.inputField}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {emailError && <p className={styles.errorText}>{emailError}</p>}
//                             <button type="button" onClick={handleSendOtp} className={styles.otpButton}>
//                                 Send OTP
//                             </button>
//                         </div>
//                         {otpSent && (
//                             <div className={styles.inputGroup}>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter OTP"
//                                     className={styles.inputField}
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                                 <button type="button" onClick={handleVerifyOtp} className={styles.otpButton}>
//                                     Verify OTP
//                                 </button>
//                             </div>
//                         )}
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type="text"
//                                 placeholder="Username"
//                                 className={styles.inputField}
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             {usernameError && <p className={styles.errorText}>{usernameError}</p>}
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 placeholder="Password"
//                                 className={styles.inputField}
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
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 placeholder="Confirm Password"
//                                 className={styles.inputField}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             <span
//                                 className={styles.passwordToggle}
//                                 onClick={handleToggleConfirmPassword}
//                             >
//                                 {showConfirmPassword ? <AiOutlineEye className={styles.eyeIcon} /> : <AiOutlineEyeInvisible className={styles.eyeIcon} />}
//                             </span>
//                             {confirmPasswordError && <p className={styles.errorText}>{confirmPasswordError}</p>}
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <select className={styles.selectField} value={role} onChange={(e) => setRole(e.target.value)}>
//                                 <option value="user">User</option>
//                                 <option value="instructor">Instructor</option>
//                                 <option value="admin">Admin</option>
//                             </select>
//                         </div>
//                         <button type="submit" className={styles.submitButton}>
//                             Sign Up
//                         </button>
//                     </form>
//                     <div className={styles.switchAuthWrapper}>
//                         <p className={styles.switchAuthText}>
//                             Already have an account? <Link href="/login" className={styles.switchAuthLink}>Login</Link>
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

// export default SignUp;
