import { BrowserWindow } from 'electron'

export default class Main {
  static mainWindow: Electron.BrowserWindow
  static application: Electron.App
  static BrowserWindow

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit()
    }
  }

  private static onClose() {
    Main.mainWindow = null
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 1100,
      height: 600,
      titleBarStyle: 'hidden'
    })
    Main.mainWindow.loadURL('file://' + __dirname + '/outgoings-tracker/index.html')
    Main.mainWindow.on('closed', Main.onClose)
  }

  static run(
    app: Electron.App,
    browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow
    Main.application = app
    Main.application.on('window-all-closed', Main.onWindowAllClosed)
    Main.application.on('ready', Main.onReady)
  }
}
