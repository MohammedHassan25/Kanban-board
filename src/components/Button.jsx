import { cva } from "class-variance-authority";

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The content of the button.
 * @property {string} [variant] - The variant of the button.
 * @property {string} [size] - The size of the button.
 * @property {boolean} [isFullWidth] - Whether the button should be full width.
 * @property {boolean} [isDisabled] - Whether the button is disabled.
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - Additional button props.
 * @returns {JSX.Element} The Button component.
 * @description The Button component renders a button with different styles based on the variant and size props.
 */

const button = cva(["rounded-full px-6 duration-200 text-[13px] font-bold"], {
  variants: {
    variant: {
      primary: "text-white bg-main-purple hover:bg-main-purple-hover",
      secondary: "text-main-purple bg-main-purple/10 hover:bg-main-purple/25",
      destructive: "text-white bg-red hover:bg-red-hover",
      buttonForAddTask:
        "-mx-2 mt-auto border-t border-light-grey bg-lines-light px-2 py-4 text-heading-m text-medium-grey",
      buttonForAddColumn:
        "w-72 shrink-0 self-start rounded-md bg-lines-light p-3 text-heading-l text-medium-grey",
    },
    size: {
      sm: "h-10",
      lg: "h-12",
    },
    isFullWidth: {
      true: "w-full",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-25 hover:bg-main-purple",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

export function Button({
  children,
  variant,
  size,
  isFullWidth,
  isDisabled,
  ...props
}) {
  return (
    <button
      className={button({
        variant,
        size,
        isFullWidth,
        isDisabled,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
