import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export function useWeeklyFocus() {
  const { user } = useAuth()
  const [text, setText] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured || !user) return
    supabase
      .from('weekly_focus')
      .select('text')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.text) setText(data.text)
      })
  }, [user])

  const updateFocus = useCallback(
    async (value: string) => {
      setText(value)
      if (!isSupabaseConfigured || !user) return
      await supabase
        .from('weekly_focus')
        .upsert({ user_id: user.id, text: value, updated_at: new Date().toISOString() })
    },
    [user],
  )

  return { text, updateFocus }
}
