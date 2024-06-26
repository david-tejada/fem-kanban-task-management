import { Link, useLoaderData } from "react-router-dom";
import { TBoard, TColumn, TTask } from "../lib/types";

export default function Board() {
  const { board } = useLoaderData() as { board: TBoard };

  if (board.columns.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <>
      <div className="mx-4 my-6 flex shrink-0 gap-6">
        {board.columns.map((column, i) => (
          <Column key={column.id} column={column} index={i} />
        ))}
        <Link
          to="newColumn"
          className="mt-10 grid h-[calc(100%-2.5rem)] w-[17.5rem]  place-items-center rounded-md bg-gradient-to-b from-blue-start to-blue-stop text-heading-xl text-neutral-400 hover:text-purple-500 dark:from-neutral-700 dark:to-neutral-700/50"
        >
          + New Column
        </Link>
      </div>
    </>
  );
}

function Column({ column, index }: { column: TColumn; index: number }) {
  const dots = [
    "before:bg-[#49C4E5]",
    "before:bg-[#8471F2]",
    "before:bg-[#67E2AE]",
    "before:bg-[#FF715B]",
    "before:bg-[#F9CB40]",
  ];
  return (
    <div className="w-[17.5rem]">
      <h2
        className={`flex gap-3 text-heading-sm uppercase text-neutral-400 before:block before:size-4 before:rounded-full ${
          dots[index % dots.length]
        }`}
      >
        {column.name || "(Untitled)"} ({column.tasks.length})
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {column.tasks.map((task, i) => (
          <Task key={i} task={task} />
        ))}
      </div>
    </div>
  );
}

function Task({ task }: { task: TTask }) {
  return (
    <div className="relative rounded-md bg-white px-4 py-6 shadow-task dark:bg-neutral-700">
      <h3 className="text-heading-md text-neutral-900 hover:text-purple-500 dark:text-white">
        <Link
          className="before:absolute before:inset-0"
          to={`tasks/${task.id}/view`}
        >
          {task.title}
        </Link>
      </h3>
      <p className="mt-2 text-body-md text-neutral-400">
        {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
        {task.subtasks.length} subtasks
      </p>
    </div>
  );
}

function EmptyBoard() {
  return (
    <div className="grid place-items-center">
      <div className="mx-4 grid gap-8">
        <p className="text-center text-heading-lg text-neutral-400">
          This board is empty. Create a new column to get started.
        </p>
        <Link
          to="newColumn"
          className="mx-auto max-w-fit items-center rounded-full bg-purple-500 p-4 text-heading-md text-white hover:bg-purple-500/75"
        >
          <span aria-hidden="true">+</span> Add New Column
        </Link>
      </div>
    </div>
  );
}
