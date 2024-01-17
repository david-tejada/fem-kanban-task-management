import { Params, redirect, useRouteLoaderData } from "react-router-dom";
import { updateBoard } from "../lib/boards";
import { IBoard } from "../lib/types";
import BoardModal from "../ui/modals/BoardModal";

async function action({
  params,
  request,
}: {
  params: Params<"boardId">;
  request: Request;
}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const columns = Object.entries(data)
    .filter(([key]) => key.startsWith("column:"))
    .map(([key, value]) => {
      const [_, id] = key.split(":");

      return { id, name: value.toString() };
    });

  await updateBoard(params.boardId!, data.name.toString(), columns);
  return redirect("..");
}

export default function EditBoardModal() {
  const { board } = useRouteLoaderData("board") as { board: IBoard };
  return <BoardModal board={board} />;
}

EditBoardModal.action = action;
