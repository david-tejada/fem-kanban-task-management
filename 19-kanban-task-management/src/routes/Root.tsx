import { useEffect, useState } from "react";
import { Outlet, Params, useLoaderData } from "react-router-dom";
import { getBoard, getBoards } from "../lib/boards";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { TBoard } from "../lib/types";
import { cn } from "../lib/utils";
import Header from "../ui/Header";
import Navigation from "../ui/Navigation";
import Board from "../ui/Board";

async function loader({ params }: { params: Params<"boardId"> }) {
  const boards = await getBoards();
  const board = params.boardId ? await getBoard(params.boardId) : undefined;
  return { boards, board: board };
}

export default function Root() {
  const { boards } = useLoaderData() as {
    boards: TBoard[];
  };
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "sidebar-open",
    true,
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    });
  }, []);

  return (
    <>
      <Header
        isSidebarOpen={isSidebarOpen}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <Navigation
        boards={boards}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main
        className={cn(
          "grid h-[calc(100vh-4.0625rem)] overflow-auto transition-all sm:h-[calc(100vh-4.75rem)]",
          isSidebarOpen && "sm:ml-60",
        )}
      >
        <Board />
      </main>
      <Outlet />
    </>
  );
}

Root.loader = loader;
