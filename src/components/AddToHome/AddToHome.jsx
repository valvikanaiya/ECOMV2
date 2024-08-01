import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { SCWrapper } from "./AddToHome.style";
import CloseIcon from "@mui/icons-material/Close";

const AddToHome = () => {
  const wrapper = useRef();
  const handelHideButton = () => {
    wrapper.current.style.display = "none";
  };

  var deferredPrompt;
  const handelAppInstall = (event) => {
    console.log(event);
    event.preventDefault();
    deferredPrompt = event;
    const installButtonWrapper = document.querySelector(
      "#installButtonWrapper"
    );

    const installButton = document.querySelector("#installButton");

    if (installButton && installButton.style) {
      installButtonWrapper.style.display = "flex";
    }
    installButton.addEventListener("click", async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === "accepted") {
        installButtonWrapper.style.display = "none";
        console.log("User accepted the install prompt.");
      }
    });
  };
  const handelAppInstaled = () => {
    const installButtonWrapper = document.querySelector(
      "#installButtonWrapper"
    );
    installButtonWrapper.style.display = "none";
  };
  useEffect(() => {
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
      window.addEventListener("beforeinstallprompt", handelAppInstall);
      window.addEventListener("appinstalled", (event) => {
        handelAppInstaled(event);
      });
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", handelAppInstall);
      window.removeEventListener("appinstalled", handelAppInstaled);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SCWrapper ref={wrapper} id={"installButtonWrapper"}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component={"img"} src={"/Favicon.svg"}></Box>
        <Button id="installButton">
          <Typography
            color={"Highlight"}
            sx={{ fontWeight: 600, textTransform: "capitalize" }}>
            Add to home screen
          </Typography>
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={handelHideButton}
        sx={{
          width: "30px",
          p: 0,
          minWidth: "30px",
          height: "30px",
          borderRadius: "100%",
        }}>
        <CloseIcon />
      </Button>
    </SCWrapper>
  );
};

export default AddToHome;
