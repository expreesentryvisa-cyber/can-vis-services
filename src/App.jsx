// src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AllApplicationsPage from "./components/pages/AllApplicationsPage";
import AllCandidatesPage from "./components/pages/AllCandidatesPage";
import LoginPage from "./components/pages/LoginPage";
import EditGcKeyPage from "./components/pages/EditGcKeyPage";
import DocumentUploadPage from "./components/pages/DocumentUploadPage";
import "./App.css";

function App() {
  const isAuthenticated = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Routes>
                  {/* --- Main Pages --- */}
                  <Route
                    path="/applications"
                    element={<AllApplicationsPage />}
                  />
                  <Route path="/candidates" element={<AllCandidatesPage />} />

                  {/* --- Candidate-Specific Routes --- */}
                  <Route
                    path="/candidates/edit/:username"
                    element={<EditGcKeyPage />}
                  />
                  {/* 👇 ADD THIS NEW ROUTE FOR CANDIDATE DOCUMENTS 👇 */}
                  <Route
                    path="/candidates/:username/documents"
                    element={<DocumentUploadPage />}
                  />

                  {/* --- Application-Specific Routes --- */}
                  <Route path="/applications/add" element={<EditGcKeyPage />} />
                  <Route
                    path="/applications/edit/:id"
                    element={<EditGcKeyPage />}
                  />
                  <Route
                    path="/applications/:appNumber/documents"
                    element={<DocumentUploadPage />}
                  />

                  {/* --- Redirect --- */}
                  <Route
                    path="/"
                    element={<Navigate to="/applications" replace />}
                  />
                </Routes>
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
