import React from "react";
import "./AllApplicationsPage.css";
// NOTE: We will create the ApplicationTable component in the next step.
// The app will show an error until ApplicationTable.jsx is created.
import ApplicationTable from "../applications/ApplicationTable";

// Mock data to simulate fetching from an API
const mockApplications = [
  {
    id: 1,
    applicationNumber: "W354413720",
    holderName: "JASVIR KAUR",
    status: "pending",
  },
  {
    id: 2,
    applicationNumber: "W371682105",
    holderName: "Gursharan singh",
    status: "approved",
  },
  {
    id: 3,
    applicationNumber: "W1408025667",
    holderName: "GURNADAR SINGH GORAYA",
    status: "approved",
  },
];

const AllApplicationsPage = () => {
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
        <ApplicationTable applications={mockApplications} />
      </div>
    </div>
  );
};

export default AllApplicationsPage;
