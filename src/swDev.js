export const swDev = () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((res) => console.log(res, "registered"))
    .catch((err) => console.log(err, "app can not register"));
};
