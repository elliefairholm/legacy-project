export interface IinputsType {
  name?: string;
  email: string;
  password: string;
  [key: string]: string | undefined;
}

export interface IChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IUser {
  name: string;
}

export interface ITopic {
  id: string;
  rowNumber: number;
  title: string;
}

export interface IRowsData {
  [keys: string]: ITopic[]
}
