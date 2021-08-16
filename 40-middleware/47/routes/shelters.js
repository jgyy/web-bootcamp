import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const { method } = req;
  res.send(`${method} /shelters`);
});

router.post("/", (req, res) => {
  const { method } = req;
  res.send(`${method} /shelters`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`/shelters/${id}`);
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  res.send(`/shelters/${id}/edit`);
});

export default router;
