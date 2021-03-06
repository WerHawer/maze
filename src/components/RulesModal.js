import React from "react";
import css from "./RulesModal.module.css";

const RulesModal = ({ onClick, onChange }) => (
  <div className={css.modalWrapper}>
    <div className={css.rules}>
      <h3>Приветствую в "лабиринте"</h3>

      <h4>Вот, что тебя ждёт:</h4>

      <ul>
        <li>Двигайся в лабиринте по стрелкам</li>
        <li>Найди финальную точку</li>
      </ul>

      <p>Ты можешь менять размер поля и скорость игры</p>

      <h3>Удачи!</h3>
      <div className={css.controls}>
        <label>
          Не показывать
          <input type="checkbox" onChange={onChange} />
        </label>
        <button type="button" onClick={onClick}>
          Понятно
        </button>
      </div>
    </div>
  </div>
);

export default RulesModal;
