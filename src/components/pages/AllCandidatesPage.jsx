import React, { useState } from "react";
import "./AllCandidatesPage.css";
import { useNavigate } from "react-router-dom";

const AllCandidatesPage = () => {
  const navigate = useNavigate();

  // The initial list of candidates
  const initialCandidates = [
    {
      id: 1,
      name: "Jasvir Kaur",
      email: "deep0173@gmail.com",
      username: "jasvirkaur123",
      password: "Gagan1991@",
    },
    {
      id: 2,
      name: "Gursharan Singh",
      email: "expressentry@gmail.com",
      username: "gursharansingh82",
      password: "Gagan1991@",
    },
    {
      id: 3,
      name: "Ranjeet Kumar",
      email: "expressentrybm@gmail.com",
      username: "ranjeet34080",
      password: "Gagan1991@w",
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      username: "priya_s",
      password: "Password123!",
    },
    {
      id: 5,
      name: "Amit Patel",
      email: "amit.p@example.com",
      username: "amitpatel88",
      password: "SecurePass@2",
    },
    {
      id: 6,
      name: "Sunita Devi",
      email: "sunita.d@example.com",
      username: "sunitadevi",
      password: "MyPassword$3",
    },
    {
      id: 7,
      name: "Rajesh Kumar",
      email: "rajesh.k@example.com",
      username: "rajesh_kumar",
      password: "Test@1234",
    },
    {
      id: 8,
      name: "Anjali Gupta",
      email: "anjali.g@example.com",
      username: "anjali_g92",
      password: "Anjali@Pass",
    },
    {
      id: 9,
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      username: "vikram_singh",
      password: "Vikram$2025",
    },
    {
      id: 10,
      name: "Meena Kumari",
      email: "meena.k@example.com",
      username: "meenakumari",
      password: "MeenaSecure&",
    },
  ];

  // EDITED: The candidate list is now in state to allow for deletion
  const [candidates, setCandidates] = useState(initialCandidates);

  const handleEditCandidate = (username) => {
    navigate(`/candidates/edit/${username}`);
  };

  // EDITED: Added handler to navigate to the documents page
  const handleSeeDocuments = (username) => {
    navigate(`/candidates/${username}/documents`);
  };

  // EDITED: Added handler to delete a candidate from the list
  const handleDelete = (candidateId) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates(candidates.filter((c) => c.id !== candidateId));
    }
  };

  return (
    <div className="candidates-container">
      <h1>All Candidates List</h1>
      <div className="list-header">
        <h2>All Candidates</h2>
        <button className="add-candidate-btn">Add New Candidate</button>
      </div>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
            {/* EDITED: Added "Delete" column header */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.username}</td>
              <td>{candidate.password}</td>
              <td className="actions-cell">
                <button className="action-btn edit-security">
                  Edit Security Questions
                </button>
                <button
                  className="action-btn edit-gcc"
                  onClick={() => handleEditCandidate(candidate.username)}
                >
                  Edit GCC Key
                </button>
                {/* EDITED: Added onClick to this button */}
                <button
                  className="action-btn see-docs"
                  onClick={() => handleSeeDocuments(candidate.username)}
                >
                  See Uploaded Documents
                </button>
              </td>
              {/* EDITED: Added table cell with the delete button */}
              <td>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(candidate.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCandidatesPage;
