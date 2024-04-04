import {
  Form,
  Link,
  Params,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { deleteBoard, getBoards } from "../lib/boards";
import { TBoard } from "../lib/types";
import ModalBase from "../ui/modals/ModalBase";

async function action({ params }: { params: Params<"boardId"> }) {
  try {
    await deleteBoard(params.boardId!);
    const boards = await getBoards();
    return redirect(`/boards/${boards[0].id}`);
  } catch {
    return redirect(`/boards/${params.boardId!}/last`);
  }
}

export default function DeleteBoardModal() {
  const { board } = useRouteLoaderData("board") as { board: TBoard };
  const navigate = useNavigate();

  return (
    <ModalBase>
      <Form method="post">
        <h2 className="text-heading-lg text-red-600">Delete this board?</h2>
        <p className="mt-6 text-body-lg text-neutral-400">
          Are you sure you want to delete the ‘{board.name}’ board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="w-full rounded-full bg-red-600 py-2 text-body-lg font-bold text-white hover:bg-red-300"
          >
            Delete
          </button>
          <Link
            to={`/boards/${board.id}`}
            className="l w-full rounded-full bg-purple-500/10 py-2 text-center text-body-lg font-bold text-purple-500 hover:bg-purple-500/25 dark:bg-white dark:hover:bg-white"
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

DeleteBoardModal.action = action;
