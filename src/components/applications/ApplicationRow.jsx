import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import { db } from "../../firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import "./ApplicationRow.css";

const ApplicationRow = ({ application }) => {
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  useEffect(() => {
    const appRef = doc(db, "candidates", application.id);
    // Subscribe to the document to get live updates
    const unsubscribe = onSnapshot(appRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentStatus(data.status || "pending");
        setSecurityAnswer(data.securityAnswer || "");
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [application.id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    try {
      const appRef = doc(db, "candidates", application.id);
      await setDoc(appRef, { status: newStatus }, { merge: true });
      console.log(`Status for ${application.holderName} updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSecurityQuestionSubmit = async () => {
    if (!securityAnswer.trim()) {
      alert("Please provide an answer to the security question.");
      return;
    }

    setIsLoading(true);
    try {
      const appRef = doc(db, "candidates", application.id);
      await setDoc(
        appRef,
        {
          securityQuestion: "What is your childhood friend name?",
          securityAnswer: securityAnswer.trim(),
          securityUpdatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      alert("✅ Security question updated successfully!");
      setShowSecurityModal(false);
    } catch (err) {
      console.error("Error updating security question:", err);
      alert("❌ Failed to update security question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete the GC KEY for ${application.holderName}?`
      )
    ) {
      try {
        const appRef = doc(db, "candidates", application.id);
        await appRef.delete();
        alert("✅ GC KEY deleted successfully!");
      } catch (err) {
        console.error("Error deleting application:", err);
        alert("❌ Failed to delete. Please try again.");
      }
    }
  };

  const handlePreviewGCKey = () => {
    // Set the user session to preview this application
    const previewUser = {
      id: application.id,
      username: application.holderName,
      applicationNumber: application.applicationNumber
    };
    
    // Store in sessionStorage so ApplicationProfile can access it
    sessionStorage.setItem('currentUser', JSON.stringify(previewUser));
    
    // Navigate to the application profile page
    navigate('/application-profile');
  };

  return (
    <>
      <tr className="app-row">
        <td>{application.applicationNumber}</td>
        <td>{application.holderName}</td>
        <td>
          <div className="status-cell">
            <Dropdown
              options={statusOptions}
              value={currentStatus}
              onChange={handleStatusChange}
            />
          </div>
        </td>
        <td>
          <div className="actions-cell">
            <Button
              variant="primary"
              onClick={() => setShowSecurityModal(true)}
            >
              Edit Security Questions
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/applications/edit/${application.id}`)}
            >
              Edit GCC Key
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/applications/${application.applicationNumber}/documents`)
              }
            >
              See Uploaded Documents
            </Button>
            <Button variant="secondary" onClick={handlePreviewGCKey}>
              Preview GC KEY
            </Button>
          </div>
        </td>
        <td>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete GC KEY
          </Button>
        </td>
      </tr>

      {/* Security Question Modal */}
      {showSecurityModal && (
        <div className="app-row-modal-overlay" onClick={() => setShowSecurityModal(false)}>
          <div className="app-row-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="app-row-modal-header">
              <h2>Edit Security Question</h2>
              <button
                className="app-row-modal-close"
                onClick={() => setShowSecurityModal(false)}
              >
                ×
              </button>
            </div>
            <div className="app-row-modal-body">
              <div className="app-row-form-group">
                <label className="app-row-form-label">Security Question:</label>
                <p className="app-row-security-question-text">
                  What is your childhood friend name?
                </p>
              </div>
              <div className="app-row-form-group">
                <label htmlFor="securityAnswer" className="app-row-form-label">
                  Your Answer: <span className="app-row-required">*</span>
                </label>
                <input
                  type="text"
                  id="securityAnswer"
                  className="app-row-form-input"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Enter your childhood friend's name"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="app-row-modal-footer">
              <Button
                variant="secondary"
                onClick={() => setShowSecurityModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSecurityQuestionSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Answer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationRow;