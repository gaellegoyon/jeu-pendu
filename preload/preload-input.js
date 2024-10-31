const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("inputAPI", {
  sendLetter: (letter) => ipcRenderer.send("send-letter", letter),
  windowLoaded: () => ipcRenderer.send("window-ready"),
});
