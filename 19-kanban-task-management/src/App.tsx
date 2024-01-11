import { useEffect, useState } from "react";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";
import { cn } from "./lib/utils";
import defaultBoards from "./lib/data";
import Columns from "./ui/Columns";
import { BoardModal } from "./ui/BoardModal";
import { IBoard } from "./lib/types";

export default function App() {
  const [boards, setBoards] = useLocalStorage<IBoard[]>(
    "boards",
    defaultBoards,
  );
  const [modalAddBoard, setModalAddBoard] = useState(false);
  const [modalEditBoard, setModalEditBoard] = useState(false);
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
        openModalEditBoard={() => setModalEditBoard(true)}
      />
      <Navigation
        boards={boards}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        openModalAddBoard={() => setModalAddBoard(true)}
      />

      <main
        className={cn(
          "grid h-[calc(100vh-4.0625rem)] overflow-auto transition-all sm:h-[calc(100vh-4.75rem)]",
          isSidebarOpen && "sm:ml-60",
        )}
      >
        <Columns board={boards[0]} />
      </main>
      <BoardModal
        board={boards[0]}
        onSave={(board) => {
          setBoards(boards.map((b) => (b.id === board.id ? board : b)));
        }}
        isOpen={modalEditBoard}
        onCancel={() => {
          setModalEditBoard(false);
        }}
      />
      <BoardModal
        onSave={(board) => {
          setBoards([...boards, board]);
        }}
        isOpen={modalAddBoard}
        onCancel={() => {
          setModalAddBoard(false);
        }}
      />
    </>
  );
}
