import React, { FunctionComponent, ChangeEvent } from "react";

export interface InputProps {
  label?: string;
  name?: string;
  type?: "text" | "number" | "email" | "password";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Input: FunctionComponent<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  placeholder,
}) => {
  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-2 border rounded-md ${className}`}
      />
    </div>
  );
};

export default Input;
