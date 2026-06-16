import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteButton from "../projects/DeleteButton";

export default async function ExperiencesPage() {
  const supabase = await createServerSupabase();
  const { data: experiences, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Experiences</h2>
        <Link
          href="/admin/experiences/new"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Experience
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          Error loading experiences: {error.message}
        </div>
      )}

      {experiences && experiences.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No experiences yet</p>
          <p className="text-sm">Add your first experience to get started.</p>
        </div>
      )}

      <div className="space-y-3">
        {experiences?.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#111] border border-gray-800 rounded-xl p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium truncate">{exp.role}</h3>
                {exp.is_current && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-xs">
                    Current
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">{exp.company}</p>
              <p className="text-gray-600 text-xs mt-1">
                {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/experiences/${exp.id}`}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors"
              >
                Edit
              </Link>
              <DeleteButton id={exp.id} table="experiences" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
