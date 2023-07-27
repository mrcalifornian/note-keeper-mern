const router = require("express").Router();
const path = require("path");

router.use("/", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ messsage: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

module.exports = router;
