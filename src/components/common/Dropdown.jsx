import React from "react";
import "./Dropdown.css";

/**
 * A reusable dropdown (select) component.
 * @param {object} props - The component props.
 * @param {Array<object>} props.options - An array of option objects, e.g., [{ value: '1', label: 'Option 1' }].
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - The function to call when the selection changes.
 * @param {string} [props.className=''] - Additional class names to apply.
 */
const Dropdown = ({ options, value, onChange, className = "", ...props }) => {
  return (
    <div className={`dropdown-wrapper ${className}`}>
      <select
        className="dropdown-select"
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
