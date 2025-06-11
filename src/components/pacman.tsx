// The pacman as webui, allows you to install packages
import { onMount } from "solid-js";

interface PacmanProps {
  api?: (api: PacmanApi) => void;
}

export interface PacmanApi { }

export default function Pacman(props: PacmanProps) {
  let websocket: WebSocket;

  function handle_message(msg: any) {
    console.log(msg)
  }

  onMount(() => {
    websocket = new WebSocket(`ws://${window.location.host}/pacman`);
    websocket.onopen = () => console.log("explorer ws connected");
    websocket.onmessage = (message) => handle_message(JSON.parse(message.data));

    // Setup API
    props.api?.({});
  });

  return (
    <div class="h-full border-blue-500 border-5">
      Pacman
    </div>
  );
}

