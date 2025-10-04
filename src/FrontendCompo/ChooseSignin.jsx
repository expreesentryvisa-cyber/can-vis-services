import { useState } from "react";
import { Link } from "react-router-dom";

function ChooseSignin() {
 const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="signin-box">
      <h2 className="box-title">Sign in</h2>
      
     <Link to="/gckey"> <button className="signin-button gckey-button">
        <span className="button-icon"><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/key.png" alt="key"/></span>
        <span className="button-text">GCKey username and password</span>
      </button>
      </Link>

      <button className="signin-button interac-button">
        <span className="button-icon"><img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/museum.png" alt="museum"/></span>
        <span className="button-text">Canadian <em>Interac</em>® Sign-In Partner</span>
      </button>

      <div className="help-section">
        <button 
          className="help-toggle"
          onClick={() => setHelpOpen(!helpOpen)}
        >
          <span className="toggle-icon">{helpOpen ? '▼' : '▶'}</span>
          <span className="help-text">Not sure how to sign in?</span>
        </button>
        {helpOpen && (
          <div className="help-content">
            <p>Help information about signing in...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChooseSignin