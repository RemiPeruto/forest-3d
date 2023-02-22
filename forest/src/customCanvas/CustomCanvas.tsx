import React, {Suspense, useRef} from 'react';
import {Box, MarchingCube, OrbitControls, PivotControls, Sphere, Torus, TorusKnot} from "@react-three/drei";
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ThreeCanvasContainer} from "./CustomCanvas.style";
import {FrontSide, Matrix4, Mesh, MeshBasicMaterial, SphereGeometry, TorusKnotGeometry} from "three";
import {MeshPhongMaterial} from "three/src/materials/MeshPhongMaterial";

// OrbitControls are necessary to move the model when moving the mouse
// wrapping components with <mesh ref={ref}> enables to "trasnform" the model inside the component (its matrix)

const tree = 'assets/maple_tree/scene.gltf';
const trees = 'assets/trees_and_foliage/scene.gltf';
const deer = 'assets/deer_animations/scene.gltf';

type ModelProps = {path: string;};

const Model: React.FC<ModelProps> = ({path}: ModelProps): JSX.Element => {

    const gltf = useLoader(GLTFLoader, path);
    const ref = useRef<Mesh>(null);
    useFrame(({clock}) => {
        if(ref.current) {
            ref.current.rotation.y = clock.getElapsedTime();
        }
    })
    return (
        <Suspense fallback={null}>
            <mesh ref={ref}>
                <primitive object={gltf.scene} />
            </mesh>
        </Suspense>
    );
}

const Sp: React.FC = (): JSX.Element => {
    const geometry = new SphereGeometry( 15, 32, 16 );
    const material = new MeshPhongMaterial( { color: 0xffff00 } );

    return (
        <Sphere
    geometry={geometry} material={material}
    />
);
}

const Knot: React.FC = (): JSX.Element => {
    const geometry = new TorusKnotGeometry( 1000, 3, 64, 8, 2 ,3 );
    const material = new MeshPhongMaterial( { depthTest: true,
        depthWrite: true,
        opacity: 1,
        alphaTest: 0,
        visible: true,
        side: FrontSide,
        color: 0x00ff00,
        shininess: 30,
        refractionRatio: 0.78,
        reflectivity: 0.80,

        specular: 111111,
        emissive: 0,
    } );
    const ref = useRef<Mesh>(null);
    useFrame(({clock}) => {
        if(ref.current) {
            const floor = Math.floor(clock.getElapsedTime());
            const dy = floor%2 === 1 ? 1: -1;
            ref.current.translateY(dy);
        }
    })
    return (
        <Suspense>
            <mesh ref={ref}>
                <TorusKnot
                    geometry={geometry} material={material}
                />
            </mesh>
        </Suspense>
    );

}

const ThreeCanvas = () => {
    return(
        <ThreeCanvasContainer>
            <Canvas>
                <ambientLight intensity={0.41} />
                <pointLight intensity={1} position={[6, 0, 0]} />
                <OrbitControls />
                <Model path={trees}/>
                <Knot></Knot>
            </Canvas>
        </ThreeCanvasContainer>
    );
}

export default ThreeCanvas;