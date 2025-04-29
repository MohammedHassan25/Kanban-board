/**
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @returns {JSX.Element} The Card component.
 * @description The Card component renders a card with a title and description.
 */

export function Card(props) {
  const { title, description } = props;
  return (
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      <h2 className="text-heading-m">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
