import { Params, redirect, useRouteLoaderData } from "react-router-dom";
import { TTask } from "../lib/types";
import TaskModal from "../ui/modals/TaskModal";
import { updateSubtasks, updateTask } from "../lib/boards";

async function action({
  params,
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

  await updateTask(
    params.taskId!,
    data.title.toString(),
    data.description.toString(),
  );
  await updateSubtasks(params.taskId!, subtasks);

  return redirect("/");
}

export default function EditTaskModal() {
  const { task } = useRouteLoaderData("task") as {
    task: TTask;
  };

  return <TaskModal task={task} />;
}

EditTaskModal.action = action;
