import { useEffect, useState } from "react";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";
import { cn } from "./lib/utils";
import data from "./lib/data.json";
import Columns from "./ui/Columns";

export interface IBoard {
  name: string;
  columns: IColumn[];
}

export interface IColumn {
  name: string;
  tasks: (ITask | ITask)[];
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
}

export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

const boards: IBoard[] = data.boards;

export default function App() {
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
    </>
  );
}
