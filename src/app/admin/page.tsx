'use client'

import { useState, useEffect } from 'react'
import { getProjects, getCertifications, getSkills, getExperiences, getContactMessages } from '@/lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    certifications: 0,
    skills: 0,
    experiences: 0,
    messages: 0,
    unreadMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, certs, skills, exps, msgs] = await Promise.all([
          getProjects(),
          getCertifications(),
          getSkills(),
          getExperiences(),
          getContactMessages(),
        ])

        setStats({
          projects: projects.length,
          certifications: certs.length,
          skills: skills.length,
          experiences: exps.length,
          messages: msgs.length,
          unreadMessages: msgs.filter((m) => !m.is_read).length,
        })
      } catch (err) {
        console.error('Failed to load stats:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: '🚀', color: 'blue' },
    { label: 'Certifications', value: stats.certifications, icon: '🏆', color: 'yellow' },
    { label: 'Skills', value: stats.skills, icon: '⚡', color: 'purple' },
    { label: 'Experience', value: stats.experiences, icon: '💼', color: 'green' },
    { label: 'Messages', value: stats.messages, icon: '📬', color: 'pink' },
    { label: 'Unread', value: stats.unreadMessages, icon: '🔔', color: 'red' },
  ]

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600/10 border-blue-600/20 text-blue-400',
    yellow: 'bg-yellow-600/10 border-yellow-600/20 text-yellow-400',
    purple: 'bg-purple-600/10 border-purple-600/20 text-purple-400',
    green: 'bg-green-600/10 border-green-600/20 text-green-400',
    pink: 'bg-pink-600/10 border-pink-600/20 text-pink-400',
    red: 'bg-red-600/10 border-red-600/20 text-red-400',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your portfolio content</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-20 mb-3" />
              <div className="h-8 bg-gray-700 rounded w-12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className={`border rounded-xl p-6 ${colorMap[card.color]}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-80">{card.label}</span>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a href="/admin/projects" className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 hover:border-blue-600/30 transition-colors group">
            <span className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">
              ➕ Add New Project
            </span>
          </a>
          <a href="/admin/certifications" className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 hover:border-blue-600/30 transition-colors group">
            <span className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">
              ➕ Add Certification
            </span>
          </a>
          <a href="/admin/skills" className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 hover:border-blue-600/30 transition-colors group">
            <span className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">
              ➕ Add New Skill
            </span>
          </a>
          <a href="/admin/messages" className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 hover:border-blue-600/30 transition-colors group">
            <span className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">
              📬 View Messages {stats.unreadMessages > 0 && `(${stats.unreadMessages} new)`}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
