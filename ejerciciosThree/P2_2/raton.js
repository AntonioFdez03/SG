import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyRaton extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var cabeza = new THREE.SphereGeometry(0.5,32,32);
    var morro = new THREE.SphereGeometry(0.2,32,32);
    var nariz = new THREE.SphereGeometry(0.05,32,32);
    var ojo = new THREE.SphereGeometry(0.06,32,32);
    var ojo2 = new THREE.SphereGeometry(0.06,32,32);
    var oreja = new THREE.CylinderGeometry(0.25,0.1,0.02,32);
    var oreja2 = new THREE.CylinderGeometry(0.25,0.1,0.02,32);
    var tapa = new THREE.CylinderGeometry(0.25,0.25,0.02,32);
    var torus = new THREE.TorusGeometry(0.25,0.1,16,100);
    var torus2 = new THREE.TorusGeometry(0.25,0.1,16,100);
    var tapa2 = new THREE.CylinderGeometry(0.25,0.25,0.02,32);
   

    morro.translate(0,0,0.4);

    nariz.translate(0,0,0.6);

    ojo.translate(0.2,0.2,0.4);
    ojo2.translate(-0.2,0.2,0.4);
    oreja.rotateX(Math.PI/2);
    oreja.translate(0.4,0.4,0);
    oreja2.rotateX(Math.PI/2);
    oreja2.translate(-0.4,0.4,0);
    
    
    torus.translate(0.4,0.4,0);
    torus2.translate(-0.4,0.4,0); 
    tapa.rotateX(Math.PI/2);
    tapa.translate(0.4,0.4,-0.07);
    tapa2.rotateX(Math.PI/2);
    tapa2.translate(-0.4,0.4,-0.07);

    

    var material = new THREE.MeshBasicMaterial({color:0xd3cfc7});
    var material2 = new THREE.MeshBasicMaterial({color:0xe6e6de});
    var material3 = new THREE.MeshBasicMaterial({color:0xed83e3});
    var material4 = new THREE.MeshBasicMaterial({color:0x000000});

    var cabeza_M = new THREE.Mesh(cabeza, material);
    var morro_M = new THREE.Mesh(morro, material2);
    var nariz_M = new THREE.Mesh(nariz, material3);
    var ojo_M = new THREE.Mesh(ojo, material4);
    var ojo2_M = new THREE.Mesh(ojo2, material4);
    var oreja_M = new THREE.Mesh(oreja, material3);
    var oreja2_M = new THREE.Mesh(oreja2, material3);
    var torus_M = new THREE.Mesh(torus, material);
    var tapa_M = new THREE.Mesh(tapa, material);
    var torus2_M = new THREE.Mesh(torus2, material);
    var tapa2_M = new THREE.Mesh(tapa2, material);
    
    

        // Crear un grupo
    var group = new THREE.Group();
// Añadir todos los objetos al grupo
group.add(cabeza_M);
group.add(morro_M);
group.add(nariz_M);
group.add(ojo_M);
group.add(ojo2_M);
group.add(oreja_M);
group.add(oreja2_M);
group.add(torus_M);
group.add(tapa_M);
group.add(torus2_M);
group.add(tapa2_M);

// Asegurarte de que cada malla tiene una referencia al grupo del ratón
cabeza_M.userData.raton = group;
morro_M.userData.raton = group;
nariz_M.userData.raton = group;
ojo_M.userData.raton = group;
ojo2_M.userData.raton = group;
oreja_M.userData.raton = group;
oreja2_M.userData.raton = group;
torus_M.userData.raton = group;
tapa_M.userData.raton = group;
torus2_M.userData.raton = group;
tapa2_M.userData.raton = group;


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

export { MyRaton };