import { Params, redirect, useRouteLoaderData } from "react-router-dom";
import { updateBoard, updateColumns } from "../lib/boards";
import { TBoard } from "../lib/types";
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

  await updateBoard(params.boardId!, data.name.toString());
  await updateColumns(params.boardId!, columns);
  return redirect("..");
}

export default function EditBoardModal({ newColumn }: { newColumn?: boolean }) {
  const { board } = useRouteLoaderData("board") as { board: TBoard };
  return <BoardModal board={board} newColumn={newColumn} />;
}

EditBoardModal.action = action;
