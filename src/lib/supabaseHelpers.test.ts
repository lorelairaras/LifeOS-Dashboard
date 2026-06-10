import { describe, it, expect } from 'vitest'
import { snakeToCamel, camelToSnake, fromDb, toDb, toDbUpdate } from './supabaseHelpers'

describe('snakeToCamel / camelToSnake', () => {
  it('converts snake_case to camelCase', () => {
    expect(snakeToCamel('job_url')).toBe('jobUrl')
    expect(snakeToCamel('date_applied')).toBe('dateApplied')
  })

  it('converts camelCase to snake_case', () => {
    expect(camelToSnake('jobUrl')).toBe('job_url')
    expect(camelToSnake('dateApplied')).toBe('date_applied')
  })
})

describe('fromDb', () => {
  it('maps snake_case row keys to camelCase', () => {
    expect(fromDb<{ jobUrl: string | null }>({ job_url: null })).toEqual({ jobUrl: null })
  })
})

describe('toDb (INSERT path)', () => {
  it('drops undefined keys so DB defaults apply', () => {
    expect(toDb({ company: 'Acme', notes: undefined })).toEqual({ company: 'Acme' })
  })

  it('keeps null and empty-string values', () => {
    expect(toDb({ notes: null, location: '' })).toEqual({ notes: null, location: '' })
  })
})

describe('toDbUpdate (UPDATE path)', () => {
  it('maps undefined to null so cleared fields persist', () => {
    expect(toDbUpdate({ location: undefined, jobUrl: undefined })).toEqual({
      location: null,
      job_url: null,
    })
  })

  it('keeps defined values and converts keys to snake_case', () => {
    expect(toDbUpdate({ company: 'Acme', dueDate: '2026-06-11' })).toEqual({
      company: 'Acme',
      due_date: '2026-06-11',
    })
  })

  it('does not invent keys absent from the input (partial updates stay partial)', () => {
    expect(toDbUpdate({ status: 'done' })).toEqual({ status: 'done' })
  })
})
