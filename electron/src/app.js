const path = require("path");
const url = require("url");

const {app, BrowserWindow} = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: "Use-IT Token Companies",
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../build/favicon.ico"),
        webPreferences: {
            nodeIntegration: true
        }
    });

    win
        .loadURL(`file://${path.join(__dirname, "../build/index.html")}`)
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});