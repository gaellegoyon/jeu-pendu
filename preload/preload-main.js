const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gameAPI", {
  save: (gameData) => ipcRenderer.send("file:save", gameData),
  load: () => ipcRenderer.invoke("file:load"),
  win: () => ipcRenderer.send("notification:win"),
  lose: () => ipcRenderer.send("notification:lose"),
  windowLoaded: () => ipcRenderer.send("window-ready"),
  onLetterReceived: (callback) =>
    ipcRenderer.on("display-letter", (event, letter) => callback(letter)),
});
