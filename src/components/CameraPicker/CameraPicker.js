import React, { useEffect, useRef, useState } from "react";

const CameraPicker = () => {
  const videoRef = useRef();
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        console.log();
        console.log(videoRef.current.srcObject);
        setIsCameraAvailable(true);
      })
      .catch((err) => {
        setIsCameraAvailable(false);
        console.log("camera error", err);
      });
  }, []);
  return (
    <div
      style={{
        display: isCameraAvailable ? "flex" : "none",
        width: "200px",
        marginRight: "auto",
        marginLeft: "auto",
        height: "200px",
        border: "3px solid #E9ECEF",
        overflow: "hidden",
        borderRadius: "150px",
        marginBottom: "13px",
      }}
    >
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default CameraPicker;
