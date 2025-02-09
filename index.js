const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
let secondWindow;

function createNewWindow(file) {
    let win = new BrowserWindow({
        width: 400,
        height: 500,
        title: "Flip Me Love",
        frame: false,
        resizable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Ensure ipcRenderer works
        },
    });

    win.setMenuBarVisibility(false);
    win.loadFile(file);

    win.on('closed', () => {
        win = null;
    });

    return win;
}

app.whenReady().then(() => {
    mainWindow = createNewWindow('index.html');
});

ipcMain.on('open-second-window', () => {
    if (mainWindow) {
        setTimeout(() => {
            mainWindow.close(); // Wait for flip animation
            secondWindow = createNewWindow('menu.html');
        }, 600);
    } else {
        secondWindow = createNewWindow('menu.html');
    }
});

ipcMain.on('open-first-window', () => {
    if (mainWindow) {
        setTimeout(() => {
            secondWindow.close(); // Wait for flip animation
            secondWindow = createNewWindow('index.html');
        }, 600);
    } else {
        secondWindow = createNewWindow('index.html');
    }
});
