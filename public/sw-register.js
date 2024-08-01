if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js")
    .then((registration) => {
      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        console.log(
          "A new service worker is being installed:",
          installingWorker
        );
      });
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
} else {
  console.error("Service workers are not supported.");
}
