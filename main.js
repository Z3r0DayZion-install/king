const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { routeModel } = require('./engine/modelRouter')
const { saveMessage } = require('./memory/sessionStore')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })
  win.loadFile('./renderer/index.html')
}

ipcMain.handle('send-message', async (_, message) => {
  const response = await routeModel(message)
  await saveMessage(message, response)
  return response
})

app.whenReady().then(createWindow)
