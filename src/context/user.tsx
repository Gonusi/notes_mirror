import { ID, Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import Toast from "../features/Toast/Toast.tsx";

type Props = {
  children: React.ReactNode;
};

type UserContextType =
  | {
      current: Models.User<Models.Preferences> | null; // TODO this seems fishy, check real returned object?
      loginWithPassword: (email: string, password: string) => void;
      loginWithSecret: (email: string, secret: string) => void;
      logout: () => void;
      registerWithPassword: (email: string, password: string) => void;
      registerWithMagicURL: (email: string) => void;
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

  async function loginWithPassword(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
    } catch (e) {
      handleUnknownError(e);
    }
    const loggedIn = await account.get();
    setUser(loggedIn);
    Toast.success("You are now logged in");
  }

  async function loginWithSecret(userId: string, secret: string) {
    try {
      await account.createSession(userId, secret);
    } catch (e) {
      handleUnknownError(e);
    }
    const loggedIn = await account.get();
    setUser(loggedIn);
    Toast.success("You are now logged in");
    return true;
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function registerWithPassword(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await loginWithPassword(email, password);
    } catch (e: unknown) {
      handleUnknownError(e);
    }

    Toast.success("You are now logged in");
  }

  async function registerWithMagicURL(email: string) {
    const verifyURL = window.location.href.includes("localhost")
      ? "http://localhost:5173/verify"
      : "https://notesmirror.com/verify";
    try {
      await account.createMagicURLToken(ID.unique(), email, verifyURL);
      Toast.success(
        `Signed up successfully. Please check your email ${email} for the login link.`,
      );
    } catch (e: unknown) {
      handleUnknownError(e);
    }
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
    <UserContext.Provider
      value={{
        current: user,
        loginWithPassword,
        loginWithSecret,
        logout,
        registerWithMagicURL,
        registerWithPassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

const handleUnknownError = (e: unknown) => {
  if (e instanceof Error) {
    Toast.error(e.message);
  } else {
    Toast.error("An unexpected error occurred");
  }
};
