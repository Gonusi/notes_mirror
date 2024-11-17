export type Note = {
  id: number | null;
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
    isSignupDialogOpen: boolean;
  };
  user: {
    email: string | null;
    name: string | null;
    id: string | null;
  };
};
