import React, { useState } from 'react';


function HeaderNotice() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const noticeItems = [
    { title: 'Study permit applicants', content: 'Information about study permit applications...' },
    { title: 'Delays with the status of your medical exam results', content: 'Medical exam status information...' },
    { title: 'Student Direct Stream', badge: 'Closed', content: 'Student Direct Stream program information...' },
    { title: 'Francophone Minority Communities Student Pilot applicants', content: 'Francophone program information...' }
  ];

  return (
    <div className="header-notice">
      <div className="notice-container">
        <div className="notice-icon">
          <div className="exclamation-circle">!</div>
        </div>
        <div className="notice-content">
          {noticeItems.map((item, index) => (
            <div key={index} className="notice-item">
              <button 
                className="notice-toggle"
                onClick={() => toggleItem(index)}
              >
                <span className="toggle-icon">{openItems[index] ? '▼' : '▶'}</span>
                <span className="notice-title">{item.title}</span>
                {item.badge && <span className="notice-badge">{item.badge}</span>}
              </button>
              {openItems[index] && (
                <div className="notice-dropdown">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeaderNotice
