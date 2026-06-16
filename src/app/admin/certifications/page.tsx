'use client'

import { useState, useEffect } from 'react'
import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/lib/api'

interface Certification {
  id: string
  title: string
  issuer: string
  issue_date: string
  credential_url: string
  image_url: string
  sort_order: number
  status: string
}

export default function AdminCertifications() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certification | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    image_url: '',
    sort_order: 0,
    status: 'published',
  })

  useEffect(() => {
    loadCerts()
  }, [])

  async function loadCerts() {
    try {
      const data = await getCertifications()
      setCerts(data)
    } catch (err) {
      console.error('Failed to load certifications:', err)
    } finally {
      setLoading(false)
    }
  }

  function openForm(cert?: Certification) {
    if (cert) {
      setEditing(cert)
      setForm({
        title: cert.title,
        issuer: cert.issuer || '',
        issue_date: cert.issue_date || '',
        credential_url: cert.credential_url || '',
        image_url: cert.image_url || '',
        sort_order: cert.sort_order,
        status: cert.status,
      })
    } else {
      setEditing(null)
      setForm({
        title: '',
        issuer: '',
        issue_date: '',
        credential_url: '',
        image_url: '',
        sort_order: certs.length,
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
      issuer: form.issuer || null,
      issue_date: form.issue_date || null,
      credential_url: form.credential_url || null,
      image_url: form.image_url || null,
      sort_order: form.sort_order,
      status: form.status,
    }

    try {
      if (editing) {
        await updateCertification(editing.id, payload)
      } else {
        await createCertification(payload)
      }
      setShowForm(false)
      await loadCerts()
    } catch (err) {
      console.error('Failed to save certification:', err)
      alert('Failed to save certification')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this certification?')) return
    try {
      await deleteCertification(id)
      await loadCerts()
    } catch (err) {
      console.error('Failed to delete certification:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Certifications</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your certifications and credentials</p>
        </div>
        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Certification
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#1a1a2e] rounded-2xl w-full max-w-lg p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editing ? 'Edit Certification' : 'New Certification'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">✕</button>
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
                  placeholder="AWS Solutions Architect"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Issuer</label>
                <input
                  type="text"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Issue Date</label>
                <input
                  type="date"
                  value={form.issue_date}
                  onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Credential URL</label>
                <input
                  type="url"
                  value={form.credential_url}
                  onChange={(e) => setForm({ ...form, credential_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="https://credential.net/..."
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
      ) : certs.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] border border-[#1a1a2e] rounded-xl">
          <p className="text-gray-400">No certifications yet.</p>
          <button onClick={() => openForm()} className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
            + Add your first certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 flex items-center gap-4 group hover:border-[#2a2a3e] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium truncate">{cert.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    cert.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-0.5">
                  {cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openForm(cert)} className="px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(cert.id)} className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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
