import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlInfo,
  deleteShortUrl,
  getAnalytics,
} from "../controllers/urlController";

const router = Router();

router.get("/:shortUrl", redirectToOriginalUrl);
router.post("/shorten", createShortUrl);
router.get("/info/:shortUrl", getUrlInfo);
router.delete("/delete/:shortUrl", deleteShortUrl);

router.get("/analytics/:shortUrl", getAnalytics);

export default router;
