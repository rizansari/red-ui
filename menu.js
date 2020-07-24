const { app, BrowserWindow, Menu, shell } = require('electron');
const mainProcess = require('./main');

const template = [
    {
        label: 'File',
        submenu: [{
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
        ]
    }
];
module.exports = Menu.buildFromTemplate(template);