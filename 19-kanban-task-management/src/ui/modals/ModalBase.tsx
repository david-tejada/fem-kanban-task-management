import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useCallback, useEffect } from "react";

type ModalProps = {
  focusLastInput?: boolean;
  children: React.ReactNode;
};

export default function ModalBase({ focusLastInput, children }: ModalProps) {
  const navigate = useNavigate();

  const dialogRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.target.getBoundingClientRect();
          entry.target.style.setProperty("--margin-left", `${-width / 2}px`);
          entry.target.style.setProperty("--margin-top", `${-height / 2}px`);
        }
      });
      observer.observe(node);
    }
  }, []);

  useEffect(() => {
    if (focusLastInput) {
      // This is for focusing the recently created column input when visiting
      // "/boards/:boardId/newColumn". Ideally we would do this using autoFocus,
      // which would be much simpler, but it only works the first time. I think
      // it's because we never close the modal and just navigate to a different
      // route.
      document
        .querySelector<HTMLInputElement>("#dialog ul > li:last-of-type > input")
        ?.focus();
    }
  }, [focusLastInput]);

  return (
    <Dialog
      open={true}
      onClose={() => {
        navigate("/");
      }}
      className="fixed inset-0 z-50"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        onClick={() => {
          navigate("/");
        }}
      />
      <div
        id="dialog"
        ref={(node) => {
          dialogRef(node);
        }}
        className="fixed left-1/2 top-1/2 ml-[var(--margin-left)] mt-[var(--margin-top)] max-h-[calc(100vh-2rem)] w-5/6 max-w-lg overflow-y-auto overflow-x-hidden rounded-md bg-white p-8"
      >
        {children}
      </div>
    </Dialog>
  );
}
