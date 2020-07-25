const { app, BrowserWindow, Menu, shell } = require('electron');
const mainProcess = require('./main');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Connect',
                accelerator: 'CommandOrControl+O',
                click() {
                    mainProcess.Connect();
                },
            },
            {
                label: 'Disconnect',
                accelerator: 'CommandOrControl+D',
                click() {
                    mainProcess.Disconnect();
                }
            },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://rizwanansari.net')
                }
            },
            {
                label: 'About RedUI',
                click: async () => {
                    const { dialog } = require('electron');
                    const options = {
                        title: "About RedUI",
                        message: "RedUI - Redis Desktop",
                        detail: "Crossplatform Redis UI built with Electron, Angular and ClarityUI\n\nGo to https://rizwanansari.net for details"
                    };
                    dialog.showMessageBox(null, options);
                }
            }
        ]
    }
];
module.exports = Menu.buildFromTemplate(template);