import * as THREE from 'three'
import { extend, type ThreeElement, type ThreeElements } from '@react-three/fiber'

export class MeshSineMaterial extends THREE.MeshBasicMaterial {
    time = { value: 0 }
    constructor(parameters = {}) {
        super(parameters)
        this.setValues(parameters)
        this.time = { value: 0 }
    }
    onBeforeCompile(shader: THREE.ShaderLibShader) {
        shader.uniforms.time = this.time
        shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`
        )
    }
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        MeshSineMat: ThreeElement<typeof MeshSineMaterial>
    }
}

const MeshSineMat = extend(MeshSineMaterial)

export { MeshSineMat }