import { Link, useRouteLoaderData } from "react-router-dom";
import { TBoard } from "../lib/types";
import { cn } from "../lib/utils";
import { ButtonMore } from "./ButtonMore";

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
  const { board } = useRouteLoaderData("board") as { board: TBoard };
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
          <p>{board.name}</p>
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="before:absolute before:inset-0 sm:hidden"
          >
            <img src={chevronImageUrl} alt="" className="" />
          </button>
        </div>
        <ButtonNewTask />
        <ButtonMore className="-right-2 top-full mt-4 dark:bg-neutral-800">
          <ul className="grid gap-4">
            <li>
              <Link to="edit" className="text-neutral-400">
                Edit Board
              </Link>
            </li>
            <li>
              <Link to="delete" className="text-red-600">
                Delete Board
              </Link>
            </li>
          </ul>
        </ButtonMore>
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
    <Link
      to="newTask"
      className="ml-auto items-center rounded-full bg-purple-500 px-[1.125rem] py-[0.625rem] text-heading-md text-white sm:px-6 sm:py-3"
    >
      <img src="/icon-add-task-mobile.svg" alt="" className="sm:hidden" />
      <span className="hidden sm:inline" aria-hidden="true">
        +{" "}
      </span>
      <span className="sr-only sm:not-sr-only">Add New Task</span>
    </Link>
  );
}
