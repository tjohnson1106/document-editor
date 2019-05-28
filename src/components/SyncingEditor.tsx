import React, { useRef, useState, useEffect } from "react";
import { initialValue } from "../slateInitialValue";
import Mitt from "mitt";
import { Editor } from "slate-react";

interface Props {}

const emitter = new Mitt();

export const SyncingEditor: React.FC<Props> = () => {
  const [value, setValue] = useState(initialValue);
  const id = useRef(`${Date.now()}`);
  const editor = useRef<Editor | null>(null);
  //   const remote = useRef(null);

  useEffect(() => {
    emitter.on("*", (type) => {
      if (id.current === type) {
        console.log("change happened in other editorx");
      }
    });
  }, []);

  return (
    <Editor
      ref={editor}
      value={value}
      onChange={(opts) => {
        setValue(opts.value);

        const ops = opts.operations
          .filter((o) => {
            if (o) {
              return (
                o.type !== "set_selection" &&
                o.type !== "set_value" &&
                (!o.data || !o.data.has("source"))
              );
            }
            return false;
          })
          .toJS()
          .map((o: any) => ({
            ...o,
            data: {
              source: "one"
            }
          }));

        if (ops.length) {
          emitter.emit(id.current, ops);
        }
      }}
    />
  );
};
