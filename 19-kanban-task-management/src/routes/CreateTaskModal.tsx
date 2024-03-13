import { Params, redirect, useRouteLoaderData } from "react-router-dom";
import { TBoard } from "../lib/types";
import TaskModal from "../ui/modals/TaskModal";
import { createTask } from "../lib/boards";

async function action({
  request,
}: {
  params: Params<"taskId">;
  request: Request;
}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const subtasks = Object.entries(data)
    .filter(([key]) => key.startsWith("subtask:"))
    .map(([key, value]) => {
      const [_, id] = key.split(":");

      return { id, title: value.toString() };
    });

  await createTask(
    data.columnId.toString(),
    data.title.toString(),
    data.description.toString(),
    subtasks,
  );

  return redirect("..");
}

export default function CreateTaskModal() {
  const { board } = useRouteLoaderData("board") as {
    board: TBoard;
  };

  return <TaskModal board={board} />;
}

CreateTaskModal.action = action;
