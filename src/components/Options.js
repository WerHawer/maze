import React from "react";
import Select from "./Select";
import { sizeOptions, speedOptions } from "../data/selectOptions";
import css from "./Options.module.css";

const Options = ({ onSizeChange, onSpeedChange, sizeValue, speedValue }) => (
  <div className={css.container}>
    <div className={css.selector}>
      <p>Choose size</p>
      <Select options={sizeOptions} onChange={onSizeChange} value={sizeValue} />
    </div>

    <div className={css.selector}>
      <p>Choose speed</p>
      <Select
        options={speedOptions}
        onChange={onSpeedChange}
        value={speedValue}
      />
    </div>
  </div>
);

export default Options;
