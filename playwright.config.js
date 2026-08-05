// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Run tests in files in parallel */
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    scereenshot: 'only-on-failure',
    trace: 'on'
  },

});
module.exports = config;
