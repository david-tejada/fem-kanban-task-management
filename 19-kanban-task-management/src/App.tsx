import { useEffect, useState } from "react";
import defaultBoards from "./lib/data";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import { IBoard } from "./lib/types";
import { cn } from "./lib/utils";
import Columns from "./ui/Columns";
import Header from "./ui/Header";
import ModalContextProvider from "./ui/ModalContextProvider";
import Navigation from "./ui/Navigation";
import { BoardModal } from "./ui/forms/BoardModal";

export default function App() {
  const [boards, setBoards] = useLocalStorage<IBoard[]>(
    "boards",
    defaultBoards,
  );
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
    <ModalContextProvider>
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
        <Columns board={boards[0]} />
      </main>
      <BoardModal
        key={boards[0].id}
        board={boards[0]}
        onSave={(board) => {
          setBoards(boards.map((b) => (b.id === board.id ? board : b)));
        }}
      />
      <BoardModal
        onSave={(board) => {
          setBoards([...boards, board]);
        }}
      />
    </ModalContextProvider>
  );
}
