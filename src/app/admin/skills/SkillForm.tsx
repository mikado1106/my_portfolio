"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Skill } from "@/lib/supabase/types";

type SkillFormData = Omit<Skill, "id" | "created_at">;

export default function SkillForm({ skill }: { skill?: Skill }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<SkillFormData>({
    name: skill?.name ?? "",
    category: skill?.category ?? "frontend",
    proficiency: skill?.proficiency ?? 80,
    icon_name: skill?.icon_name ?? null,
    sort_order: skill?.sort_order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      icon_name: form.icon_name || null,
    };

    let result;
    if (skill) {
      result = await supabase.from("skills").update(payload).eq("id", skill.id);
    } else {
      result = await supabase.from("skills").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/admin/skills");
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Skill Name *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="e.g. React, TypeScript, Node.js"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="proficiency" className="block text-sm font-medium text-gray-300 mb-1">
            Proficiency ({form.proficiency}%)
          </label>
          <input
            id="proficiency"
            type="range"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-3"
          />
        </div>
      </div>

      <div>
        <label htmlFor="icon_name" className="block text-sm font-medium text-gray-300 mb-1">
          Icon Name
        </label>
        <input
          id="icon_name"
          type="text"
          value={form.icon_name ?? ""}
          onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="e.g. react, typescript, nodejs (Simple Icons name)"
        />
        <p className="text-xs text-gray-600 mt-1">
          Uses Simple Icons names. See{" "}
          <a href="https://simpleicons.org" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
            simpleicons.org
          </a>
        </p>
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
          {loading ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
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
