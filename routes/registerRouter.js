const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  res.json({ message: "User registered successfully (Mock)" });
});

module.exports = router;
