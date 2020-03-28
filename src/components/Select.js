import React from "react";
import Select from "react-select";

const SelectComponent = ({ options, value, onChange, name }) => (
  <Select options={options} value={value} onChange={onChange} name={name} />
);

export default SelectComponent;
