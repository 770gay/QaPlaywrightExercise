import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html"],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
      },
    ],
  ],

  use: {
    baseURL: "https://www.ebay.com",

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    actionTimeout: 20000,
    navigationTimeout: 40000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    }
  ],
});
