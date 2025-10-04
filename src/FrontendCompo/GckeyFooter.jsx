import React from 'react';

export default function GCKeyFooter() {
  return (
    <>
      <style>{`
        .gckey-footer-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background-color: #e8e8e8;
          padding: 0;
          margin: 0;
        }

        .gckey-footer-main {
          padding: 30px 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .gckey-footer-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .gckey-footer-heading {
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
        }

        .gckey-footer-link {
          color: #284162;
          text-decoration: none;
          font-size: 0.95rem;
          transition: text-decoration 0.2s;
          line-height: 1.5;
        }

        .gckey-footer-link:hover {
          text-decoration: underline;
        }

        .gckey-footer-divider {
          border: none;
          border-top: 4px solid #26374a;
          margin: 0;
        }

        .gckey-footer-bottom {
          background-color: white;
          padding: 25px 40px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .gckey-footer-logo {
          display: flex;
          align-items: center;
        }

        .gckey-footer-wordmark {
          font-family: Georgia, serif;
          font-size: 1.8rem;
          font-style: italic;
          font-weight: normal;
          color: #333;
          letter-spacing: 1px;
        }

        .gckey-footer-flag {
          width: 30px;
          height: 20px;
          margin-left: 10px;
          display: inline-block;
        }

        @media (max-width: 968px) {
          .gckey-footer-main {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .gckey-footer-main {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .gckey-footer-bottom {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="gckey-footer-wrapper">
        <div className="gckey-footer-main">
          <div className="gckey-footer-section">
            <h2 className="gckey-footer-heading">About</h2>
            <a href="#about-gckey" className="gckey-footer-link">About GCKey</a>
            <a href="#enabled-services" className="gckey-footer-link">Enabled Services</a>
            <a href="#site-map" className="gckey-footer-link">Site Map</a>
          </div>

          <div className="gckey-footer-section">
            <h2 className="gckey-footer-heading">Transparency</h2>
            <a href="#proactive-disclosure" className="gckey-footer-link">Proactive Disclosure</a>
            <a href="#terms-conditions" className="gckey-footer-link">Terms and Conditions</a>
          </div>

          <div className="gckey-footer-section">
            <h2 className="gckey-footer-heading">Contact Us</h2>
            <a href="#phone-numbers" className="gckey-footer-link">Phone Numbers</a>
          </div>
        </div>

        <hr className="gckey-footer-divider" />

        <div className="gckey-footer-bottom">
          <div className="gckey-footer-logo">
            <span className="gckey-footer-wordmark">Canada</span>
            <svg className="gckey-footer-flag" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
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