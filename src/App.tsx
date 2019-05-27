import React, { Component, useState } from "react";

import { Editor } from "slate-react";
import { Value } from "slate";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
} as any);

const App = () => {
  const [value, setValue] = useState(initialValue);
  return <Editor value={value} onChange={(opts) => setValue(opts.value)} />;
};

export default App;
