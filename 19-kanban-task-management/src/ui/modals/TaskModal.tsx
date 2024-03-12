import { useState } from "react";
import { Form } from "react-router-dom";
import { TBoard, TTask } from "../../lib/types";
import { Input, Label } from "../forms/FormComponents";
import ModalBase from "./ModalBase";
import { Listbox } from "@headlessui/react";

export default function TaskModal({
  board,
  task,
}: {
  board: TBoard;
  task?: TTask;
}) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [subtasks, setSubtasks] = useState(task?.subtasks ?? []);

  const initialColumn = task
    ? board.columns.find((c) => c.tasks.some((t) => t.id === task.id))!
    : board.columns[0];

  const [column, setColumn] = useState(initialColumn);

  function addSubtask() {
    setSubtasks([
      ...subtasks,
      { id: crypto.randomUUID(), title: "", isCompleted: false },
    ]);
  }

  function renameSubtask(id: string, newName: string) {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, title: newName } : subtask,
      ),
    );
  }

  function deleteSubtask(id: string) {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  }

  function updateColumn(id: string) {
    const newColumn = board.columns.find((c) => c.id === id)!;
    console.log({ newColumn });

    setColumn(newColumn);
  }

  return (
    <ModalBase>
      <Form method="post" className="mt-6 grid gap-6">
        <h2 className="text-heading-lg text-neutral-900 dark:text-white">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        <Label caption="Title">
          <Input
            name="title"
            placeholder="e.g. Take coffee break"
            value={title}
            onChange={(value) => {
              setTitle(value);
            }}
          />
        </Label>
        <Label caption="Description">
          <Input
            name="description"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
          />
        </Label>
        <Label caption="Subtasks">
          <ul className="grid gap-3">
            {subtasks.map((subtask, i) => (
              <li key={subtask.id} className="flex items-center gap-4">
                <Input
                  name={`subtask:${subtask.id}`}
                  autofocus={subtask.title === "" && i === subtasks.length - 1}
                  value={subtask.title}
                  onChange={(value) => {
                    renameSubtask(subtask.id, value);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    deleteSubtask(subtask.id);
                  }}
                >
                  <img src="/icon-cross.svg" alt="" className="max-w-none" />
                  <span className="sr-only">Delete column</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              addSubtask();
            }}
            className="mt-3 w-full rounded-full bg-purple-500/10 py-2 text-body-lg font-bold text-purple-500 dark:bg-white"
          >
            <span aria-hidden="true">+ </span>Add New Subtask
          </button>
        </Label>
        <h3 className="mt-6 text-body-md text-neutral-400">Current Status</h3>
        <input type="text" name="columnId" value={column.id} hidden readOnly />
        <div className="relative mt-2">
          <Listbox
            value={column.id}
            name="board"
            onChange={(columnId) => {
              console.log(`onChange: ${columnId}`);
              updateColumn(columnId);
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
        <button
          type="submit"
          className="w-full rounded-full bg-purple-500 py-2 text-body-lg font-bold text-white"
        >
          Save changes
        </button>
      </Form>
    </ModalBase>
  );
}