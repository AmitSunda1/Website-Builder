import { GoogleGenerativeAI } from "@google/generative-ai";
import { Project } from "../models/Project";

export async function hydrateContent(projectId: string, sections: any[]) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("No GEMINI_API_KEY. Skipping AI hydration.");
    return sections;
  }
  
  if (!projectId) return sections;

  const project = await Project.findOne({ projectId });
  if (!project) return sections;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `
You are an expert copywriter and JSON formatter.
I have a website layout composed of an array of sections.
Your job is to rewrite the strings inside the 'props' payload for each section based on the exact business context provided below.
Make the copy highly converting, professional, and directly related to the business. 
Do NOT alter the basic generic shape, only mutate the textual copy inside 'props' (headlines, tags, quotes, list items) and ANY image-related props (imgSrc, avatar, imageUrl, icon).
CRITICAL: You must replace dummy placeholder images with actual matching image URLs found in the 'Scraped Asset Images' array below. Choose the most appropriate image for the context. If no suitable image exists, keep a professional placeholder.

Return a JSON array of these sections exactly reflecting the new props.

Business Context (Form Answers):
${JSON.stringify(project.formAnswers)}

Scraped Context (if any):
${project.rawScrape ? project.rawScrape.substring(0, 15000) : "None"}

Scraped Asset Images:
${JSON.stringify(project.scrapedImages || [])}

Current Sections Setup:
${JSON.stringify(sections, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    // Strip markdown code blocks if the model includes them accidentally
    const cleanedText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const updatedSections = JSON.parse(cleanedText);
    return updatedSections;
  } catch (err) {
    console.error("[hydrateContent] AI Generation error:", err);
    return sections; // fallback to dummy data on error
  }
}
