import React from "react";
import SquareEelement from "./SquareEelement";
import css from "./Square.module.css";

const square = ({
  maze,
  size,
  start,
  finish,
  onSquareClick,
  onStartClick,
  baseSquare,
  gameStage,
  isWin
}) => (
  <>
    <button type="button" onClick={onStartClick} className={css.button}>
      {gameStage < 4 ? "Start" : "New Game"}
    </button>

    <div
      className={css.square}
      style={{ width: `${baseSquare}px`, height: `${baseSquare}px` }}
      id="feald"
    >
      {gameStage < 3 || gameStage === 4 ? (
        <div
          className={css.cover}
          style={{ width: `${baseSquare}px`, height: `${baseSquare}px` }}
        ></div>
      ) : null}
      {maze.map(({ x, y }) => (
        <SquareEelement
          key={x + y}
          x={x}
          y={y}
          start={start}
          finish={finish}
          onClick={onSquareClick}
          baseSquare={baseSquare}
          size={size}
          gameStage={gameStage}
          isWin={isWin}
        />
      ))}
    </div>
  </>
);

export default square;
