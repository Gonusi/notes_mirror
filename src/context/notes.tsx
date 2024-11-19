import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { databases } from "../appwrite.ts";
import { ID, Permission, Query, Role } from "appwrite";
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

export const DB_ID = "main";
export const COLLECTION_ID = "notes";

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

  const createNote = useCallback(
    async (newNote: Note) => {
      if (!current) return;

      // Optimistic, need to handle failure of creation, possibly saying that there are unsaved changes (because we'll have `temp-` in $id field for some notes then
      const { $id, ...newNoteWithoutId } = newNote;
      setNotes((prevNotes) => [...prevNotes, newNote]);

      const response = await databases.createDocument(
        DB_ID,
        COLLECTION_ID,
        ID.unique(),
        newNoteWithoutId,
        [
          Permission.write(Role.user(current.$id)),
          Permission.read(Role.user(current.$id)),
        ],
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
    },
    [current],
  );

  const updateNote = useCallback(
    async (updatedNote: Note) => {
      if (!current) return;

      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        const noteIndex = newNotes.findIndex(
          (note) => note.$id === updatedNote.$id,
        );

        newNotes[noteIndex] = updatedNote;
        return newNotes;
      });

      const submittableNote = Object.fromEntries(
        Object.entries(updatedNote).filter(([key]) => !key.startsWith("$")),
      );
      await databases.updateDocument(
        DB_ID,
        COLLECTION_ID,
        updatedNote.$id,
        submittableNote,
      );
    },
    [current],
  );

  const deleteNote = useCallback(
    async ($id: string) => {
      if (!current) return;

      setNotes((prevNotes) => prevNotes.filter((note) => note.$id != $id)); // TODO Note this is now optimistic, I could move it below to make it not, consider
      await databases.deleteDocument(DB_ID, COLLECTION_ID, $id);
      await init();
    },
    [current],
  );

  async function init() {
    const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.limit(10),
    ]);
    setNotes(response.documents as unknown as Notes);
  }

  useEffect(() => {
    if (!current) {
      setNotes([]);
      return;
    }

    init();
  }, [current?.$id]);

  return (
    <NotesContext.Provider
      value={{ notes, createNote, updateNote, deleteNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
