import React from "react";
import css from "./StepElement.module.css";

const StepElement = ({ step }) => (
  <li className={css.element}>
    <img src={require(`../img/arrow_${step}.png`)} alt={step} />
  </li>
);

export default StepElement;
