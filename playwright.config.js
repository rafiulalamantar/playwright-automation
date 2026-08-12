// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

const envDefaults = {
  BASE_URL: 'https://rahulshettyacademy.com/loginpagePractise/',
  BASE_URL_V2: 'https://rahulshettyacademy.com/angularpractice/',
  BASE_URL_V3: 'https://rahulshettyacademy.com/AutomationPractice/',
  BASE_URL_CLIENT_APP: 'https://rahulshettyacademy.com/client',
  TEST_USERNAME: 'rahulshettyacademy',
  TEST_PASSWORD: 'Learning@830$3mK2',
  TEST_EMAIL: 'anshika@gmail.com',
  TEST_PASSWORD_CLIENT_APP: 'Iamking@000'
};

for (const [key, value] of Object.entries(envDefaults)) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

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
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'only-on-failure',
    trace: 'on'
  }
});
module.exports = config;
