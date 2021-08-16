import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  const { isAdmin } = req.query;
  if (isAdmin) next();
  res.send("SORRY NOT AN ADMIN!");
});

router.get("/deleteall", (req, res) => {
  const { method } = req;
  res.send(`${method} /deleteall`);
});

router.get("/topsecret", (req, res) => {
  const { method } = req;
  res.send(`${method} /topsecret`);
});

export default router;
