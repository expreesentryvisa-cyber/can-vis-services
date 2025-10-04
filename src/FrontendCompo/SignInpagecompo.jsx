import React, { useState } from "react";
import Accordion from "./Accordion";
import AuthPage from "./AuthPage";
import HelpPage from "./HelpPage";
import Header from "./Header";
import CanadaFooter from "./CanadaFooter";

function SignInpagecompo() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
  <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
   <div className="signin-container">
      
      
      <div className="content">
        <nav className="breadcrumb">
        <a href="#">Canada.ca</a> › 
        <a href="#">Immigration and citizenship</a> › 
        <a href="#">IRCC applications</a>
      </nav>
        <h1 className="page-title">Sign in</h1>
        <h2 className="section-title">IRCC secure account</h2>
        
        <p className="intro-text">
          We have different accounts for some applications.
        </p>
        <p className="intro-text">
          <strong>You may need a different account to apply</strong>, depending on the application you submit.
        </p>
        
        <h3 className="subsection-title">Check if this is the right account for you</h3>
        
        <Accordion title="Apply " title2="for these applications">
          <p>Content goes here...</p>
        </Accordion>
        
        <Accordion title="Check the status " title2="of for these applications">
          <p>Content goes here...</p>
        </Accordion>
        
        <Accordion title="Upload requested documents " title2="for these applications">
          <p>Content goes here...</p>
        </Accordion>
        
      </div>
    </div>
    <AuthPage/>
    <HelpPage/>
    <CanadaFooter/>
    </>
  );
}

export default SignInpagecompo;
