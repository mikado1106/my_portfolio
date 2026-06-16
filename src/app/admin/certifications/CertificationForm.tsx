"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Certification } from "@/lib/supabase/types";

type CertFormData = Omit<Certification, "id" | "created_at" | "updated_at">;

export default function CertificationForm({ certification }: { certification?: Certification }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CertFormData>({
    title: certification?.title ?? "",
    issuer: certification?.issuer ?? "",
    issue_date: certification?.issue_date ?? "",
    expiry_date: certification?.expiry_date ?? "",
    credential_id: certification?.credential_id ?? "",
    credential_url: certification?.credential_url ?? "",
    image_url: certification?.image_url ?? "",
    sort_order: certification?.sort_order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      expiry_date: form.expiry_date || null,
      credential_id: form.credential_id || null,
      credential_url: form.credential_url || null,
      image_url: form.image_url || null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (certification) {
      result = await supabase.from("certifications").update(payload).eq("id", certification.id);
    } else {
      result = await supabase.from("certifications").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/admin/certifications");
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
          placeholder="Certification title"
        />
      </div>

      <div>
        <label htmlFor="issuer" className="block text-sm font-medium text-gray-300 mb-1">
          Issuer *
        </label>
        <input
          id="issuer"
          type="text"
          value={form.issuer}
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
          required
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="e.g. Google, AWS, Meta"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="issue_date" className="block text-sm font-medium text-gray-300 mb-1">
            Issue Date *
          </label>
          <input
            id="issue_date"
            type="date"
            value={form.issue_date}
            onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-300 mb-1">
            Expiry Date
          </label>
          <input
            id="expiry_date"
            type="date"
            value={form.expiry_date ?? ""}
            onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="credential_id" className="block text-sm font-medium text-gray-300 mb-1">
            Credential ID
          </label>
          <input
            id="credential_id"
            type="text"
            value={form.credential_id ?? ""}
            onChange={(e) => setForm({ ...form, credential_id: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. ABC-123-XYZ"
          />
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
        <label htmlFor="credential_url" className="block text-sm font-medium text-gray-300 mb-1">
          Credential URL
        </label>
        <input
          id="credential_url"
          type="url"
          value={form.credential_url ?? ""}
          onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-1">
          Badge/Image URL
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

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? "Saving..." : certification ? "Update Certification" : "Create Certification"}
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
