import Dexie from "dexie";
export const db = new Dexie("post-store");
db.version(3).stores({
  posts: "Title",
  syncPost: "Title",
});
