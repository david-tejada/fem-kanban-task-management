import { useEffect, useState } from "react";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";
import { cn } from "./lib/utils";
import data from "./lib/data.json";
import Columns from "./ui/Columns";
import { IBoard } from "./lib/types";

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
