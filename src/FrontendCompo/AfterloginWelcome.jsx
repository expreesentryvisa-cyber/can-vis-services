import React from 'react'
import Header2 from './Header2'
import "../AfterloginWelcome.css"
import { useNavigate } from 'react-router-dom';

function AfterloginWelcome() {
   const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/gckey-main")
  };

  const handleOptionClick = (option) => {
    console.log(`Navigate to: ${option}`);
  };

  return (
    <>
      <Header2 />

     <div className="wabs-wrapper">
      {/* Header */}
      <div className="wabs-header">
        <div className="wabs-breadcrumb">
          <a href="#" className="wabs-breadcrumb-link">Home</a>
          <span className="wabs-breadcrumb-arrow">➔</span>
          <span className="wabs-breadcrumb-current">Welcome ABS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="wabs-content">
        <div className="wabs-content-wrapper">
          {/* Left Section */}
          <div className="wabs-left-content">
            <h1 className="wabs-title">Welcome ABS</h1>
            <div className="wabs-divider"></div>

            <p className="wabs-last-signin">
              You last signed in with your GCKey on Sunday, September 28, 2025 at 02:08:13 ET.
            </p>
    <div className="dividing">
        <div className="one">

            <p className="wabs-info">
              From this page you can{' '}
              <a href="#" className="wabs-link">Change Your Password</a>,{' '}
              <a href="#" className="wabs-link">Change Your Recovery Questions</a>,{' '}
              <a href="#" className="wabs-link">Manage Your Email Address</a> or{' '}
              <a href="#" className="wabs-link">Revoke Your GCKey</a>.
            </p>

            <p className="wabs-security-note">
              To help protect your information, please remember to sign out and close your browser 
              before leaving this computer unattended.
            </p>

            <p className="wabs-instruction">
              Please select <strong>Continue</strong> to proceed to two-factor authentication.
            </p>

            <button className="wabs-continue-btn" onClick={handleContinue}>
              Continue
            </button>

        </div>
            <div className="wabs-sidebar">
            <h2 className="wabs-sidebar-title">Options</h2>
            
            <nav className="wabs-options-menu">
              <a 
                href="#" 
                className="wabs-option-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick('Change Your Password');
                }}
              >
                Change Your Password
              </a>
              <a 
                href="#" 
                className="wabs-option-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick('Change Your Recovery Questions');
                }}
              >
                Change Your Recovery Questions
              </a>
              <a 
                href="#" 
                className="wabs-option-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick('Manage Your Email Address');
                }}
              >
                Manage Your Email Address
              </a>
              <a 
                href="#" 
                className="wabs-option-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick('Revoke Your GCKey');
                }}
              >
                Revoke Your GCKey
              </a>
              <a 
                href="#" 
                className="wabs-option-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick('Sign Out');
                }}
              >
                Sign Out
              </a>
            </nav>
          </div>
    </div>

            <div className="wabs-footer-date">
              Date modified: 2024-07-21
            </div>
          </div>


          
        </div>
      </div>
      </div>
    </>
  )
}

export default AfterloginWelcome
