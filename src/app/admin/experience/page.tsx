'use client'

import { useState, useEffect } from 'react'
import { getExperiences, createExperience, updateExperience, deleteExperience } from '@/lib/api'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
  sort_order: number
  status: string
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    sort_order: 0,
    status: 'published',
  })

  useEffect(() => {
    loadExperiences()
  }, [])

  async function loadExperiences() {
    try {
      const data = await getExperiences()
      setExperiences(data)
    } catch (err) {
      console.error('Failed to load experiences:', err)
    } finally {
      setLoading(false)
    }
  }

  function openForm(exp?: Experience) {
    if (exp) {
      setEditing(exp)
      setForm({
        title: exp.title,
        company: exp.company || '',
        location: exp.location || '',
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        is_current: exp.is_current,
        description: exp.description || '',
        sort_order: exp.sort_order,
        status: exp.status,
      })
    } else {
      setEditing(null)
      setForm({
        title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
        sort_order: experiences.length,
        status: 'published',
      })
    }
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      title: form.title,
      company: form.company || null,
      location: form.location || null,
      start_date: form.start_date || null,
      end_date: form.is_current ? null : (form.end_date || null),
      is_current: form.is_current,
      description: form.description || null,
      sort_order: form.sort_order,
      status: form.status,
    }

    try {
      if (editing) {
        await updateExperience(editing.id, payload)
      } else {
        await createExperience(payload)
      }
      setShowForm(false)
      await loadExperiences()
    } catch (err) {
      console.error('Failed to save experience:', err)
      alert('Failed to save experience')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experience?')) return
    try {
      await deleteExperience(id)
      await loadExperiences()
    } catch (err) {
      console.error('Failed to delete experience:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your work experience</p>
        </div>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Experience
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#1a1a2e] rounded-2xl w-full max-w-lg p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editing ? 'Edit Experience' : 'New Experience'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Senior Developer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Remote"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    disabled={form.is_current}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_current}
                  onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-600 bg-[#0a0a0a] text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Currently working here</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Key responsibilities and achievements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 bg-transparent border border-[#2a2a3e] text-gray-300 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-700 rounded w-48 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-32" />
            </div>
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] border border-[#1a1a2e] rounded-xl">
          <p className="text-gray-400">No experience entries yet.</p>
          <button onClick={() => openForm()} className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
            + Add your first experience
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 group hover:border-[#2a2a3e] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{exp.title}</h3>
                    {exp.is_current && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">Current</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openForm(exp)} className="px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
