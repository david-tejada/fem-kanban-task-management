import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  children: React.ReactNode;
};

export default function ModalBase({ children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        navigate("..");
      }}
      onClick={(event) => {
        const rect = dialogRef.current!.getBoundingClientRect();

        if (
          event.clientY < rect.top ||
          event.clientY > rect.bottom ||
          event.clientX < rect.left ||
          event.clientX > rect.right
        ) {
          dialogRef.current?.close();
        }
      }}
      className="w-5/6 max-w-lg rounded-md p-8 backdrop:bg-translucent"
    >
      {children}
    </dialog>
  );
}
