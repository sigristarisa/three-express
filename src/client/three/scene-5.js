import * as THREE from "three";
let t = 0;
let isMoving = false;

const createRandomXY = (direction) => {
  const randomX1 = Math.random() * direction;
  const randomY1 = Math.random() * direction;
  const randomX2 = Math.random() * direction;
  const randomY2 = Math.random() * direction;
  const A = new THREE.Vector3(randomX1, randomY1, 0);
  const B = new THREE.Vector3(randomX2, randomY2, 0);

  return { A, B };
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff));

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshStandardMaterial({ color: 0xe2b324 });
const sphere2 = new THREE.Mesh(geometry2, material2);

scene.add(sphere);
scene.add(sphere2);

function animate() {
  if (!isMoving) {
    return;
  } else {
    t += 0.01;
    if (t > 1) t = 0;

    let easeFactor = (Math.sin(t * Math.PI - Math.PI / 2) + 1) / 2;
    sphere.position.lerpVectors(
      createRandomXY(10).A,
      createRandomXY(10).B,
      easeFactor
    );
     let easeFactor2 = (Math.sin(t * Math.PI - Math.PI / 2) + 1) / 2;
     sphere2.position.lerpVectors(
       createRandomXY(-10).A,
       createRandomXY(-10).B,
       easeFactor2
     );

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}

// Start animation when "S" is pressed
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "s") {
    isMoving = true;
    animate();
  }
});

// Position camera
camera.position.z = 10;

// Initial render (before animation starts)
renderer.render(scene, camera);
