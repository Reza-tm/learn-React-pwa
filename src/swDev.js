export const swDev = () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((res) => console.log(res, "registered"))
    .catch((err) => console.log(err, "app can not register"));
};

// let deferredPrompt;
// window.addEventListener("beforeinstallprompt", (event) => {
//   event.preventDefault();
//   deferredPrompt = event;
// });

// export const showInstallPromotion = () => {
//   console.log("install prompt fired");
//   if (deferredPrompt) {
//     console.log("add to home screen asked", deferredPrompt);
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then((result) => console.log(result.outCome));
//     deferredPrompt = null;
//   } else {
//     console.log("can not ask");
//   }
// };
