import { Router, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";
import FirecrawlApp from "@mendable/firecrawl-js";
import { Project } from "../models/Project";
import { hydrateContent } from "../codegen/hydrateContent";

const router = Router();

// Endpoint to initialize a project securely
router.post("/init", async (req: Request, res: Response) => {
  try {
    const { formAnswers, sourceUrl } = req.body;

    const projectId = uuidv4();
    let rawScrape = "";
    let scrapedImages: string[] = [];

    // If URL is provided, scrape it using Firecrawl
    if (sourceUrl && process.env.FIRECRAWL_API_KEY) {
      try {
        const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
        const scrapeResult = await firecrawl.scrapeUrl(sourceUrl, {
          formats: ["markdown"]
        }) as any;
        
        if (scrapeResult.success !== false && scrapeResult.markdown) {
          rawScrape = scrapeResult.markdown;
        } else if (scrapeResult.data && scrapeResult.data.markdown) {
          rawScrape = scrapeResult.data.markdown;
        }

        // Extract all image links from the generated markdown
        if (rawScrape) {
          const imageRegex = /!\[.*?\]\((.*?)\)/g;
          let match;
          while ((match = imageRegex.exec(rawScrape)) !== null) {
            // grab the url group
            const url = match[1];
            if (url && url.startsWith("http")) {
              scrapedImages.push(url);
            }
          }
          // Remove duplicates
          scrapedImages = [...new Set(scrapedImages)];
        }
      } catch (err: unknown) {
        console.error("[Firecrawl] failed to scrape:", err);
        // We do not block the whole initialization for a failed scrape
      }
    }

    // Save project securely to DB
    const project = new Project({
      projectId,
      formAnswers: formAnswers || {},
      sourceUrl,
      rawScrape,
      scrapedImages
    });

    await project.save();

    res.status(200).json({
      status: "success",
      projectId,
    });
  } catch (err: unknown) {
    console.error("[project/init] Error initializing project:", err);
    res.status(500).json({ status: "error", message: "Failed to initialize project" });
  }
});

// Endpoint to hydrate generic sections with AI based on project context
router.post("/hydrate", async (req: Request, res: Response) => {
  try {
    const { projectId, sections } = req.body;
    if (!projectId) {
      res.status(400).json({ error: "Missing projectId" });
      return;
    }

    const project = await Project.findOne({ projectId });
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Return cached sections if we already ran the AI!
    if (project.hydratedSections && project.hydratedSections.length > 0) {
      res.status(200).json({
        status: "success",
        sections: project.hydratedSections,
      });
      return;
    }

    const updatedSections = await hydrateContent(projectId, sections);

    // Cache to DB for future preview fetches
    project.hydratedSections = updatedSections;
    await project.save();

    res.status(200).json({
      status: "success",
      sections: updatedSections,
    });
  } catch (err: unknown) {
    console.error("[project/hydrate] Error hydrating content:", err);
    res.status(500).json({ status: "error", message: "Failed to hydrate content" });
  }
});

export default router;
