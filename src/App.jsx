import {
  Button,
  CustomDropdownMenu,
  TextField,
  CustomDialog,
} from "./components";

function App() {
  return (
    <div className="">
      <Button
        variant="primary"
        size="lg"
        isFullWidth={false}
        isDisabled={false}
      >
        Click me
      </Button>
      <TextField placeholder={"text"} required isInvalid={false} />
      <CustomDropdownMenu
        items={{
          edit: {
            label: "Edit Item",
            onClick: () => console.log("Edit"),
          },
          Delete: {
            label: "Delete Item",
            onClick: () => console.log("Delete"),
          },
        }}
        triggerComponent={() => (
          <Button variant="primary" size="lg">
            Dropdown
          </Button>
        )}
      />
      <CustomDialog
        title="Edit Board"
        triggerComponent={<button>ttttt</button>}
      >
        <TextField
          placeholder={"text"}
          required
          isInvalid={false}
          label="Edit Board"
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
            }}
            variant="primary"
            size="lg"
            isFullWidth={false}
          >
            Save
          </Button>
        </div>
      </CustomDialog>
    </div>
  );
}

export default App;
