import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "../TermsandCond.css";

function Termsandcond() {
  const [accepted, setAccepted] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
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
  }, [navigate]);

  const handleAccept = () => {
    setAccepted(true);
    console.log('Terms accepted');
    
    // Navigate to gckey-agree-terms
    navigate('/gckey-agree-terms');
  };

  const handleDecline = () => {
    setAccepted(false);
    console.log('Terms declined');
    
    // Clear session storage
    sessionStorage.removeItem('currentUser');
    
    alert('You have declined the terms and conditions. You will be redirected to the home page.');
    
    // Navigate to home page
    navigate('/');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      console.log("User logged out");
      navigate('/');
    }
  };

  return (
    <>
      <Header />
      <div className="iv-container">
        {/* Header Bar */}
        <div className="iv-header">
          <div className="iv-breadcrumb">
            <a href="#">Home</a> &gt; <span>Terms and Conditions</span>
          </div>
          <div className="iv-user-links">
            <span>Signed in as {currentUser?.username || 'User'}</span> | <a href="#">Help</a> |{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
          </div>
        </div>
      </div>
      
      <div className="tc-wrapper">
        <div className="tc-container">
          <h1 className="tc-title">Terms and Conditions</h1>
          <div className="tc-divider"></div>
          
          <p className="tc-intro">
            By accessing your account, you are agreeing to abide by the following Terms and Conditions of Use:
          </p>

          <ul className="tc-list">
            <li className="tc-list-item">
              You agree to keep your identification number(s) confidential and to not share it (them) with anyone. 
              If you suspect that others have obtained your identification number(s), contact us immediately by 
              clicking on the "Report a problem or mistake on this page" button.
            </li>
            <li className="tc-list-item">
              You certify that any information provided by you is true, accurate and complete.
            </li>
            <li className="tc-list-item">
              You understand and accept that as a security measure for administrative reasons, we can revoke your 
              access if you fail to abide by the Terms and Conditions of Use.
            </li>
            <li className="tc-list-item">
              You understand and accept that we are not responsible for any losses or damages incurred by anyone because of:
              <ol className="tc-sublist">
                <li className="tc-sublist-item">The use of the information available in your account</li>
                <li className="tc-sublist-item">Any restrictions, delay, malfunction, or unavailability of your account</li>
              </ol>
            </li>
            <li className="tc-list-item">
              You understand and accept that by using your account and applying online, we can communicate with you 
              (or your representative, if applicable) via e-mail.
            </li>
            <li className="tc-list-item">
              To continue, choose "I Accept" to indicate your acceptance of these Terms and Conditions. If you do not 
              agree with these Terms and Conditions, choose "I Do Not Accept". Note, you will not be able to access 
              your account unless you accept the Terms and Conditions.
            </li>
          </ul>

          <p className="tc-disclaimer">
            If you use another type of browser software you should check with your software supplier to make sure that 
            your browser has 128-bit secure socket layer encryption capability. Note: We are not responsible for any 
            difficulties in downloading and installing software. Software suppliers are responsible for providing 
            technical support. It is important that you sign out and close your browser before leaving this computer 
            unattended. This will prevent unauthorized access to your personal information.
          </p>

          <div className="tc-button-group">
            <button 
              className="tc-btn tc-btn-accept"
              onClick={handleAccept}
            >
              I Accept
            </button>
            <button 
              className="tc-btn tc-btn-decline"
              onClick={handleDecline}
            >
              I Do Not Accept
            </button>
          </div>

          <div className="tc-footer">
            <button className="tc-report-btn">
              Report a problem or mistake on this page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Termsandcond;