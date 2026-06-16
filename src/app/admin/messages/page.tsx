'use client'

import { useState, useEffect } from 'react'
import { getContactMessages, markMessageAsRead, deleteMessage } from '@/lib/api'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    try {
      const data = await getContactMessages()
      setMessages(data)
    } catch (err) {
      console.error('Failed to load messages:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleRead(msg: Message) {
    setSelected(msg)
    if (!msg.is_read) {
      try {
        await markMessageAsRead(msg.id)
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
        )
      } catch (err) {
        console.error('Failed to mark as read:', err)
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this message?')) return
    try {
      await deleteMessage(id)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      console.error('Failed to delete message:', err)
    }
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-gray-400 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#1a1a2e] rounded-2xl w-full max-w-lg p-6 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white truncate">{selected.subject || 'No Subject'}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-medium">
                    {selected.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{selected.name}</p>
                  <p className="text-gray-400 text-xs">{selected.email}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs">
                {new Date(selected.created_at).toLocaleString()}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a2e] rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{selected.message}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium text-center"
              >
                Reply via Email
              </a>
              <button
                onClick={() => {
                  handleDelete(selected.id)
                  setSelected(null)
                }}
                className="px-4 py-2.5 bg-transparent border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#111111] border border-[#1a1a2e] rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-40 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-72" />
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] border border-[#1a1a2e] rounded-xl">
          <p className="text-gray-400">No messages yet.</p>
          <p className="text-gray-500 text-sm mt-1">Messages from your contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleRead(msg)}
              className={`bg-[#111111] border rounded-xl p-4 cursor-pointer group hover:border-[#2a2a3e] transition-colors ${
                msg.is_read ? 'border-[#1a1a2e]' : 'border-blue-600/30 bg-blue-600/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                    <h3 className={`font-medium truncate text-sm ${msg.is_read ? 'text-gray-300' : 'text-white'}`}>
                      {msg.subject || 'No Subject'}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{msg.name} &lt;{msg.email}&gt;</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-500 text-xs">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(msg.id)
                    }}
                    className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    🗑️
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
