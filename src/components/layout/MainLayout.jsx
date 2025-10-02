import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  // In a real app, you would manage the sidebar's open/close state here
  // For now, it's always visible on desktop.
  const handleMenuClick = () => {
    console.log("Menu button clicked! Implement sidebar toggle for mobile.");
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-wrapper">
        <Header onMenuClick={handleMenuClick} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
