import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Check WebGL2 availability
if (WebGL.isWebGL2Available()) {
    // Create renderer and set size
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(-10, 30, 30);

    // Create orbit controls
    const orbit = new OrbitControls(camera, renderer.domElement);

    // Add axes helper to the scene
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Create and add a box to the scene
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // Create and add a line to the scene
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(10, 0, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load('path/to/model.glb', function (gltf) {
        const model = gltf.scene;

        // Position the model
        model.position.set(0, 0, 0); // Set x, y, z coordinates
        model.scale.set(1, 1, 1); // Optionally set scale
        model.rotation.set(0, 0, 0); // Optionally set rotation

        // Add model to the scene
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });

    // Animation loop
    function animate() {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
        orbit.update();
        renderer.render(scene, camera);
    }

    // Set the animation loop
    renderer.setAnimationLoop(animate);

} else {
    // WebGL2 is not available, display a warning message
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}
