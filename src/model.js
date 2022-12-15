import * as THREE from 'three';

// Lade den FBXLoader
import { FBXLoader } from 'three';


// Erstelle einen neuen FBXLoader
const loader = new FBXLoader();

// Lade die FBX-Datei
const modelPath = './tasse.fbx';
let model;
loader.load(modelPath, object => {
    model = object;
    scene.add(model);
});

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

// Erstelle eine GUI mit Dat.GUI
const gui = new dat.GUI();

// Erstelle eine Kontrolle für die X-Position des Models
const positionXControl = gui.add(model, 'position.x', -10, 10);

// Erstelle eine Kontrolle für die Y-Position des Models
const positionYControl = gui.add(model, 'position.y', -10, 10);

// Erstelle eine Kontrolle für die Z-Position des Models
const positionZControl = gui.add(model, 'position.z', -10, 10);

// Erstelle ein Select-Feld für die Auswahl von FBX-Dateien
const fbxSelect = document.createElement('select');
fbxSelect.addEventListener('change', e => {
    // Lade die ausgewählte FBX-Datei
    const selectedPath = e.target.value;
    loader.load(selectedPath, object => {
        // Entferne das alte Model aus der Szene
        scene.remove(model);

        // Setze das neue Model als das aktuelle Model
        model = object;

        // Füge das neue Model zur Szene hinzu
        scene.add(model);

        // Aktualisiere die GUI-Kontrollen für das neue Model
        positionXControl.updateDisplay();
        positionYControl.updateDisplay();
        positionZControl.updateDisplay();
    });
});

// Füge Optionen für verschiedene FBX-Dateien zum Select-Feld hinzu
const option1 = document.createElement('option');
option1.value = './tasse.fbx';
option1.textContent = 'Model 1';
fbxSelect.appendChild(option1);

const option2 = document.createElement('option');
option2.value = './donut.fbx';
option2.textContent = 'Model 2';