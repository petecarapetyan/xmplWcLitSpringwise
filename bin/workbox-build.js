const { injectManifest } = require("workbox-build");

const swSrc = "src/service-worker.js";
const swDest = "tmp/service-worker.js";

const buildServiceWorker = () => {
    injectManifest({
        swSrc,
        swDest,
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png}"]
    }).then(({ count, size }) => {
        console.log(
            `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
        );
    });
};

buildServiceWorker();
