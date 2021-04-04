import React, { Fragment, useState } from "react";
import { Field } from "src/components";
import { width, height } from "src/config";
import { generateFields } from "src/utility";
import { STATE } from "src/constant";
import "./styles.scss";

const App = () => {
  const [fields] = useState(generateFields());
  const [states, setStates] = useState(
    new Array(width * height).fill(STATE.INIT)
  );
  const [finished, setFinished] = useState(false);

  const handleLeftClick = (clickedIndex) => {
    if (finished || states[clickedIndex] !== STATE.INIT) {
      return;
    }

    setStates(states.map((state, index) => (
      index === clickedIndex ? STATE.CLEAR : state
    )));
    if (fields[clickedIndex] === -1) {
      setFinished(true);
    }
  };
  const handleRightClick = (clickedIndex) => {
    if (finished) return;

    if (states[clickedIndex] === STATE.INIT) {
      setStates(states.map((state, index) => (
        index === clickedIndex ? STATE.MINE : state
      )));
    } else if (states[clickedIndex] === STATE.MINE) {
      setStates(states.map((state, index) => (
        index === clickedIndex ? STATE.INIT : state
      )));
    }
  };

  return (
    <div className="App">
      <div className="fields-container" onContextMenu={e => e.preventDefault()}>
        { fields.map((field, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <Field
              field={field}
              state={states[index]}
              finished={finished}
              onLeftClick={() => handleLeftClick(index)}
              onRightClick={() => handleRightClick(index)}
            />
            {index % width === width - 1 && <br />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default App;
