import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// standard global variables
var container, scene, camera, renderer, controls;

var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

init();
animate();

// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);
    // RENDERER

        renderer = new THREE.WebGLRenderer( {antialias:true} );

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    // EVENTS

    // CONTROLS
    controls = new OrbitControls( camera, renderer.domElement );

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,150,100);
    scene.add(light);
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    // SKYBOX/FOG
    var skyBoxGeometry = new CubeGeometry( 10000, 10000, 10000 );
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);

    ////////////
    // CUSTOM //
    ////////////

    var material = new THREE.MeshNormalMaterial();

    var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
    var sphere = new THREE.Mesh( sphereGeometry, material );
    sphere.position.set(-60, 55, 0);
    scene.add( sphere );

    var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide } );
    var outlineMesh1 = new THREE.Mesh( sphereGeometry, outlineMaterial1 );
    outlineMesh1.position = sphere.position;
    outlineMesh1.scale.multiplyScalar(1.05);
    scene.add( outlineMesh1 );

    var cubeGeometry = new THREE.CubeGeometry( 80, 80, 80 );
    var cube = new THREE.Mesh( cubeGeometry, material );
    cube.position.set(60, 60, 0);
    scene.add( cube );

    var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
    var outlineMesh2 = new THREE.Mesh( cubeGeometry, outlineMaterial2 );
    outlineMesh2.position = cube.position;
    outlineMesh2.scale.multiplyScalar(1.05);
    scene.add( outlineMesh2 );

}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{


    controls.update();
    stats.update();
}

function render()
{
    renderer.render( scene, camera );
}