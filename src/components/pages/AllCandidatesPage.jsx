import React, { useState, useEffect } from "react";
import "./AllCandidatesPage.css";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";

const AllCandidatesPage = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch approved candidates from Firestore
  useEffect(() => {
    const fetchApprovedCandidates = async () => {
      try {
        const candidatesRef = collection(db, "candidates");
        const q = query(candidatesRef, where("status", "==", "approved"));
        const snapshot = await getDocs(q);
        const candidatesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(candidatesList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setLoading(false);
      }
    };
    fetchApprovedCandidates();
  }, []);

  const handleEditSecurityQuestion = (candidate) => {
    setSelectedCandidate(candidate);
    setSecurityAnswer(candidate.securityAnswer || "");
    setShowSecurityModal(true);
  };

  const handleSecurityQuestionSubmit = async () => {
    if (!securityAnswer.trim()) {
      alert("Please provide an answer to the security question.");
      return;
    }

    setIsLoading(true);
    try {
      const candidateRef = doc(db, "candidates", selectedCandidate.id);
      await setDoc(
        candidateRef,
        {
          securityQuestion: "What is your childhood friend name?",
          securityAnswer: securityAnswer.trim(),
          securityUpdatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      
      setCandidates(candidates.map(c => 
        c.id === selectedCandidate.id 
          ? { ...c, securityAnswer: securityAnswer.trim() }
          : c
      ));
      
      alert("✅ Security question updated successfully!");
      setShowSecurityModal(false);
      setSelectedCandidate(null);
      setSecurityAnswer("");
    } catch (err) {
      console.error("Error updating security question:", err);
      alert("❌ Failed to update security question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCandidate = (candidateId) => {
    navigate(`/applications/edit/${candidateId}`);
  };

  const handleSeeDocuments = (applicationNumber) => {
    if (!applicationNumber) {
      alert("Application number not found for this candidate.");
      return;
    }
    navigate(`/applications/${applicationNumber}/documents`);
  };

  const handlePreviewGCKey = (candidate) => {
    // Set the user session to preview this candidate's application
    const previewUser = {
      id: candidate.id,
      username: candidate.username || candidate.name,
      applicationNumber: candidate.applicationNumber
    };
    
    // Store in sessionStorage so ApplicationProfile can access it
    sessionStorage.setItem('currentUser', JSON.stringify(previewUser));
    
    // Navigate to the application profile page
    navigate('/application-profile');
  };

  const handleDelete = async (candidateId) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        const candidateRef = doc(db, "candidates", candidateId);
        await deleteDoc(candidateRef);
        setCandidates(candidates.filter((c) => c.id !== candidateId));
        alert("✅ Candidate deleted successfully!");
      } catch (err) {
        console.error("Error deleting candidate:", err);
        alert("❌ Failed to delete candidate. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowSecurityModal(false);
    setSelectedCandidate(null);
    setSecurityAnswer("");
  };

  if (loading) {
    return <div className="page-container">Loading candidates...</div>;
  }

  return (
    <>
      <div className="candidates-container">
        <h1>Approved Candidates</h1>
        <div className="list-header">
          <h2>All Approved Candidates</h2>
          <Link to="/addnewcandidate">
            <button className="add-candidate-btn">Add New Candidate</button>
          </Link>
        </div>
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.username}</td>
                <td>{candidate.password}</td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-security"
                    onClick={() => handleEditSecurityQuestion(candidate)}
                  >
                    Edit Security Questions
                  </button>
                  <button
                    className="action-btn edit-gcc"
                    onClick={() => handleEditCandidate(candidate.id)}
                  >
                    Edit GCC Key
                  </button>
                  <button
                    className="action-btn see-docs"
                    onClick={() => handleSeeDocuments(candidate.applicationNumber)}
                  >
                    See Uploaded Documents
                  </button>
                  <button
                    className="action-btn preview-btn"
                    onClick={() => handlePreviewGCKey(candidate)}
                  >
                    Preview GC KEY
                  </button>
                </td>
                <td>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(candidate.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Question Modal */}
      {showSecurityModal && (
        <div className="acp-modal-overlay" onClick={closeModal}>
          <div className="acp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="acp-modal-header">
              <h2>Edit Security Question</h2>
              <button className="acp-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="acp-modal-body">
              <div className="acp-form-group">
                <label className="acp-form-label">
                  Candidate: <strong>{selectedCandidate?.name}</strong>
                </label>
              </div>
              <div className="acp-form-group">
                <label className="acp-form-label">Security Question:</label>
                <p className="acp-security-question-text">
                  What is your childhood friend name?
                </p>
              </div>
              <div className="acp-form-group">
                <label htmlFor="securityAnswer" className="acp-form-label">
                  Your Answer: <span className="acp-required">*</span>
                </label>
                <input
                  type="text"
                  id="securityAnswer"
                  className="acp-form-input"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Enter your childhood friend's name"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="acp-modal-footer">
              <button
                className="acp-btn acp-btn-secondary"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="acp-btn acp-btn-primary"
                onClick={handleSecurityQuestionSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Answer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCandidatesPage;