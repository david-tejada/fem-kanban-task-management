import { useEffect, useRef } from "react";
import { SetModalState } from "../lib/types";

type ModalProps = {
  isOpen: boolean;
  setModalState: SetModalState;
  children: React.ReactNode;
};

export default function Modal({ isOpen, setModalState, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setModalState(null)}
      className="backdrop:bg-translucent w-[30rem] max-w-lg rounded-md p-8"
    >
      {children}
    </dialog>
  );
}
