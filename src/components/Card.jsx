import { useContext } from "react";
import { Context } from "@/ContextApp";
import { produce } from "immer";

/**
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @returns {JSX.Element} The Card component.
 * @description The Card component renders a card with a title and description.
 */

export function Card(props) {
  const { columnId, id: CardId, title, description } = props;
  const { setData, select } = useContext(Context);

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
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      <h2 className="text-heading-m">{title}</h2>
      <p>{description}</p>

      <button
        className="absolute bottom-0 right-0 top-0 bg-white p-2 text-body-m text-red opacity-0 shadow duration-300 focus:opacity-100 group-hover/card:opacity-100 peer-focus:opacity-100"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  );
}
