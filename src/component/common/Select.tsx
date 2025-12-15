import React, { FunctionComponent, ChangeEvent } from "react";
import clsx from "clsx";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  name?: string;
  value?: string | number;
  options: SelectOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Select: FunctionComponent<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  required = true,
  className = "",
  placeholder = "-- Chọn --",
}) => {
  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={clsx("w-full p-2 border rounded-md", className)}
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
