import { useState } from "react";
import { ModalState } from "../lib/types";
import { ModalContext } from "../lib/hooks/useModalContext";

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalState, setModalState] = useState<ModalState>(null);

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalContext.Provider>
  );
}
