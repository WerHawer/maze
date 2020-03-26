import React from "react";
import SquareEelement from "./SquareEelement";
import initInfo from "../data/initialFile";
import css from "./Square.module.css";

const square = ({ size }) => (
  <div className={css.square}>
    {initInfo.map((letter, index) => {
      if (index >= size) return;

      let markup = [];
      for (let i = 0; i < size; i += 1) {
        markup = [
          ...markup,
          <SquareEelement
            text={`${letter}${i + 1}`}
            key={`${letter}${i + 1}`}
          />
        ];
      }

      return markup;
    })}
  </div>
);

export default square;
