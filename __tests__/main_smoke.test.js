"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");

test("main process boot applies Electron hardening flags", async () => {
  let capturedOptions = null;

  class MockBrowserWindow {
    constructor(options) {
      capturedOptions = options;
    }
    loadFile() {}
  }

  const mockElectron = {
    app: {
      whenReady: () => Promise.resolve()
    },
    BrowserWindow: MockBrowserWindow,
    ipcMain: {
      handle: () => {}
    }
  };

  const originalLoad = Module._load;
  Module._load = function patchedLoad(request, parent, isMain) {
    if (request === "electron") return mockElectron;
    if (request === "./engine/modelRouter") return { routeModel: async () => "ok" };
    if (request === "./memory/sessionStore") return { saveMessage: async () => {} };
    return originalLoad.call(this, request, parent, isMain);
  };

  try {
    const mainPath = path.resolve(__dirname, "..", "main.js");
    delete require.cache[mainPath];
    require(mainPath);
    await new Promise((resolve) => setImmediate(resolve));
  } finally {
    Module._load = originalLoad;
  }

  assert.ok(capturedOptions, "BrowserWindow should be created");
  assert.equal(capturedOptions.webPreferences.contextIsolation, true);
  assert.equal(capturedOptions.webPreferences.nodeIntegration, false);
  assert.equal(capturedOptions.webPreferences.sandbox, true);
});
