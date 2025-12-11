'use client'

import { useState, useEffect, ReactNode } from 'react'

interface Item {
  id: string
  node: ReactNode
}

interface ChartCarouselProps {
  items: Item[]
}

export default function ChartCarousel({ items }: ChartCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  if (!items || items.length === 0) return null

  return (
    <div className="relative">
      <div className="flex items-center justify-center">{items[index].node}</div>

      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
      >
        ◀
      </button>

      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
      >
        ▶
      </button>

      <div className="flex justify-center gap-2 mt-3">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Ir a ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
