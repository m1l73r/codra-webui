export default function Resizer(props: {
  on_start?: (clientX: number) => void;
  on_move: (clientX: number) => void;
  on_end?: () => void;
}) {
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    props.on_start?.(e.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      props.on_move(e.clientX);
    };

    const handleMouseUp = () => {
      props.on_end?.();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      class="cursor-ew-resize"
      onMouseDown={handleMouseDown}
    />
  );
}
