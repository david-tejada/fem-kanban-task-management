import {
  Form,
  Link,
  Params,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { deleteTask } from "../lib/boards";
import { TBoard, TTask } from "../lib/types";
import ModalBase from "../ui/modals/ModalBase";

async function action({ params }: { params: Params<"boardId" | "taskId"> }) {
  await deleteTask(params.taskId!);

  return redirect(`/boards/${params.boardId!}`);
}

export default function DeleteTaskModal() {
  const { board, task } = useRouteLoaderData("task") as {
    board: TBoard;
    task: TTask;
  };
  const navigate = useNavigate();

  return (
    <ModalBase>
      <Form method="post">
        <h2 className="text-heading-lg text-red-600">Delete this task?</h2>
        <p className="mt-6 text-body-lg text-neutral-400">
          Are you sure you want to delete the ‘{task.title}’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="w-full rounded-full bg-red-600 py-2 text-body-lg font-bold text-white"
          >
            Delete
          </button>
          <Link
            to={`/boards/${board.id}`}
            className="w-full rounded-full bg-purple-500/10 py-2 text-center text-body-lg font-bold text-purple-500"
            onKeyDown={(event) => {
              if (event.key === " ") {
                navigate(`/boards/${board.id}`);
              }
            }}
          >
            Cancel
          </Link>
        </div>
      </Form>
    </ModalBase>
  );
}

DeleteTaskModal.action = action;
