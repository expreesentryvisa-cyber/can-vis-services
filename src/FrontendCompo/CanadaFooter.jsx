import React from 'react';

export default function CanadaFooter() {
  return (
    <>
      <style>{`
        .cdn-gov-footer {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background: linear-gradient(to bottom, #38546d 0%, #2b4158 100%);
          color: white;
          padding: 0;
          margin: 0;
        }

        .cdn-gov-footer-top {
          background-color: #26374a;
          padding: 20px 40px;
          border-bottom: 1px solid #1e2d3d;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cdn-gov-footer-top-title {
          font-size: 1.4rem;
          font-weight: 400;
          margin: 0 0 20px 0;
          letter-spacing: 0.3px;
          text-align: center;
        }

        .cdn-gov-footer-top-links {
          display: flex;
          gap: 100px;
          max-width: 1200px;
          justify-content: center;
        }

        .cdn-gov-footer-top-links a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: text-decoration 0.2s;
        }

        .cdn-gov-footer-top-links a:hover {
          text-decoration: underline;
        }

        .cdn-gov-footer-main {
          padding: 40px 40px 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cdn-gov-footer-brand {
          font-size: 1.6rem;
          font-weight: 400;
          margin: 0 0 30px 0;
          letter-spacing: 0.3px;
          text-align: center;
        }

        .cdn-gov-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 60px;
          max-width: 1200px;
        }

        .cdn-gov-footer-column {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .cdn-gov-footer-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: text-decoration 0.2s;
          line-height: 1.4;
        }

        .cdn-gov-footer-link:hover {
          text-decoration: underline;
        }

        .cdn-gov-footer-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin: 35px 0 0 0;
        }

        .cdn-gov-footer-bottom {
          background-color: #f8f9fa;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cdn-gov-footer-bottom-links {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .cdn-gov-footer-bottom-links a {
          color: #333;
          text-decoration: none;
          font-size: 0.95rem;
          transition: text-decoration 0.2s;
        }

        .cdn-gov-footer-bottom-links a:hover {
          text-decoration: underline;
        }

        .cdn-gov-footer-separator {
          color: #333;
          margin: 0 4px;
        }

        .cdn-gov-footer-logo {
          display: flex;
          align-items: center;
        }

        .cdn-gov-footer-wordmark {
          font-family: Georgia, serif;
          font-size: 1.8rem;
          font-style: italic;
          font-weight: normal;
          color: #333;
          letter-spacing: 1px;
        }

        .cdn-gov-footer-flag {
          width: 30px;
          height: 20px;
          margin-left: 10px;
          display: inline-block;
        }

        @media (max-width: 968px) {
          .cdn-gov-footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .cdn-gov-footer-top-links {
            flex-direction: column;
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .cdn-gov-footer-grid {
            grid-template-columns: 1fr;
          }
          
          .cdn-gov-footer-bottom {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="cdn-gov-footer">
        <div className="cdn-gov-footer-top">
          <h2 className="cdn-gov-footer-top-title">Immigration and citizenship</h2>
          <div className="cdn-gov-footer-top-links">
            <a href="#contact">Contact us</a>
            <a href="#processing">Check processing times</a>
            <a href="#form">How to open a form</a>
          </div>
        </div>

        <div className="cdn-gov-footer-main">
          <h2 className="cdn-gov-footer-brand">Government of Canada</h2>
          
          <div className="cdn-gov-footer-grid">
            <div className="cdn-gov-footer-column">
              <a href="#contacts" className="cdn-gov-footer-link">All contacts</a>
              <a href="#jobs" className="cdn-gov-footer-link">Jobs</a>
              <a href="#immigration" className="cdn-gov-footer-link">Immigration and citizenship</a>
              <a href="#travel" className="cdn-gov-footer-link">Travel and tourism</a>
              <a href="#business" className="cdn-gov-footer-link">Business</a>
              <a href="#benefits" className="cdn-gov-footer-link">Benefits</a>
              <a href="#health" className="cdn-gov-footer-link">Health</a>
              <a href="#taxes" className="cdn-gov-footer-link">Taxes</a>
            </div>

            <div className="cdn-gov-footer-column">
              <a href="#departments" className="cdn-gov-footer-link">Departments and agencies</a>
              <a href="#environment" className="cdn-gov-footer-link">Environment and natural resources</a>
              <a href="#security" className="cdn-gov-footer-link">National security and defence</a>
              <a href="#culture" className="cdn-gov-footer-link">Culture, history and sport</a>
              <a href="#policing" className="cdn-gov-footer-link">Policing, justice and emergencies</a>
              <a href="#transport" className="cdn-gov-footer-link">Transport and infrastructure</a>
              <a href="#world" className="cdn-gov-footer-link">Canada and the world</a>
              <a href="#money" className="cdn-gov-footer-link">Money and finances</a>
            </div>

            <div className="cdn-gov-footer-column">
              <a href="#about" className="cdn-gov-footer-link">About government</a>
              <a href="#science" className="cdn-gov-footer-link">Science and innovation</a>
              <a href="#indigenous" className="cdn-gov-footer-link">Indigenous Peoples</a>
              <a href="#veterans" className="cdn-gov-footer-link">Veterans and military</a>
              <a href="#youth" className="cdn-gov-footer-link">Youth</a>
              <a href="#life-events" className="cdn-gov-footer-link">Manage life events</a>
            </div>
          </div>
        </div>

        <div className="cdn-gov-footer-bottom">
          <div className="cdn-gov-footer-bottom-links">
            <a href="#social">Social media</a>
            <span className="cdn-gov-footer-separator">•</span>
            <a href="#mobile">Mobile applications</a>
            <span className="cdn-gov-footer-separator">•</span>
            <a href="#about-canada">About Canada.ca</a>
            <span className="cdn-gov-footer-separator">•</span>
            <a href="#terms">Terms and conditions</a>
            <span className="cdn-gov-footer-separator">•</span>
            <a href="#privacy">Privacy</a>
          </div>
          
          <div className="cdn-gov-footer-logo">
            <span className="cdn-gov-footer-wordmark">Canada</span>
            <svg className="cdn-gov-footer-flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="20" fill="#FF0000"/>
              <rect x="10" width="10" height="20" fill="white"/>
              <path d="M15 4 L16 8 L17 7 L17 9 L19 10 L17 10 L17 11 L19 12 L16 12 L15 16 L14 12 L11 12 L13 11 L13 10 L11 10 L13 9 L13 7 L14 8 Z" fill="#FF0000"/>
            </svg>
          </div>
        </div>
      </footer>
    </>
  );
}