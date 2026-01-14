import { defineConfig } from "cypress";
import generateExcel from "./excelReport.mjs";

export default defineConfig({
  e2e: {
    baseUrl: "https://test.wondigi.com",

    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,

    video: false,
    screenshotOnRunFailure: false,

    retries: {
      runMode: 1,
      openMode: 0
    },

    async setupNodeEvents(on, config) {

      on("after:run", async (results) => {
        if (!results || !results.runs || results.runs.length === 0) return;

        // 🔥 IMPORTANT: DO NOT FILTER BY MODULE
        // Let excelReport.mjs decide what to generate
        await generateExcel(results);
      });

      return config;
    }
  }
});
