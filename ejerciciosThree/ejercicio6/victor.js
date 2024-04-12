import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyVictor extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);
    var geometry1 = new THREE.BoxGeometry(1, 1, 1);

    // Crear el material
    var material1 = new THREE.MeshNormalMaterial();

    // Crear la malla y añadirla a la escena
    var cube = new THREE.Mesh(geometry1, material1);
   // this.add(cube);


    var geometry2 = new THREE.CylinderGeometry(1, 1, 1,6);

    var material2 = new THREE.MeshNormalMaterial();
    var cili = new THREE.Mesh(geometry2, material2);
   // this.add(cili);


    // Convertir las mallas a CSG

    var csg = new CSG();
    csg.subtract([cube, cili]);
    this.MyVictor = csg.toMesh();
    this.add(this.MyVictor);

  }


  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
    
  }


}

export { MyVictor };