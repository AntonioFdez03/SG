import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
 
class MyTuerca extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
        var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;

    //La opcion usada aqui es quedarme con la interseccion de esfera y cilindros
    // para tener los border aplanados y luego, hacer varios toros/cilindros que
    // quiten un poco mas del agujero central y asi hacer las muescas
        var cilindro_tuerca = new THREE.CylinderGeometry(4, 4, 3, 6);
        var esfera_bordes_tuerca = new THREE.SphereGeometry(4.15, 16, 16);
        var cilindro_agujero_central = new THREE.CylinderGeometry(2, 2, 3, 32);
        
        var cilindro_tuerca_M = new THREE.Mesh(cilindro_tuerca, Mat);
        var esfera_bordes_tuerca_M = new THREE.Mesh(esfera_bordes_tuerca, Mat);
        var cilindro_agujero_central_M = new THREE.Mesh(cilindro_agujero_central, Mat);

        var csg = new CSG();
        csg.intersect([cilindro_tuerca_M, esfera_bordes_tuerca_M]);
        //csg.subtract([cilindro_agujero_central_M]);

       // for(var i = 0; i < 10; i++){
            //var toro = new THREE.TorusGeometry(2, 0.15, 16, 16);
            //toro.rotateX(Math.PI/2);
            //toro.translate(0, 1.5-0.15-0.3*i, 0);
            //var toro_M = new THREE.Mesh(toro, Mat);
            //csg.subtract([toro_M]);
        //}

        this.tuerca = csg.toMesh();
        this.add(this.tuerca);

        this.tuerca.position.set(4, 0, 0);
        this.tuerca.scale.set(0.2, 0.2, 0.2);

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    this.tuerca.rotation.y += 0.01;
    this.tuerca.rotation.x += 0.01;
  }
}

export { MyTuerca };