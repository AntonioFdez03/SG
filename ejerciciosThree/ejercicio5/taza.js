import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
 
class MyTaza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
        var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;

		//Se crean los objetos
        var cilindro_exterior = new THREE.CylinderGeometry(1.25, 1.25, 2.5, 50, 1);
        var cilindro_interior = new THREE.CylinderGeometry(1.175, 1.175, 2.5, 50, 1);
        var asa = new THREE.TorusGeometry(0.75, 0.125, 24, 24);
        
        cilindro_interior.translate(0, 0.3, 0);
        asa.translate(-1.25, 0, 0);

        // Se crean los nodos Mesh
        var cilindro_exterior_M = new THREE.Mesh(cilindro_exterior, Mat);
        var cilindro_interior_M = new THREE.Mesh(cilindro_interior, Mat);
        var asa_M = new THREE.Mesh(asa, Mat);
    
        var csg = new CSG();
        csg.union([cilindro_exterior_M, asa_M]);
        csg.subtract([cilindro_interior_M]);

        this.taza = csg.toMesh();

        this.taza.position.set(-4,1,0);
        this.add(this.taza);

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    this.taza.rotation.y += 0.01;
    this.taza.rotation.x += 0.01;
  }
}

export { MyTaza };