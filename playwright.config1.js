// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { workers } from "node:cluster";
import { permission } from "node:process";
require("dotenv").config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retires:1,
  workers:1,
  timeout: 50 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        scereenshot: "only-on-failure",
        trace: "on",
        ...devices['iPhone 11 Pro Max'],
      },
    },
        {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        scereenshot: "on",
        trace: "on",
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        video: 'retain-on-failure',
        // viewport:{width:100,height:720},
      },
    },
  ],
  /* Run tests in files in parallel */
};
module.exports = config;
