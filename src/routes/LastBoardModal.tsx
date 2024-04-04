import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { TBoard } from "../lib/types";
import ModalBase from "../ui/modals/ModalBase";

async function action() {
  return redirect(`..`);
}

export default function LastBoardModal() {
  const { board } = useRouteLoaderData("board") as { board: TBoard };

  return (
    <ModalBase>
      <Form method="post">
        <h2 className="text-heading-lg text-red-600">Error deleting board</h2>
        <p className="mt-6 text-body-lg text-neutral-400">
          Unable to delete board ‘{board.name}’ as there are no more boards.
          Create another board first if you want to delete this one.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="w-full rounded-full bg-purple-500/10 py-2 text-center text-body-lg font-bold text-purple-500"
          >
            Confirm
          </button>
        </div>
      </Form>
    </ModalBase>
  );
}

LastBoardModal.action = action;
