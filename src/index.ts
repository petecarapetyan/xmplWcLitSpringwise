import "./ui";
import {
  registerServiceWorker,
  showUpdateSnackbar,
} from "@victorycto/egg-lib";

if (location.hostname !== "localhost") {
  let updateRequested = false;
  registerServiceWorker({
    installed: (event) => {
      if (event.isUpdate) {
        if (!updateRequested) showUpdateSnackbar();
        updateRequested = true;
      }
    },
    message: (event) => {
      if (event.data.meta === "workbox-broadcast-update") {
        if (!updateRequested) showUpdateSnackbar();
        updateRequested = true;
      }
    },
    source: "/service-worker.js",
  });
}
