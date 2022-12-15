import {GUI} from "dat.gui";

export function setGUI(guiObject)
{
    const gui = new GUI();
    const folder1 = gui.addFolder(guiObject.type + ' Position')

    gui.add(guiObject.position, 'x', 0, 10);
    gui.add(guiObject.position, 'y', 0, 10);
    gui.add(guiObject.position, 'z', -10, 10);

    const folder2 = gui.addFolder(guiObject.type + ' Rotation')
    gui.add(guiObject.rotation, 'x', 0, 10);
    gui.add(guiObject.rotation, 'y', 0, 10);
    gui.add(guiObject.rotation, 'z', -10, 10);
   // console.log(guiObject.type + ' Infos:', guiObject)
}

export function debugMaterial(material)
{
    const gui = new GUI();
    const folder1 = gui.addFolder(material.type + ' Rotation')
    gui.add(material, 'rotation', 0, 10);

    const folder2 = gui.addFolder(material.type + ' Repeat')
    gui.add(material.repeat, 'x', -10, 10);
    gui.add(material.repeat, 'y', -10, 10);

    const folder3 = gui.addFolder(material.type + ' Center')
    gui.add(material.center, 'x', -10, 10);
    gui.add(material.center, 'y', -10, 10);

    console.log(material)
}
export function debugMaterial2(material)
{
    const gui = new GUI();
    const folder1 = gui.addFolder(material.type + ' Scale')

    //gui.add(material, 'scale', 0, 10);

    console.log(material)
}