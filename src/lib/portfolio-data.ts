import { supabase } from './supabase'
import { projects as staticProjects } from '@/data/projects'
import { experiences as staticExperiences } from '@/data/experience'
import { education as staticEducation, certifications as staticCertifications } from '@/data/education'
import { stack as staticStack } from '@/data/stack'

// Fetch projects from Supabase, fallback to static
export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return { source: 'static' as const, data: staticProjects }
    }

    // Map Supabase format to component format
    const mapped = data.map(p => ({
      name: p.title,
      desc: p.description,
      impact: p.long_description || '',
      tags: p.tech_stack || [],
      color: 'var(--green)',
      github: p.github_url || '#',
      liveUrl: p.live_url,
      imageUrl: p.image_url,
      featured: p.featured,
    }))

    return { source: 'supabase' as const, data: mapped }
  } catch {
    return { source: 'static' as const, data: staticProjects }
  }
}

// Fetch experiences from Supabase, fallback to static
export async function fetchExperiences() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return { source: 'static' as const, data: staticExperiences }
    }

    const mapped = data.map(e => ({
      role: e.role,
      company: e.company,
      period: e.period,
      items: e.responsibilities || [],
      tags: e.tech_stack || [],
    }))

    return { source: 'supabase' as const, data: mapped }
  } catch {
    return { source: 'static' as const, data: staticExperiences }
  }
}

// Fetch certifications from Supabase, fallback to static
export async function fetchCertifications() {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return { source: 'static' as const, data: staticCertifications }
    }

    const mapped = data.map(c => ({
      title: c.title,
      issuer: c.issuer,
      date: c.issue_date,
      credentialUrl: c.credential_url,
      imageUrl: c.image_url,
    }))

    return { source: 'supabase' as const, data: mapped }
  } catch {
    return { source: 'static' as const, data: staticCertifications }
  }
}

// Fetch skills/stack from Supabase, fallback to static
export async function fetchStack() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return { source: 'static' as const, data: staticStack }
    }

    // Group by category
    const grouped: Record<string, string[]> = {}
    for (const skill of data) {
      if (!grouped[skill.category]) grouped[skill.category] = []
      grouped[skill.category].push(skill.name)
    }

    const mapped = Object.entries(grouped).map(([label, items]) => ({
      label,
      items,
    }))

    return { source: 'supabase' as const, data: mapped }
  } catch {
    return { source: 'static' as const, data: staticStack }
  }
}
