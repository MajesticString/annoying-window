import { contextBridge } from 'electron';
import { app } from '@electron/remote';
import { rmSync } from 'node:fs';
const { startupPath } = require('./path');

app.on('quit', async () => {
  if (window.shouldRestart) app.relaunch();
});
contextBridge.exposeInMainWorld('congrats', {
  run: () => {
    window.shouldRestart = false;
    rmSync(startupPath);
    app.quit();
  },
});
