'use client'

import { useState, useEffect } from 'react'
import { getSetting, setSetting } from '@/lib/api'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    hero_title: '',
    hero_subtitle: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    resume_url: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const keys = Object.keys(settings)
      const results = await Promise.all(keys.map((key) => getSetting(key)))
      const loaded: any = {}
      keys.forEach((key, i) => {
        loaded[key] = results[i] || ''
      })
      setSettings(loaded)
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) =>
          setSetting(key, value || null)
        )
      )
      alert('Settings saved successfully!')
    } catch (err) {
      console.error('Failed to save settings:', err)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-6 animate-pulse space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-700 rounded w-24 mb-2" />
              <div className="h-10 bg-gray-700 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Configure your portfolio site settings</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <div className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Title</label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="My Portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Description</label>
              <textarea
                rows={2}
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                placeholder="A showcase of my work and skills"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hero Title</label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Hi, I'm Mikado"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hero Subtitle</label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Full-Stack Developer"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Social & Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">GitHub URL</label>
              <input
                type="url"
                value={settings.github_url}
                onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Twitter/X URL</label>
              <input
                type="url"
                value={settings.twitter_url}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="https://twitter.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Resume URL</label>
              <input
                type="url"
                value={settings.resume_url}
                onChange={(e) => setSettings({ ...settings, resume_url: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a3e] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors text-sm font-medium"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
