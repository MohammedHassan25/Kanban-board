export function Card(props) {
  const { title, description } = props;
  return (
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      <h2 className="text-heading-m">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
