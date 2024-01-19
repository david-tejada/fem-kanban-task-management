import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./index.css";
import { getLastActiveBoard } from "./lib/boards.tsx";
import CreateBoardModal from "./routes/CreateBoardModal.tsx";
import DeleteBoardModal from "./routes/DeleteBoardModal.tsx";
import EditBoardModal from "./routes/EditBoardModal.tsx";
import Root from "./routes/Root.tsx";
import LastBoardModal from "./routes/LastBoardModal.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: async () => {
          const lastActiveBoard = await getLastActiveBoard();
          return redirect(`/boards/${lastActiveBoard.id}`);
        },
      },
      {
        path: "/boards/:boardId",
        element: <Root />,
        errorElement: <div className="p-4">There was some error.</div>,
        loader: Root.loader,
        id: "board",
        children: [
          {
            path: "/boards/:boardId/edit",
            element: <EditBoardModal />,
            action: EditBoardModal.action,
          },
          {
            path: "/boards/:boardId/new",
            element: <CreateBoardModal />,
            action: CreateBoardModal.action,
          },
          {
            path: "/boards/:boardId/delete",
            element: <DeleteBoardModal />,
            action: DeleteBoardModal.action,
          },
          {
            path: "/boards/:boardId/last",
            element: <LastBoardModal />,
            action: LastBoardModal.action,
          },
          {
            path: "/boards/:boardId/newColumn",
            element: <EditBoardModal newColumn={true} />,
            action: EditBoardModal.action,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
