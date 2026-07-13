export type Category = {
  name: string
  color: string
  tint: string
}

export const CATEGORIES: Category[] = [
  { name: 'Science',          color: 'var(--cobalt-500)',    tint: 'var(--cobalt-100)' },
  { name: 'History',          color: 'var(--tangerine-500)', tint: 'var(--tangerine-100)' },
  { name: 'Psychology',       color: 'var(--violet-500)',    tint: 'var(--violet-100)' },
  { name: 'Finance',          color: 'var(--magenta-500)',   tint: 'var(--magenta-100)' },
  { name: 'Tech News',        color: 'var(--cobalt-300)',    tint: 'var(--cobalt-100)' },
  { name: 'Computer Science', color: 'var(--tangerine-300)', tint: 'var(--tangerine-100)' },
  { name: 'Health/Wellness',  color: 'var(--violet-300)',    tint: 'var(--violet-100)' },
  { name: 'Other',            color: 'var(--magenta-300)',   tint: 'var(--magenta-100)' },
]

export const CATEGORY_NAMES = CATEGORIES.map(c => c.name)

export function getCategory(name: string): Category {
  return CATEGORIES.find(c => c.name === name) ?? CATEGORIES[CATEGORIES.length - 1]
}
