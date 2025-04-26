import { Button, Card } from ".";

export function Column() {
  return (
    <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        Column Title
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        <Card />
        <Card />
        <Card />
      </div>
      <Button variant="buttonForAddTask" size="lg" isFullWidth={true}>
        + Add New Task
      </Button>
    </div>
  );
}
