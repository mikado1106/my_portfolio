import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CertificationForm from "../CertificationForm";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: cert } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (!cert) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Edit Certification</h2>
      <CertificationForm certification={cert} />
    </div>
  );
}
