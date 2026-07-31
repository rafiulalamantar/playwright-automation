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

  },

});
module.exports = config;
