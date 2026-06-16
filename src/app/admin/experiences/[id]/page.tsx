import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ExperienceForm from "../ExperienceForm";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: experience } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Edit Experience</h2>
      <ExperienceForm experience={experience} />
    </div>
  );
}
