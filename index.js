const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')
const fs = require('fs')
const { shell } = require('electron')
const { dialog } = require('electron')

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

    menu.popup()
  })

  win.loadURL('http://chat.openai.com/')
}

app.whenReady().then(() => {
  createWindow()

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Select all', role: 'selectAll' },
    { label: 'Copy', role: 'copy' },
    { label: 'Paste', role: 'paste' },
    { label: 'Take Screenshot', click: takeScreenshot },
    { label: 'Save as json', click: saveAsJson }
  ])

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// const { app, Menu, MenuItem } = require('electron')

// app.on('browser-window-created', (event, win) => {
//   win.webContents.on('context-menu', (e, params) => {
//     const menu = new Menu()
//     menu.append(new MenuItem({ label: 'Inspect Element', click: () => { win.webContents.inspectElement(params.x, params.y) } }))
//     menu.popup()
//   })
// })
