import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import UploadedDocumentsTable from "../applications/UploadedDocumentsTable";
import "./DocumentUploadPage.css"; // We will create this CSS file next

const DocumentUploadPage = () => {
  const { appNumber } = useParams(); // Get application number from URL
  const navigate = useNavigate();

  // Mock data for existing documents
  const initialDocuments = [
    {
      id: 1,
      name: "Confirmation Of Online Application Transmission",
      sendDate: "2025-09-16",
      readDate: "2025-09-16",
      position: 3,
    },
    {
      id: 2,
      name: "Submission Confirmation",
      sendDate: "2025-09-15",
      readDate: "2025-09-11",
      position: 1,
    },
    {
      id: 3,
      name: "Biometrics Collection Letter",
      sendDate: "2025-09-05",
      readDate: "2025-09-03",
      position: 2,
    },
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [successMessage, setSuccessMessage] = useState("");
  const [newDocument, setNewDocument] = useState({
    file: null,
    dateSend: "",
    dateRead: "",
  });

  const handleFileChange = (e) => {
    setNewDocument({ ...newDocument, file: e.target.files[0] });
  };

  const handleDateChange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDocument.file) {
      alert("Please choose a file to upload.");
      return;
    }
    // Simulate upload
    const newDocEntry = {
      id: Date.now(), // Use a unique ID
      name: newDocument.file.name,
      sendDate: newDocument.dateSend,
      readDate: newDocument.dateRead,
      position: documents.length + 1,
    };
    setDocuments([...documents, newDocEntry]);
    setSuccessMessage("Document uploaded and saved successfully.");
    // Clear form
    setNewDocument({ file: null, dateSend: "", dateRead: "" });
    document.getElementById("file-input").value = null; // Clear file input visually
  };

  const handleDelete = (docId) => {
    setDocuments(documents.filter((doc) => doc.id !== docId));
  };

  const handlePositionChange = (docId, newPosition) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === docId ? { ...doc, position: newPosition } : doc
      )
    );
  };

  const handleSavePosition = (docId) => {
    const doc = documents.find((d) => d.id === docId);
    alert(`Position for "${doc.name}" saved as ${doc.position}.`);
    // In a real app, this would be an API call
  };

  return (
    <div className="page-container">
      <div className="breadcrumb">
        Upload Documents &rarr; Application No - ({appNumber})
      </div>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <form className="upload-form-container" onSubmit={handleUpload}>
        <div className="form-field">
          <label>Choose Document</label>
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-field">
          <label>Date Send</label>
          <input
            type="date"
            name="dateSend"
            className="date-input"
            value={newDocument.dateSend}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-field">
          <label>Date Read</label>
          <input
            type="date"
            name="dateRead"
            className="date-input"
            value={newDocument.dateRead}
            onChange={handleDateChange}
          />
          <span className="field-note">This Is Message Not Date</span>
        </div>
        <div className="form-action-field">
          <Button type="submit" variant="primary">
            Upload Document
          </Button>
        </div>
      </form>

      <UploadedDocumentsTable
        documents={documents}
        onDelete={handleDelete}
        onPositionChange={handlePositionChange}
        onSavePosition={handleSavePosition}
      />
    </div>
  );
};

export default DocumentUploadPage;
