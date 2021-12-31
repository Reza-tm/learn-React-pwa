import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { db } from "../../db";
import { storage } from "../../services/firebase";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState();
  const [isFetched, setIsfetched] = useState(false);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  useEffect(() => {
    fetch("https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app/Posts.json")
      .then(() => setIsfetched(true))
      .catch(() => setIsfetched(false));
  }, []);

  const uploadFile = () => {
    if (file) {
      const uploadFile = ref(storage, `img/${file.name}`);
      uploadBytes(uploadFile, file).then((res) => getDownloadURL(ref(storage, `img/${file.name}`)).then((url) => setImg(url)));
    }
  };

  const sendPost = () => {
    if (!title.trim() || !description.trim() || !img.trim()) {
      alert("please enter valid data");
      return;
    }

    const dataForSend = {
      Title: title,
      Text: description,
      Image: img,
      id: new Date().toISOString(),
    };

    if ("ServiceWorker" in window && "SyncManager" in window) {
      console.log("sync event");
      const option = {
        body: "dont worry of You are offline ! your message will be send as soon as possible",
        icon: "/android/android-launchericon-96-96.png",
        image: dataForSend.Image,
        dir: "rtl",
        lang: "en-US",
        vibrate: [100, 50, 200],
        badge: "/android/android-launchericon-96-96.png",
        tag: "post-notification",
        renotify: true,
      };
      navigator.serviceWorker.ready
        .then((sw) => {
          sw.showNotification("Your post will be post ! 🥳", option);
          db.syncPost.put(dataForSend);
          sw.sync.register("sync-new-posts");
        })
        .then(() => {
          console.log("hi");

          setTitle("");
          setDescription("");
          setImg("");
          setFile("");
          setIsfetched("");
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
      }).then(() => {
        console.log("hi");
        setTitle("");
        setDescription("");
        setImg("");
        setFile("");
        setIsfetched("");
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
        {isFetched && (
          <>
            <p>OR</p>
            <InputGroup className="mb-3">
              <FormControl
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  uploadFile();
                }}
                placeholder="Enter your Img url"
              />
            </InputGroup>
          </>
        )}
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
