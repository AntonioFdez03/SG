import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
 
class MyOriginal extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
        var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;

		//Se crean los objetos
        var cubo_ext = new THREE.BoxGeometry(5,5,5);
        var cilindro_interior = new THREE.CylinderGeometry(2,2,7.3,32);
        var esfera = new THREE.SphereGeometry(3,32);
        var torus = new THREE.TorusGeometry(2,0.5,16,100);
        
       
        esfera.translate(0,-0.45,0);  
        torus.rotateX(Math.PI/2);
        torus.translate(3,2,0);  
        // Se crean los nodos Mesh
       
        var cubito = new THREE.Mesh(cubo_ext, Mat);
        var cilindro_interior_M = new THREE.Mesh(cilindro_interior, Mat);
        var esferita = new THREE.Mesh(esfera, Mat);
        var torus_M = new THREE.Mesh(torus, Mat);
    
        var csg = new CSG();
        csg.union([torus_M,cubito]);
        csg.subtract([cubito,cilindro_interior_M]);
        csg.subtract([esferita]);
        

        this.original = csg.toMesh();

       
        this.add(this.original);

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    //this.original.rotation.y += 0.01;
    //this.original.rotation.x += 0.01;
  }
}

export { MyOriginal };