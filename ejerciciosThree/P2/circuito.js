import * as THREE from '../libs/three.module.js'
//import {CSG} from '../libs/CSG-v2.js'

class CustomCurve extends THREE.Curve {
    getPoint(t) {
        const radius = 1;
        const tubeRadius = 0.02;
        const radialSegments = 100;
        const tubularSegments = 20;
        const p = 2; // Número de espirales
        const q = 3; // Número de vueltas alrededor del tubo por cada espiral

        const u = p * t;
        const v = q * t;

        const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
        const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
        const z = tubeRadius * Math.sin(v);

        return new THREE.Vector3(x, y, z);
    }
}

class MyCircuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        // Crear una geometría de tubo con la curva personalizada
        const curve = new CustomCurve();
        const geometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, true);

        // Crear un material
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, flatShading: false });

        // Crear una malla y añadirla al objeto 3D
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);

        this.createGUI(gui,titleGui);
    }

    createGUI (gui,titleGui) {
        // Aquí puedes añadir controles para la interfaz gráfica de usuario
    }

    update () {
        // Aquí puedes actualizar la geometría del corazón
        //this.children[0].rotation.y += 0.05;
    }
}

export { MyCircuito };