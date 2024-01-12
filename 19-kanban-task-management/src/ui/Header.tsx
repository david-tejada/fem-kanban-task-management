import { useState } from "react";
import { cn } from "../lib/utils";
import { useModalContext } from "../lib/hooks/useModalContext";

type HeaderProps = {
  isSidebarOpen: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen(value: boolean): void;
};

export default function Header({
  isSidebarOpen,
  isMobileOpen,
  setIsMobileOpen,
}: HeaderProps) {
  const chevronImageUrl = isMobileOpen
    ? "/icon-chevron-up.svg"
    : "/icon-chevron-down.svg";

  return (
    <header className="relative z-30 flex border-blue-200 bg-white sm:border-b dark:border-neutral-600 dark:bg-neutral-700">
      <div
        className={cn(
          "flex items-center border-blue-200 px-4 py-5 sm:border-r dark:border-neutral-600",
          isSidebarOpen && "sm:w-60",
        )}
      >
        <Logo />
      </div>
      <div className="flex grow items-center gap-4 p-4 pl-0 sm:pl-4">
        <div className="relative flex items-center gap-1 text-heading-lg dark:text-white">
          <p>Platform Launch</p>
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="before:absolute before:inset-0 sm:hidden"
          >
            <img src={chevronImageUrl} alt="" className="" />
          </button>
        </div>
        <ButtonNewTask />
        <ButtonMore />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <a href="/">
      <img src="/logo-mobile.svg" alt="" className="sm:hidden" />
      <img
        src="/logo-dark.svg"
        alt=""
        className="hidden sm:block dark:hidden"
      />
      <img src="/logo-light.svg" alt="" className="hidden dark:sm:block" />
    </a>
  );
}

function ButtonNewTask() {
  return (
    <button
      type="button"
      className="ml-auto items-center rounded-full bg-purple-500 px-[1.125rem] py-[0.625rem] text-heading-md text-white sm:px-6 sm:py-3"
    >
      <img src="icon-add-task-mobile.svg" alt="" className="sm:hidden" />
      <span className="hidden sm:inline" aria-hidden="true">
        +{" "}
      </span>
      <span className="sr-only sm:not-sr-only">Add New Task</span>
    </button>
  );
}

function ButtonMore() {
  const [isOpen, setIsOpen] = useState(false);
  const { setModalState } = useModalContext();

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <img src="icon-vertical-ellipsis.svg" alt="" />
      </button>
      <ul
        className={cn(
          "invisible absolute -bottom-28 -right-2 grid w-48 gap-4  rounded-md bg-white p-4 text-body-lg opacity-0 transition-all",
          isOpen && "visible opacity-100",
        )}
      >
        <li>
          <button
            type="button"
            className="text-neutral-400"
            onClick={() => {
              setIsOpen(false);
              setModalState("editBoard");
            }}
          >
            Edit Board
          </button>
        </li>
        <li>
          <button
            type="button"
            className="text-red-600"
            onClick={() => {
              setIsOpen(false);
              // TODO: Open delete board modal
            }}
          >
            Delete Board
          </button>
        </li>
      </ul>
    </div>
  );
}
