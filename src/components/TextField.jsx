import clsx from "clsx";

/**
 * @param {Object} props
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.isInvalid - A boolean to determine if the input is invalid.
 * @param {string} props.name - The name of the input field.
 * @param {boolean} props.required - A boolean to determine if the input is required.
 * @param {string} props.defaultValue - The default value of the input field.
 * @returns {JSX.Element}
 * @description The TextField component renders a text input field with a placeholder and validation message.
 */

export function TextField({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}) {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="absolute right-4 text-body-l text-red">
          Can't be empty
        </span>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "w-full rounded-[4px] border border-medium-grey/25 py-2 pl-4 text-body-l",
          {
            "border-red pr-32": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
}
