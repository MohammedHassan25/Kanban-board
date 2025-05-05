import { CustomDialog, CustomDropdownMenu } from "@/components";
import { Context } from "@/ContextApp";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { useContext, useState } from "react";

/**
 * @param {Object} props - The props object.
 * @param {Array} props.data - The data array containing board information.
 * @param {number} props.select - The index of the selected board.
 * @returns {JSX.Element} The Header component.
 * @description The Header component renders the header of the application with a title and a dropdown menu for board actions.
 */

export function Header() {
  const [open, setOpen] = useState(false);
  const { data, setData, select, setSelect } = useContext(Context);

  const onEditBoard = () => setOpen(true);
  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      const newData = [...data];
      newData.splice(select, 1);
      setData(newData);
      setSelect(0);
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
              onClick: data?.length > 0 ? onEditBoard : null,
              isActive: data?.length > 0,
            },
            delete: {
              label: "Delete Board",
              onClick: data?.length > 0 ? onDeleteBoard : null,
              isActive: data?.length > 0,
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
