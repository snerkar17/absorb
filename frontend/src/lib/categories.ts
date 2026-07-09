export type Category = {
  name: string
  color: string
  tint: string
}

export const CATEGORIES: Category[] = [
  { name: 'Science',          color: '#2563EB', tint: '#DBEAFE' },
  { name: 'History',          color: '#B45309', tint: '#FEF3C7' },
  { name: 'Psychology',       color: '#7C3AED', tint: '#EDE9FE' },
  { name: 'Finance',          color: '#059669', tint: '#D1FAE5' },
  { name: 'Tech News',        color: '#0891B2', tint: '#CFFAFE' },
  { name: 'Computer Science', color: '#4F46E5', tint: '#E0E7FF' },
  { name: 'Health/Wellness',  color: '#DC2626', tint: '#FEE2E2' },
  { name: 'Other',            color: '#6B7280', tint: '#F3F4F6' },
]

export const CATEGORY_NAMES = CATEGORIES.map(c => c.name)
