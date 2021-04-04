/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { Field } from "src/components";
import { width, height } from "src/config";
import { generateFields } from "src/utility";
import { STATE } from "src/constant";

const App = () => {
  const [fields, setFields] = useState(generateFields());
  const [states, setStates] = useState(
    new Array(width * height).fill(STATE.INIT)
  );
  const [finished, setFinished] = useState(false);

  return (
    <div className="App">
      <div className="fields-container">
        { fields.map((field, index) => (
          <Field
            key={index}
            field={field}
            state={states[index]}
            finished={finished}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
