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
import ColumnSelect from "../ui/ColumnSelect";

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
    <div>
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
                  Subtasks ({task.subtasks.filter((s) => s.isCompleted).length}{" "}
                  of {task.subtasks.length})
                </h3>
                <ul className="mt-4 grid gap-2">
                  {task.subtasks.map((s) => (
                    <li
                      key={s.id}
                      className={cn(
                        `relative bg-blue-100 p-3 text-neutral-900 hover:bg-purple-500/25 dark:bg-neutral-800 dark:text-white`,
                        s.isCompleted &&
                          "text-opacity-50 dark:text-neutral-400",
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
            <div className="relative mt-2 w-[inherit]">
              <ColumnSelect
                columns={board.columns}
                selectedColumn={column}
                onChange={(columnId) => {
                  fetcher.submit({ columnId: columnId }, { method: "post" });
                }}
              />
            </div>
          </fetcher.Form>
        </article>
      </ModalBase>
    </div>
  );
}

ViewTaskModal.loader = loader;
ViewTaskModal.action = action;
