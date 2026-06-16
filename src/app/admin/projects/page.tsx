'use client'

import { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/api'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  tech_stack: string[]
  live_url: string
  github_url: string
  is_featured: boolean
  sort_order: number
  status: string
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    image_url: '',
    tech_stack: '',
    live_url: '',
    github_url: '',
    is_featured: false,
    sort_order: 0,
    status: 'published',
  })

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Failed to load projects:', err)
    } finally {
      setLoading(false)
    }
  }

  function openForm(project?: Project) {
    if (project) {
      setEditing(project)
      setForm({
        title: project.title,
        description: project.description || '',
        image_url: project.image_url || '',
        tech_stack: (project.tech_stack || []).join(', '),
        live_url: project.live_url || '',
        github_url: project.github_url || '',
        is_featured: project.is_featured,
        sort_order: project.sort_order,
        status: project.status,
      })
    } else {
      setEditing(null)
      setForm({
        title: '',
        description: '',
        image_url: '',
        tech_stack: '',
        live_url: '',
        github_url: '',
        is_featured: false,
        sort_order: projects.length,
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
      description: form.description,
      image_url: form.image_url || null,
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      live_url: form.live_url || null,
      github_url: form.github_url || null,
      is_featured: form.is_featured,
      sort_order: form.sort_order,
      status: form.status,
    }

    try {
      if (editing) {
        await updateProject(editing.id, payload)
      } else {
        await createProject(payload)
      }
      setShowForm(false)
      await loadProjects()
    } catch (err) {
      console.error('Failed to save project:', err)
      alert('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await deleteProject(id)
      await loadProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#1a1a2e] rounded-2xl w-full max-w-2xl p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editing ? 'Edit Project' : 'New Project'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tech Stack <span className="text-gray-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={form.tech_stack}
                  onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="React, Next.js, Tailwind"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Live URL</label>
                  <input
                    type="url"
                    value={form.live_url}
                    onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={form.github_url}
                    onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-600 bg-[#0a0a0a] text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">Featured</span>
                  </label>
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

      {/* Projects List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-700 rounded w-48 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-96" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] border border-[#1a1a2e] rounded-xl">
          <p className="text-gray-400">No projects yet.</p>
          <button
            onClick={() => openForm()}
            className="mt-3 text-blue-400 hover:text-blue-300 text-sm"
          >
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 flex items-center gap-4 group hover:border-[#2a2a3e] transition-colors"
            >
              {/* Thumbnail */}
              {project.image_url && (
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium truncate">{project.title}</h3>
                  {project.is_featured && (
                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === 'published'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm truncate mt-0.5">{project.description}</p>
                {project.tech_stack?.length > 0 && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="text-xs text-gray-500">+{project.tech_stack.length - 4}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openForm(project)}
                  className="px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
