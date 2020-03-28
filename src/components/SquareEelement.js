import React from "react";
import css from "./SquareEelement.module.css";

const squareEelement = ({
  x,
  y,
  start,
  finish,
  baseSquare,
  onClick,
  size,
  gameStage,
  isWin
}) => (
  <div
    className={`${
      start.x === x && start.y === y && gameStage < 3 ? css.start : css.square
    } ${
      gameStage === 4 && !isWin && finish.x === x && finish.y === y
        ? "win"
        : null
    }`}
    data-x={x}
    data-y={y}
    onClick={onClick}
    style={{
      width: `${baseSquare / size - 6}px`,
      height: `${baseSquare / size - 6}px`
    }}
  ></div>
);

export default squareEelement;
