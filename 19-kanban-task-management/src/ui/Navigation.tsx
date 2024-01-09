import { cn } from "../lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";

// Temporarily hardcoded
const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

type NavigationProps = {
  isMobileOpen: boolean;
  isSidebarOpen: boolean;
  setIsMobileOpen(value: boolean): void;
  setIsSidebarOpen(value: boolean): void;
};

export default function Navigation({
  isMobileOpen,
  isSidebarOpen,
  setIsMobileOpen,
  setIsSidebarOpen,
}: NavigationProps) {
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
          "invisible fixed -top-full left-1/2 z-50 flex w-64 -translate-x-1/2 flex-col rounded-lg bg-white transition-all sm:absolute sm:inset-0 sm:right-auto sm:top-[4.6875rem] sm:flex sm:w-60 sm:-translate-x-full sm:rounded-none sm:border-r sm:border-blue-200 sm:border-t-purple-500 dark:border-neutral-600 dark:bg-neutral-700",
          isMobileOpen && "visible top-20",
          isSidebarOpen && "sm:visible sm:translate-x-0",
        )}
      >
        <h2 className="px-6 pb-5 pt-4 text-center text-heading-sm uppercase text-neutral-400">
          All Boards (3)
        </h2>
        <nav>
          <ul>
            {boards.map((b, i) => (
              <li key={i}>
                <a
                  href="#"
                  className={`mr-6 flex items-center gap-2 rounded-r-full py-3 pl-6 ${
                    b === "Platform Launch"
                      ? "bg-purple-500 text-white"
                      : "text-neutral-400"
                  }`}
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
                  {b}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="mr-6 flex items-center gap-2 py-3 pl-6 text-purple-500"
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="currentColor"
            />
          </svg>
          <p>+ Create New Board</p>
        </button>
        <div className="mt-auto p-4 sm:p-3">
          <ThemeSwitcher />
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
          className="m-4 mt-0 hidden items-center gap-2 p-4 text-heading-md text-neutral-400 sm:flex"
        >
          <img src="/icon-hide-sidebar.svg" alt="" />
          Hide Sidebar
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsSidebarOpen(true);
        }}
        className="fixed bottom-8 hidden rounded-r-full bg-purple-500 px-5 py-[1.15625rem] sm:block"
      >
        <img src="/icon-show-sidebar.svg" alt="" className="max-w-none" />
        <p className="sr-only">Show sidebar</p>
      </button>
    </>
  );
}
