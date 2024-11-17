import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { databases } from "../appwrite.ts";
import { ID, Query } from "appwrite";
import { useUser } from "./user.tsx";

type Props = {
  children: React.ReactNode;
};

export type Note = {
  $createdAt: string;
  $id: string;
  body: string;
  height: number;
  title: string;
  width: number;
  x: number;
  y: number;
  userId: string;
};

type Notes = Note[];

type NotesContextType = {
  notes: Notes;
  updateNote: (note: Note) => void;
  createNote: (note: Note) => void;
  deleteNote: ($id: string) => void;
};

export const IDEAS_DATABASE_ID = "main";
export const IDEAS_COLLECTION_ID = "notes";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("Notes context must be used within Notes provider.");
  }

  return context;
}

export function NotesProvider(props: Props) {
  const { current } = useUser();

  const [notes, setNotes] = useState<Notes>([]);

  const createNote = useCallback(async (newNote: Note) => {
    if (!current) return;

    // Optimistic, need to handle failure of creation, possibly saying that there are unsaved changes (because we'll have `temp-` in $id field for some notes then
    const { $id, ...newNoteWithoutId } = newNote;
    setNotes((prevNotes) => [...prevNotes, newNote]);

    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      newNoteWithoutId,
    );

    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      const updatedNoteIndex = newNotes.findIndex((note) => note.$id === $id);
      newNotes[updatedNoteIndex] = {
        ...newNotes[updatedNoteIndex],
        $id: response.$id,
      };
      return newNotes;
    });
  }, []);

  const updateNote = useCallback((updatedNote: Note) => {
    if (!current) return;

    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      const noteIndex = newNotes.findIndex(
        (note) => note.$id === updatedNote.$id,
      );

      newNotes[noteIndex] = updatedNote;
      return newNotes;
    });
  }, []);

  const deleteNote = useCallback(($id: string) => {
    if (!current) return;

    setNotes((prevNotes) => prevNotes.filter((note) => note.$id != $id));
  }, []);

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)],
    );
    setNotes(response.documents as unknown as Notes); // TODO is there a better way to type the incoming Document? Is it a generic type?
  }

  useEffect(() => {
    if (!current) {
      setNotes([]);
      return;
    }

    init();
  }, [current?.$id]);

  // TODO useEffect and on notes state change sync it to DB? But I'll need to ensure init does not do that, possibly storing a flat

  return (
    <NotesContext.Provider
      value={{ notes, createNote, updateNote, deleteNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
