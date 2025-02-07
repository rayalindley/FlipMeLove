const{app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);
