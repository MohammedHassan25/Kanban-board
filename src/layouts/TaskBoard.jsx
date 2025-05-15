import { Button, Column } from "@/components";
import { Context } from "@/ContextApp";
import { produce } from "immer";
import { useContext } from "react";

/**
 * @param {Object}  - The props object.
 * @param {Array} data - The data array containing board information.
 * @param {number} select - The index of the selected board.
 * @returns {JSX.Element} The TaskBoard component.
 * @description The TaskBoard component renders a task board with columns and tasks.
 */

export function TaskBoard() {
  const { data, select, setData } = useContext(Context);
  const board = data && data[select]?.columns;

  const handleAddColumn = () => {
    const newColumn = {
      id: Date.now(),
      title: `New Column`,
      tasks: [],
    };

    setData((prevData) =>
      produce(prevData, (draft) => {
        draft[select].columns.push(newColumn);
      }),
    );
  };

  return (
    <main className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
      {board?.map((_, index) => (
        <Column
          id={board[index]?.id}
          key={board[index]?.id}
          title={board[index]?.title}
          tasks={board[index]?.tasks}
        />
      ))}
      <Button variant="buttonForAddColumn" onClick={handleAddColumn} isDisabled={data?.length === 0}>
        + New Column
      </Button>
    </main>
  );
}
