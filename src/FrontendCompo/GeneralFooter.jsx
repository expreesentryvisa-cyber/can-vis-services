import React from "react";
import "../GeneralFooter.css";

const GeneralFooter = () => {
  return (
    <footer className="site-footer">
      {/* Section 1: Top Links */}
      <div className="footer-top">
        <div className="container">
          <h2>Immigration and citizenship</h2>
          <nav className="footer-top-nav">
            <ul>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Check processing times</a>
              </li>
              <li>
                <a href="#">How to open a form</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Section 2: Main Links Grid */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>
                <a href="#">Government of Canada</a>
              </h3>
              <ul>
                <li>
                  <a href="#">All contacts</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Immigration and citizenship</a>
                </li>
                <li>
                  <a href="#">Travel and tourism</a>
                </li>
                <li>
                  <a href="#">Business</a>
                </li>
                <li>
                  <a href="#">Benefits</a>
                </li>
                <li>
                  <a href="#">Health</a>
                </li>
                <li>
                  <a href="#">Taxes</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>
                  <a href="#">Departments and agencies</a>
                </li>
                <li>
                  <a href="#">Environment and natural resources</a>
                </li>
                <li>
                  <a href="#">National security and defence</a>
                </li>
                <li>
                  <a href="#">Culture, history and sport</a>
                </li>
                <li>
                  <a href="#">Policing, justice and emergencies</a>
                </li>
                <li>
                  <a href="#">Transport and infrastructure</a>
                </li>
                <li>
                  <a href="#">Canada and the world</a>
                </li>
                <li>
                  <a href="#">Money and finances</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <ul>
                <li>
                  <a href="#">About government</a>
                </li>
                <li>
                  <a href="#">Science and innovation</a>
                </li>
                <li>
                  <a href="#">Indigenous Peoples</a>
                </li>
                <li>
                  <a href="#">Veterans and military</a>
                </li>
                <li>
                  <a href="#">Youth</a>
                </li>
                <li>
                  <a href="#">Manage life events</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <ul className="footer-bottom-links">
            <li>
              <a href="#">Social media</a>
            </li>
            <li>
              <a href="#">Mobile applications</a>
            </li>
            <li>
              <a href="#">About Canada.ca</a>
            </li>
            <li>
              <a href="#">Terms and conditions</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
          <div className="footer-logo">
            <span>Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GeneralFooter;