const db = new Dexie("post-store");
db.version(1).stores({
  posts: "Title",
});
