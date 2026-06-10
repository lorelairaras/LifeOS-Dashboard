export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDb<T>(row: Record<string, any>): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {}
  for (const key of Object.keys(row)) {
    result[snakeToCamel(key)] = row[key]
  }
  return result as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toDb(data: Record<string, any>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== undefined) {
      result[camelToSnake(key)] = data[key]
    }
  }
  return result
}

// For UPDATE paths where the form submits every field: undefined means
// "cleared", which must reach the DB as NULL. Plain toDb() would drop
// the key and the stale value would silently survive.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toDbUpdate(data: Record<string, any>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(data)) {
    result[camelToSnake(key)] = data[key] === undefined ? null : data[key]
  }
  return result
}
