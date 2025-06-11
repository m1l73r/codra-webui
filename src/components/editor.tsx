// The editor also exposes the codra blocks that can be used to program with. 
// It should display a pane of templates, which is the code blocks without any values. 
// And then it should display another pane, for context aware code blocks. Like function calls, or module imports.

import { onMount } from "solid-js";

// import { createSignal, onMount, type Component } from "solid-js";

interface EditorProps {
  api?: (api: EditorApi) => void;
}

export interface EditorApi {
  open_file: (path: string) => void;
}

// interface CodraNode {
//   id: number;
//   kind: string;
//   text: string;
//   is_named: boolean;
//   start_byte: number;
//   end_byte: number;
//   children: CodraNode[];
// }

export default function Editor(props: EditorProps) {
  let websocket: WebSocket;

  // // Store the actual component constructor, not JSX
  // const [Component, setComponent] = createSignal<Component<CodraNode> | null>(null);
  // const [node, setNode] = createSignal<CodraNode | null>(null);
  // async function draw_file(path: string, tree: any) {
  //   const node: CodraNode = tree;
  //   const file_ext = path.split(".").pop();
  //   const kind = node.kind;
  //
  //   try {
  //     const modulePath = `/assets/${file_ext}/profiler.js`;
  //     const mod = await import(modulePath);
  //     const drawFn: Component<CodraNode> = mod[kind];
  //
  //     if (typeof drawFn === "function") {
  //       setComponent(() => drawFn);
  //       setNode(node); // ✅ Store the real node
  //     } else {
  //       console.warn(`No profiler found for kind "${kind}" in ${modulePath}`);
  //     }
  //   } catch (err) {
  //     console.error(`Failed to load profiler for .${file_ext}`, err);
  //   }
  // }
  // function open_file(path: string) {
  //   websocket.send(JSON.stringify({
  //     file_request: path
  //   }));
  // }

  function handle_message(msg: any) {
    // if (msg.draw_file)
    //   draw_file(msg.draw_file.path, msg.draw_file.content);
  }




  onMount(() => {
    websocket = new WebSocket(`ws://${window.location.host}/editor`);
    websocket.onopen = () => console.log("editor ws connected");
    websocket.onmessage = (message) => handle_message(JSON.parse(message.data));

    // Setup API
    // props.api?.({ open_file });
  });


  return (
    <div class="w-full h-full overflow-hidden bg-[#6a7085]">
      Editor
      {/* {Component() && node() && Component()!(node()!)} */}
    </div>
  );
}

