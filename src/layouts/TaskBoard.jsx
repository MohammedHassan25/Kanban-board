import { Button, Column } from "@/components";
import { Context } from "@/ContextApp";
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
      id: data[select].columns.length > 0 ? data[select].columns.length + 1 : 1,
      title: `New Column`,
      tasks: [],
    };

    setData((prevData) => {
      const newData =[...prevData];
      newData[select] = {
        ...newData[select],
        columns: [...newData[select].columns, newColumn],
      }
      return newData;
    });
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
      <Button variant="buttonForAddColumn" onClick={handleAddColumn}>
        + New Column
      </Button>
    </main>
  );
}
