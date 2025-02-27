// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

import "swiper/css";
import "swiper/css/pagination";
import "zmp-ui/zaui.css";
import "./css/tailwind.css";
import "./css/app.scss";

// tailwind
import "./css/styles.css";

// Import App Component
import App from "./components/app";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}
// Add CSS variables dynamically to the document
document.documentElement.style.setProperty('--main-color', appConfig.template.mainColor);
document.documentElement.style.setProperty('--main-color-1', appConfig.template.mainColor1);
document.documentElement.style.setProperty('--main-color-2', appConfig.template.mainBackground);
document.documentElement.style.setProperty('--main-color-3', appConfig.template.mainColor3);
document.documentElement.style.setProperty('--text-color-header', appConfig.template.textColorHeader);
document.documentElement.style.setProperty('--text-color-black', appConfig.template.backText);
document.documentElement.style.setProperty('--sub-text-color', appConfig.template.subTextColor);


// Mount React App
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(App));
