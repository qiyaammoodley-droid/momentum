import { supabase } from './supabase'

export type ProfilePreferences = {
  name: string
  accent: string
  theme: 'light' | 'dark' | 'system'
  density: 'comfortable' | 'compact'
  focus: string
  aiGoals: boolean
  aiTasks: boolean
  aiHabits: boolean
  aiReviews: boolean
  aiTone: string
}

type UserProfile = {
  id: string
  display_name: string | null
  timezone: string
  theme_preferences: Record<string, unknown>
  ai_preferences: Record<string, unknown>
}

const defaultPreferences: ProfilePreferences = {
  name: '',
  accent: '#167D63',
  theme: 'light',
  density: 'comfortable',
  focus: '',
  aiGoals: true,
  aiTasks: true,
  aiHabits: false,
  aiReviews: false,
  aiTone: 'Direct & encouraging',
}

export async function getUserProfile(
  userId: string
): Promise<ProfilePreferences> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(`Could not load profile: ${error.message}`)
  }

  const profile = data as UserProfile
  const theme = profile.theme_preferences ?? {}
  const ai = profile.ai_preferences ?? {}

  return {
    ...defaultPreferences,
    name: profile.display_name ?? '',
    accent: (theme.accent as string) ?? defaultPreferences.accent,
    theme: (theme.theme as ProfilePreferences['theme']) ?? defaultPreferences.theme,
    density: (theme.density as ProfilePreferences['density']) ?? defaultPreferences.density,
    focus: (theme.focus as string) ?? defaultPreferences.focus,
    aiGoals: (ai.aiGoals as boolean) ?? defaultPreferences.aiGoals,
    aiTasks: (ai.aiTasks as boolean) ?? defaultPreferences.aiTasks,
    aiHabits: (ai.aiHabits as boolean) ?? defaultPreferences.aiHabits,
    aiReviews: (ai.aiReviews as boolean) ?? defaultPreferences.aiReviews,
    aiTone: (ai.aiTone as string) ?? defaultPreferences.aiTone,
  }
}

export async function saveUserProfile(
  userId: string,
  preferences: ProfilePreferences
): Promise<void> {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      display_name: preferences.name,
      theme_preferences: {
        accent: preferences.accent,
        theme: preferences.theme,
        density: preferences.density,
        focus: preferences.focus,
      },
      ai_preferences: {
        aiGoals: preferences.aiGoals,
        aiTasks: preferences.aiTasks,
        aiHabits: preferences.aiHabits,
        aiReviews: preferences.aiReviews,
        aiTone: preferences.aiTone,
      },
    })
    .eq('id', userId)

  if (error) {
    throw new Error(`Could not save profile: ${error.message}`)
  }
}
