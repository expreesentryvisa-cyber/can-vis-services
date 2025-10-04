import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust path as needed
import { doc, getDoc } from 'firebase/firestore';
import Header from './Header';
import "../GckeyMain.css";

function GckeyMain() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('5');
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from sessionStorage
    const userSession = sessionStorage.getItem('currentUser');
    
    if (!userSession) {
      alert("❌ Please sign in first");
      navigate('/');
      return;
    }

    const user = JSON.parse(userSession);
    setCurrentUser(user);

    // Fetch complete user data from Firebase
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "candidates", user.id);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
        } else {
          alert("❌ User data not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("❌ Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="app-wrapper-unique">
          <div className="container-unique">
            <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="app-wrapper-unique">
        <div className="container-unique">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb-unique">
            <a href="#" className="breadcrumb-link-unique">Home</a>
            <span className="breadcrumb-separator-unique">&gt;</span>
            <span className="breadcrumb-current-unique">Your account</span>
          </div>

          {/* User Info Bar */}
          <div className="user-info-bar-unique">
            <span className="signed-in-text-unique"></span>
            <div className="user-links-unique">
              <span className="signed-in-text-unique">
                Signed in as {userData?.name || currentUser?.username}
              </span>
              <a href="#" className="user-link-unique">Account home</a>
              <span className="link-separator-unique">|</span>
              <a href="#" className="user-link-unique">Account profile</a>
              <span className="link-separator-unique">|</span>
              <a href="#" className="user-link-unique">Help</a>
              <span className="link-separator-unique">|</span>
              <a 
                href="#" 
                className="user-link-unique"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
              >
                Logout
              </a>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="main-heading-unique">
            {userData?.name || currentUser?.username}'s account
          </h1>
          <hr className="divider-unique" />

          {/* Content Section */}
          <div className="content-section-unique">
            <h2 className="section-title-unique">View the applications you submitted</h2>
            <p className="section-description-unique">
              Review, check the status or read messages about your submitted application.
            </p>

            {/* Search and Filter Controls */}
            <div className="controls-row-unique">
              <div className="search-control-unique">
                <label htmlFor="search" className="search-label-unique">Search:</label>
                <input
                  type="text"
                  id="search"
                  className="search-input-unique"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="entries-info-unique">
                  <span className="showing-text-unique">Showing 1 to 1 of 1 entries</span>
                  <span className="separator-pipe-unique">|</span>
                  <label htmlFor="entries" className="show-label-unique">Show</label>
                  <select
                    id="entries"
                    className="entries-select-unique"
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(e.target.value)}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="entries-label-unique">entries</span>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <table className="applications-table-unique">
              <thead>
                <tr>
                  <th className="table-header-unique">Application<br />type</th>
                  <th className="table-header-unique">Application<br />number</th>
                  <th className="table-header-unique">Applicant<br />name</th>
                  <th className="table-header-unique highlight-header-unique">Date submitted</th>
                  <th className="table-header-unique">Current<br />status</th>
                  <th className="table-header-unique">Messages</th>
                  <th className="table-header-unique">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row-unique">
                  <td className="table-cell-unique">
                    {userData?.applicationType || 'Online'}<br />Application
                  </td>
                  <td className="table-cell-unique">
                    {userData?.applicationNumber || 'N/A'}
                  </td>
                  <td className="table-cell-unique">
                    {userData?.holderName || userData?.name || 'N/A'}
                  </td>
                  <td className="table-cell-unique">
                    {formatDate(userData?.dateSubmitted || userData?.createdAt)}
                  </td>
                  <td className="table-cell-unique">
                    {userData?.status ? 
                      userData.status.charAt(0).toUpperCase() + userData.status.slice(1) 
                      : 'Pending'}
                  </td>
                  <td className="table-cell-unique">
                    {userData?.messages || 'New'}
                  </td>
                  <td className="table-cell-unique">
                    <a 
                      href="#" 
                      className="action-link-unique"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/application-profile');
                      }}
                    >
                      Check full application<br />status
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-unique">
              <button className="page-button-unique active-page-unique">1</button>
            </div>
            <p>
              Did you apply on paper or don't see your online application in your account?{' '}
              <a href="#">Add (link) your application to your account</a> to access it and check your status online.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GckeyMain;