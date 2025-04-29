import { Button, Column } from "@/components";

export function TaskBoard(props) {
  const { data, select } = props;
  const board = data[select].columns || [];

  return (
    <main className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
      {board.map((i, index) => (
        <Column
          key={board[index].id}
          title={board[index].title}
          tasks={board[index].tasks}
        />
      ))}
      <Button variant="buttonForAddColumn">+ New Column</Button>
    </main>
  );
}
