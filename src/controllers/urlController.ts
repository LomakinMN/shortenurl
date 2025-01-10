import { Request, Response, NextFunction } from "express";
import Url from "../models/Url";
import Click from "../models/Click";
import { generateShortUrl } from "../utils/urlUtils";

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { originalUrl, alias, expiresAt } = req.body;

  if (!originalUrl) {
    res.status(400).json({ error: "Original URL is required" });
    return;
  }

  try {
    const shortUrl = alias || generateShortUrl();
    const expirationDate = expiresAt
      ? new Date(expiresAt)
      : new Date(Date.now() + 10 * 60 * 1000);
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      alias,
      expiresAt: expirationDate,
    });
    res.status(201).json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginalUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ where: { shortUrl } });

    if (!url) {
      res.status(404).json({ error: "URL not found" });
      return;
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      res.status(410).json({ error: "URL has expired" });
      return;
    }

    url.clickCount += 1;
    await url.save();

    await Click.create({ urlId: url.id, ipAddress: req.ip });

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUrlInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ where: { shortUrl } });

    if (!url) {
      res.status(404).json({ error: "URL not found" });
      return;
    }

    res.json({
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      clickCount: url.clickCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ where: { shortUrl } });

    if (!url) {
      res.status(404).json({ error: "URL not found" });
      return;
    }

    await url.destroy();
    res.status(204).json("url deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ where: { shortUrl } });

    if (!url) {
      res.status(404).json({ error: "URL not found" });
      return;
    }

    const clicks = await Click.findAll({
      where: { urlId: url.id },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({
      clickCount: url.clickCount,
      recentClicks: clicks.map((click) => click.ipAddress),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
