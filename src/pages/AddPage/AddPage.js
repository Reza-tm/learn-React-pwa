import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { db } from "../../db";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const sendPost = () => {
    if (!title.trim() || !description.trim() || !img.trim()) {
      alert("please enter valid data");
      return;
    }

    const dataForSend = {
      Title: title,
      Text: description,
      Image: img,
    };

    if ("ServiceWorker" in window && "SyncManager" in window) {
      console.log("sync event");
      navigator.serviceWorker.ready.then((sw) => {
        sw.sync.register("sync-new-posts");
        console.log("sync new post is ready");
        db.syncPost.put(dataForSend);
      });
    } else {
      console.log("internet event");
      fetch("https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app/Posts.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataForSend),
      });
    }
  };

  return (
    <div className="px-2">
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>Title</InputGroup.Text>
          <FormControl value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your title" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Description</InputGroup.Text>
          <FormControl
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your Description"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Image Url</InputGroup.Text>
          <FormControl value={img} onChange={(e) => setImg(e.target.value)} placeholder="Enter your Img url" />
        </InputGroup>
        <div className="d-grid gap-2">
          <Button onClick={() => sendPost()} variant="primary">
            Send Post
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPage;
