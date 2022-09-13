import React, { createRef, LegacyRef, useEffect, useRef } from 'react'
import * as THREE from 'three';


type Props = {

}

const Scene = (props: Props): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    console.log("fist render")
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
  }, [containerRef]);

  return (
    <div ref={containerRef} />
  )
}

Scene.propTypes = {}

export default Scene;