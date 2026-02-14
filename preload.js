const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  sendMessage: (message) => ipcRenderer.invoke('send-message', message)
})