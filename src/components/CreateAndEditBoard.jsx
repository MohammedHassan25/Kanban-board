import { Button, TextField } from "@/components";
import { Context } from "@/ContextApp";
import iconCross from "@assets/icon-cross.svg";
import { useContext, useState } from "react";

/**
 * @param {Object} props - The props object.
 * @param {Function} props.setOpen - The function to set the open state of the dialog.
 * @param {string} props.Action - The action to be performed (e.g., "Create Board", Edit Board).
 * @returns {JSX.Element} The CreateBoard component.
 * @description The CreateBoard component renders a form to create a new board with columns.
 */

export function CreateAndEditBoard({ setOpen, Action }) {
  const { data, setData, select, setSelect } = useContext(Context);
  const [addColumn, setAddColumns] = useState(
    data[select]?.columns && Action === "Edit Board"
      ? [...data[select].columns]
      : [{ id: Date.now() }],
  );

  const addNewColumnHandler = () => {
    setAddColumns((prev) => [
      ...prev,
      {
        id: Date.now(),
      },
    ]);
  };

  const removeColumnHandler = (id) => {
    setAddColumns((cols) => cols.filter((item) => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("BoardName");
    const columnNames = formData.getAll("ColumnName").filter(Boolean);
    switch (Action) {
      case "Edit Board": {
        const columns = columnNames.map((name, i) => ({
          id: i + 1,
          title: name,
          tasks: data[select].columns[i]?.tasks || [],
        }));
        setData((prev) =>
          prev.map((item, index) =>
            index === select
              ? {
                  ...item,
                  title: boardName,
                  columns: columns,
                }
              : item,
          ),
        );
        setSelect(select);
        break;
      }

      case "Create New Board": {
        const newBoard = {
          id: Date.now(),
          title: boardName,
          columns: columnNames.map((name, i) => ({
            id: i + 1,
            title: name,
            tasks: [],
          })),
        };
        setData([...data, newBoard]);
        setSelect(data?.length);
        break;
      }
      default:
        break;
    }
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField
          placeholder="Board Name"
          name="BoardName"
          defaultValue={
            data[select]?.title && Action === "Edit Board"
              ? data[select]?.title
              : ""
          }
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columns</h3>
        {addColumn.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <TextField
              placeholder="Column Name"
              name="ColumnName"
              defaultValue={
                item.title && Action === "Edit Board" ? item.title : ""
              }
              required
            />
            <button type="button" onClick={() => removeColumnHandler(item.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          {Action}
        </Button>
      </div>
    </form>
  );
}
