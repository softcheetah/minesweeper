import React, {
  Fragment, useCallback, useEffect, useMemo, useState
} from "react";
import { Field } from "src/components";
import { mines, width } from "src/config";
import {
  checkFinished, generateFields, generateInitStates, spreadSelection
} from "src/utility";
import { STATE } from "src/constant";
import "./styles.scss";

const App = () => {
  const [fields, setFields] = useState(generateFields());
  const [states, setStates] = useState(generateInitStates());
  const [startedTime, setStartedTime] = useState(0);
  const [finishedTime, setFinishedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setInterval(
      () => setCurrentTime(Date.now()),
      1000
    );
  }, []);

  const handleRestart = useCallback(() => {
    setFields(generateFields());
    setStates(generateInitStates());
    setStartedTime(0);
    setFinishedTime(0);
  }, []);

  const handleLeftClick = useCallback((clickedIndex) => {
    // If already finished or revealed or mine-marked
    if (finishedTime > 0 || states[clickedIndex] !== STATE.INIT) {
      return;
    }

    // Set the time started
    if (!startedTime) {
      setStartedTime(Date.now());
    }

    // Spread selection
    spreadSelection(fields, states, clickedIndex);
    setStates([...states]);

    // Check finished
    if (checkFinished(fields, states)) {
      setFinishedTime(Date.now());
    }
  }, [fields, finishedTime, startedTime, states]);

  const handleRightClick = useCallback((clickedIndex) => {
    // If already finished or revealed
    if (finishedTime > 0 || states[clickedIndex] === STATE.CLEAR) {
      return;
    }

    // Revert status
    if (states[clickedIndex] === STATE.INIT) {
      states[clickedIndex] = STATE.MINE;
    } else {
      states[clickedIndex] = STATE.INIT;
    }
    setStates([...states]);

    // Check finished
    if (checkFinished(fields, states)) {
      setFinishedTime(Date.now());
    }
  }, [fields, finishedTime, states]);

  const leftMines = useMemo(
    () => mines - states.filter(s => s === STATE.MINE).length,
    [states]
  );

  // Not expensive calcuation
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
