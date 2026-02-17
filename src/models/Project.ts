import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  image: string;
  category: string;
  title: string;
  description: string;
  figmaUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    figmaUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
