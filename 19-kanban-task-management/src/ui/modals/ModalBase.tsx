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
      className="w-5/6 max-w-lg rounded-md p-8 backdrop:bg-translucent"
    >
      {children}
    </dialog>
  );
}
