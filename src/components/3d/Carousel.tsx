import { Card } from './Card'

export function Carousel({ radius = 1.4, count = 8 }) {
    return Array.from({ length: count }, (_, i) => (
      <Card
        key={i}
        url={`/three/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ))
  }