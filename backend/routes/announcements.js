import express from "express";

const router = express.Router();
router.post("/", addAnnounc);

export default router;