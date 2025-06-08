const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Determine whether we are running in development mode. When packaged by
// electron-builder `app.isPackaged` will be true.
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });


  if (isDev) {
    // In development load the Vite dev server. Defaults to http://localhost:3000
    const devUrl = process.env.DEV_SERVER_URL || 'http://localhost:3000';
    win.loadURL(devUrl);
  } else {
    // In production load the built index.html from the dist folder
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  // Start the backend API in a separate process
  spawn('python', ['../backend/app.py'], { stdio: 'inherit' });
  createWindow();
});