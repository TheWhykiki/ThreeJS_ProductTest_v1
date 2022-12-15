// Größe des Würfels
const size = 1;

// Erstelle eine neue Szene
const scene = new THREE.Scene();

// Erstelle eine Kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setze die Kamera in Position und richtung
camera.position.z = 5;

// Erstelle ein Renderer
const renderer = new THREE.WebGLRenderer();

// Setze die Größe des Renderers
renderer.setSize(window.innerWidth, window.innerHeight);

// Füge den Renderer zum DOM hinzu
document.body.appendChild(renderer.domElement);

// Erstelle einen Würfel-Geometry
const geometry = new THREE.BoxGeometry(size, size, size);

// Erstelle ein Material für den Würfel
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

// Erstelle ein Mesh aus Geometry und Material
const cube = new THREE.Mesh(geometry, material);

// Füge den Würfel zur Szene hinzu
scene.add(cube);

// Rufe die render-Funktion auf, um den Würfel darzustellen
render();

function render() {
    // Drehe den Würfel um seine Y-Achse
    cube.rotation.y += 0.01;

    // Render die Szene und die Kamera
    renderer.render(scene, camera);

    // Rufe die Funktion bei jedem Bildschirm-Refresh erneut auf
    requestAnimationFrame(render);
}