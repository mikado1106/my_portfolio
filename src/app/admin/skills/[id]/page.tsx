import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import SkillForm from "../SkillForm";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Edit Skill</h2>
      <SkillForm skill={skill} />
    </div>
  );
}
