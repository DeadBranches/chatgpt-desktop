// import { Titlebar } from "custom-electron-titlebar";
// import { contextBridge, ipcRenderer } from "electron";

import { Titlebar, setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar";
import { contextBridge, ipcRenderer, remote } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  // Title bar implementation
  new Titlebar();
  setupTitlebar();
  attachTitlebarToWindow(remote.getCurrentWindow());
});



// window.addEventListener("DOMContentLoaded", () => {
//   // Title bar implementation
//   new Titlebar();
// });

const api = {
  getLatestBotResponse: () => {
    const latestBotResponse = document.querySelector(
      "div.group.w-full.text-gray-800.dark:text-gray-100.border-b.border-black/10.dark:border-gray-900/50.bg-gray-50.dark:bg-[#444654]"
    );
    return latestBotResponse ? latestBotResponse.innerText : null;
  },

  getModelVersion: () => {
    const modelVersionElement = document.querySelector(
      "div.flex.w-full.items-center.justify-center.gap-1.border-b.border-black/10.bg-gray-50.p-3.text-gray-500.dark:border-gray-900/50.dark:bg-gray-700.dark:text-gray-300"
    );
    return modelVersionElement ? modelVersionElement.innerText : null;
  },
};

contextBridge.exposeInMainWorld("electronAPI", api);
