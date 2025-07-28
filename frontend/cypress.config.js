const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // React app
    supportFile: "cypress/support/e2e.js", // if using Cypress v10+
  },
});
