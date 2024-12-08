import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6733592d00366a09b4ab"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";
