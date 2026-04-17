import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectId: string;
  formAnswers: Record<string, string>;
  sourceUrl?: string;
  rawScrape?: string;
  scrapedImages?: string[];
  hydratedSections?: any[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  projectId: { type: String, required: true, unique: true },
  formAnswers: { type: Schema.Types.Mixed, default: {} },
  sourceUrl: { type: String },
  rawScrape: { type: String },
  scrapedImages: { type: [String], default: [] },
  hydratedSections: { type: [Schema.Types.Mixed], default: undefined },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
