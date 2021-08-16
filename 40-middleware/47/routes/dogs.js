import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const { method } = req;
  res.send(`${method} /dogs`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`/dogs/${id}`);
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  res.send(`/dogs/${id}/edit`);
});

export default router;