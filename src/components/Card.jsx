import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/ContextApp";
import { produce } from "immer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Card({ columnId, id: CardId, title, description }) {
  const { setData, select } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: CardId, data: { type: "card" , columnId }, disabled: isEditing });

  const containerRef = useRef(null);

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = () => {
    setIsEditing(false);
    setData((prevData) =>
      produce(prevData, (draft) => {
        const col = draft[select].columns.find((c) => c.id === columnId);
        if (!col) return;
        const task = col.tasks.find((t) => t.id === CardId);
        if (!task) return;
        task.title = draftTitle;
        task.description = draftDescription;
      }),
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEditing &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        if (draftTitle === title && draftDescription === description)
          cancelEditing();
        else saveEditing();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, draftTitle, draftDescription]);

  const handleDeleteTask = () => {
    setData((prevData) =>
      produce(prevData, (draft) => {
        draft[select].columns = draft[select].columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== CardId),
            };
          }
          return column;
        });
      }),
    );
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      {isEditing ? (
        <div
          ref={containerRef}
          tabIndex={-1}
          className="flex flex-col space-y-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (draftTitle === title && draftDescription === description)
                cancelEditing();
              else saveEditing();
            }
          }}
        >
          <textarea
            className="border p-2 text-heading-m"
            value={draftTitle}
            onKeyDown={(e) => e.key === "Escape" && cancelEditing()}
            onChange={(e) => setDraftTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
            autoFocus
          />
          <textarea
            className="border p-2 pl-2"
            value={draftDescription}
            onKeyDown={(e) => e.key === "Escape" && cancelEditing()}
            onChange={(e) => setDraftDescription(e.target.value)}
            onFocus={(e) => e.target.select()}
            autoFocus
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-text"
        >
          <h2
            className="text-heading-m"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
          >
            {title}
          </h2>
          <p>{description}</p>
        </div>
      )}

      <button
        className="absolute bottom-0 right-0 top-0 bg-white p-2 text-body-m text-red opacity-0 shadow duration-300 group-hover/card:opacity-100"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  );
}
