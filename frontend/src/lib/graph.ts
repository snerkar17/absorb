import { getCategory } from '@/lib/categories'

export type GraphNode = {
  id: string
  count: number
  color: string
  daysSpanned: number
}

export type GraphEdge = {
  source: string
  target: string
  weight: number
}

type NoteForGraph = {
  category: string
  days: { date: string } | null
}

export function buildGraph(notes: NoteForGraph[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const counts = new Map<string, number>()
  const categoryDays = new Map<string, Set<string>>()
  const dayCategories = new Map<string, Set<string>>()

  for (const note of notes) {
    const date = note.days?.date
    if (!date) continue

    counts.set(note.category, (counts.get(note.category) ?? 0) + 1)

    if (!categoryDays.has(note.category)) categoryDays.set(note.category, new Set())
    categoryDays.get(note.category)!.add(date)

    if (!dayCategories.has(date)) dayCategories.set(date, new Set())
    dayCategories.get(date)!.add(note.category)
  }

  const nodes: GraphNode[] = [...counts.entries()].map(([category, count]) => ({
    id: category,
    count,
    color: getCategory(category).color,
    daysSpanned: categoryDays.get(category)?.size ?? 0,
  }))

  const edgeWeights = new Map<string, number>()
  for (const categoriesThatDay of dayCategories.values()) {
    const list = [...categoriesThatDay].sort()
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const key = `${list[i]}|${list[j]}`
        edgeWeights.set(key, (edgeWeights.get(key) ?? 0) + 1)
      }
    }
  }

  const edges: GraphEdge[] = [...edgeWeights.entries()].map(([key, weight]) => {
    const [source, target] = key.split('|')
    return { source, target, weight }
  })

  return { nodes, edges }
}
