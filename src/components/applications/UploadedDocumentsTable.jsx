import React from "react";
import Button from "../common/Button";
import "./UploadedDocumentsTable.css"; // We will create this CSS file next

const UploadedDocumentsTable = ({
  documents,
  onPositionChange,
  onSavePosition,
  onDelete,
}) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Uploaded Documents</h2>
      <table className="documents-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Send Date</th>
            <th>Read Date</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="document-name">{doc.name}</td>
              <td>{doc.sendDate}</td>
              <td>{doc.readDate}</td>
              <td>
                <input
                  type="number"
                  className="position-input"
                  value={doc.position}
                  onChange={(e) => onPositionChange(doc.id, e.target.value)}
                  placeholder="Enter position"
                />
              </td>
              <td className="actions-cell">
                <Button
                  variant="primary"
                  onClick={() => onSavePosition(doc.id)}
                >
                  Save
                </Button>
                <Button variant="danger" onClick={() => onDelete(doc.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedDocumentsTable;
