import React, { createRef, LegacyRef, useEffect, useRef } from 'react'
import * as THREE from 'three';

type Props = {

}

const Scene = (props: Props): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (containerRef.current?.offsetWidth || 1) / (containerRef.current?.offsetHeight || 1), 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerRef.current?.offsetWidth || 0, containerRef.current?.offsetHeight || 0);
    containerRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x07cfcf });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
    return () => { containerRef.current?.removeChild(renderer.domElement) };
  }, [containerRef.current]);

  return (
    <div className='canvasContainer' style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <div ref={containerRef} style={{
        flex: 1,
        flexWrap: "wrap",
      }} />
    </div >
  )
}

export default Scene;
