import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

/**
 * A reusable modal component that uses a portal.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.onClose - Function to call to close the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {string} [props.title] - An optional title for the modal header.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  // Use a portal to render the modal at the root of the document
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById("root") // Assumes your root element has id 'root'
  );
};

export default Modal;
