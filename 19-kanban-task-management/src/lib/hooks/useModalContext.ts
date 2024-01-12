import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { ModalState } from "../types";

type TModalContext = {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
};

export const ModalContext = createContext<TModalContext | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  }

  return context;
}
