// Modules to control application life and create native browser window
const { initialize, enable } = require('@electron/remote/main');
const { app, BrowserWindow } = require('electron');
const path = require('path');

initialize();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  enable(win.webContents);
  
  win.loadURL("http://chat.openai.com/");
}

app.whenReady().then(() => {
  createWindow();
})