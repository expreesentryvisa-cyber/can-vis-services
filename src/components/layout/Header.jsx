import React, { useState, useEffect } from "react";
import "./Header.css";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Header = ({ onMenuClick }) => {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // First, try to get the name from Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || userData.displayName || user.displayName || user.email || "User");
          } else {
            // If no Firestore document, use Firebase Auth data
            setUserName(user.displayName || user.email?.split('@')[0] || "User");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          // Fallback to Firebase Auth data
          setUserName(user.displayName || user.email?.split('@')[0] || "User");
        }
      } else {
        setUserName("Guest");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          &#9776;
        </button>
        <h1 className="header-title">Management</h1>
      </div>
      <div className="header-right">
        <div className="user-profile">
          {/* <img src={userAvatar} alt="User Avatar" className="user-avatar" /> */}
          <span className="user-name">{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;