import * as THREE from '../libs/three.module.js'
//import {CSG} from '../libs/CSG-v2.js'
import { RoundedBoxGeometry } from 'three-rounded-box';
class MyVictor extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

        // Crear la geometría de la base
    const geometry = new RoundedBoxGeometry(1, 0.2, 1, 0.05, 5);

    // Crear el material
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    // Crear la malla y añadirla a la escena
    const base = new THREE.Mesh(geometry, material);
    this.add(base);

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