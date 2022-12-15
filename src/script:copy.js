// Definition der Skalierungsvariable
var textureScale = 1.0;

// Maus-Bewegungs-Handler-Funktion
function onMouseMove( event ) {
    // Berechnung der Mausposition im Bereich von -1 bis 1
    var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
    var mouseY = ( event.clientY / window.innerHeight ) * 2 - 1;

    // Aktualisierung der Skalierungsvariable basierend auf der Mausposition
    textureScale = mouseX * mouseY;
}

// Registrierung der Maus-Bewegungs-Handler-Funktion
window.addEventListener( 'mousemove', onMouseMove );

var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load( 'Base_color.png' );
texture.flipY = true;
texture.flipX = false;
//texture.transformUv(0,1)

var loader = new GLTFLoader();
loader.load( 'becher.glt


    ----



// Hole das Material des Modells und speichere es in einer Variablen
var material = model.material;

// Erstelle eine neue Skalierung für die Textur
var scale = new THREE.Vector2(1, 1);

// Füge einen Event Listener für Mausklicks hinzu
document.addEventListener("click", function() {
    // Wenn der Mauszeiger gedrückt wird, verkleinere die Textur
    if (event.type == "mousedown") {
        scale.x *= 0.9;
        scale.y *= 0.9;
    } else {
        // Ansonsten vergrößere die Textur
        scale.x *= 1.1;
        scale.y *= 1.1;
    }
    // Anpassen der Skalierung der Textur
    material.map.repeat.copy(scale);
    material.map.needsUpdate = true;
});
