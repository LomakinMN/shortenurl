import { Router } from "express";
import {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlInfo,
  deleteShortUrl,
  getAnalytics,
} from "../controllers/urlController";

const router = Router();

// Переход по короткой ссылке, должен быть редирект на оригинальную ссылку
router.get("/:shortUrl", redirectToOriginalUrl);

// Создание короткой ссылки
router.post("/shorten", createShortUrl);

// Получение информации о короткой ссылке
router.get("/info/:shortUrl", getUrlInfo);

// Удаление короткой ссылки
router.delete("/delete/:shortUrl", deleteShortUrl);

// Получение аналитики по короткой ссылке
router.get("/analytics/:shortUrl", getAnalytics);

export default router;
