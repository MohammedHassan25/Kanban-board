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
  arrayMove,
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
    }),
  );

  const taskIds = useMemo(() => {
    let taskIds = [];
    if (!board || board.length === 0) return taskIds;
    for (let column of board) {
      if (column?.tasks?.length > 0) {
        taskIds = [...taskIds, ...column.tasks.map((task) => task?.id)];
      }
    }
    return taskIds;
  }, [board]);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setData((prev) =>
      produce(prev, (draft) => {
        if (over.data.current.type === "card") {
          if (over.data.current.type === "column") return;
          const columns = draft[select].columns;

          const activeColIndex = columns.findIndex((col) =>
            col.tasks.some((t) => t.id === active.id),
          );
          const overColIndex = columns.findIndex((col) =>
            col.tasks.some((t) => t.id === over.id),
          );

          const oldIndex = columns[activeColIndex]?.tasks?.findIndex(
            (t) => t.id === active.id,
          );
          const newIndex = columns[overColIndex]?.tasks?.findIndex(
            (t) => t.id === over.id,
          );

          if (activeColIndex === overColIndex) {
            columns[activeColIndex].tasks = arrayMove(
              columns[activeColIndex]?.tasks,
              oldIndex,
              newIndex,
            );
          }
        }
      }),
    );
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setData((prev) =>
      produce(prev, (draft) => {
        const columns = draft[select].columns;
        const activeColIndex = columns.findIndex((col) =>
          col.tasks.some((t) => t.id === active.id),
        );
        if (over.data.current.type === "card") {
          if (over.data.current.type === "column") return;
          const overColIndex = columns.findIndex((col) =>
            col.tasks.some((t) => t.id === over.id),
          );

          const oldIndex = columns[activeColIndex]?.tasks?.findIndex(
            (t) => t.id === active.id,
          );

          const newIndex = columns[overColIndex]?.tasks?.findIndex(
            (t) => t.id === over.id,
          );

          if (activeColIndex !== overColIndex) {
            const activeTask = columns[activeColIndex]?.tasks[oldIndex];
            columns[activeColIndex]?.tasks?.splice(oldIndex, 1);
            columns[overColIndex]?.tasks?.splice(newIndex, 0, activeTask);
          }
        } else if (over.data.current.type === "column") {
          if (over.data.current.type === "card") return;
          const oldIndex = columns[activeColIndex]?.tasks?.findIndex(
            (t) => t.id === active.id,
          );
          const newColIndex = columns.findIndex((c) => c.id === over.id);
          const activeTask = columns[activeColIndex].tasks.splice(
            oldIndex,
            1,
          )[0];
          columns[newColIndex].tasks.push(activeTask);
        }
      }),
    );
  };

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
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
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
