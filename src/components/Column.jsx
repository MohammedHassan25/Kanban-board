import { Button, Card } from ".";

/**
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the column.
 * @param {Array} props.tasks - The array of tasks in the column.
 * @returns {JSX.Element} The Column component.
 * @description The Column component renders a column with a title and a list of tasks.
 */

export function Column(props) {
  const { title, tasks } = props;
  return (
    <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title}
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks?.map((task, index) => (
          <Card
            key={tasks[index].id}
            title={tasks[index].title}
            description={tasks[index].description}
          />
        ))}
      </div>
      <Button variant="buttonForAddTask" size="lg" isFullWidth={true}>
        + Add New Task
      </Button>
    </div>
  );
}
