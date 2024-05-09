import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyMoneda extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Material para el cilindro (color gris)
    var material1 = new THREE.MeshBasicMaterial({color: 0xFFDC00});
    var material2 = new THREE.MeshBasicMaterial({color: 0xD5AE0F});
    
    //Partes de la moneda
    var cabeza = new THREE.CylinderGeometry(2,2,0.5,32);
    var nariz = new THREE.SphereGeometry(0.2,32,32);
    var bigotes = new THREE.CylinderGeometry(0.07,0.07,1.5,32);
    var orejas = new THREE.Shape();
        orejas.moveTo(0, 0);
        orejas.lineTo(1, 0);
        orejas.lineTo(0.5, Math.sqrt(3) / 2);
        orejas.lineTo(0, 0);

    // Opciones de extrusión
    var extrudeSettings = {
        steps: 1,
        depth: 0.5,
        bevelEnabled: false
    };

    var geometry = new THREE.ExtrudeGeometry( orejas, extrudeSettings);

    var oreja1 = new THREE.Mesh(geometry, material1);
    var oreja2 = new THREE.Mesh(geometry, material1);

    oreja1.translateY(0.17);
    oreja1.translateZ(-0.025);

    oreja2.translateY(0.17);
    oreja2.translateX(-0.1);
    oreja2.translateZ(-0.025);

    
    cabeza.rotateX(Math.PI/2);
    
    var cabeza_M = new THREE.Mesh(cabeza, material1);
    var bigotes_1 = new THREE.Mesh(bigotes, material2);
    bigotes_1.rotateZ(Math.PI/2);
    bigotes_1.translateY(0.1);
    bigotes_1.translateZ(0.03);
    bigotes_1.translateX(0.03);
    bigotes_1.rotateZ(-15*Math.PI/180);

    var bigotes_2 = new THREE.Mesh(bigotes, material2);
    bigotes_2.rotateZ(Math.PI/2);
    bigotes_2.translateY(0.1);
    bigotes_2.translateZ(0.03);
    bigotes_2.translateX(0.01);
    var bigotes_3 = new THREE.Mesh(bigotes, material2);

    bigotes_3.rotateZ(Math.PI/2);
    bigotes_3.translateY(0.1);
    bigotes_3.translateZ(0.03);
    bigotes_3.translateX(-0.01);
    bigotes_3.rotateZ(15*Math.PI/180);
    
    
    var bigotes_4 = new THREE.Mesh(bigotes, material2);
    bigotes_4.rotateZ(Math.PI/2);
    bigotes_4.translateY(-0.1);
    bigotes_4.translateZ(0.03);
    bigotes_4.translateX(0.03);
    bigotes_4.rotateZ(15*Math.PI/180);

    var bigotes_5 = new THREE.Mesh(bigotes, material2);
    bigotes_5.rotateZ(Math.PI/2);
    bigotes_5.translateY(-0.1);
    bigotes_5.translateZ(0.03);
    bigotes_5.translateX(0.01);
    var bigotes_6 = new THREE.Mesh(bigotes, material2);
    bigotes_6.rotateZ(Math.PI/2);
    bigotes_6.translateY(-0.1);
    bigotes_6.translateZ(0.03);
    bigotes_6.translateX(-0.01);
    bigotes_6.rotateZ(-15*Math.PI/180);

    var nariz_M = new THREE.Mesh(nariz, material2);

    nariz_M.translateZ(0.02);
    nariz_M.translateY(0.01);
 
    // Escalar todos los componentes
    var scale = 0.1;
    cabeza_M.scale.set(scale,scale,scale);
    oreja1.scale.set(scale,scale,scale);
    oreja2.scale.set(scale,scale,scale);
    bigotes_1.scale.set(scale,scale,scale);
    bigotes_2.scale.set(scale,scale,scale);
    bigotes_3.scale.set(scale,scale,scale);
    bigotes_4.scale.set(scale,scale,scale);
    bigotes_5.scale.set(scale,scale,scale);
    bigotes_6.scale.set(scale,scale,scale);
    nariz_M.scale.set(scale,scale,scale);

   // Crear un grupo
  var moneda = new THREE.Group();

  // Añadir todos los objetos al grupo
  moneda.add(cabeza_M);
  moneda.add(oreja1);
  moneda.add(oreja2);
  moneda.add(bigotes_1);
  moneda.add(bigotes_2);
  moneda.add(bigotes_3);
  moneda.add(bigotes_4);
  moneda.add(bigotes_5);
  moneda.add(bigotes_6);
  moneda.add(nariz_M);

  // Añadir el grupo al objeto 3D
  this.add(moneda);
      
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
  }
}

export { MyMoneda };