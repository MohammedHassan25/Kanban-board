import { Button, Column } from "@/components";

export function TaskBoard() {
  return (
    <main className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
      <Column />
      <Column />
      <Column />
      <Button variant="buttonForAddColumn">+ New Column</Button>
    </main>
  );
}
