import "../SecureAccessBox.css";

function SecureAccessBox() {
  return (
    <div className="right-info">
      <h2 className="info-title">Simple Secure Access</h2>
      
      <p className="info-text">
        A simple way to securely access Government of Canada online services.
      </p>

      <p className="info-text">One username.</p>
      <p className="info-text">One password.</p>

      <button className="btn btn-signup" aria-label="Sign up for a new GCKey account">
        Sign Up
      </button>

      <p className="info-footer">
        Your GCKey can be used to access multiple Government of Canada online{' '}
        <a href="#enabled-services" className="info-link">Enabled Services</a>.
      </p>
    </div>
  );
}

export default SecureAccessBox;