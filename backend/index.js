const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use("/auth", require("./routes/auth"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`App Listening On Port http://localhost:${port}`);
});
