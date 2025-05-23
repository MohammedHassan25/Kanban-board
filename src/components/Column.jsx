import { useContext } from "react";
import { Button, Card } from ".";
import { Context } from "@/ContextApp";
import { produce } from "immer";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

/**
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the column.
 * @param {Array} props.tasks - The array of tasks in the column.
 * @returns {JSX.Element} The Column component.
 * @description The Column component renders a column with a title and a list of tasks.
 */

export function Column(props) {
  const { id: ColumnId, title, tasks } = props;
  const { data, setData, select } = useContext(Context);
  const { setNodeRef } =
    useDroppable({
      id: ColumnId,
      data: { type: "column" },
    });

  const handleAddNewTask = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      description: "Task description",
    };

    const newColumns = data[select]?.columns?.map((column) => {
      if (column.id !== ColumnId) return column;
      return {
        ...column,
        tasks: [...(column.tasks || []), newTask],
      };
    });

    setData((prev) =>
      produce(prev, (draft) => {
        draft[select].columns = newColumns;
      }),
    );
  };

  const handleDeleteColumn = () => {
    if (window.confirm(`Are you sure you want to delete this "${title}"?`)) {
      setData((prev) =>
        produce(prev, (draft) => {
          draft[select].columns = draft[select]?.columns?.filter(
            (column) => column.id !== ColumnId,
          );
        }),
      );
    }
  };

  return (
    <div
      ref={tasks.length === 0 ? setNodeRef : null}
      className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow"
    >
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks?.length})
        <button
          className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
          onClick={handleDeleteColumn}
        >
          Delete
        </button>
      </h2>
      <div className="mb-5 flex flex-col gap-5 transition-all duration-200 ease-in-out">
        {tasks?.map((_, index) => (
          <Card
            id={tasks[index]?.id}
            key={tasks[index]?.id}
            title={tasks[index]?.title}
            description={tasks[index]?.description}
            columnId={ColumnId}
          />
        ))}
      </div>
      <Button
        variant="buttonForAddTask"
        size="lg"
        isFullWidth={true}
        onClick={handleAddNewTask}
      >
        + Add New Task
      </Button>
    </div>
  );
}
