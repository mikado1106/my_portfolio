import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  image_url?: string
  tech_stack: string[]
  live_url?: string
  github_url?: string
  category: string
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_id?: string
  credential_url?: string
  image_url?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  icon?: string
  sort_order: number
  created_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string
  is_current: boolean
  tech_stack: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: Record<string, unknown>
  updated_at: string
}
