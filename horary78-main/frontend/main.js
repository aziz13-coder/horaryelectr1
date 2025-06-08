const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Determine if we are running in development mode.
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });

  if (isDev) {
    // In development we load the Vite dev server.
    win.loadURL('http://localhost:3000');
  } else {
    // In production we load the built index.html.
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  spawn('python', ['../backend/app.py'], { stdio: 'inherit' });
  createWindow();
});
