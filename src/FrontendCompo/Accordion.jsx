import  { useState } from "react";

function Accordion({ title,title2, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="accordion">
      <button 
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
        <span className="accordion-title">{title}<span className="title-light">{title2}</span></span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children || <p>Content goes here...</p>}
        </div>
      )}
    </div>
  )
}

export default Accordion;
