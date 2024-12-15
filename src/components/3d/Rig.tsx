import * as Three from 'three'
import { useScroll } from '@react-three/drei'
import { ThreeElements, ReactProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'


export function Rig(props: any) {
    const ref = useRef<ThreeElements['group']>(null)
    const scroll = useScroll()
    useFrame((state, delta) => {
        if (ref.current && ref.current.rotation) {
            (ref.current.rotation as Three.Euler).y = -scroll.offset * (Math.PI * 2) // Rotate contents
        }
        state.events.update?.() // Raycasts every frame rather than on pointer-move
        easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
        state.camera.lookAt(0, 0, 0) // Look at center
    })
    return <group ref={ref} {...props} />
}