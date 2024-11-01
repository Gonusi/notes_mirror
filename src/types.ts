export type Note = {
  id: number;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragInProgress: boolean;
};

export type RootState = {
  notes: Note[];
};
