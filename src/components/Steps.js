import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import StepElement from "./StepElement";
import css from "./Steps.module.css";
import transition from "../transitions/arrowsTransition.module.css";

const Steps = ({ steps, stepsAmount }) => {
  return (
    <div
      id="steps"
      style={{ height: `${(50 * stepsAmount.value) / 5 + 20}px` }}
      className={css.stepsContainer}
    >
      <TransitionGroup component="ul" className={css.steps}>
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
    </div>
  );
};

export default Steps;
