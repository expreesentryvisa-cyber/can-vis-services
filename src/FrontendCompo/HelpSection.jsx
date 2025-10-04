import { useState } from 'react';
import '../HelpSection.css';

function HelpSection() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const leftColumnItems = [
    { key: 'errors', title: 'Errors and issues when you sign in', content: 'Information about errors and issues...' },
    { key: 'two-factor', title: 'GCKey two-factor authentication', content: 'Information about two-factor authentication...' },
    { key: 'change-partner', title: 'Change your Sign-In Partner', content: 'Information about changing your partner...' },
    { key: 'reference-code', title: "If your personal reference code doesn't work", content: 'Information about reference codes...' },
  ];

  const rightColumnItems = [
    { key: 'forgot-password', title: 'You forgot your GCKey password or username', content: 'Information about password recovery...' },
    { key: 'revoked', title: 'GCKey revoked', content: 'Information about revoked GCKeys...' },
    { key: 'application', title: "If you don't find your application in your account", content: 'Information about finding applications...' },
    { key: 'more-help', title: 'More help options', content: 'Additional help resources...' },
  ];

  const renderItems = (items) => {
    return items.map((item) => (
      <div key={item.key} className="help-item">
        <button
          className="help-item-button"
          onClick={() => toggleItem(item.key)}
        >
          <span className="help-arrow">
            {openItems[item.key] ? '▼' : '▶'}
          </span>
          <span className="help-title">{item.title}</span>
        </button>
        {openItems[item.key] && (
          <div className="help-content">
            <p>{item.content}</p>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="help-section2">
      <h1 className="section-heading">Help with your account</h1>
      <div className="help-grid">
        <div className="help-column">
          {renderItems(leftColumnItems)}
        </div>
        <div className="help-column">
          {renderItems(rightColumnItems)}
        </div>
      </div>
    </div>
  );
}

export default HelpSection;
