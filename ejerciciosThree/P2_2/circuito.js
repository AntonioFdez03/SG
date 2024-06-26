import { color } from '../libs/dat.gui.module.js';
import * as THREE from '../libs/three.module.js'
import { MyTunel } from './tunel.js'

class MyCircuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        // Crear una geometría de tubo con la curva personalizada
        const curve = new THREE.CatmullRomCurve3([
            //new THREE.Vector3(0, 0, 0),//Inicio recta
            new THREE.Vector3(4, 0, 0),//Inicio recta
            new THREE.Vector3(5, 0, 0),//Fin curva e inicio curva
            new THREE.Vector3(7.5, 2, 0),
            new THREE.Vector3(10, 2.7, 0),//Punto mas alto de la curva
            new THREE.Vector3(12.5, 2, 0),
            new THREE.Vector3(15, 0, 0),//Fin curva e inicio del giro
            new THREE.Vector3(23, 2, 2),
            new THREE.Vector3(25, 0, 5),//Fin giro e inicio recta
            new THREE.Vector3(25, 0, 10),
            new THREE.Vector3(23, -2, 13),//Fin recta e inicio curva
            new THREE.Vector3(15, 0, 15),
            new THREE.Vector3(10, 0, 15),//Inicio espiral
            new THREE.Vector3(7, 0.5, 13),
            new THREE.Vector3(6, 1, 10),
            new THREE.Vector3(7, 1.5, 7),
            new THREE.Vector3(10, 2, 6),
            new THREE.Vector3(13, 2.5, 7),
            new THREE.Vector3(14, 3, 10),
            new THREE.Vector3(13, 3.5, 13),
            new THREE.Vector3(10, 4, 14),//Segunda vuelta
            new THREE.Vector3(7, 4.5, 13),
            new THREE.Vector3(6, 5, 10),
            new THREE.Vector3(7, 5.5, 7),
            new THREE.Vector3(10, 6, 6),
            new THREE.Vector3(13, 6.5, 7),
            new THREE.Vector3(14, 7, 10),
            new THREE.Vector3(13, 7.5, 13),
            new THREE.Vector3(10, 8, 14),//Tercera vuelta
            new THREE.Vector3(7, 8.5, 13),
            new THREE.Vector3(6, 9, 10),
            new THREE.Vector3(7, 9.5, 7),
            new THREE.Vector3(10, 10, 5),//Fin espiral 
            new THREE.Vector3(15, 10, 5), // Inicio looping
            new THREE.Vector3(18, 12, 4),
            new THREE.Vector3(19, 15, 3), // Punto más a la derecha del looping
            new THREE.Vector3(18, 17.75, 2),
            new THREE.Vector3(15, 19, 1), // Punto más alto del looping
            new THREE.Vector3(12, 17.75, 0),
            new THREE.Vector3(11, 15, 0), // Punto más a la izquierda del looping
            new THREE.Vector3(12, 12, 0),
            new THREE.Vector3(15, 10, 0),  // Fin looping e inicio recta
            new THREE.Vector3(20, 10, 0),//Fin recta e inicio curva
            new THREE.Vector3(23, 10, 2),
            new THREE.Vector3(24, 10, 5),//Mitad de la curva   
            new THREE.Vector3(23, 10, 8),
            new THREE.Vector3(20, 10, 10),//Fin curva e inicio recta
            new THREE.Vector3(12, 10, 10),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(8, -3, 10),
            new THREE.Vector3(5, -4, 10),
            new THREE.Vector3(2, -3, 10),//Fin recta e inicio curva
            new THREE.Vector3(0, 0, 10),
            new THREE.Vector3(-2, 0, 8),
            new THREE.Vector3(-3, 0, 5),
            new THREE.Vector3(-2, 0, 2),
            new THREE.Vector3(0, 0, 0),//Fin recta e inicio curva
            new THREE.Vector3(4, 0, 0)    
            
        ]);
        
         // El segundo parámetro en false hace que la curva sea abierta
        const geometry = new THREE.TubeGeometry(curve, 1000, 0.5, 64, true);

        // Cargar la textura
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('images/tronco1.jpg');
        // Ajustar las coordenadas de mapeo de la textura para repetirla
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 50); // Ajusta estos valores según sea necesario

        // Crear un material con la textura
        var material = new THREE.MeshPhysicalMaterial({ map: texture, transparent: false, roughness: 1, clearcoat: 1});

        material.bumpMap = texture;
        material.bumpScale = 5;

        //const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        // Crear una malla y añadirla al objeto 3D
        const circuito = new THREE.Mesh(geometry, material);
        
        this.add(circuito);

        const tunel = new MyTunel();

        tunel.position.set(17.5,10,10);
        tunel.rotateZ(Math.PI/2);
        tunel.rotateZ(-0.07);
        tunel.rotateY(-Math.PI/2);

        
        //this.add(tunel);

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