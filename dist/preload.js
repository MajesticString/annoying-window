var import_electron = require("electron");
var import_remote = require("@electron/remote");
var import_node_fs = require("node:fs");
const { startupPath } = require("./path");
import_remote.app.on("quit", async () => {
  if (window.shouldRestart)
    import_remote.app.relaunch();
});
import_electron.contextBridge.exposeInMainWorld("congrats", {
  run: () => {
    window.shouldRestart = false;
    (0, import_node_fs.rmSync)(startupPath);
    import_remote.app.quit();
  }
});
