import { Button, Column } from "@/components";
import { Context } from "@/ContextApp";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { produce } from "immer";
import { useContext, useMemo } from "react";

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
  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  }),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
    activationConstraint: { distance: 10 },
  })
);

  const taskIds = useMemo(() => {
    let taskIds = [];
    if (!board || board.length === 0) return taskIds;
    for (let column of board) {
      if (column?.tasks?.length > 0) {
        taskIds = [...taskIds, ...column.tasks.map((task) => task.id)];
      }
    }
    return taskIds;
  }, [board]);

  console.log({taskIds});

  const handleDragEnd = (event) => {
    console.log({event});
  }

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
      <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
        <SortableContext
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          {board?.map((_, index) => (
            <Column
              id={board[index]?.id}
              key={board[index]?.id}
              title={board[index]?.title}
              tasks={board[index]?.tasks}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        variant="buttonForAddColumn"
        onClick={handleAddColumn}
        isDisabled={data?.length === 0}
      >
        + New Column
      </Button>
    </main>
  );
}
