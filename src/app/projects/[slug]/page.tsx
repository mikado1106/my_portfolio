import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { CaseStudyClient } from "./case-study-client";

export function generateStaticParams() {
  return projects.en.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.en.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | Mikhael Edo Sinambela" };
  }

  return {
    title: `${project.name} | Mikhael Edo Sinambela`,
    description: project.desc,
    openGraph: {
      title: `${project.name} | Mikhael Edo Sinambela`,
      description: project.desc,
      url: `https://mikhaeledo.com/projects/${slug}`,
      type: "website",
      siteName: "Mikhael Edo Sinambela",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Mikhael Edo Sinambela`,
      description: project.desc,
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
