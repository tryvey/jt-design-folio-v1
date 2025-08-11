import React from "react";

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  className = "", 
  variant = "default",
  size = "default",
  ...props 
}) {
  // Base button classes - ensure consistent height, alignment, and transitions
  const baseClasses = "flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 h-8 border";
  
  // Size variants - all with consistent height (h-8 = 32px)
  const sizeClasses = {
    small: "px-3 py-1 text-sm rounded-full h-7",
    default: "px-4 py-1 text-sm rounded-full h-8",
    large: "px-6 py-2 text-base rounded-full h-10"
  };
  
  // Color variants with consistent border and hover patterns
  const variantClasses = {
    default: "text-neutral-700 dark:text-neutral-200 bg-neutral-100 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600 hover:bg-neutral-200 hover:border-neutral-400 dark:hover:bg-neutral-700 dark:hover:border-neutral-500",
    primary: "text-white bg-blue-600 border-blue-600 dark:bg-blue-600 dark:border-blue-600 hover:bg-blue-700 hover:border-blue-700 dark:hover:bg-blue-700 dark:hover:border-blue-700",
    secondary: "text-neutral-700 dark:text-neutral-200 bg-neutral-200 border-neutral-400 dark:bg-neutral-700 dark:border-neutral-500 hover:bg-neutral-300 hover:border-neutral-500 dark:hover:bg-neutral-600 dark:hover:border-neutral-400",
    danger: "text-white bg-red-600 border-red-600 dark:bg-red-600 dark:border-red-600 hover:bg-red-700 hover:border-red-700 dark:hover:bg-red-700 dark:hover:border-red-700",
    success: "text-white bg-green-600 border-green-600 dark:bg-green-600 dark:border-green-600 hover:bg-green-700 hover:border-green-700 dark:hover:bg-green-700 dark:hover:border-green-700"
  };
  
  // Disabled state
  const disabledClasses = disabled 
    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed border-neutral-300 dark:border-neutral-600" 
    : "";
  
  // Combine all classes
  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    disabled ? disabledClasses : variantClasses[variant],
    className
  ].filter(Boolean).join(" ");
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

// Export specific button variants for convenience
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const DangerButton = (props) => <Button variant="danger" {...props} />;
export const SuccessButton = (props) => <Button variant="success" {...props} />;
export const SmallButton = (props) => <Button size="small" {...props} />;
export const LargeButton = (props) => <Button size="large" {...props} />;
