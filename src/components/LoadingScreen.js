import { Spinner } from "./ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 flex gap-2 items-center">
      <Spinner className="size-6" />
      <p>Loading...</p>
    </div>
  );
}
