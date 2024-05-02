import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyMoneda extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Material para el cilindro (color gris)
    var cilindroMaterial = new THREE.MeshBasicMaterial({color: 0xE9AD43});
    var cilindroMaterial2 = new THREE.MeshBasicMaterial({color: 0x000000});
    

    var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(1, 0);
        shape.lineTo(0.5, Math.sqrt(3) / 2);
        shape.lineTo(0, 0);

    // Opciones de extrusión
    var extrudeSettings = {
        steps: 1,
        depth: 0.1,
        bevelEnabled: false
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    


    var material = new THREE.MeshBasicMaterial({color:0xE9AD43});
    var mesh = new THREE.Mesh(geometry, material);
    var mesh2 = new THREE.Mesh(geometry, material);

    mesh.translateY(0.17);
    mesh2.translateY(0.17);
    mesh2.translateX(-0.1);

  

    // Cilindro
    var cilindro_recorte = new THREE.CylinderGeometry(2,2,0.5,32);
    cilindro_recorte.rotateX(Math.PI/2);


    var bigotes = new THREE.CylinderGeometry(0.07,0.07,1.5,32);

   

   
    

    
    var cilindro_interior_M = new THREE.Mesh(cilindro_recorte, cilindroMaterial);
    var bigotes_1 = new THREE.Mesh(bigotes, cilindroMaterial2);
    bigotes_1.rotateZ(Math.PI/2);
    bigotes_1.translateY(0.1);
    bigotes_1.translateZ(0.03);
    bigotes_1.translateX(0.03);
    bigotes_1.rotateZ(-15*Math.PI/180);
  


    var bigotes_2 = new THREE.Mesh(bigotes, cilindroMaterial2);
    bigotes_2.rotateZ(Math.PI/2);
    bigotes_2.translateY(0.1);
    bigotes_2.translateZ(0.03);
    bigotes_2.translateX(0.01);
    var bigotes_3 = new THREE.Mesh(bigotes, cilindroMaterial2);

    bigotes_3.rotateZ(Math.PI/2);
    bigotes_3.translateY(0.1);
    bigotes_3.translateZ(0.03);
    bigotes_3.translateX(-0.01);
    bigotes_3.rotateZ(15*Math.PI/180);
    
    
    var bigotes_4 = new THREE.Mesh(bigotes, cilindroMaterial2);
    bigotes_4.rotateZ(Math.PI/2);
    bigotes_4.translateY(-0.1);
    bigotes_4.translateZ(0.03);
    bigotes_4.translateX(0.03);
    bigotes_4.rotateZ(15*Math.PI/180);

    var bigotes_5 = new THREE.Mesh(bigotes, cilindroMaterial2);
    bigotes_5.rotateZ(Math.PI/2);
    bigotes_5.translateY(-0.1);
    bigotes_5.translateZ(0.03);
    bigotes_5.translateX(0.01);
    var bigotes_6 = new THREE.Mesh(bigotes, cilindroMaterial2);
    bigotes_6.rotateZ(Math.PI/2);
    bigotes_6.translateY(-0.1);
    bigotes_6.translateZ(0.03);
    bigotes_6.translateX(-0.01);
    bigotes_6.rotateZ(-15*Math.PI/180);


    var nariz = new THREE.SphereGeometry(0.2,32,32);
    var nariz_M = new THREE.Mesh(nariz, cilindroMaterial2);

    nariz_M.translateZ(0.02);
    nariz_M.translateY(0.01);
 
    // Escalar todos los componentes
    var scale = 0.1;
    cilindro_interior_M.scale.set(scale,scale,scale);
    mesh.scale.set(scale,scale,scale);
    mesh2.scale.set(scale,scale,scale);
    bigotes_1.scale.set(scale,scale,scale);
    bigotes_2.scale.set(scale,scale,scale);
    bigotes_3.scale.set(scale,scale,scale);
    bigotes_4.scale.set(scale,scale,scale);
    bigotes_5.scale.set(scale,scale,scale);
    bigotes_6.scale.set(scale,scale,scale);
    nariz_M.scale.set(scale,scale,scale);



    

    

        // Crear un grupo para contener todas las mallas
   // var group = new THREE.Group();

    // Añadir todas las mallas al grupo en lugar de unirlas
    //group.add(esfera_central_M);
    

    // Añadir el grupo al objeto 3D
   // this.add(group);
   // Crear un grupo
  var group = new THREE.Group();

  // Añadir todos los objetos al grupo
  group.add(cilindro_interior_M);
  group.add(mesh);
  group.add(mesh2);
  group.add(bigotes_1);
  group.add(bigotes_2);
  group.add(bigotes_3);
  group.add(bigotes_4);
  group.add(bigotes_5);
  group.add(bigotes_6);
  group.add(nariz_M);

  // Añadir el grupo al objeto 3D
  this.add(group);
      
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