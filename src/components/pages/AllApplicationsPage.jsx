import React, { useEffect, useState } from "react";
import "./AllApplicationsPage.css";
// NOTE: We will create the ApplicationTable component in the next step.
// The app will show an error until ApplicationTable.jsx is created.
import ApplicationTable from "../applications/ApplicationTable";
import { db } from "../../firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";

const AllApplicationsPage = () => {
   const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">All Applications List</h2>
        <div className="page-tabs">
          <span className="tab active">All Applications</span>
        </div>
      </div>

      {/* The ApplicationTable component will be rendered here */}
      <div className="page-content-area">
       {loading ? (
          <p>Loading applications...</p>
        ) : (
          <ApplicationTable applications={applications} />
        )}
      </div>
    </div>
  );
};

export default AllApplicationsPage;
