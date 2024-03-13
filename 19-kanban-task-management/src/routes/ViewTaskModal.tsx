import { Listbox } from "@headlessui/react";
import { Link, Params, useFetcher, useRouteLoaderData } from "react-router-dom";
import {
  getBoard,
  getTask,
  updateCompletedSubtasks,
  updateTaskColumn,
} from "../lib/boards";
import { TBoard, TTask } from "../lib/types";
import { cn } from "../lib/utils";
import { ButtonMore } from "../ui/ButtonMore";
import ModalBase from "../ui/modals/ModalBase";

async function loader({ params }: { params: Params<"boardId" | "taskId"> }) {
  const task = await getTask(params.taskId!);
  const board = await getBoard(params.boardId!);
  return { board, task };
}

async function action({
  params,
  request,
}: {
  params: Params<"boardId" | "taskId">;
  request: Request;
}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const completedSubtasks = Object.entries(data)
    .filter(([key]) => key.startsWith("subtask:"))
    .map(([key]) => {
      const [_, id] = key.split(":");

      return id;
    });

  if ("columnId" in data) {
    await updateTaskColumn(params.taskId!, data.columnId as string);
  } else {
    await updateCompletedSubtasks(params.taskId!, completedSubtasks);
  }

  return null;
}

export default function ViewTaskModal() {
  const fetcher = useFetcher();
  const { board, task } = useRouteLoaderData("task") as {
    board: TBoard;
    task: TTask;
  };
  let column = board.columns.find((c) =>
    c.tasks.some((t) => t.id === task.id),
  )!;

  if (fetcher.formData) {
    const columnId = fetcher.formData.get("columnId");
    if (columnId) {
      column = board.columns.find((c) => c.id === columnId)!;
    }
  }

  return (
    <ModalBase>
      <article>
        <fetcher.Form method="post">
          <header className="flex gap-4">
            <h2 className="grow text-heading-lg text-neutral-900 dark:text-white">
              {task.title}
            </h2>
            <ButtonMore className="top-full -translate-x-1/2">
              <ul className="grid gap-4">
                <li>
                  <Link
                    to={`/boards/${board.id}/tasks/${task.id}/edit`}
                    className="text-neutral-400"
                  >
                    Edit Task
                  </Link>
                </li>
                <li>
                  <Link to="../delete" className="text-red-600">
                    Delete Task
                  </Link>
                </li>
              </ul>
            </ButtonMore>
          </header>
          <p className="mt-6 text-body-lg text-neutral-400">
            {task.description}
          </p>
          {task.subtasks.length > 0 && (
            <div className="text-body-md">
              <h3 className="mt-6 text-neutral-400 dark:text-white">
                Subtasks ({task.subtasks.filter((s) => s.isCompleted).length} of{" "}
                {task.subtasks.length})
              </h3>
              <ul className="mt-4 grid gap-2">
                {task.subtasks.map((s) => (
                  <li
                    key={s.id}
                    className={cn(
                      `relative bg-blue-100 p-3 text-neutral-900 hover:bg-purple-500/25 dark:bg-neutral-900 dark:text-white`,
                      s.isCompleted && "text-opacity-50 dark:text-neutral-400",
                    )}
                  >
                    <label className="flex cursor-pointer gap-4 before:absolute before:inset-0">
                      <input
                        name={`subtask:${s.id}`}
                        type="checkbox"
                        checked={s.isCompleted}
                        onChange={(event) => {
                          fetcher.submit(event.target.form);
                        }}
                        className="accent-purple-500"
                      />
                      <span className={cn(s.isCompleted && "line-through")}>
                        {s.title}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3 className="mt-6 text-body-md text-neutral-400 dark:text-white">
            Current Status
          </h3>
          <div className="relative mt-2">
            <Listbox
              value={column.id}
              name="board"
              onChange={(columnId) => {
                fetcher.submit({ columnId: columnId }, { method: "post" });
              }}
            >
              <Listbox.Button className="flex w-full items-center justify-between rounded-[0.25rem] border border-neutral-400 px-4 py-2 text-left text-body-lg hover:border-purple-500 ui-open:border-purple-500 dark:text-white">
                {column.name}
                <img src="/icon-chevron-down.svg" alt="" />
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-2 grid w-full gap-2 rounded-[0.25rem] bg-white p-4 dark:bg-neutral-700">
                {board.columns.map((column) => (
                  <Listbox.Option
                    key={column.id}
                    value={column.id}
                    className="cursor-pointer text-body-lg text-neutral-400 ui-active:text-purple-500"
                  >
                    {column.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </fetcher.Form>
      </article>
    </ModalBase>
  );
}

ViewTaskModal.loader = loader;
ViewTaskModal.action = action;
