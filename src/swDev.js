export const swDev = () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((res) => console.log(res, "registered"))
    .catch((err) => console.log(err, "app can not register"));
};

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

export const showInstallPromotion = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log("add to home screen asked");
  } else {
    console.log("can not ask");
  }
};
