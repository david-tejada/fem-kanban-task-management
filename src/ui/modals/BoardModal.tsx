import { useState } from "react";
import { Form } from "react-router-dom";
import { TBoard, TColumn } from "../../lib/types";
import { Input, Label } from "../forms/FormComponents";
import ModalBase from "./ModalBase";

export default function BoardModal({
  board,
  newColumn,
}: {
  board?: TBoard;
  newColumn?: boolean;
}) {
  if (newColumn && !board) {
    throw new Error(
      "Passing prop `newColumn` without passing prop `board` is not allowed.",
    );
  }

  const initialColumns = board
    ? newColumn
      ? [...board.columns, { id: crypto.randomUUID(), name: "", tasks: [] }]
      : board.columns
    : [];

  const [boardName, setBoardName] = useState(board?.name ?? "");
  const [columns, setColumns] = useState<TColumn[]>(initialColumns);

  function addColumn() {
    setColumns([...columns, { id: crypto.randomUUID(), name: "", tasks: [] }]);
  }

  function renameColumn(id: string, newName: string) {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, name: newName } : column,
      ),
    );
  }

  function deleteColumn(id: string) {
    setColumns(columns.filter((column) => column.id !== id));
  }

  return (
    <ModalBase focusLastInput={newColumn}>
      <Form method="post" className="mt-6 grid gap-6">
        <h2 className="text-heading-lg text-neutral-900 dark:text-white">
          {board ? "Edit Board" : "Add New Board"}
        </h2>
        <Label caption="Board Name">
          <Input
            name="name"
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={(value) => {
              setBoardName(value);
            }}
          />
        </Label>
        <Label caption="Board Columns">
          <ul className="grid gap-3">
            {columns.map((column, i) => (
              <li
                key={column.id}
                className="flex items-center gap-4 transition-transform"
              >
                <Input
                  name={`column:${column.id}`}
                  autofocus={column.name === "" && i === columns.length - 1}
                  value={column.name}
                  onChange={(value) => {
                    renameColumn(column.id, value);
                  }}
                />
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.parentElement?.classList.add(
                      "-translate-x-[150%]",
                    );
                    setTimeout(() => {
                      deleteColumn(column.id);
                    }, 150);
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
              addColumn();
            }}
            className="mt-3 w-full rounded-full bg-purple-500/10 py-2 text-body-lg font-bold text-purple-500 dark:bg-white"
          >
            <span aria-hidden="true">+ </span>Add New Column
          </button>
        </Label>
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
