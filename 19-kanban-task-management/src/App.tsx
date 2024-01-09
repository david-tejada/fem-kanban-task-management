import { useState } from "react";
import useLocalStorage from "./lib/hooks/useLocalStorage";
import Header from "./ui/Header";
import Navigation from "./ui/Navigation";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "sidebar-open",
    true,
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

      <main></main>
    </>
  );
}
