import { redirect } from "react-router-dom";
import { createBoard } from "../lib/boards";
import BoardModal from "../ui/modals/BoardModal";

async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const columns = Object.entries(data)
    .filter(([key]) => key.startsWith("column:"))
    .map(([key, value]) => {
      const [_, id] = key.split(":");

      return { id, name: value.toString() };
    });

  const board = await createBoard(
    crypto.randomUUID(),
    data.name.toString(),
    columns,
  );
  return redirect(`/boards/${board.id}`);
}

export default function CreateBoardModal() {
  return <BoardModal />;
}

CreateBoardModal.action = action;
