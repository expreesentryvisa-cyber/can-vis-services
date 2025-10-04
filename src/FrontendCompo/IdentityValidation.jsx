import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";
import "../identityValidation.css";
import Header from "./Header";

const IdentityValidation = () => {
  const [answer, setAnswer] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from sessionStorage
    const userData = sessionStorage.getItem('currentUser');
    
    if (!userData) {
      alert("❌ Please sign in first");
      navigate('/');
      return;
    }

    const user = JSON.parse(userData);
    setCurrentUser(user);

    // Fetch security question and answer from Firebase
    const fetchSecurityData = async () => {
      try {
        const userRef = doc(db, "candidates", user.id);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setSecurityQuestion(data.securityQuestion || "What is your childhood friend name?");
          setCorrectAnswer(data.securityAnswer || "");
        } else {
          alert("❌ User data not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching security data:", error);
        alert("❌ Error loading security question");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecurityData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      alert("❌ Please provide an answer");
      return;
    }

    setIsSubmitting(true);

    try {
      // Compare answer (case-insensitive)
      if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        console.log("✅ Identity validated successfully");
        alert("✅ Identity validated successfully!");
        
        // Update session to mark as validated
        const updatedUser = { ...currentUser, validated: true };
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Navigate to next page
        navigate('/gckey-terms'); // or wherever you want to go next
      } else {
        alert("❌ Incorrect answer. Please try again.");
        setAnswer("");
      }
    } catch (error) {
      console.error("Error validating answer:", error);
      alert("❌ An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      setAnswer("");
      console.log("User logged out");
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="iv-container">
          <div className="iv-main">
            <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="iv-container">
        {/* Header Bar */}
        <div className="iv-header">
          <div className="iv-breadcrumb">
            <a href="#">Home</a> &gt; <span>Identity Validation</span>
          </div>
          <div className="iv-user-links">
            <span>Signed in as {currentUser?.username || 'User'}</span> | <a href="#">Help</a> |{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
          </div>
        </div>

        {/* Main Section */}
        <div className="iv-main">
          <h1 className="iv-title">Identity Validation</h1>
          <p className="iv-subtitle">
            For security reasons, additional identification is required to access
            your account.
          </p>
          <p className="iv-instruction">
            Please answer the following secret question:
          </p>
          
          <form onSubmit={handleSubmit} className="iv-form">
            <label htmlFor="secret-answer" className="iv-label">
              <span className="iv-required">*</span>{" "}
              <strong>"{securityQuestion}"</strong>{" "}
              <span className="iv-required-text">(required)</span>
            </label>
            <input
              id="secret-answer"
              type="text"
              className="iv-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <div className="iv-buttons">
              <button 
                type="submit" 
                className="iv-btn iv-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Validating..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="iv-btn iv-btn-secondary"
                disabled={isSubmitting}
              >
                Logout
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="iv-footer">
          <button className="iv-footer-btn">
            Report a problem or mistake on this page
          </button>
        </div>
      </div>
    </>
  );
};

export default IdentityValidation;