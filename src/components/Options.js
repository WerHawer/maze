import React from "react";
import Select from "./Select";
import { sizeOptions, speedOptions, stepsOptions } from "../data/selectOptions";
import css from "./Options.module.css";

const Options = ({ onChange, sizeValue, speedValue, stepValue }) => (
  <div className={css.container}>
    <div className={css.selector}>
      <p>Choose size</p>
      <Select options={sizeOptions} onChange={onChange} value={sizeValue} />
    </div>

    <div className={css.selector}>
      <p>Choose steps</p>
      <Select options={stepsOptions} onChange={onChange} value={stepValue} />
    </div>

    <div className={css.selector}>
      <p>Choose speed</p>
      <Select options={speedOptions} onChange={onChange} value={speedValue} />
    </div>
  </div>
);

export default Options;
