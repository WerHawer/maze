import React from "react";
import Select from "react-select";

const SelectComponent = ({ options, value, onChange }) => (
  <Select options={options} value={value} onChange={onChange} />
);

export default SelectComponent;
