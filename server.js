const express = require("express");
const app = express();
const appRoute = require("./Routes/route.js");
const PORT = process.env.PORT || 8080;

app.use(express.json());

// routes

app.use("/api", appRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
