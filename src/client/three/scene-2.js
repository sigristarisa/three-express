import * as THREE from 'three'

const w = window.innerWidth
const h = window.innerHeight
const random = Math.random
const pi = Math.PI

let scene
let camera
let renderer

const numCubes = 4
const cubes = []

function init () {
  // initialize Scene & Camera
  scene = new THREE.Scene()
  const fov = 45 // field of view
  const as = w / h
  const ncp = 0.1 // near clipping plane
  const fcp = 1000 // far clipping plane

  camera = new THREE.PerspectiveCamera(fov, as, ncp, fcp)
  renderer = new THREE.WebGLRenderer()

  renderer.setSize(w, h)
  document.body.appendChild(renderer.domElement)
}

init()

// Primitives

function getBox (w, h, d) {
  const geometry = new THREE.BoxGeometry(w, h, d)
  const material = new THREE.MeshBasicMaterial({
    color: 'white'
  })
  return new THREE.Mesh(geometry, material)
}

function getPlane (w, d) {
  const geometry = new THREE.PlaneGeometry(w, d)
  const material = new THREE.MeshBasicMaterial({
    color: 'blue',
    side: THREE.DoubleSide // "other side of plane"
  })
  return new THREE.Mesh(geometry, material)
}

// generate primitives

for (let i = 0; i < numCubes; i += 1) {
  const w = random() * 2
  const h = random() * 2
  const d = random() * 2
  cubes.push({
    cube: getBox(w, h, d),
    pos: {
      x: random() * 3 - 1.5,
      y: h * 0.5,
      z: random() * 3 - 1.5
    },
    rotInc: {
      x: null,
      y: random() / 100,
      z: null
    }
  })
}
for (const mesh of cubes) {
  scene.add(mesh.cube)
  mesh.cube.position.x = mesh.pos.x
  mesh.cube.position.y = mesh.pos.y
  mesh.cube.position.z = mesh.pos.z
}

const plane = getPlane(4, 4)
scene.add(plane)
plane.rotation.x = pi / 2

// configure camera
camera.position.x = 1
camera.position.y = 1.5
camera.position.z = 5
camera.lookAt(0, 0, 0)

function animate () {
  // interessante anwendung von requestAnimationFrame,
  // ähnlich wie draw() in p5
  for (const c of cubes) {
    c.cube.rotation.x += c.rotInc.x
    c.cube.rotation.y += c.rotInc.y
  }
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
