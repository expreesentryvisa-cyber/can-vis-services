import React, { useState } from "react";
import { db } from "../../firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";  // ✅ Import navigate
import "./AddNewCandidate.css";

function AddNewCandidate() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();  // ✅ Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const docRef = await addDoc(collection(db, "candidates"), {
        name,
        username,
        email,
        password,
        createdAt: new Date()
      });

      setMessage("✅ Candidate added successfully!");

      // ✅ Navigate to EditGcKeyPage with candidate id
      navigate(`/applications/edit/${docRef.id}`);

      // Reset form
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error adding candidate:", err);
      setMessage("❌ Failed to add candidate.");
    }
  };

  return (
    <div className="candidate-wrapper">
      <h2 className="candidate-title">Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="candidate-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="candidate-btn">Save Candidate</button>
      </form>

      {message && <p className="candidate-msg">{message}</p>}
    </div>
  );
}

export default AddNewCandidate;
