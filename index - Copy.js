const { app, BrowserWindow, Menu, MenuItem, clipboard, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// async function showCustomDialog() {
//   const options = {
//     type: 'question',
//     buttons: ['Option 1', 'Option 2'],
//     title: 'Choose an option',
//     message: 'Select an option to copy to the clipboard:',
//   };

//   const result = await dialog.showMessageBox(null, options);
//   const selectedOption = options.buttons[result.response];

//   if (selectedOption) {
//     clipboard.writeText(selectedOption);
//   }
// }

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      devTools: false
    }
  })

  // Enable right-click context menu
  win.webContents.on('context-menu', (e, params) => {
    const menu = new Menu()

    // Add "Select All" option
    menu.append(new MenuItem({ label: 'Select All', role: 'selectAll' }))

    // Add "Copy" option
    menu.append(new MenuItem({ label: 'Copy', role: 'copy' }))

    // Add "Paste" option
    menu.append(new MenuItem({ label: 'Paste', role: 'paste' }))

    // Add "Take Screenshot" option
    menu.append(new MenuItem({ label: 'Take Screenshot', click: async () => {
      const screenshotPath = path.join(app.getPath('pictures'), 'screenshot.png')
      const image = await win.capturePage()
      fs.writeFile(screenshotPath, image.toPNG(), (err) => {
        if (err) throw err
        shell.showItemInFolder(screenshotPath)
      })
    } }))

    // Add "Save as JSON" option
    menu.append(new MenuItem({ label: 'Save as JSON', click: async () => {
      const data = await win.webContents.executeJavaScript('JSON.stringify(chatData)')
      const defaultPath = path.join(app.getPath('documents'), 'chatData.json')
      dialog.showSaveDialog({ defaultPath }, (filePath) => {
        if (filePath) {
          fs.writeFile(filePath, data, (err) => {
            if (err) throw err
          })
        }
      })
    } }))

    menu.append(
      new MenuItem({
        label: 'Copy Act',
        click: showActDialog,
    })
    );


    menu.popup()
  })

  win.loadURL('http://chat.openai.com/')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


async function showActDialog() {
  const promptsData = await fs.promises.readFile('prompts.json', 'utf-8');
  const prompts = JSON.parse(promptsData);

  const options = {
    type: 'question',
    buttons: prompts.map((prompt) => prompt.act),
    title: 'Choose an act',
    message: 'Select an act to copy to the clipboard:',
  };

  const result = await dialog.showMessageBox(null, options);
  const selectedAct = options.buttons[result.response];

  if (selectedAct) {
    clipboard.writeText(selectedAct);
  }
}
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
