export default function Loading() {
  return (
    <div role="status" className="flex min-h-screen items-center justify-center bg-canvas">
      <span className="h-2 w-2 animate-[limespun-pulse_1.5s_ease-in-out_infinite] rounded-full bg-ember" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
