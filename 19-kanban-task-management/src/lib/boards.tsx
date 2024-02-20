import localforage from "localforage";
import defaultBoards from "./data";
import { DBBoard, DBColumn, DBSubtask, DBTask } from "./types";

async function populateBoards() {
  const boards: DBBoard[] = [];
  const columns: DBColumn[] = [];
  const tasks: DBTask[] = [];
  const subtasks: DBSubtask[] = [];

  for (const board of defaultBoards) {
    boards.push({ id: board.id, name: board.name });
    for (const column of board.columns) {
      columns.push({ id: column.id, boardId: board.id, name: column.name });
      for (const task of column.tasks) {
        tasks.push({
          id: task.id,
          columnId: column.id,
          title: task.title,
          description: task.description,
          status: task.status,
        });
        for (const subtask of task.subtasks) {
          subtasks.push({
            id: subtask.id,
            taskId: task.id,
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          });
        }
      }
    }
  }

  await Promise.all([
    localforage.setItem("boards", boards),
    localforage.setItem("columns", columns),
    localforage.setItem("tasks", tasks),
    localforage.setItem("subtasks", subtasks),
  ]);
}

export async function getBoards() {
  let boards = await localforage.getItem<DBBoard[]>("boards");

  if (!boards) {
    await populateBoards();
    boards = (await localforage.getItem("boards")) as DBBoard[];
  }

  return Promise.all(
    boards.map(async (b) => ({
      id: b.id,
      name: b.name,
      columns: await getColumns(b.id),
    })),
  );
}

export async function getBoard(id: string) {
  const boards = await getBoards();
  const board = boards.find((board) => board.id === id);

  if (!board) {
    return undefined;
  }

  await localforage.setItem("lastActiveBoardId", board.id);

  return {
    id: board.id,
    name: board.name,
    columns: await getColumns(board.id),
  };
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
  columns: { id: string; name: string }[],
) {
  const boards = await getBoards();
  const newBoard = { id, name };
  await localforage.setItem("boards", [...boards, newBoard]);

  const storedColumns = (await localforage.getItem("columns")) as DBColumn[];
  await localforage.setItem("columns", [
    ...storedColumns,
    ...columns.map((c) => ({ id: c.id, boardId: id, name: c.name })),
  ]);

  return newBoard;
}

export async function updateBoard(id: string, name: string) {
  const boards = await getBoards();
  const board = boards.find((board) => board.id === id);

  if (!board) {
    throw new Error("No board with the supplied id.");
  }

  board.name = name;

  return localforage.setItem("boards", boards);
}

export async function deleteBoard(id: string) {
  const boards = await getBoards();

  if (boards.length === 1) {
    throw new Error("Error trying to delete last board.");
  }

  const updatedBoards = boards.filter((board) => board.id !== id);
  await localforage.setItem("boards", updatedBoards);
}

export async function getColumns(boardId: string) {
  const columns = (await localforage.getItem("columns")) as DBColumn[];

  return Promise.all(
    columns
      .filter((c) => c.boardId === boardId)
      .map(async (c) => ({
        id: c.id,
        name: c.name,
        tasks: await getTasks(c.id),
      })),
  );
}

export async function getColumn(id: string) {
  const columns = (await localforage.getItem("columns")) as DBColumn[];
  return columns.find((c) => c.id === id);
}

export async function updateColumns(
  boardId: string,
  newColumns: { id: string; name: string }[],
) {
  let columns = (await localforage.getItem("columns")) as DBColumn[];

  // Delete the columns that are not included in the update, since those would
  // have been deleted.
  const newColumnsIds = newColumns.map((c) => c.id);
  const columnsToDelete = columns
    .filter((c) => c.boardId === boardId && !newColumnsIds.includes(c.id))
    .map((c) => c.id);
  columns = columns.filter((c) => !columnsToDelete.includes(c.id));

  for (const { id, name } of newColumns) {
    const column = columns.find((c) => c.id === id);
    if (column) {
      column.name = name;
    } else {
      columns.push({ id, boardId, name });
    }
  }

  return localforage.setItem("columns", columns);
}

export async function getTasks(columnId: string) {
  const tasks = (await localforage.getItem("tasks")) as DBTask[];
  return Promise.all(
    tasks
      .filter((t) => t.columnId === columnId)
      .map(async (t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: t.status,
        subtasks: await getSubtasks(t.id),
      })),
  );
}

export async function getTask(taskId: string) {
  const tasks = (await localforage.getItem("tasks")) as DBTask[];
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return undefined;
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    subtasks: await getSubtasks(task.id),
  };
}

export async function getSubtasks(taskId: string) {
  const subtasks = (await localforage.getItem("subtasks")) as DBSubtask[];
  return subtasks
    .filter((s) => s.taskId === taskId)
    .map((s) => ({
      id: s.id,
      title: s.title,
      isCompleted: s.isCompleted,
    }));
}

export async function updateCompletedSubtasks(
  taskId: string,
  completedIds: string[],
) {
  const subtasks = (await localforage.getItem("subtasks")) as DBSubtask[];
  const filtered = subtasks.filter((s) => s.taskId === taskId);

  for (const subtask of filtered) {
    subtask.isCompleted = completedIds.includes(subtask.id);
  }

  await localforage.setItem("subtasks", subtasks);
}

export async function updateTaskColumn(taskId: string, columnId: string) {
  const tasks = (await localforage.getItem("tasks")) as DBTask[];
  const task = tasks.find((t) => t.id === taskId);
  task!.columnId = columnId;
  await localforage.setItem("tasks", tasks);
}
