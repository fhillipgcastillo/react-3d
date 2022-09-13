import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {

}

const Scene = (props: Props): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (containerRef.current?.offsetWidth || 1) / (containerRef.current?.offsetHeight || 1), 0.1, 1000);
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerRef.current?.offsetWidth || 0, containerRef.current?.offsetHeight || 0);
    containerRef.current?.appendChild(renderer.domElement);

    // controls
    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener("change", animate);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
    );
    plane.position.y = 100;
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x07cfcf });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    camera.position.z = 5;

    

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
