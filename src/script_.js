import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 100
camera.position.y = 0


//camera.rotateY(14)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

// controls
//const controls = new OrbitControls( camera, renderer.domElement );

// Object
const geometry              = new THREE.BoxGeometry(1, 1, 1)

//const material              = new THREE.MeshBasicMaterial({ color: '#FF0000' })

// material
const material = new THREE.MeshPhysicalMaterial({})
material.reflectivity = 0
material.transmission = 1.0
material.roughness = 0.2
material.metalness = 0
material.clearcoat = 0.3
material.clearcoatRoughness = 0.25
material.color = new THREE.Color(0xffffff)
material.ior = 1.2
material.thickness = 10.0

//const materialBoden         = new THREE.MeshBasicMaterial({ color: '#CCCCCC' })
const materialBoden = new THREE.MeshBasicMaterial( {
    color: '#CCCCCC',
    reflectivity: 50
} );
const wuerfel1              = new THREE.Mesh(geometry, material);
const boden                 = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 100), materialBoden);
boden.position.y = -1;
scene.add(wuerfel1)
wuerfel1.position.y = 0
wuerfel1.rotation.reorder('YXZ')
const test = Math.PI * 45
//console.log(wuerfel1.rotation)
wuerfel1.rotation.y = Math.PI / 1.5
wuerfel1.rotation.x = Math.PI / 1.5
wuerfel1.rotation.z = Math.PI / 1.5
//console.log(wuerfel1.rotation)
//scene.add(boden)

// ambient
//scene.add( new THREE.AmbientLight( '#FF00FF' ) );

// light
var light = new THREE.DirectionalLight( '#FF00FF', 100 );
light.position.set( 20,10, 1 );
console.log(light.position)
scene.add( light );
const triangleCount = 50

const triangles = [];
function addTriangles()
{
    const shape = new THREE.Shape();

    const x = 0;
    const y = 0;

    shape.moveTo(x - 2, y - 2);
    shape.lineTo(x + 2, y - 2);
    shape.lineTo(x, y + 4);

    const TriangleGeometry = new THREE.ShapeGeometry(shape);
    const triangleGroup = new THREE.Group();

    for(var i = 0; i < triangleCount; i++)
    {
        triangles[i]              = new THREE.Mesh(TriangleGeometry, material);
        console.log(i)
        triangles[i].position.x = (Math.random() - 0.5) * 5;
        triangles[i].position.y =  (Math.random() - 0.5) * 5;
        triangles[i].position.z =  (Math.random() - 0.5) * 5;
        triangles[i]   .rotation.reorder('YXZ')
        const rotationDegree = Math.PI * (Math.random() * 10);
        triangles[i].rotation.y =  Math.PI * (Math.random() * 10);
        triangles[i].rotation.x =  Math.PI * (Math.random() * 10);
        triangles[i].rotation.z =  Math.PI * (Math.random() * 10);
        triangleGroup.add(triangles[i])
    }
    scene.add(triangleGroup)
    console.log('trianglesADDED')
}

const cubes = [];
function addCubes()
{

    const cubeGroup = new THREE.Group();

    for(var i = 0; i < triangleCount; i++)
    {
        cubes[i]              = new THREE.Mesh(geometry, material);
        cubes[i].scale.x = (Math.random() + 10) * 5
        cubes[i].position.x = (Math.random() + 5) * 5;
        cubes[i].position.y =  (Math.random() + 5) * 5;
        cubes[i].position.z =  (Math.random() + 5) * 5;
        console.log(cubes[i].position)
        //cubeGroup.add(cubes[i])
        scene.add(cubes[i])
    }
    scene.add(cubeGroup)
    console.log('cubesADDED')
}

function rotateTriangles(triangles, speed)
{
    for(var i = 0; i < triangleCount; i++)
    {
        triangles[i].rotation.reorder('YXZ')
        triangles[i].rotation.x =  speed;
        triangles[i].rotation.y =  speed;
        //triangles[i].rotation.z =  Math.PI * (Math.random() * 10);
    }
}



// Spielerei Würfel rumfahren
/*
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        //Left
        wuerfel1.position.x = wuerfel1.position.x -1;
        console.log(wuerfel1.position)
    }
    else if(event.keyCode == 39) {
        // Right
        wuerfel1.position.x = wuerfel1.position.x + 1;
        console.log(wuerfel1.position)
    }
    else if(event.keyCode == 38) {
        //Up
        wuerfel1.position.z = wuerfel1.position.z - 1;
        console.log(wuerfel1.position)
    }
    else if(event.keyCode == 40) {
        //Down
        wuerfel1.position.z = wuerfel1.position.z + 1;
        console.log(wuerfel1.position)
    }
    renderer.render(scene, camera)
});
*/
window.onresize = render();
//render();
function render(){
    console.log('rendered')
    renderer.render(scene, camera)
}

//window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    camera.position.x = (event.clientX );
    camera.position.y = (event.clientY );
}


window.addEventListener('scroll', function(e) {
    const rotateX = -(window.scrollY/100000);
    //camera.position.y = window.scrollY * 0.5;
    camera.rotation.x = rotateX;
    console.log(rotateX)
    console.log(camera.rotateX())
});

//Clock
const clock = new THREE.Clock()


// Animation
const animate = () => {
    //console.log('tick')

    //Time
    const elapsedTime = clock.getElapsedTime();
    const speedFactor = 5
    const speed = elapsedTime * speedFactor

    //Update objects
    wuerfel1.rotation.y = speed
    //console.log(triangles)
    //rotateTriangles(triangles, speed)
    rotateTriangles(cubes, speed)

    //Render
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
addCubes();
//addTriangles();
animate();