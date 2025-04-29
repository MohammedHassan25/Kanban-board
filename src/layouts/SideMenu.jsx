import { CustomDialog } from "@/components";
import clsx from "clsx";
import { useState } from "react";
import iconBoard from "@assets/icon-board.svg";

/**
 * @param {Object} props - The props object.
 * @param {Array} props.data - The data array containing board information.
 * @param {number} props.select - The index of the selected board.
 * @param {Function} props.setSelect - The function to set the selected board index.
 * @returns {JSX.Element} The SideMenu component.
 * @description The SideMenu component renders a side menu with a list of boards and a button to create a new board.
 */

export function SideMenu(props) {
  const { data, select, setSelect } = props;

  const [open, setOpen] = useState(false);
  return (
    <aside className="-mt-px w-[300px] border-r border-lines-light bg-white">
      <p className="px-8 py-4 text-heading-s">ALL BOARDS ({data.length})</p>
      <ul>
        {data.map((item, index) => (
          <li
            key={data[index].id}
            className={clsx(
              "flex w-11/12 cursor-pointer items-center gap-4 rounded-e-full px-8 py-4 text-heading-m text-medium-grey transition data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple",
              {
                "bg-main-purple !text-white hover:bg-main-purple":
                  select === index,
              },
            )}
            onClick={() => setSelect(index)}
            data-isactive={select === index}
          >
            <img src={iconBoard} alt="icon-board" />
            {item.title}
          </li>
        ))}
        <li className="px-8 py-4">
          <CustomDialog
            isOpen={open}
            setOpen={setOpen}
            triggerComponent={
              <button className="flex w-full items-center gap-4 text-heading-m text-main-purple">
                <img src={iconBoard} alt="icon-board" /> + Create New Board
              </button>
            }
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="board-name" className="text-heading-m">
                Board Name
              </label>
              <input
                type="text"
                id="board-name"
                className="rounded-md border border-lines-light p-2"
                placeholder="Enter board name"
              />
              <button className="rounded-md bg-main-purple px-4 py-2 text-white">
                Create Board
              </button>
            </div>
            <p className="text-sm mt-4 text-medium-grey">
              This board will be created with the default settings.
            </p>
          </CustomDialog>
        </li>
      </ul>
    </aside>
  );
}
