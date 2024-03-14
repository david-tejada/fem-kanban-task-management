import { Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { TBoard } from "../lib/types";
import { cn } from "../lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";

type NavigationProps = {
  boards: TBoard[];
  isMobileOpen: boolean;
  isSidebarOpen: boolean;
  setIsMobileOpen(value: boolean): void;
  setIsSidebarOpen(value: boolean): void;
};

export default function Navigation({
  boards,
  isMobileOpen,
  isSidebarOpen,
  setIsMobileOpen,
  setIsSidebarOpen,
}: NavigationProps) {
  const { board } = useRouteLoaderData("board") as { board: TBoard };

  return (
    <>
      <div
        className={`${
          isMobileOpen ? "visible opacity-50" : "invisible opacity-0"
        } fixed inset-0 z-10 bg-black transition-opacity sm:hidden`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      <div
        className={cn(
          "invisible fixed -top-full left-1/2 z-20 flex w-64 -translate-x-1/2 flex-col overflow-auto rounded-lg bg-white transition-all duration-300 sm:absolute sm:inset-0 sm:right-auto sm:top-[4.6875rem] sm:flex sm:w-60 sm:-translate-x-full sm:rounded-none sm:border-r sm:border-blue-200 sm:border-t-purple-500 dark:border-neutral-600 dark:bg-neutral-700",
          isMobileOpen && "visible top-20",
          isSidebarOpen && "sm:visible sm:translate-x-0",
        )}
      >
        <h2 className="px-6 pb-5 pt-4 text-center text-heading-sm uppercase text-neutral-400">
          All Boards ({boards.length})
        </h2>
        <nav>
          <ul>
            {boards.map((board) => (
              <li key={board.id}>
                <NavLink
                  to={`/boards/${board.id}`}
                  onClick={() => {
                    setIsMobileOpen(false);
                  }}
                  className={({ isActive }) =>
                    `mr-6 flex items-center gap-2 rounded-r-full py-3 pl-6 ${
                      isActive
                        ? "bg-purple-500 text-white"
                        : "text-neutral-400 hover:bg-purple-500/10 hover:text-purple-500 dark:hover:bg-white"
                    }`
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill="currentColor"
                    />
                  </svg>
                  {board.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to={`/boards/${board.id}/new`}
          onClick={() => {
            setIsMobileOpen(false);
          }}
          className="mr-6 flex items-center gap-2 py-3 pl-6 text-purple-500"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="currentColor"
            />
          </svg>
          <p>+ Create New Board</p>
        </Link>
        <div className="mt-auto p-4 sm:p-3">
          <ThemeSwitcher />
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
          className="my-4 mr-4 mt-0 hidden items-center gap-2 rounded-r-full p-4 text-heading-md  text-neutral-400 hover:bg-purple-500/10 hover:text-purple-500 sm:flex dark:hover:bg-white"
        >
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
              fill="currentColor"
            />
          </svg>
          Hide Sidebar
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsSidebarOpen(true);
        }}
        className="fixed bottom-8 hidden rounded-r-full bg-purple-500 px-5 py-[1.15625rem] hover:bg-purple-500/75 sm:block"
      >
        <img src="/icon-show-sidebar.svg" alt="" className="max-w-none" />
        <p className="sr-only">Show sidebar</p>
      </button>
    </>
  );
}
