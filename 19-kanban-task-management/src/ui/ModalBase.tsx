import { useEffect, useRef } from "react";
import { useModalContext } from "../lib/hooks/useModalContext";
import { ModalState } from "../lib/types";

type ModalProps = {
  type: NonNullable<ModalState>;
  children: React.ReactNode;
};

export default function ModalBase({ type, children }: ModalProps) {
  const { modalState, setModalState } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modalState === type
      ? dialogRef.current?.showModal()
      : dialogRef.current?.close();
  }, [modalState, type]);

  if (modalState !== type) {
    return;
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setModalState(null)}
      className="w-[30rem] max-w-lg rounded-md p-8 backdrop:bg-translucent"
    >
      {children}
    </dialog>
  );
}
