import { supabase } from './supabase'

// ============ PROJECTS ============
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProject(id: string, project: any) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ============ CERTIFICATIONS ============
export async function getCertifications() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data || []
}

export async function getCertification(id: string) {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createCertification(cert: any) {
  const { data, error } = await supabase
    .from('certifications')
    .insert(cert)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateCertification(id: string, cert: any) {
  const { data, error } = await supabase
    .from('certifications')
    .update({ ...cert, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCertification(id: string) {
  const { error } = await supabase
    .from('certifications')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ============ SKILLS ============
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data || []
}

export async function createSkill(skill: any) {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateSkill(id: string, skill: any) {
  const { data, error } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSkill(id: string) {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ============ EXPERIENCES ============
export async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data || []
}

export async function createExperience(exp: any) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(exp)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateExperience(id: string, exp: any) {
  const { data, error } = await supabase
    .from('experiences')
    .update({ ...exp, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteExperience(id: string) {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ============ CONTACT MESSAGES ============
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function markMessageAsRead(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)
  if (error) throw error
}

export async function deleteMessage(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function submitContactMessage(message: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============ SITE SETTINGS ============
export async function getSetting(key: string) {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data?.value || null
}

export async function setSetting(key: string, value: any) {
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )
  if (error) throw error
}
