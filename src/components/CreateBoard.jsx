import { Button, TextField } from "@/components";
import { Context } from "@/ContextApp";
import iconCross from "@assets/icon-cross.svg";
import { useContext, useState } from "react";

export function CreateBoard({ setOpen }) {
  const { data, setData, select, setSelect } = useContext(Context);
  console.log(data, select);
  const [addColumn, setAddColumns] = useState([{ id: Date.now() }]);
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
    const newBoard = {
      id: data.length + 1,
      title: boardName,
      columns: columnNames.map((name, i) => ({
        id: i + 1,
        title: name,
        tasks: [],
      })),
    };
    setData((prev) => [...prev, newBoard]);
    setSelect(data.length);
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField placeholder="Board Name" name="BoardName" required />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columns</h3>
        {addColumn.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <TextField placeholder="Column Name" name="ColumnName" required />
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
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isFullWidth
        >
          Create New Board
        </Button>
      </div>
    </form>
  );
}
