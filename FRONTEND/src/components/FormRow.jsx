import React from "react";

const FormRow = ({ name, label, onChange, type, value }) => {
  return (
    <div className="textbox">
      <input
        autoComplete="off"
        className="input"
        type={type}
        required
        name={name}
        value={value}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

export default FormRow;
