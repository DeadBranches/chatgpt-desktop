// const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar");


// import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main.js";
// // setup the titlebar main process
// setupTitlebar();

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function generateRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 90%)`;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      sandbox: false,
      // nodeIntegration: false,
      // contextIsolation: true,
      enableRemoteModule: true,
      // devTools: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

      // attach fullscreen(f11 and not 'maximized') && focus listeners
  // ***attachTitlebarToWindow(mainWindow);

  win.loadURL("http://chat.openai.com/");


  win.webContents.on("before-input-event", (event, input) => {
    if (input.control && input.key.toLowerCase() === "t") {
      event.preventDefault();
      createNewConversation();
    }
    if (input.control && input.key.toLowerCase() === "h") {
      event.preventDefault();
      win.webContents.send("toggleSidebar");
    }
  });
}

function createNewConversation() {
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  newWindow.loadURL("http://chat.openai.com/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
