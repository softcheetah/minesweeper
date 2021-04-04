import React, { Fragment, useState } from "react";
import { Field } from "src/components";
import { width } from "src/config";
import { generateFields, generateInitStates, spreadSelection } from "src/utility";
import { STATE } from "src/constant";
import "./styles.scss";

const App = () => {
  const [fields, setFields] = useState(
    generateFields()
  );
  const [states, setStates] = useState(
    generateInitStates()
  );
  const [finished, setFinished] = useState(false);

  const handleRestart = () => {
    setFields(generateFields());
    setStates(generateInitStates());
    setFinished(false);
  };

  const handleLeftClick = (clickedIndex) => {
    if (finished || states[clickedIndex] !== STATE.INIT) {
      return;
    }

    spreadSelection(fields, states, clickedIndex);
    setStates([...states]);

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
      <br />
      <button type="button" onClick={handleRestart}> Restart </button>
    </div>
  );
};

export default App;