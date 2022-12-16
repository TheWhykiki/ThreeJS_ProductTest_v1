

import * as THREE from 'three';

let camera, scene, renderer, clock, dataTexture, diffuseMap;

let last = 0;
const position = new THREE.Vector2();
const color = new THREE.Color();

init();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    const loader = new THREE.TextureLoader();
    diffuseMap = loader.load( 'textures/FloorsCheckerboard_S_Diffuse.jpg', animate );
    diffuseMap.minFilter = THREE.LinearFilter;
    diffuseMap.generateMipmaps = false;

    const geometry = new THREE.PlaneGeometry( 2, 2 );
    const material = new THREE.MeshBasicMaterial( { map: diffuseMap } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //

    const width = 300;
    const height = 32;

    const data = new Uint8Array( width * height * 4 );
    dataTexture = new THREE.DataTexture( data, width, height );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    const elapsedTime = clock.getElapsedTime();

    if ( elapsedTime - last > 0.1 ) {

        last = elapsedTime;

        position.x = ( 32 * THREE.MathUtils.randInt( 1, 16 ) ) - 32;
        position.y = ( 32 * THREE.MathUtils.randInt( 1, 16 ) ) - 32;

        // generate new color data

        //updateDataTexture( dataTexture );

        // perform copy from src to dest texture to a random position


    }

    renderer.copyTextureToTexture( position, dataTexture, diffuseMap );
    renderer.render( scene, camera );

}

function updateDataTexture( texture ) {

    const size = texture.image.width * texture.image.height;
    const data = texture.image.data;

    // generate a random color and update texture data

    color.setHex( Math.random() * 0xffff00 );


}

