import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyBomba extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Material para el cilindro (color gris)
    var cilindroMaterial = new THREE.MeshBasicMaterial({color: 0x808080});
    var mechaMaterial = new THREE.MeshBasicMaterial({color: 0xe3a278});

    // Material para la esfera (color negro)
    var esferaMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

    // Cilindro
    var cilindro_recorte = new THREE.CylinderGeometry(0.5,0.5,1.5,32);
    var cilindromecha = new THREE.CylinderGeometry(0.2,0.2,0.5,32);
    cilindro_recorte.translate(0,2,0);
    cilindromecha.translate(0,3,0);
    
    var cilindro_interior_M = new THREE.Mesh(cilindro_recorte, cilindroMaterial);
    var cilindro_Mecha = new THREE.Mesh(cilindromecha, mechaMaterial);
    // Esfera
    var esfera_central = new THREE.SphereGeometry(2,32,32);
    var esfera_central_M = new THREE.Mesh(esfera_central, esferaMaterial);

    // Escalar todos los componentes
    var scale = 0.1;
    cilindro_interior_M.scale.set(scale,scale,scale);
    esfera_central_M.scale.set(scale,scale,scale);
    cilindro_Mecha.scale.set(scale,scale,scale);

    

        // Crear un grupo para contener todas las mallas
    var group = new THREE.Group();

    // Añadir todas las mallas al grupo en lugar de unirlas
    group.add(esfera_central_M);
    group.add(cilindro_interior_M);
    group.add(cilindro_Mecha);

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

export { MyBomba };