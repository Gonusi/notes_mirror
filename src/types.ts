export type Note = {
  id: number;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RootState = {
  notes: Note[];
  ui: {
    isLoginDialogOpen: boolean;
  };
};
