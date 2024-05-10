import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyRayo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var shape = new THREE.Shape();
    shape.lineTo(3.15,3.23);
    shape.lineTo(1.61,3.23);
    shape.lineTo(2.24,4.9);
    shape.lineTo(1.05,4.92);
    shape.lineTo(0,2.41);
    shape.lineTo(1.14,2.38);
    shape.lineTo(0,0);



    const extrudeSettings = {
        steps: 100,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.2,
        bevelOffset: 0.7,
        bevelSegments: 1,
    };




    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var material = new THREE.MeshBasicMaterial({color:0xf4f40b});
    var mesh = new THREE.Mesh(geometry, material);
    var scale = 0.1;
    mesh.scale.set(scale,scale,scale);


    this.add(mesh);

      
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
  }
}

export { MyRayo };