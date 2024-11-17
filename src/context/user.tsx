import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

type Props = {
  children: React.ReactNode;
};

type UserContextType =
  | {
      current: Models.User<Models.Preferences> | null; // TODO this seems fishy, check real returned object?
      login: (email: string, password: string) => void;
      logout: () => void;
      register: (email: string, password: string) => void;
    }
  | undefined;

const UserContext = createContext<UserContextType>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Notes context must be used within Notes provider.");
  }

  return context;
}

export function UserProvider(props: Props) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    const loggedIn = await account.get();
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email: string, password: string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
