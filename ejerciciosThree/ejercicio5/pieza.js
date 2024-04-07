import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
 
class MyPieza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
        var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;

		//Se crean los objetos
        var caja_a_perforar = new THREE.BoxGeometry(5,5,2);
        var cilinder_geom = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
        var pieza_geom = new THREE.BoxGeometry(5,4,2);
        var pieza_geom2 = new THREE.BoxGeometry(5,4.5,2);
        
        var agujero_arriba = new THREE.CylinderGeometry(0.35,0.35,1,32);
        var cilindro_agujero_arriba = new THREE.CylinderGeometry(0.35,0.6,0.25,32);
        var agujero_abajo = new THREE.CylinderGeometry(0.35,0.35,1,32);
        var cilindro_agujero_abajo = new THREE.CylinderGeometry(0.35,0.6,0.25,32);

        caja_a_perforar.translate(0,2.5,0);
        pieza_geom.translate(0.5,2,0);
        pieza_geom2.translate(1,2.25,0);
        cilinder_geom.rotateX(Math.PI/2);
        cilinder_geom.translate(-1.5,4,0);

        agujero_arriba.translate(1.5,0.5 + 4.5,0);
        cilindro_agujero_arriba.translate(1.5,0.125 + 4.5,0);
        agujero_abajo.translate(-2,0.35 + 1.15,0);
        cilindro_agujero_abajo.rotateZ(Math.PI/2);
        cilindro_agujero_abajo.translate(-2.12, 0.6 + 0.9, 0);

        var caja_a_perforar_M = new THREE.Mesh(caja_a_perforar, Mat);
        var cilinder_geom_M = new THREE.Mesh(cilinder_geom, Mat);
        var pieza_geom_M = new THREE.Mesh(pieza_geom, Mat);
        var pieza_geom2_M = new THREE.Mesh(pieza_geom2, Mat);

        var agujero_arriba_M = new THREE.Mesh(agujero_arriba, Mat);
        var cilindro_agujero_arriba_M = new THREE.Mesh(cilindro_agujero_arriba, Mat);
        var agujero_abajo_M = new THREE.Mesh(agujero_abajo, Mat);
        var cilindro_agujero_abajo_M = new THREE.Mesh(cilindro_agujero_abajo, Mat);

        var csg_quitar = new CSG();
        csg_quitar.union([pieza_geom_M, pieza_geom2_M, cilinder_geom_M, agujero_arriba_M, 
            cilindro_agujero_arriba_M, agujero_abajo_M, cilindro_agujero_abajo_M]);
    
        var csg = new CSG();
        csg.subtract([caja_a_perforar_M, csg_quitar.toMesh()]);

        this.pieza = csg.toMesh();

        this.add(this.pieza);
        this.pieza.scale.set(0.5, 0.5, 0.5);

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    this.pieza.rotation.y += 0.01;
  }
}

export { MyPieza };