export interface DBBoard {
  id: string;
  name: string;
}

export interface DBColumn {
  id: string;
  boardId: string;
  name: string;
}

export interface DBTask {
  id: string;
  columnId: string;
  title: string;
  description: string;
  status: string;
}

export interface DBSubtask {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
}

export type TBoard = DBBoard & {
  columns: TColumn[];
};

export type TColumn = Omit<DBColumn, "boardId"> & {
  tasks: TTask[];
};

export type TTask = Omit<DBTask, "columnId"> & {
  subtasks: TSubtask[];
};

type TSubtask = Omit<DBSubtask, "taskId">;

export type ModalState = null | "addBoard" | "editBoard";
