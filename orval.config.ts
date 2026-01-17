import { defineConfig } from "orval";

export default defineConfig({
  busNowApi: {
    input: "http://localhost:3000/api-docs-json",
    output: {
      target: "src/apiOrval",
      baseUrl: "http://localhost:3000",
    },
  },
});
