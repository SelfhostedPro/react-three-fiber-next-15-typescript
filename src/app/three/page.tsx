"use client"
import { Banner } from '@/components/3d/Banner'
import { Carousel } from '@/components/3d/Carousel'
import { Rig } from '@/components/3d/Rig'
import { Box } from '@/components/3d/test'
import { Environment, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function Page() {
    return (
        <div className='w-full h-screen'>
            <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
                <Suspense>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                    {/* <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} /> */}
                    <fog attach="fog" args={['#a79', 8.5, 12]} />
                    <ScrollControls pages={4} infinite>
                        <Rig rotation={[0, 0, 0.15]}>
                            <Carousel />
                        </Rig>
                        <Banner position={[0, -0.15, 0]} />
                    </ScrollControls>
                    <Environment preset="dawn" background blur={0.5} />
                </Suspense>
            </Canvas>
        </div>
    )
}