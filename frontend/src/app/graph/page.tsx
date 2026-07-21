'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink } from 'd3-force'
import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'
import { getAllNotes, getDayCount } from '@/lib/data'
import { buildGraph, GraphNode } from '@/lib/graph'
import Header from '@/components/Header'
import GraphLockedPanel from '@/components/GraphLockedPanel'

const WIDTH = 900
const HEIGHT = 520

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-2xs)',
  letterSpacing: 'var(--tracking-stamp)',
  textTransform: 'uppercase',
}

function radiusFor(count: number) {
  return 26 + Math.sqrt(count) * 12
}

// d3-force marks x/y as optional because a simulation *could* be read
// mid-flight, but we always read after running it to completion, so they're
// guaranteed to be real numbers by the time we render.
type SimNode = GraphNode & SimulationNodeDatum & { x: number; y: number }

// Before the simulation runs, source/target are just category-name strings
// (per d3-force's own SimulationLinkDatum contract). Running the simulation
// mutates each link in place, replacing those strings with references to the
// actual SimNode objects — SimLink below is that "after" shape.
type PendingLink = SimulationLinkDatum<SimNode> & { weight: number }
type SimLink = { source: SimNode; target: SimNode; weight: number }

export default function GraphPage() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [totalDays, setTotalDays] = useState<number | undefined>(undefined)
  const [rawNotes, setRawNotes] = useState<Awaited<ReturnType<typeof getAllNotes>>>([])
  const [dragOverrides, setDragOverrides] = useState<Record<string, { x: number; y: number }>>({})
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([getDayCount(), getAllNotes()]).then(([count, notes]) => {
      setTotalDays(count)
      setRawNotes(notes)
    })
  }, [])

  // Pure computation derived from rawNotes/totalDays — belongs in useMemo,
  // not an effect+setState, since nothing external needs to be synchronized.
  // totalDays comes from getDayCount() --> count of rows in day table
  const { nodes: baseNodes, edges: baseEdges } = useMemo(() => {
    if (rawNotes.length < 7) return { nodes: [] as SimNode[], edges: [] as SimLink[] }

    const { nodes: graphNodes, edges: graphEdges } = buildGraph(rawNotes)
    if (graphNodes.length === 0) return { nodes: [] as SimNode[], edges: [] as SimLink[] }

    // Seed positions deterministically (spread evenly around a small circle)
    // rather than with Math.random() — a useMemo computation must be pure,
    // and this also avoids every node starting stacked on the exact center.
    const simNodes: SimNode[] = graphNodes.map((n, i) => {
      const angle = (i / graphNodes.length) * 2 * Math.PI
      return {
        ...n,
        x: WIDTH / 2 + Math.cos(angle) * 80,
        y: HEIGHT / 2 + Math.sin(angle) * 80,
      }
    })
    const simLinks: PendingLink[] = graphEdges.map((e) => ({ source: e.source, target: e.target, weight: e.weight }))

    const simulation = forceSimulation(simNodes)
      .force('charge', forceManyBody().strength(-260))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', forceCollide<SimNode>((n) => radiusFor(n.count) + 16))
      .force('link', forceLink<SimNode, PendingLink>(simLinks).id((n) => n.id).distance(150).strength(0.35))
      .stop()

    for (let i = 0; i < 300; i++) simulation.tick()

    return { nodes: simNodes, edges: simLinks as unknown as SimLink[] }
  }, [totalDays, rawNotes])

  const nodes = baseNodes.map((n) => (dragOverrides[n.id] ? { ...n, ...dragOverrides[n.id] } : n))
  const edges = baseEdges.map((e) => ({
    ...e,
    source: dragOverrides[e.source.id] ? { ...e.source, ...dragOverrides[e.source.id] } : e.source,
    target: dragOverrides[e.target.id] ? { ...e.target, ...dragOverrides[e.target.id] } : e.target,
  }))

  useEffect(() => {
    if (!draggingId) return

    const toSvgCoords = (clientX: number, clientY: number) => {
      const svg = svgRef.current
      if (!svg) return { x: 0, y: 0 }
      const rect = svg.getBoundingClientRect()
      return {
        x: (clientX - rect.left) * (WIDTH / rect.width),
        y: (clientY - rect.top) * (HEIGHT / rect.height),
      }
    }

    const handleMove = (e: PointerEvent) => {
      const { x, y } = toSvgCoords(e.clientX, e.clientY)
      setDragOverrides((prev) => ({ ...prev, [draggingId]: { x, y } }))
    }
    const handleUp = () => setDraggingId(null)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [draggingId])

  if (totalDays === undefined) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...kicker, color: 'var(--text-muted)' }}>Loading…</p>
      </div>
    )
  }

  const hoveredNode = nodes.find((n) => n.id === hoveredId)
  const topPairings = hoveredNode
    ? edges
        .filter((e) => e.source.id === hoveredNode.id || e.target.id === hoveredNode.id)
        .map((e) => ({
          other: e.source.id === hoveredNode.id ? e.target.id : e.source.id,
          weight: e.weight,
        }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3)
    : []

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
      <Header />

      <div style={{ padding: '28px 0 20px' }}>
        <div style={{ ...kicker, color: 'var(--accent-strong)', marginBottom: 10 }}>
          Knowledge Graph · {rawNotes.length} Days Mapped
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--weight-medium)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--text-primary)', marginBottom: 8 }}>
          What your mind keeps circling
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
          Categories you&apos;ve logged, sized by how often they come up, linked when they land on the same day.
        </p>
      </div>

      {rawNotes.length < 7 ? (
        <GraphLockedPanel notesLogged={rawNotes.length} />
      ) : (
        <>
          <div style={{
            background: 'var(--surface-card)',
            border: 'var(--border-thin)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: 16,
            position: 'relative',
          }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <g>
                {edges.map((e, i) => (
                  <line
                    key={i}
                    x1={e.source.x}
                    y1={e.source.y}
                    x2={e.target.x}
                    y2={e.target.y}
                    stroke="var(--border-rule)"
                    strokeOpacity={0.55}
                    strokeWidth={1 + e.weight * 1.5}
                  />
                ))}
              </g>
              <g>
                {nodes.map((n) => {
                  const r = radiusFor(n.count)
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x},${n.y})`}
                      onPointerDown={() => setDraggingId(n.id)}
                      onPointerEnter={() => setHoveredId(n.id)}
                      onPointerLeave={() => setHoveredId((id) => (id === n.id ? null : id))}
                      style={{ cursor: 'grab' }}
                    >
                      <circle r={r} style={{ fill: n.color }} />
                      <text
                        textAnchor="middle"
                        dy="0.35em"
                        style={{ fill: 'var(--text-onaccent)', fontFamily: 'var(--font-serif)', fontSize: 18, pointerEvents: 'none' }}
                      >
                        {n.count}
                      </text>
                      <text
                        textAnchor="middle"
                        y={r + 16}
                        style={{
                          fill: 'var(--text-secondary)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          pointerEvents: 'none',
                        }}
                      >
                        {n.id}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>

            {hoveredNode && (
              <div style={{
                position: 'absolute',
                left: `${(hoveredNode.x / WIDTH) * 100}%`,
                top: `${(hoveredNode.y / HEIGHT) * 100}%`,
                transform: 'translate(-50%, calc(-100% - 18px))',
                background: 'var(--surface-inverse)',
                color: 'var(--text-onaccent)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                boxShadow: 'var(--shadow-md)',
              }}>
                <div style={{ ...kicker, color: 'var(--accent)', marginBottom: 4 }}>{hoveredNode.id}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)' }}>
                  {hoveredNode.count} {hoveredNode.count === 1 ? 'note' : 'notes'} · {hoveredNode.daysSpanned} {hoveredNode.daysSpanned === 1 ? 'day' : 'days'}
                </div>
                {topPairings.length > 0 && (
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginTop: 4 }}>
                    Often with {topPairings.map((p) => p.other).join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {nodes.map((n) => (
                <span key={n.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...kicker, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.color, display: 'inline-block' }} />
                  {n.id} · {n.count}
                </span>
              ))}
            </div>
            <div style={{ ...kicker, color: 'var(--text-faint)' }}>
              Deterministic · No AI · Recomputed From Your Notes
            </div>
          </div>
        </>
      )}
    </div>
  )
}
