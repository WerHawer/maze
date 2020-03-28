import React, { Component } from "react";
import Square from "./components/Square";
import initInfo from "./data/initialFile";
import stepsVariants from "./data/stepsVariants";
import Steps from "./components/Steps";
import shortid from "shortid";
import RulesModal from "./components/RulesModal";
import * as localStorage from "./utils/localStorage";
import Options from "./components/Options";

export default class App extends Component {
  state = {
    modalIsOpen: true,
    baseSquare: 500,
    maze: [],
    size: { value: 3, label: "3" },
    start: {},
    finish: {},
    mazeLetters: [],
    steps: [],
    gameStage: 1,
    isWin: false,
    basicSpeed: { value: 750, label: "normal" }
  };

  componentDidMount() {
    this.createMazeLetters();

    const modalAlwaisOpenLS = localStorage.load("alwaisShowModal");

    if (modalAlwaisOpenLS === "off") {
      this.setState({
        modalIsOpen: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mazeLetters !== this.state.mazeLetters) {
      this.randomStartPoint();
      this.createMazeArr();
    }

    if (prevState.size !== this.state.size) {
      this.createMazeLetters();
    }
  }

  createMazeArr = () => {
    const { size, mazeLetters } = this.state;
    const initMaze = mazeLetters
      .map(letter => {
        let initialArr = [];
        for (let i = 1; i <= size.value; i += 1) {
          initialArr = [...initialArr, { x: i, y: letter }];
        }

        return initialArr;
      })
      .flat();
    this.setState({ maze: [...initMaze] });
  };

  createMazeLetters = () => {
    const { size } = this.state;
    const mazeLetters = initInfo.slice(0, size.value);
    this.setState({ mazeLetters });
  };

  randomStartPoint = () => {
    const { size, mazeLetters } = this.state;
    const randomIndex = Math.floor(Math.random() * Math.floor(size.value));
    const y = mazeLetters[randomIndex];
    const x = Math.floor(Math.random() * Math.floor(size.value)) + 1;
    this.setState({ start: { x, y } });
  };

  mazeSteps = () => {
    const { start, basicSpeed } = this.state;

    let actualCoords = { ...start };
    let tempSteps = [];
    let counter = 0;

    for (let i = 0; i < 10; i += 1) {
      let actualSteps = [...stepsVariants];

      actualSteps = this.doActualStepsVariant(actualSteps, actualCoords);
      const step = {
        arrow: this.chooseStep(actualSteps),
        id: shortid.generate()
      };
      tempSteps = [...tempSteps, step];
      actualCoords = this.changeActualCoords(step, actualCoords);
    }
    this.setState({ finish: actualCoords });

    const interval = setInterval(() => {
      counter += 1;
      counter > 10
        ? clearInterval(interval)
        : this.setState({ steps: tempSteps.slice(0, counter) });
    }, basicSpeed.value);

    setTimeout(() => {
      this.setState({ steps: [], gameStage: 3 });
    }, basicSpeed.value * 10 + basicSpeed.value * 2);
  };

  doActualStepsVariant = (actualSteps, actualCoords) => {
    const { size, mazeLetters } = this.state;
    const lastY = mazeLetters[size.value - 1];

    if (actualCoords.x === 1) {
      actualSteps = actualSteps.filter(step => step !== "top");
    }

    if (actualCoords.x === size.value) {
      actualSteps = actualSteps.filter(step => step !== "bot");
    }

    if (actualCoords.y === "A") {
      actualSteps = actualSteps.filter(step => step !== "left");
    }

    if (actualCoords.y === lastY) {
      actualSteps = actualSteps.filter(step => step !== "right");
    }

    return actualSteps;
  };

  chooseStep = actualSteps => {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(actualSteps.length)
    );
    return actualSteps[randomIndex];
  };

  changeActualCoords = (step, actualCoords) => {
    const { mazeLetters } = this.state;
    const indexY = mazeLetters.indexOf(actualCoords.y);

    switch (step.arrow) {
      case "top":
        actualCoords.x = actualCoords.x - 1;
        break;
      case "bot":
        actualCoords.x = actualCoords.x + 1;
        break;
      case "right":
        actualCoords.y = mazeLetters[indexY + 1];
        break;
      case "left":
        actualCoords.y = mazeLetters[indexY - 1];
        break;
      default:
        return actualCoords;
    }
    return actualCoords;
  };

  onSquareClick = e => {
    const { finish } = this.state;
    console.log(finish);

    this.setState({ gameStage: 4 });

    if (
      Number(e.target.dataset.x) === finish.x &&
      e.target.dataset.y === finish.y
    ) {
      this.setState({ isWin: true });
      e.target.classList.add("win");
    } else {
      e.target.classList.add("lose");
    }
  };

  onStartClick = () => {
    const { gameStage } = this.state;
    const steps = document.querySelector("#steps");
    steps.scrollIntoView({ block: "end", behavior: "smooth" });
    this.setState({ gameStage: 2, isWin: false });
    this.mazeSteps();

    if (gameStage === 4) {
      const feald = document.querySelector("#feald");
      const fealdChildren = Array.from(feald.children);

      fealdChildren.forEach(el => {
        if (el.classList.contains("win")) {
          el.classList.remove("win");
        }

        if (el.classList.contains("lose")) {
          el.classList.remove("lose");
        }
      });
    }
  };

  onModalCloseClick = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  onModalCheckbox = () => {
    localStorage.save("alwaisShowModal", "off");
  };

  handelSizeOChange = e => {
    this.setState({ size: e });
  };

  handleSpeedChange = e => {
    this.setState({ basicSpeed: e });
  };

  render() {
    const {
      maze,
      size,
      start,
      finish,
      steps,
      baseSquare,
      modalIsOpen,
      gameStage,
      isWin,
      basicSpeed
    } = this.state;

    return (
      <>
        {modalIsOpen && gameStage < 2 && (
          <RulesModal
            onClick={this.onModalCloseClick}
            onChange={this.onModalCheckbox}
          />
        )}

        <div className="wrapper">
          <Options
            onSizeChange={this.handelSizeOChange}
            onSpeedChange={this.handleSpeedChange}
            sizeValue={size}
            speedValue={basicSpeed}
          />

          <Square
            baseSquare={baseSquare}
            maze={maze}
            size={size.value}
            start={start}
            finish={finish}
            onSquareClick={this.onSquareClick}
            onStartClick={this.onStartClick}
            gameStage={gameStage}
            isWin={isWin}
          />
          <Steps steps={steps} baseSquare={baseSquare} />
        </div>
      </>
    );
  }
}
