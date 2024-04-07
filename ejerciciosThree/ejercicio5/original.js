import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
 
class MyOriginal extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
        var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;

		//Se crean los objetos
        var cubo_ext = new THREE.BoxGeometry(5,7,5);
        var cilindro_interior = new THREE.CylinderGeometry(2,2,7,32);
        var esfera = new THREE.SphereGeometry(2,32);
        
       
        esfera.translate(0.5,-0.5);     
        // Se crean los nodos Mesh
        var cubito = new THREE.Mesh(cubo_ext, Mat);
        var cilindro_interior_M = new THREE.Mesh(cilindro_interior, Mat);
        var esferita = new THREE.Mesh(esfera, Mat);
    
        var csg = new CSG();
        csg.union([cubito,cilindro_interior_M]);
        csg.subtract([esferita]);

        this.original = csg.toMesh();

       
        this.add(this.original);

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    this.original.rotation.y += 0.01;
    this.original.rotation.x += 0.01;
  }
}

export { MyOriginal };