import localforage from "localforage";
import defaultBoards from "./data";
import { IBoard, IColumn } from "./types";

export async function getBoards() {
  const boards =
    (await localforage.getItem<IBoard[]>("boards")) ?? defaultBoards;
  return boards;
}

export async function addBoard(board: IBoard) {
  const boards = await getBoards();
  await localforage.setItem("boards", [...boards, board]);
}

export async function getBoard(id: string) {
  const boards = await getBoards();
  const board = boards.find((board) => board.id === id);
  if (board) {
    await localforage.setItem("lastActiveBoardId", board.id);
  }
  return board;
}

export async function getLastActiveBoard() {
  const boards = await getBoards();
  const lastActiveBoardId = await localforage.getItem("lastActiveBoardId");
  const board = boards.find((board) => board.id === lastActiveBoardId);
  if (!board) {
    await localforage.setItem("lastActiveBoardId", boards[0].id);
    return boards[0];
  }
  return board;
}

export async function createBoard(
  id: string,
  name: string,
  columns: IColumn[],
) {
  const boards = await getBoards();
  const newBoard = { id, name, columns };
  await localforage.setItem("boards", [...boards, newBoard]);
  return newBoard;
}

export async function updateBoard(
  id: string,
  name: string,
  columns: { id: string; name: string }[],
) {
  const boards = await getBoards();
  const board = boards.find((board) => board.id === id);
  if (!board) {
    throw new Error("No board with the supplied id.");
  }

  board.name = name;
  board.columns = columns.map(({ id, name }) => ({
    id,
    name,
    tasks: board.columns.find((column) => column.id === id)?.tasks ?? [],
  }));

  console.log({ board });

  return localforage.setItem("boards", boards);
}
