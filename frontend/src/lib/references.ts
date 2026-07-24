export type ReferenceNote = {
  id: string
  text: string
  category: string
  source: string
  url: string
  preview_image: string | null
  created_at: string
}

export function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const DAY_MS = 1000 * 60 * 60 * 24

function ageInDays(isoTimestamp: string): number {
  return (Date.now() - new Date(isoTimestamp).getTime()) / DAY_MS
}

export type ReferenceSections = {
  pastWeek: ReferenceNote[]
  pastMonth: ReferenceNote[]
  pastYear: ReferenceNote[]
}

export function bucketReferenceNotes(notes: ReferenceNote[]): ReferenceSections {
  const sections: ReferenceSections = { pastWeek: [], pastMonth: [], pastYear: [] }

  for (const note of notes) {
    const age = ageInDays(note.created_at)
    if (age <= 7) {
      sections.pastWeek.push(note)
    } else if (age <= 30) {
      sections.pastMonth.push(note)
    } else if (age <= 365) {
      sections.pastYear.push(note)
    }
  }

  return sections
}
