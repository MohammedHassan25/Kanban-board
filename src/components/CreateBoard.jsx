import { Button, TextField } from "@/components";
import iconCross from "@assets/icon-cross.svg";

export function CreateBoard() {
  return (
    <form>
      <h2 className="text-heading-l">Create New Board</h2>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField placeholder="Board" name="boardName" required />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columns</h3>
        <div className="flex items-center gap-4">
          <TextField placeholder="e.g. Web Design" required />
          <button type="button">
            <img src={iconCross} alt="icon cross" />
          </button>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          // onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          Create New Board
        </Button>
      </div>
    </form>
  );
}
