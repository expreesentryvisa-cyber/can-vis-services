import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Header from './Header';
import "../ApplicationProfile.css";

function ApplicationProfile() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem('currentUser');
    
    if (!userSession) {
      alert("Please sign in first");
      navigate('/');
      return;
    }

    const user = JSON.parse(userSession);
    setCurrentUser(user);

    const fetchUserData = async () => {
      try {
        // Use user.id as the document ID (e.g., "W23456783")
        const userRef = doc(db, "candidates", user.id);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          
          // Fetch documents using the document ID (user.id), not applicationNumber
          await fetchDocuments(data.applicationNumber);
        } else {
          alert("User data not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchDocuments = async (documentId) => {
    try {
      console.log("Fetching documents for document ID:", documentId);
      
      // Get reference to the documents subcollection using the document ID
      const documentsRef = collection(db, "candidates", documentId, "documents");
      const documentsSnap = await getDocs(documentsRef);
      
      console.log("Documents found:", documentsSnap.docs.length);
      
      const documentsList = documentsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setDocuments(documentsList);
    } catch (error) {
      console.error("Error fetching documents:", error);
      console.error("Error details:", error.message);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      console.log("User logged out");
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusMessage = (status) => {
    if (!status) return 'Your application is pending review';
    switch(status.toLowerCase()) {
      case 'approved':
        return 'Your application was approved. Check your messages below for details.';
      case 'rejected':
        return 'Your application was not approved. Check your messages below for details.';
      case 'pending':
      default:
        return 'Your application is under review.';
    }
  };

  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (doc.name && doc.name.toLowerCase().includes(searchLower)) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(searchLower)) ||
      (doc.subject && doc.subject.toLowerCase().includes(searchLower)) ||
      (doc.documentType && doc.documentType.toLowerCase().includes(searchLower))
    );
  });

  // Paginate documents
  const startIndex = 0;
  const endIndex = parseInt(entriesPerPage);
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  if (loading) {
    return (
      <>
        <Header />
        <div className="status-app-wrapper-uniq">
          <div className="status-container-uniq">
            <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="status-app-wrapper-uniq">
        <div className="status-container-uniq">
          {/* Breadcrumb Navigation */}
          <div className="status-breadcrumb-uniq">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/gckey-main'); }}>Home</a>
            <span className="status-breadcrumb-separator-uniq">&gt;</span>
            <span className="status-breadcrumb-current-uniq">Your account</span>
          </div>

          {/* User Info Bar */}
          <div className="status-user-info-bar-uniq">
            <span className="status-signed-in-text-uniq"></span>
            <div className="status-user-links-uniq">
              <span className="status-signed-in-text-uniq">
                Signed in as {userData?.name || currentUser?.username}
              </span>
              <a href="#" className="status-user-link-uniq" onClick={(e) => { e.preventDefault(); navigate('/gckey-main'); }}>Account home</a>
              <span className="status-link-separator-uniq">|</span>
              <a href="#" className="status-user-link-uniq">Account profile</a>
              <span className="status-link-separator-uniq">|</span>
              <a href="#" className="status-user-link-uniq">Help</a>
              <span className="status-link-separator-uniq">|</span>
              <a 
                href="#" 
                className="status-user-link-uniq"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
              >
                Logout
              </a>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="status-main-heading-uniq">Application status and messages</h1>
          <hr className="status-divider-uniq" />

          {/* Subtitle */}
          <p className="status-subtitle-uniq">
            Check the status, review the details and read messages for your application.
            <a href="#" className="status-view-link-uniq">View submitted application or upload documents</a>
          </p>

          {/* Two Column Layout */}
          <div className="status-two-column-uniq">
            {/* Left Column - Application Status */}
            <div className="status-card-uniq">
              <div className="status-card-header-uniq">
                <h2 className="status-card-title-uniq">Application status</h2>
              </div>
              <div className="status-card-body-uniq">
                <p className="status-card-text-uniq">
                  {userData?.status === 'approved' 
                    ? 'A final decision has been made. Please see the final decision below.'
                    : 'Your application is currently being reviewed.'}
                </p>

                <div className="status-update-section-uniq">
                  <p className="status-update-title-uniq">Latest update:</p>
                  
                  <p className="status-update-detail-uniq"> 
                    {userData?.reviewOfEligibility || 'Review of eligibility in progress'}
                    <span className="status-update-text-uniq">
                      <span>{userData?.finalDecisionMessage || getStatusMessage(userData?.status)}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Applicant Information */}
            <div className="status-card-uniq">
              <div className="status-card-header-uniq">
                <h2 className="status-card-title-uniq">Applicant information</h2>
              </div>
              <div className="status-card-body-uniq">
                <p className="status-info-item-uniq">
                  <span className="status-info-label-uniq">Principal Applicant: </span>
                  <span className="status-info-value-uniq">{userData?.name || 'N/A'}</span>
                </p>
                <p className="status-info-item-uniq">
                  <span className="status-info-label-uniq">Unique Client Identifier (UCI): </span>
                  <span className="status-info-value-uniq">{userData?.clientIdentifierUCI || 'N/A'}</span>
                </p>
                <p className="status-info-item-uniq">
                  <span className="status-info-label-uniq">Application number: </span>
                  <span className="status-info-value-uniq">{userData?.applicationNumber || 'N/A'}</span>
                </p>
                <p className="status-info-item-uniq">
                  <span className="status-info-label-uniq">Date Received: </span>
                  <span className="status-info-value-uniq">{formatDate(userData?.submissionDate)}</span>
                </p>
                <p className="status-info-item-uniq">
                  <span className="status-info-label-uniq">Biometrics:</span>
                </p>
                <p className="status-info-item-uniq" style={{ marginLeft: '20px' }}>
                  <span className="status-info-label-uniq">Biometrics Number: </span>
                  <a href="#" className="status-biometrics-number-uniq">{userData?.biometricsNumber || 'N/A'}</a>
                </p>
                <p className="status-info-item-uniq" style={{ marginLeft: '20px' }}>
                  <span className="status-info-label-uniq">Date of Biometrics Enrolment: </span>
                  <a href="#" className="status-biometrics-number-uniq">{formatDate(userData?.dateOfBiometricsEnrolment)}</a>
                </p>
                <p className="status-info-item-uniq" style={{ marginLeft: '20px' }}>
                  <span className="status-info-label-uniq">Expiry Date: </span>
                  <a href="#" className="status-biometrics-number-uniq">{formatDate(userData?.biometricsExpiryDate)}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="details-app-wrapper-uniq">
        <div className="details-container-uniq">
          <h1 className="details-main-heading-uniq">Details about your application status</h1>

          <p className="details-intro-text-uniq">
            When we get your application, there are a series of steps it may go through before we make a decision. Use the following table to find out the current status of each application step.
          </p>

          <div className="details-status-list-uniq">
            {/* Review of eligibility */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">📋</span>
                <h2 className="details-status-title-uniq">
                  Review of eligibility
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  {userData?.reviewOfEligibility || 'Your eligibility is being reviewed.'}
                </p>
              </div>
            </div>

            {/* Review of medical results */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">🏥</span>
                <h2 className="details-status-title-uniq">
                  Review of medical results
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  <span className="details-date-uniq">{formatDate(userData?.medicalEnrolmentDate)}</span> {userData?.reviewOfMedicalResults || 'Medical review in progress.'}
                </p>
              </div>
            </div>

            {/* Review of additional documents */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">📁</span>
                <h2 className="details-status-title-uniq">
                  Review of additional documents
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  {userData?.reviewOfAdditionalDocuments || 'Document review in progress.'}
                </p>
              </div>
            </div>

            {/* Interview */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">👥</span>
                <h2 className="details-status-title-uniq">
                  Interview
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  {userData?.interviewMessage || 'Interview status will be updated.'}
                </p>
              </div>
            </div>

            {/* Biometrics */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">👆</span>
                <h2 className="details-status-title-uniq">
                  Biometrics
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  <span className="details-date-uniq">{formatDate(userData?.dateOfBiometricsEnrolment)}</span> {userData?.biometricsMessage || 'Completed.'}
                </p>
              </div>
            </div>

            {/* Background check */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">🔍</span>
                <h2 className="details-status-title-uniq">
                  Background check
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  <span className="details-date-uniq">{formatDate(userData?.backgroundCheckDate)}</span> {userData?.backgroundCheckMessage || 'Background check completed.'}
                </p>
              </div>
            </div>

            {/* Final decision */}
            <div className="details-status-item-uniq">
              <div className="details-status-header-uniq">
                <span className="details-icon-uniq">✅</span>
                <h2 className="details-status-title-uniq">
                  Final decision
                  <span className="details-help-icon-uniq">?</span>
                </h2>
              </div>
              <div className="details-status-detail-uniq">
                <span className="details-bullet-uniq">○</span>
                <p className="details-detail-text-uniq">
                  <span className="details-date-uniq">{formatDate(userData?.finalDecisionDate)}</span> {userData?.finalDecisionMessage || getStatusMessage(userData?.status)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="app-messages-wrapper">
        <div className="app-messages-container">
          <h1 className="app-messages-title">Messages about your application</h1>
          
          <div className="app-messages-info-box">
            <span className="app-messages-info-icon">ℹ️</span>
            <p className="app-messages-info-text">
              Links and document titles are shown in the language you chose for your portal account when they were generated.
            </p>
          </div>

          <div className="app-messages-new-count">
            ({documents.length} {documents.length === 1 ? 'Document' : 'Documents'})
          </div>

          <div className="app-messages-controls">
            <div className="app-messages-search-group">
              <label htmlFor="search" className="app-messages-label">Search:</label>
              <input 
                type="text" 
                id="search"
                className="app-messages-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="app-messages-show-group">
              <label htmlFor="entries" className="app-messages-label">Show</label>
              <select 
                id="entries"
                className="app-messages-select"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="app-messages-label">entries</span>
            </div>
          </div>

          <table className="app-messages-table">
            <thead>
              <tr>
                <th className="app-messages-th">Document Name</th>
                <th className="app-messages-th app-messages-sortable">
                  Date sent ⬇
                </th>
                <th className="app-messages-th">Date read</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocuments.length > 0 ? (
                paginatedDocuments.map((document, index) => (
                  <tr key={document.id || index} className="app-messages-row">
                    <td className="app-messages-td">
                      <a 
                        href={document.url || "#"} 
                        target={document.url ? "_blank" : "_self"}
                        rel={document.url ? "noopener noreferrer" : ""}
                        className="app-messages-link"
                      >
                        {document.name || document.documentName || 'Untitled Document'}
                      </a>
                    </td>
                    <td className="app-messages-td">
                      {formatDate(document.sendDate || document.sendData || document.createdAt || document.uploadedAt)}
                    </td>
                    <td className="app-messages-td">
                      {formatDate(document.readDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="app-messages-row">
                  <td colSpan="3" className="app-messages-td" style={{ textAlign: 'center' }}>
                    No documents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="app-messages-footer">
            <span className="app-messages-showing">
              Showing {paginatedDocuments.length > 0 ? 1 : 0} to {paginatedDocuments.length} of {filteredDocuments.length} entries
            </span>
            <div className="app-messages-pagination">
              <button className="app-messages-page-btn app-messages-active">1</button>
            </div>
          </div>

          <button className="app-messages-report-btn">
            Report a problem or mistake on this page
          </button>
        </div>
      </div>
    </>
  );
}

export default ApplicationProfile;