import * as THREE from "three";

const cursor = {
  x: 0,
  y: 0,
};

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = 2;

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = -2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.innerWidth - 0.5;
  cursor.y = -(e.clientY / window.innerHeight - 0.5);
});

const animate = () => {
  const elapseTime = clock.getElapsedTime();
  group.rotation.x = Math.sin(elapseTime);
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
  camera.lookAt(group.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
