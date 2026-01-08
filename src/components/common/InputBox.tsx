import React from "react";

interface InputBoxProps {
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  name: string;
}

function InputBox({
  type = "text",
  value,
  placeholder,
  onChange,
  className = "",
  label,
  name,
}: InputBoxProps) {
  return (
    <div className="flex gap-2 ">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`p-[10px] shadow-lg ${className}`}
      />
    </div>
  );
}

export default InputBox;
