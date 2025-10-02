import React from "react";
import ApplicationRow from "./ApplicationRow";
import "./ApplicationTable.css";

const ApplicationTable = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return <p>No applications to display.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="application-table">
        <thead>
          <tr>
            <th>Application Number</th>
            <th>Holder Name</th>
            <th>Application Status</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <ApplicationRow key={app.id} application={app} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
