import * as Dialog from "@radix-ui/react-dialog";

/**
 * CustomDialog component
 * @param {Object} props
 * @param {string} props.title - The title of the dialog
 * @param {JSX.Element} props.triggerComponent - The component that triggers the dialog
 * @param {JSX.Element} props.children - The children components
 * @param {boolean} props.isOpen - A boolean to determine if the dialog is open
 * @param {Function} props.setOpen - A function to set the dialog state
 * @returns {JSX.Element}
 */

export function CustomDialog({
  title,
  triggerComponent,
  children,
  isOpen,
  setOpen,
  description,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[480px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-8 focus:outline-none">
          <Dialog.Title className="text-heading-l">{title}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mt-2">
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
