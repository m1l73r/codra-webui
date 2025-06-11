// Snapshots is used to display different snapshots that the user made or that the system generated. This allows the user to undo or redo to different points in the code.
import { onMount } from "solid-js";

interface SnapshotsProps {
  api?: (api: SnapshotsApi) => void;
}

export interface SnapshotsApi { }

export default function Snapshots(props: SnapshotsProps) {
  let websocket: WebSocket;

  function handle_message(msg: any) {
    console.log(msg)
  }

  onMount(() => {
    websocket = new WebSocket(`ws://${window.location.host}/snapshots`);
    websocket.onopen = () => console.log("snapshots ws connected");
    websocket.onmessage = (message) => handle_message(JSON.parse(message.data));

    // Setup API
    props.api?.({});
  });

  return (
    <div class="h-full border-blue-500 border-5">
      Snapshots
    </div>
  );
}

