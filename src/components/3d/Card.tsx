import * as THREE from 'three'
import { ThreeElement, ThreeElements, useFrame } from '@react-three/fiber'
import { Image, ImageProps } from '@react-three/drei'
import { useRef, useState } from 'react'
import { easing } from 'maath'
import { BentPlane } from './geometry/BentPlaneGeometry'

type CardProps = ImageProps & {
    url: string
}

export function Card({ url, ...props }: CardProps) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, hover] = useState(false)
    const pointerOver = (e: any) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)

    useFrame((state, delta) => {
        if (ref.current) {
            easing.damp3(ref.current.scale as THREE.Vector3, hovered ? 1.15 : 1, 0.1, delta)
            if (ref.current.material) {
                easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
                easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
            }
        }
    })
    return (
        <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
            <BentPlane args={[0.1, 1, 1, 20, 20]} />
        </Image>
    )
}