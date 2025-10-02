import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../common/Button";
// Dropdown is still imported, but we'll use DropdownWithLabel for consistency
import Dropdown from "../common/Dropdown";
import "./EditGcKeyPage.css";

// --- Placeholder Components for Inputs and DatePicker ---
const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  readOnly = false,
}) => (
  <div className="form-field">
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className="form-input"
    />
  </div>
);

const DatePickerInput = ({ label, value, onChange, name }) => (
  <div className="form-field">
    <label>{label}</label>
    <div className="date-picker-wrapper">
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      />
      <span className="calendar-icon">📅</span> {/* Calendar icon */}
    </div>
  </div>
);

const TextAreaInput = ({ label, value, onChange, placeholder, name }) => (
  <div className="form-field">
    <label>{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-textarea"
      rows="4"
    ></textarea>
  </div>
);

// NEW: Dropdown component with integrated label for consistent styling
const DropdownWithLabel = ({
  label,
  options,
  value,
  onChange,
  name,
  className = "",
}) => (
  <div className="form-field">
    <label>{label}</label>
    <div className={`dropdown-wrapper ${className}`}>
      <select
        className="form-input dropdown-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
// --- End Placeholder Components ---

const applicationTypes = [
  { value: "online", label: "Online Application" },
  { value: "paper", label: "Paper Application" },
  { value: "renewal", label: "Renewal" },
];

const EditGcKeyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicationType: "online",
    applicantName: "",
    applicationNumber: "",
    submissionDate: "",
    finalDecisionDate: "",
    finalDecisionMessage: "",
    biometricsNumber: "",
    dateOfBiometricsEnrolment: "",
    clientIdentifierUCI: "",
    reviewOfMedicalResults: "",
    reviewOfEligibility: "",
    medicalEnrolmentDate: "",
    reviewOfAdditionalDocuments: "",
    interviewMessage: "",
    backgroundCheckMessage: "",
    biometricsMessage: "",
    biometricsExpiryDate: "",
    backgroundCheckDate: "",
    reviewOrFinalMessage: "",
  });

  useEffect(() => {
    if (id) {
      console.log(`Fetching GCKEY data for ID: ${id}`);
      const mockData = {
        applicationType: "online",
        applicantName: "ABC",
        applicationNumber: "W23456783",
        submissionDate: "2025-09-01",
        finalDecisionDate: "2025-09-28",
        finalDecisionMessage:
          "November 28, 2025 Your application was approved. Check your messages...",
        biometricsNumber: "00055442666277788288282",
        dateOfBiometricsEnrolment: "2025-09-12",
        clientIdentifierUCI: "11396853.444",
        reviewOfMedicalResults:
          "You need a medical exam. We will send you a message if this changes.",
        reviewOfEligibility:
          "November 26, 2025 Your eligibility has been reviewed. Please see the final decision.",
        medicalEnrolmentDate: "2025-09-17",
        reviewOfAdditionalDocuments: "We do not need additional documents.",
        interviewMessage:
          "You do not need an interview. We will send you a message if this changes.",
        backgroundCheckMessage:
          "We are processing your background check. We will send you a message.",
        biometricsMessage:
          "We do not need your fingerprints. We will send you a message if this changes.",
        biometricsExpiryDate: "2035-11-09",
        backgroundCheckDate: "2025-09-18",
        reviewOrFinalMessage: "This is the final message regarding the review.",
      };
      setFormData(mockData);
    } else {
      setFormData({
        applicationType: "online",
        applicantName: "",
        applicationNumber: "",
        submissionDate: "",
        finalDecisionDate: "",
        finalDecisionMessage: "",
        biometricsNumber: "",
        dateOfBiometricsEnrolment: "",
        clientIdentifierUCI: "",
        reviewOfMedicalResults: "",
        reviewOfEligibility: "",
        medicalEnrolmentDate: "",
        reviewOfAdditionalDocuments: "",
        interviewMessage: "",
        backgroundCheckMessage: "",
        biometricsMessage: "",
        biometricsExpiryDate: "",
        backgroundCheckDate: "",
        reviewOrFinalMessage: "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert(`GCKEY ${id ? "updated" : "added"} successfully!`);
    navigate("/applications");
  };

  const handleCancel = () => {
    navigate("/applications");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">{id ? "Edit GCKEY" : "Add New GCKEY"}</h2>
      <form onSubmit={handleSubmit} className="gc-key-form">
        <div className="form-grid">
          {/* Changed to DropdownWithLabel */}
          <DropdownWithLabel
            label="Application Type"
            options={applicationTypes}
            value={formData.applicationType}
            onChange={(e) =>
              handleChange({
                target: { name: "applicationType", value: e.target.value },
              })
            }
            name="applicationType"
          />
          <TextInput
            label="Application Applicant Name"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            placeholder="ABC"
          />
          <TextInput
            label="Application Number"
            name="applicationNumber"
            value={formData.applicationNumber}
            onChange={handleChange}
            placeholder="W23456783"
          />
          <DatePickerInput
            label="Submission Date"
            name="submissionDate"
            value={formData.submissionDate}
            onChange={handleChange}
          />
          <DatePickerInput
            label="Final Decision Date"
            name="finalDecisionDate"
            value={formData.finalDecisionDate}
            onChange={handleChange}
          />
          <TextAreaInput
            label="Final Decision Message"
            name="finalDecisionMessage"
            value={formData.finalDecisionMessage}
            onChange={handleChange}
            placeholder="Final decision message..."
          />
          <TextInput
            label="Biometrics Number"
            name="biometricsNumber"
            value={formData.biometricsNumber}
            onChange={handleChange}
            placeholder="Biometrics number..."
          />
          <DatePickerInput
            label="Date Of Biometrics Enrolment"
            name="dateOfBiometricsEnrolment"
            value={formData.dateOfBiometricsEnrolment}
            onChange={handleChange}
          />
          <TextInput
            label="Client Identifier Id (UCI)"
            name="clientIdentifierUCI"
            value={formData.clientIdentifierUCI}
            onChange={handleChange}
            placeholder="Client identifier..."
          />
          <TextAreaInput
            label="Review Of Medical Results"
            name="reviewOfMedicalResults"
            value={formData.reviewOfMedicalResults}
            onChange={handleChange}
            placeholder="Medical results review message..."
          />
          <TextAreaInput
            label="Review Of Eligibility"
            name="reviewOfEligibility"
            value={formData.reviewOfEligibility}
            onChange={handleChange}
            placeholder="Eligibility review message..."
          />
          <DatePickerInput
            label="Medical Enrolment Date"
            name="medicalEnrolmentDate"
            value={formData.medicalEnrolmentDate}
            onChange={handleChange}
          />
          <TextAreaInput
            label="Review Of Additional Documents"
            name="reviewOfAdditionalDocuments"
            value={formData.reviewOfAdditionalDocuments}
            onChange={handleChange}
            placeholder="Additional documents review message..."
          />
          <TextAreaInput
            label="Interview Message"
            name="interviewMessage"
            value={formData.interviewMessage}
            onChange={handleChange}
            placeholder="Interview message..."
          />
          <TextAreaInput
            label="Background Check Message"
            name="backgroundCheckMessage"
            value={formData.backgroundCheckMessage}
            onChange={handleChange}
            placeholder="Background check message..."
          />
          <TextAreaInput
            label="Biometrics Message"
            name="biometricsMessage"
            value={formData.biometricsMessage}
            onChange={handleChange}
            placeholder="Biometrics message..."
          />
          <DatePickerInput
            label="Biometrics Expiry Date"
            name="biometricsExpiryDate"
            value={formData.biometricsExpiryDate}
            onChange={handleChange}
          />
          <DatePickerInput
            label="Background Check Date"
            name="backgroundCheckDate"
            value={formData.backgroundCheckDate}
            onChange={handleChange}
          />
          <TextAreaInput
            label="Enter Review Or Final Message"
            name="reviewOrFinalMessage"
            value={formData.reviewOrFinalMessage}
            onChange={handleChange}
            placeholder="Final review message..."
          />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="primary">
            {id ? "Update GCKEY" : "Create GCKEY"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditGcKeyPage;
