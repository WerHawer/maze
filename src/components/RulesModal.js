import React from "react";
import css from "./RulesModal.module.css";

const RulesModal = ({ onClick, onChange }) => (
  <div className={css.modalWrapper}>
    <input type="checkbox" onChange={onChange} />
    <button type="button" onClick={onClick}>
      close
    </button>
  </div>
);

export default RulesModal;
