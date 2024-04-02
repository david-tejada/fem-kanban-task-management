import { autoUpdate, useFloating, flip } from "@floating-ui/react";
import { Listbox } from "@headlessui/react";
import { useCallback, useRef } from "react";

type ColumnSelectProps = {
  columns: { id: string; name: string }[];
  selectedColumn: { id: string; name: string };
  onChange(value: string): void;
};

export default function ColumnSelect({
  columns,
  selectedColumn,
  onChange,
}: ColumnSelectProps) {
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
    strategy: "fixed",
  });

  // This is to adjust the width of the listbox options to match the listbox
  // button. It's a bit cumbersome but it's the only way I have found to do it
  // since we are using position fixed for the select options.
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const selectOptionsRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const selectButton = listboxRef.current?.querySelector("#selectButton");

      if (selectButton) {
        node?.style.setProperty(
          "--select-width",
          `${selectButton.getBoundingClientRect().width}px`,
        );
      }
    }
  }, []);

  return (
    <Listbox
      as="div"
      ref={listboxRef}
      value={selectedColumn.id}
      name="board"
      onChange={(columnId) => {
        onChange(columnId);
      }}
    >
      <Listbox.Button
        id="selectButton"
        ref={refs.setReference}
        className="flex w-full items-center justify-between rounded-[0.25rem] border border-neutral-400 px-4 py-2 text-left text-body-lg hover:border-purple-500 ui-open:border-purple-500 dark:text-white"
      >
        {selectedColumn.name}
        <img src="/icon-chevron-down.svg" alt="" />
      </Listbox.Button>
      <Listbox.Options
        id="selectOptions"
        ref={(node) => {
          refs.setFloating(node);
          selectOptionsRef(node);
        }}
        style={floatingStyles}
        className="z-10 grid w-[var(--select-width)] gap-2 rounded-[0.25rem] bg-white p-4 dark:bg-neutral-700"
      >
        {columns.map((column) => (
          <Listbox.Option
            key={column.id}
            value={column.id}
            className="w-full cursor-pointer text-body-lg text-neutral-400 ui-active:text-purple-500"
          >
            {column.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
