import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {

}

const Scene = (props: Props): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(60, (containerRef.current?.offsetWidth || 1) / (containerRef.current?.offsetHeight || 1), 0.1, 100);
    const scene = new THREE.Scene();

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.002;
      cube.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerRef.current?.offsetWidth || 0, containerRef.current?.offsetHeight || 0);
    containerRef.current?.appendChild(renderer.domElement);

    // controls
    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener("change", animate);

    // plane
    // const plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(10000, 10000),
    //   new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
    // );
    // plane.position.y = 100;
    // plane.rotation.x = - Math.PI / 2;
    // scene.add(plane);

    // cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFAD00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, 1)
    cube.rotation.y = 0.01;
    scene.add(cube);

    camera.position.z = 5;
    
    // light
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(1, 3, 2)
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xFFFFFFF, 0.2);
    scene.add(ambientLight);

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
