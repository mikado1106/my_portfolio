'use client'

import { useState, useEffect } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/api'

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  icon: string
  sort_order: number
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 80,
    icon: '',
    sort_order: 0,
  })

  useEffect(() => {
    loadSkills()
  }, [])

  async function loadSkills() {
    try {
      const data = await getSkills()
      setSkills(data)
    } catch (err) {
      console.error('Failed to load skills:', err)
    } finally {
      setLoading(false)
    }
  }

  function openForm(skill?: Skill) {
    if (skill) {
      setEditing(skill)
      setForm({
        name: skill.name,
        category: skill.category || 'Frontend',
        proficiency: skill.proficiency || 80,
        icon: skill.icon || '',
        sort_order: skill.sort_order,
      })
    } else {
      setEditing(null)
      setForm({
        name: '',
        category: 'Frontend',
        proficiency: 80,
        icon: '',
        sort_order: skills.length,
      })
    }
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name: form.name,
      category: form.category,
      proficiency: form.proficiency,
      icon: form.icon || null,
      sort_order: form.sort_order,
    }

    try {
      if (editing) {
        await updateSkill(editing.id, payload)
      } else {
        await createSkill(payload)
      }
      setShowForm(false)
      await loadSkills()
    } catch (err) {
      console.error('Failed to save skill:', err)
      alert('Failed to save skill')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this skill?')) return
    try {
      await deleteSkill(id)
      await loadSkills()
    } catch (err) {
      console.error('Failed to delete skill:', err)
    }
  }

  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your technical skills</p>
        </div>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Skill
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#1a1a2e] rounded-2xl w-full max-w-md p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editing ? 'Edit Skill' : 'New Skill'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="React"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Proficiency: {form.proficiency}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Icon (emoji or URL)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="⚛️"
                />
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

      {/* Skills grouped by category */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-20" />
            </div>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] border border-[#1a1a2e] rounded-xl">
          <p className="text-gray-400">No skills yet.</p>
          <button onClick={() => openForm()} className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
            + Add your first skill
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 group hover:border-[#2a2a3e] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {skill.icon && <span className="text-lg">{skill.icon}</span>}
                        <span className="text-white font-medium text-sm">{skill.name}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openForm(skill)} className="p-1 text-blue-400 hover:bg-blue-500/10 rounded text-xs">
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1 text-red-400 hover:bg-red-500/10 rounded text-xs">
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">{skill.proficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
