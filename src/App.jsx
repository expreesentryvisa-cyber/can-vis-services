import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import MainLayout from "./components/layout/MainLayout";
import AllApplicationsPage from "./components/pages/AllApplicationsPage";
import AllCandidatesPage from "./components/pages/AllCandidatesPage";
import LoginPage from "./components/pages/LoginPage";
import EditGcKeyPage from "./components/pages/EditGcKeyPage";
import DocumentUploadPage from "./components/pages/DocumentUploadPage";
import SignInpagecompo from './FrontendCompo/SignInpagecompo';
import SignINForm from './FrontendCompo/SignINForm';
import IdentityValidation from "./FrontendCompo/IdentityValidation";
import Termsandcond from "./FrontendCompo/Termsandcond";
import AfterloginWelcome from "./FrontendCompo/AfterloginWelcome";
import GckeyMain from "./FrontendCompo/GckeyMain";
import ApplicationProfile from "./FrontendCompo/ApplicationProfile";
import AddNewCandidate from "./components/pages/AddNewCandidate";
import "./App.css";
import "./AuthPage.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignInpagecompo />} />
        <Route path="/gckey" element={<SignINForm />} />
        <Route path="/gckey-verify-question" element={<IdentityValidation />} />
        <Route path="/gckey-terms" element={<Termsandcond />} />
        <Route path="/gckey-agree-terms" element={<AfterloginWelcome />} />
        <Route path="/gckey-main" element={<GckeyMain />} />
        <Route path="/application-profile" element={<ApplicationProfile />} />
        
        {/* Admin Login */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/applications" replace /> : <LoginPage />} 
        />

        {/* Protected Admin Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Routes>
                  {/* Main Pages */}
                  <Route path="/applications" element={<AllApplicationsPage />} />
                  <Route path="/candidates" element={<AllCandidatesPage />} />
                  <Route path="/addnewcandidate" element={<AddNewCandidate />} />
                  
                  {/* Candidate-Specific Routes */}
                  <Route path="/candidates/edit/:username" element={<EditGcKeyPage />} />
                  <Route path="/candidates/:username/documents" element={<DocumentUploadPage />} />
                  
                  {/* Application-Specific Routes */}
                  <Route path="/applications/add" element={<EditGcKeyPage />} />
                  <Route path="/applications/edit/:id" element={<EditGcKeyPage />} />
                  <Route path="/applications/:appNumber/documents" element={<DocumentUploadPage />} />
                  
                  {/* Redirect */}
                  <Route path="/" element={<Navigate to="/applications" replace />} />
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