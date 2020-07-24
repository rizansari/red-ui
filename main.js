const { app, BrowserWindow, ipcMain, Menu } = require("electron");

const Redis = require("ioredis");

const applicationMenu = require('./menu');

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    // load the dist folder from Angular
    // win.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, "/dist/index.html"),
    //         protocol: "file:",
    //         slashes: true
    //     })
    // );

    // for testing load running angular application
    win.loadURL('http://localhost:4200');

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools()
    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", () => {
    Menu.setApplicationMenu(applicationMenu);
    createWindow();
});

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

exports.Connect = () => {
    win.webContents.send('connect');
}

exports.Disconnect = () => {
    win.webContents.send('disconnect');
}

exports.getRedisObject = (connection) => {
    redis = new Redis({
        port: connection.port, // Redis port
        host: connection.host, // Redis host
        lazyConnect: connection.islazy
    });

    return redis;
}