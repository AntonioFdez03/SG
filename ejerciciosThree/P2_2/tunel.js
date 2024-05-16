import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyTunel extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui,titleGui);
        
        //Cámara del gato
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //this.camera.position.set(0, 0, -1);
        //this.camera.lookAt(0, 0.1, 0);
        this.add(this.camera);

        // Crear geometrías
        //Gato
        var tunel = new THREE.CylinderGeometry(2,2,5,32);
        var recorte = new THREE.CylinderGeometry(1.9,1.9,6,32);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('images/hojas2.jpg');
    
        // Crear un material con la textura
        const material = new THREE.MeshPhysicalMaterial({ map: texture, transparent: false, roughness: 1, clearcoat: 1 });
        var tunel_M = new THREE.Mesh(tunel,material);
        var recorte_M = new THREE.Mesh(recorte,material);

        //Cortas la pieza
        var csg = new CSG();
        csg.subtract([tunel_M,recorte_M]);
        this.tunel_M = csg.toMesh();

        //Añadir a la escena
        this.add(this.tunel_M);
        
        
    }

    createGUI (gui,titleGui) {
        // Aquí puedes añadir controles para la interfaz gráfica de usuario
    }

    update () {
        
    }
}

export { MyTunel };