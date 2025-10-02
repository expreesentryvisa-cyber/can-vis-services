import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import "./ApplicationRow.css";

const ApplicationRow = ({ application }) => {
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const navigate = useNavigate(); // Initialize the navigate hook

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleUpdateClick = () => {
    alert(`Updating status for ${application.holderName} to ${currentStatus}`);
    // In a real app, you would dispatch an action or call an API here
  };

  const handleDeleteClick = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the GC KEY for ${application.holderName}?`
      )
    ) {
      alert("Delete functionality not implemented yet.");
    }
  };

  return (
    <tr className="app-row">
      <td>{application.applicationNumber}</td>
      <td>{application.holderName}</td>
      <td>
        <div className="status-cell">
          <Dropdown
            options={statusOptions}
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          />
          <Button variant="primary" onClick={handleUpdateClick}>
            Update
          </Button>
        </div>
      </td>
      <td>
        <div className="actions-cell">
          <Button variant="primary">Edit Security Questions</Button>

          {/* UPDATED: Navigates to the Edit page for the specific application ID */}
          <Button
            variant="primary"
            onClick={() => navigate(`/applications/edit/${application.id}`)}
          >
            Edit GCC Key
          </Button>

          {/* UPDATED: Navigates to the Documents page for the specific application number */}
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/applications/${application.applicationNumber}/documents`
              )
            }
          >
            See Uploaded Documents
          </Button>

          <Button variant="secondary">Preview GC KEY</Button>
        </div>
      </td>
      <td>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete GC KEY
        </Button>
      </td>
    </tr>
  );
};

export default ApplicationRow;
