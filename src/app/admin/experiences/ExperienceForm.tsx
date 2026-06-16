"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Experience } from "@/lib/supabase/types";

type ExpFormData = Omit<Experience, "id" | "created_at" | "updated_at">;

export default function ExperienceForm({ experience }: { experience?: Experience }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ExpFormData>({
    role: experience?.role ?? "",
    company: experience?.company ?? "",
    start_date: experience?.start_date ?? "",
    end_date: experience?.end_date ?? null,
    is_current: experience?.is_current ?? false,
    description: experience?.description ?? "",
    tech_stack: experience?.tech_stack ?? [],
    sort_order: experience?.sort_order ?? 0,
  });

  const [techInput, setTechInput] = useState("");

  const addTech = () => {
    if (techInput.trim() && !form.tech_stack.includes(techInput.trim())) {
      setForm({ ...form, tech_stack: [...form.tech_stack, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setForm({ ...form, tech_stack: form.tech_stack.filter((t) => t !== tech) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      end_date: form.is_current ? null : (form.end_date || null),
      updated_at: new Date().toISOString(),
    };

    let result;
    if (experience) {
      result = await supabase.from("experiences").update(payload).eq("id", experience.id);
    } else {
      result = await supabase.from("experiences").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/admin/experiences");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
          Role / Job Title *
        </label>
        <input
          id="role"
          type="text"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="e.g. Senior Frontend Developer"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
          Company *
        </label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Company name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-300 mb-1">
            Start Date *
          </label>
          <input
            id="start_date"
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-300 mb-1">
            End Date
          </label>
          <input
            id="end_date"
            type="date"
            value={form.end_date ?? ""}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            disabled={form.is_current}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_current"
          type="checkbox"
          checked={form.is_current}
          onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
          className="w-4 h-4 rounded border-gray-700 bg-[#1a1a1a] text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="is_current" className="text-sm text-gray-300">
          I currently work here
        </label>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={5}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          placeholder="Describe your role and achievements..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tech Stack
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Type and press Enter"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
        {form.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="sort_order" className="block text-sm font-medium text-gray-300 mb-1">
          Sort Order
        </label>
        <input
          id="sort_order"
          type="number"
          value={form.sort_order}
          onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? "Saving..." : experience ? "Update Experience" : "Create Experience"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
