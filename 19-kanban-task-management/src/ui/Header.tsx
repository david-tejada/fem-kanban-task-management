export default function Header() {
  return (
    <header className="flex border-blue-200 sm:border-b dark:border-neutral-600 dark:bg-neutral-700">
      <div className="flex items-center border-blue-200 px-4 py-5 sm:border-r dark:border-neutral-600">
        <Logo />
      </div>
      <div className="flex grow items-center gap-4 p-4 pl-0 sm:pl-4">
        <div className="relative flex items-center gap-1 text-heading-lg dark:text-white">
          <p>Platform Launch</p>
          <button
            type="button"
            className="before:absolute before:inset-0 sm:hidden"
          >
            <img src="/icon-chevron-down.svg" alt="" className="" />
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
      <span className="hidden sm:inline">+ </span>
      <span className="sr-only sm:not-sr-only">Add New Task</span>
    </button>
  );
}

function ButtonMore() {
  return (
    <button type="button">
      <img src="icon-vertical-ellipsis.svg" alt="" />
    </button>
  );
}
