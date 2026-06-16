import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Edit Project</h2>
      <ProjectForm project={project} />
    </div>
  );
}
