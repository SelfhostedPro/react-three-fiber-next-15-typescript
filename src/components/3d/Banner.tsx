import * as THREE from 'three'
import { useRef } from 'react'
import { useTexture, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshSineMat, MeshSineMaterial } from './materials/MeshSineMaterial'


export function Banner(props: any) {
    const ref = useRef<THREE.Mesh>(null)
    const texture = useTexture('/three/work_.png')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    const scroll = useScroll()
    useFrame((state, delta) => {
        if (ref.current) {
            (ref.current.material as MeshSineMaterial).time.value += Math.abs(scroll.delta) * 4;
            if ((ref.current.material as MeshSineMaterial).map) {
                (ref.current.material as MeshSineMaterial).map!.offset.x += delta / 2
            }
        }
    })
    return (
        <mesh ref={ref} {...props}>
            <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
            <MeshSineMat map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
    )
}