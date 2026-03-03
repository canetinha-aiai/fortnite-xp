import { FortniteAPI } from "@yaelouuu/fortnite-api";

const API_KEY =
  "b22c3135b8df0cafed288d652ddb9fcac78c6f0407d72ad4ba1df50c04d335f4";

// Singleton client instance shared across all route handlers
export const fortniteClient = new FortniteAPI({
  apiKey: API_KEY,
});
