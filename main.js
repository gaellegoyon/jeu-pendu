const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let inputWindow;

function createWindows() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload", "preload-main.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  inputWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload", "preload-input.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src", "index.html"));
  inputWindow.loadFile(path.join(__dirname, "src", "input.html"));

  ipcMain.on("window-ready", (event) => {
    if (mainWindow && inputWindow) {
      mainWindow.webContents.send("ready-for-connection", "main");
      inputWindow.webContents.send("ready-for-connection", "input");
    }
  });
}

app.whenReady().then(createWindows);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

ipcMain.on("file:save", (event, gameData) => {
  fs.writeFileSync("save.json", JSON.stringify(gameData));
});

ipcMain.handle("file:load", async () => {
  try {
    const data = fs.readFileSync("save.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
});

ipcMain.on("notification:win", () => {
  new Notification({
    title: "Victoire !",
    body: "Félicitations, vous avez gagné !",
  }).show();
});

ipcMain.on("notification:lose", () => {
  new Notification({
    title: "Perdu !",
    body: "Dommage, essayez encore !",
  }).show();
});

ipcMain.on("send-letter", (event, letter) => {
  if (mainWindow) {
    mainWindow.webContents.send("display-letter", letter);
  }
});
