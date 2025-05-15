import { useContext, useState } from "react";
import { Button, Card } from ".";
import { Context } from "@/ContextApp";
import { produce } from "immer";

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
  const [newCardId, setNewCardId] = useState(
    tasks?.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
  );

  const handleAddNewTask = () => {
    const newTask = {
      id: newCardId,
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
    setNewCardId((prevId) => prevId + 1);
  };

  return (
    <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks?.length})
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks?.map((_, index) => (
          <Card
            id={tasks[index].id}
            key={tasks[index].id}
            title={tasks[index].title}
            description={tasks[index].description}
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
