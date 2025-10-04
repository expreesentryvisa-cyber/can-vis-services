import React, { useState } from 'react'

function FeedbackBox() {
    const [selected, setSelected] = useState(null);
  return (
<div className="feedback-box">
      <div className="feedback-content">
        <span className="feedback-question">Did you find what you were looking for?</span>
        <div className="feedback-buttons">
          <button 
            className={`feedback-btn ${selected === 'yes' ? 'selected' : ''}`}
            onClick={() => setSelected('yes')}
          >
            Yes
          </button>
          <button 
            className={`feedback-btn ${selected === 'no' ? 'selected' : ''}`}
            onClick={() => setSelected('no')}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackBox