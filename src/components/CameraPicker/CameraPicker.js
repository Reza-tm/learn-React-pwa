import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { storage } from "../../services/firebase";
const CameraPicker = ({ imgUrlSetter, modal }) => {
  const [_, setModal] = modal;
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef();
  const capture = useCallback(() => {
    console.log("capture !");
    setModal(true);
    const imageSrc = webcamRef.current.getScreenshot();
    const id = new Date().toISOString() + ".png";
    const hello = dataURItoBlob(imageSrc);

    const uploadFile = ref(storage, `img/${id}`);
    uploadBytes(uploadFile, hello).then((res) =>
      getDownloadURL(ref(storage, `img/${id}`)).then((url) => {
        imgUrlSetter(url);
        setModal(false);
      })
    );
  }, [webcamRef, setImgSrc]);

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto",

        marginBottom: "13px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "200px",
          marginRight: "auto",
          marginLeft: "auto",
          overflow: "hidden",
          height: "200px",
          border: "3px solid #E9ECEF",
          borderRadius: "150px",
          marginBottom: "13px",
        }}
      >
        <Webcam ref={webcamRef} screenshotFormat="image/png" />
      </div>
      <button type="button" onClick={capture}>
        Capture photo
      </button>
    </div>
  );
};

export default CameraPicker;
