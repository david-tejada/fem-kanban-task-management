import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  focusLastInput?: boolean;
  children: React.ReactNode;
};

export default function ModalBase({ focusLastInput, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dialogRef.current?.showModal();
    if (focusLastInput) {
      // This is for focusing the recently created column input when visiting
      // "/boards/:boardId/newColumn". Ideally we would do this using autoFocus,
      // which would be much simpler, but because of this React bug we can't:
      // https://github.com/facebook/react/issues/23301
      dialogRef.current
        ?.querySelector<HTMLInputElement>("ul > li:last-of-type > input")
        ?.focus();
    }
  }, [focusLastInput]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        navigate("..");
      }}
      onClick={(event) => {
        if (event.target !== dialogRef.current) return;

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
      className="w-5/6 max-w-lg overflow-visible rounded-md p-8 backdrop:bg-translucent"
    >
      {children}
    </dialog>
  );
}
