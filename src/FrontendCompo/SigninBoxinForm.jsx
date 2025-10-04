import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';

function SigninBoxinForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newErrors = {};
   
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Query Firestore for matching username and password
      const candidatesRef = collection(db, "candidates");
      const q = query(
        candidatesRef, 
        where("username", "==", username.trim()),
        where("password", "==", password.trim())
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // User found - credentials match
        const userData = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;
        
        // Store user data in sessionStorage or localStorage
        sessionStorage.setItem('currentUser', JSON.stringify({
          id: userId,
          username: userData.username,
          name: userData.name,
          email: userData.email
        }));
        
        console.log('Sign In Successful:', userData);
        
        // Navigate to /gckey
        navigate('/gckey-verify-question');
      } else {
        // No matching user found
        setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password'
        });
        alert('❌ Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors({ username: 'An error occurred. Please try again.' });
      alert('❌ An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setUsername('');
    setPassword('');
    setErrors({});
  };

  return (
    <div className="signin-form">
      <h2 className="form-title">Sign In</h2>
     
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username: <span className="required">(required)</span>
          </label>
          <input
            type="text"
            id="username"
            className={`form-input ${errors.username ? 'input-error' : ''}`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            aria-required="true"
            disabled={isLoading}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password: <span className="required">(required)</span>
          </label>
          <input
            type="password"
            id="password"
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            aria-required="true"
            disabled={isLoading}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="button-group">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleClearAll}
            disabled={isLoading}
          >
            Clear All
          </button>
        </div>
        
        <div className="forgot-links">
          <a href="#forgot-username" className="forgot-link">Forgot your username?</a>
          <span className="link-separator">•</span>
          <a href="#forgot-password" className="forgot-link">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
}

export default SigninBoxinForm;