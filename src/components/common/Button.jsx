import React from "react";
import "./Button.css";

/**
 * A reusable button component.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.variant='primary'] - The button style variant ('primary', 'secondary', 'danger').
 * @param {string} [props.className=''] - Additional class names to apply.
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
