import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { projectBySlug, type ProjectSlug } from "@/content/projects";
import { CaseStudyPage } from "@/pages/case-study-page";
import { HomePage } from "@/pages/home-page";
import { NotFoundPage } from "@/pages/not-found-page";
import "@/styles/globals.css";

function App() {
  const page = document.body.dataset.page;

  if (page === "home") return <HomePage />;
  if (page === "404") return <NotFoundPage />;
  if (page?.startsWith("project:")) {
    const slug = page.slice("project:".length) as ProjectSlug;
    const project = projectBySlug[slug];
    if (project) return <CaseStudyPage project={project} />;
  }

  return <NotFoundPage />;
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root mount point");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
