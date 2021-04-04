/* eslint-disable react/jsx-one-expression-per-line */
import React, { Fragment, useEffect, useState } from "react";
import { Field } from "src/components";
import { mines, width } from "src/config";
import {
  checkFinished, generateFields, generateInitStates, spreadSelection
} from "src/utility";
import { STATE } from "src/constant";
import "./styles.scss";

const App = () => {
  const [fields, setFields] = useState(
    generateFields()
  );
  const [states, setStates] = useState(
    generateInitStates()
  );
  const [startedTime, setStartedTime] = useState(0);
  const [finishedTime, setFinishedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setInterval(
      () => setCurrentTime(Date.now()),
      1000
    );
  }, []);

  const handleRestart = () => {
    setFields(generateFields());
    setStates(generateInitStates());
    setStartedTime(0);
    setFinishedTime(0);
  };

  const handleLeftClick = (clickedIndex) => {
    if (finishedTime > 0 || states[clickedIndex] !== STATE.INIT) {
      return;
    }

    if (!startedTime) {
      setStartedTime(Date.now());
    }

    spreadSelection(fields, states, clickedIndex);
    setStates([...states]);

    if (checkFinished(fields, states)) {
      setFinishedTime(Date.now());
    }
  };
  const handleRightClick = (clickedIndex) => {
    if (finishedTime > 0 || states[clickedIndex] === STATE.CLEAR) {
      return;
    }

    if (states[clickedIndex] === STATE.INIT) {
      states[clickedIndex] = STATE.MINE;
    } else {
      states[clickedIndex] = STATE.INIT;
    }
    setStates([...states]);

    if (checkFinished(fields, states)) {
      setFinishedTime(Date.now());
    }
  };

  const leftMines = mines - states.filter(s => s === STATE.MINE).length;
  const timeElapsed = startedTime === 0 ? 0 : (
    Math.floor(
      Math.max((finishedTime || currentTime) - startedTime, 0)
      / 1000
    )
  );

  return (
    <div className="App">
      <div>
        Left: { leftMines }, Time: { timeElapsed }
      </div>
      <br />
      <div className="fields-container" onContextMenu={e => e.preventDefault()}>
        { fields.map((field, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <Field
              field={field}
              state={states[index]}
              finished={finishedTime > 0}
              onLeftClick={() => handleLeftClick(index)}
              onRightClick={() => handleRightClick(index)}
            />
            {index % width === width - 1 && <br />}
          </Fragment>
        ))}
      </div>
      <br />
      <button type="button" onClick={handleRestart}> Restart </button>
    </div>
  );
};

export default App;
