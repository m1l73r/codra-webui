import { createSignal, type Accessor, type Setter } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { Explorer } from './components/explorer';
import Resizer from './components/resizer';
import Editor from './components/editor';
import Snapshots from './components/snapshots';
import Pacman from './components/pacman';


export default function App() {
  const resizeWidth = 10;
  const cornerRadius = 8;

  const [explorerWidth, setExplorerWidth] = createSignal(200);
  const [snapshotsWidth, setSnapshotsWidth] = createSignal(300);
  const [pacmanWidth, setPacmanWidth] = createSignal(500);

  const [snapshotsStaticWidth, setSnapshotsStaticWidth] = createSignal(300);
  const [pacmanStaticWidth, setPacmanStaticWidth] = createSignal(500);

  const [startX, setStartX] = createSignal<number | null>(null);
  const [initialWidth, setInitialWidth] = createSignal<number>(0);

  let doAnimate = true;

  const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, value));

  const makeResizeHandler = (
    setWidth: Setter<number>,
    multiplier: number,
    min: number,
    max: number
  ) => (clientX: number) => {
    const origin = startX();
    if (origin === null) return;
    const delta = clientX - origin;
    const newWidth = clamp(initialWidth() + delta * multiplier, min, max);
    setWidth(newWidth);
  };

  const endResize = (setStaticWidth: Setter<number>, getWidth: Accessor<number>) => {
    setStaticWidth(getWidth());
    doAnimate = true;
    setStartX(null);
  };

  const toggleWidth = (getWidth: Accessor<number>, setWidth: Setter<number>, getStatic: Accessor<number>) =>
    () => setWidth(getWidth() > 0 ? 0 : getStatic());

  // Min/Max per pane
  const minExplorerWidth = 150, maxExplorerWidth = 400;
  const minSnapshotsWidth = 200, maxSnapshotsWidth = 500;
  const minPacmanWidth = 250, maxPacmanWidth = 600;

  return (
    <div
      class="grid h-full"
      classList={{ 'transition-all duration-300': doAnimate }}
      style={{
        'grid-template-columns': `${explorerWidth()}px ${resizeWidth}px 1fr ${snapshotsWidth() > 0 ? resizeWidth : 0}px ${snapshotsWidth()}px ${pacmanWidth() > 0 ? resizeWidth : 0}px ${pacmanWidth()}px 70px`
      }}
    >
      <div class="bg-blue-500 overflow-hidden" style={{ 'border-radius': `${cornerRadius}px` }}>
        <Explorer />
      </div>

      <Resizer
        on_start={(x) => {
          doAnimate = false;
          setStartX(x);
          setInitialWidth(explorerWidth());
        }}
        on_move={makeResizeHandler(setExplorerWidth, 1, minExplorerWidth, maxExplorerWidth)}
        on_end={() => {
          doAnimate = true;
          setStartX(null);
        }}
      />

      <div class="bg-gray-200 overflow-hidden" style={{ 'border-radius': `${cornerRadius}px` }}>
        <Editor />
      </div>

      <Resizer
        on_start={(x) => {
          doAnimate = false;
          setStartX(x);
          setInitialWidth(snapshotsWidth());
        }}
        on_move={makeResizeHandler(setSnapshotsWidth, -1, minSnapshotsWidth, maxSnapshotsWidth)}
        on_end={() => endResize(setSnapshotsStaticWidth, snapshotsWidth)}
      />

      <div
        class="relative bg-[#3b414d] h-full w-full"
        style={{ "border-radius": `${cornerRadius}px` }}
      >
        <div class="absolute overflow-hidden inset-1.5 rounded">
          <Snapshots />
        </div>
      </div>

      <Resizer
        on_start={(x) => {
          doAnimate = false;
          setStartX(x);
          setInitialWidth(pacmanWidth());
        }}
        on_move={makeResizeHandler(setPacmanWidth, -1, minPacmanWidth, maxPacmanWidth)}
        on_end={() => endResize(setPacmanStaticWidth, pacmanWidth)}
      />

      <div class="bg-gray-400 overflow-hidden" style={{ 'border-radius': `${cornerRadius}px` }}>
        <Pacman />
      </div>

      <div
        class="bg-cyan-700 overflow-hidden flex flex-col items-center gap-2"
        style={{
          'border-radius': `${cornerRadius}px`,
          'margin-left': `${resizeWidth}px`
        }}
      >
        <Icon
          icon="lucide:package"
          class="p-1 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          on:click={toggleWidth(pacmanWidth, setPacmanWidth, pacmanStaticWidth)}
          width={40}
          height={40}
        />
        <Icon
          icon="mdi:source-branch"
          class="p-1 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          on:click={toggleWidth(snapshotsWidth, setSnapshotsWidth, snapshotsStaticWidth)}
          width={40}
          height={40}
        />
      </div>

    </div >

  );
}

