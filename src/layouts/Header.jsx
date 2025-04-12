import { CustomDialog, CustomDropdownMenu } from "@/components";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const onEditBoard = () => setOpen(true);
  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      console.log("Board deleted");
    }
  };

  return (
    <header className="flex h-[97px] shrink-0 items-center">
      <div className="flex w-[300px] items-center gap-4 self-stretch border-b border-r border-lines-light pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="flex flex-1 items-center justify-between self-stretch border-b border-lines-light pl-6 pr-6">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <CustomDropdownMenu
          items={{
            edit: {
              label: "Edit Board",
              onClick: onEditBoard,
            },
            delete: {
              label: "Delete Board",
              onClick: onDeleteBoard,
            },
          }}
          triggerComponent={() => (
            <button className="flex h-8 w-8 items-center justify-center gap-2 rounded-full text-[14px] font-bold text-main-purple">
              <img src={iconVerticalEllipsis} alt="icon vertical ellipsis" />
            </button>
          )}
        />
        <CustomDialog isOpen={open} setOpen={setOpen} title="Edit Board">
          <div className="p-4">Edit Board Content</div>
        </CustomDialog>
      </div>
    </header>
  );
}
