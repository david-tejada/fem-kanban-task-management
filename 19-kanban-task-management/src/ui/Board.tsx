import { useLoaderData } from "react-router-dom";
import { IBoard, IColumn, ITask } from "../lib/types";

export default function Board() {
  const { board } = useLoaderData() as { board: IBoard };

  return (
    <>
      <div className="mx-4 my-6 flex shrink-0 gap-6">
        {board.columns.map((column, i) => (
          <Column key={i} column={column} />
        ))}
        <button
          type="button"
          className="mt-10 h-[calc(100%-2.5rem)]  w-[17.5rem] rounded-md bg-gradient-to-b from-blue-start to-blue-stop text-heading-xl text-neutral-400"
        >
          + New Column
        </button>
      </div>
      {/* <Outlet /> */}
    </>
  );
}

function Column({ column }: { column: IColumn }) {
  return (
    <div className="w-[17.5rem]">
      <h2 className="flex gap-3 text-heading-sm uppercase text-neutral-400 before:block before:size-4 before:rounded-full before:bg-purple-300">
        {column.name} ({column.tasks.length})
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {column.tasks.map((task, i) => (
          <Task key={i} task={task} />
        ))}
      </div>
    </div>
  );
}

function Task({ task }: { task: ITask }) {
  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-task">
      <h3 className="text-heading-md text-neutral-900">{task.title}</h3>
      <p className="mt-2 text-body-md text-neutral-400">
        {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
        {task.subtasks.length} subtasks
      </p>
    </div>
  );
}
