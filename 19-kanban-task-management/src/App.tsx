import { useEffect, useState } from "react";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";
import { cn } from "./lib/utils";
import defaultBoards from "./lib/data";
import Columns from "./ui/Columns";
import { IBoard, ModalState } from "./lib/types";
import Modal from "./ui/Modal";
import { BoardForm } from "./ui/forms/BoardForm";

export default function App() {
  const [boards, setBoards] = useLocalStorage<IBoard[]>(
    "boards",
    defaultBoards,
  );
  const [modalState, setModalState] = useState<ModalState>(null);
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
        setModalState={(value) => setModalState(value)}
      />
      <Navigation
        boards={boards}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setModalState={(value) => setModalState(value)}
      />

      <main
        className={cn(
          "grid h-[calc(100vh-4.0625rem)] overflow-auto transition-all sm:h-[calc(100vh-4.75rem)]",
          isSidebarOpen && "sm:ml-60",
        )}
      >
        <Columns board={boards[0]} />
      </main>
      <Modal
        isOpen={modalState === "editBoard"}
        setModalState={(value) => setModalState(value)}
      >
        <BoardForm
          key={boards[0].id}
          board={boards[0]}
          onSave={(board) => {
            setBoards(boards.map((b) => (b.id === board.id ? board : b)));
            setModalState(null);
          }}
        />
      </Modal>
      <Modal
        isOpen={modalState === "addBoard"}
        setModalState={(value) => setModalState(value)}
      >
        <BoardForm
          onSave={(board) => {
            setBoards([...boards, board]);
            setModalState(null);
          }}
        />
      </Modal>
    </>
  );
}
