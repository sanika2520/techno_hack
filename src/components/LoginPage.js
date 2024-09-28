
import React, { useState } from 'react';
import { auth, db } from '../config/firebase'; // Import auth and db from firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import both signup and login methods
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(''); // State for username
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Handle login
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
                // Reset the fields after login
                setEmail('');
                setPassword('');
            } else {
                // Handle signup
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Add user information to Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    username: username,
                    email: email,
                    createdAt: new Date(), // Store creation date
                    isActive: true // Track if user is active
                });

                console.log("User successfully added to Firestore:", user.uid);

                // Reset the fields after signup
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error("Error:", error.message); // Log the error message
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? "Login" : "Signup"}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </>
                )}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                {!isLogin && (
                    <>
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            required 
                        />
                    </>
                )}
                <button type="submit" className="submit-btn">{isLogin ? "Login" : "Signup"}</button>
            </form>
            
            <p className="toggle-form">
                {isLogin ? "Don't have an account?" : "Already have an account?"} 
                <span onClick={toggleForm} className="toggle-btn">{isLogin ? "Signup here" : "Login here"}</span>
            </p>
        </div>
    );
};

export default LoginPage;
