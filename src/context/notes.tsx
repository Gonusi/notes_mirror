import { createContext, useCallback, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type Note = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Notes = { [id: string]: Note };

type NotesContextType = {
  notes: Notes;
  updateNote: (note: Note) => void;
  createNote: (note: Note) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("Notes context must be used within Notes provider.");
  }

  return context;
}

export function NotesProvider(props: Props) {
  const [notes, setNotes] = useState<Notes>({});

  const createNote = useCallback((note: Note) => {
    setNotes((prev) => ({ ...prev, [note.id]: note }));
  }, []);

  const updateNote = useCallback((note: Note) => {
    setNotes((prev) => ({ ...prev, [note.id]: note }));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[id];
      return newNotes;
    });
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, createNote, updateNote, deleteNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
