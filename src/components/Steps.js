import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import StepElement from "./StepElement";
import css from "./Steps.module.css";
import transition from "../transitions/arrowsTransition.module.css";

const Steps = ({ steps, baseSquare }) => {
  return (
    <TransitionGroup
      component="ul"
      className={css.steps}
      style={{ width: `${baseSquare}px` }}
    >
      {steps.map(step => (
        <CSSTransition
          key={step.id}
          timeout={250}
          classNames={transition}
          unmountOnExit
        >
          <StepElement step={step.arrow} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Steps;
