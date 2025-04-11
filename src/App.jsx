import { Button, CustomDropdownMenu, TextField } from "./components";

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
    </div>
  );
}

export default App;
