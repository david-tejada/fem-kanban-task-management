import useDarkMode from "./lib/hooks/useDarkMode";
import Header from "./ui/Header";

export default function App() {
  useDarkMode();
  return (
    <>
      <Header />
      <main></main>
    </>
  );
}
