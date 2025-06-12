import { onMount, createSignal } from "solid-js";
import { commit, CommitItem, roll_back } from "~/messages/snapshots";

interface SnapshotsProps {
  api?: (api: SnapshotsApi) => void;
}

export interface SnapshotsApi {
  commit: (file_paths: string[], message: string) => void;
}

export default function Snapshots(props: SnapshotsProps) {
  let websocket: WebSocket;

  const [snapshots, setSnapshots] = createSignal<CommitItem[]>([
    { id: "1", message: "Initial setup", files: [] },
    { id: "2", message: "Added user authentication", files: [] },
    { id: "3", message: "Refactored API layer", files: [] },
  ]);

  const [selectedId, setSelectedId] = createSignal<string | null>(null);

  function handle_message(msg: any) {
    if (msg.commit_item) handle_commit_item(msg.commit_item);
  }

  function handle_commit_item(commit_item: CommitItem) {
    setSnapshots((prev) => [...prev, commit_item]);
  }

  function send_commit(files: string[], message: string) {
    websocket.send(JSON.stringify(commit(files, message)));
  }

  function send_roll_back(commit_id: string) {
    websocket.send(JSON.stringify(roll_back(commit_id)));
  }

  onMount(() => {
    websocket = new WebSocket(`ws://${window.location.host}/snapshots`);
    websocket.onopen = () => console.log("snapshots ws connected");
    websocket.onmessage = (message) => handle_message(JSON.parse(message.data));
    props.api?.({ commit: send_commit });
  });

  return (
    <div class="flex flex-col gap-4 h-full p-6 border-4 border-blue-500 rounded-lg shadow-md">
      <div class="text-xl font-bold text-white">
        Snapshots
      </div>
      <div class="mt-4 flex flex-col gap-2">
        {snapshots().map((snap) => (
          <div
            class={`h-[70px] rounded-lg overflow-hidden cursor-pointer transition duration-200
              ${selectedId() === snap.id
                ? "bg-[#697185]"
                : "bg-[#4c5463] hover:bg-[#595f6e] active:bg-[#697185]"}`}
            onClick={() => {
              setSelectedId(snap.id);
              send_roll_back(snap.id);
            }}
          >
            <div class="flex text-lg font-semibold text-gray-100 px-3 pt-2">
              {snap.message}
            </div>
            <div class="flex flex-col text-sm text-gray-300 px-3">
              {snap.files.map((file) => file.split('/').pop()).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
