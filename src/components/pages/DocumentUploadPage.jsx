import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import UploadedDocumentsTable from "../applications/UploadedDocumentsTable";
import Button from "../common/Button";
import "./DocumentUploadPage.css";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dut3ohp0u/upload";
const UPLOAD_PRESET = "unsigned_preset";

const DocumentUploadPage = () => {
  const { appNumber } = useParams(); // candidate ID
  const [documents, setDocuments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [newDocument, setNewDocument] = useState({
    file: null,
    dateSend: "",
    dateRead: "",
  });

  // 🔹 Fetch documents from Firestore
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const q = query(
          collection(db, `candidates/${appNumber}/documents`),
          orderBy("position", "asc")
        );
        const snapshot = await getDocs(q);
        const docsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docsData);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocs();
  }, [appNumber]);

  // 🔹 File change handler
  const handleFileChange = (e) => {
    setNewDocument({ ...newDocument, file: e.target.files[0] });
  };

  const handleDateChange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };

  // 🔹 Upload document
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newDocument.file) {
      alert("Please choose a file to upload.");
      return;
    }

    try {
      // 1. Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", newDocument.file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Cloudinary upload failed");

      // 2. Save metadata in Firestore
      const newDoc = {
        name: newDocument.file.name,
        url: cloudData.secure_url,
        sendDate: newDocument.dateSend,
        readDate: newDocument.dateRead,
        position: documents.length + 1,
        uploadedAt: new Date(),
      };

      const docRef = await addDoc(
        collection(db, `candidates/${appNumber}/documents`),
        newDoc
      );

      // 3. Update UI
      setDocuments([...documents, { id: docRef.id, ...newDoc }]);
      setSuccessMessage("✅ Document uploaded and saved successfully.");
      setNewDocument({ file: null, dateSend: "", dateRead: "" });
      document.getElementById("file-input").value = null;
    } catch (err) {
      console.error("Upload failed:", err);
      setSuccessMessage("❌ Failed to upload document.");
    }
  };

  // 🔹 Delete
  const handleDelete = async (docId) => {
    setDocuments(documents.filter((doc) => doc.id !== docId));
    try {
    const docRef = doc(db, "candidates", appNumber, "documents", docId);
    await deleteDoc(docRef);  // 👈 This deletes from Firebase
    
    setDocuments(documents.filter((doc) => doc.id !== docId));
    setSuccessMessage("✅ Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document:", error);
    setSuccessMessage("❌ Failed to delete document.");
  }
  };

  // 🔹 Change position
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
    // update Firestore with new position
  };

  return (
    <div className="page-container">
      <div className="breadcrumb">
        Upload Documents → Candidate ID - ({appNumber})
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
