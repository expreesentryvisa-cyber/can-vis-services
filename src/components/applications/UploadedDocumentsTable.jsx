import React from "react";
import Button from "../common/Button";
import "./UploadedDocumentsTable.css";

const UploadedDocumentsTable = ({
  documents,
  onPositionChange,
  onSavePosition,
  onDelete,
}) => {
  
  const handleDelete = async (docId, docName) => {
    if (window.confirm(`Are you sure you want to delete "${docName}"? This action cannot be undone.`)) {
      await onDelete(docId);
    }
  };

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
          {documents.length > 0 ? (
            documents.map((doc) => (
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
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(doc.id, doc.name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No documents uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedDocumentsTable;