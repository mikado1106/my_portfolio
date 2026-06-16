"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/supabase/types";

type ProjectFormData = Omit<Project, "id" | "created_at" | "updated_at">;

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    title: project?.title ?? "",
    description: project?.description ?? "",
    image_url: project?.image_url ?? "",
    tech_stack: project?.tech_stack ?? [],
    live_url: project?.live_url ?? "",
    github_url: project?.github_url ?? "",
    category: project?.category ?? "web",
    featured: project?.featured ?? false,
    sort_order: project?.sort_order ?? 0,
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
      image_url: form.image_url || null,
      live_url: form.live_url || null,
      github_url: form.github_url || null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (project) {
      result = await supabase.from("projects").update(payload).eq("id", project.id);
    } else {
      result = await supabase.from("projects").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/admin/projects");
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
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Project title"
        />
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
          rows={4}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          placeholder="Project description..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="ai">AI/ML</option>
            <option value="other">Other</option>
          </select>
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
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-1">
          Image URL
        </label>
        <input
          id="image_url"
          type="url"
          value={form.image_url ?? ""}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="live_url" className="block text-sm font-medium text-gray-300 mb-1">
            Live URL
          </label>
          <input
            id="live_url"
            type="url"
            value={form.live_url ?? ""}
            onChange={(e) => setForm({ ...form, live_url: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-gray-300 mb-1">
            GitHub URL
          </label>
          <input
            id="github_url"
            type="url"
            value={form.github_url ?? ""}
            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="https://github.com/..."
          />
        </div>
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

      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4 rounded border-gray-700 bg-[#1a1a1a] text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="featured" className="text-sm text-gray-300">
          Featured project (shown prominently)
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
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
