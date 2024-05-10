import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyMoneda extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);
    
    //Partes de la moneda
    var contorno_cabeza = new THREE.TorusGeometry(2,0.3,16,100);
    var cabeza = new THREE.CylinderGeometry(2,2,0.5,32);
    var ojo1 = new THREE.SphereGeometry(0.2,32,32);
    var ojo2 = ojo1.clone();
    var nariz = new THREE.SphereGeometry(0.2,32,32);
    var bigote1i = new THREE.CylinderGeometry(0.01, 0.01, 1.25, 32);
    var bigote2i = bigote1i.clone();
    var bigote3i = bigote1i.clone();        
    var bigote1d = bigote1i.clone();
    var bigote2d = bigote1i.clone();        
    var bigote3d = bigote1i.clone();
    var orejas = new THREE.Shape();
    var boca_path = new THREE.Path();
        
    // Forma de las orejas
    orejas.moveTo(-0.5, 0);
    orejas.lineTo(0.5, 0);
    orejas.lineTo(0, Math.sqrt(3) / 2);
    orejas.lineTo(-0.5, 0);

    //Ajustes para las orejas
    var ajustesOrejas = {
        steps: 1,
        depth: 0.45,
        bevelEnabled: false
    };

    //Ajustes para el contorno de las orejas
    var ajustesContornoOrejas = {
        steps: 1,
        depth: 0.25,
        bevelEnabled: false,
    };

    // Forma de la boca
    boca_path.moveTo(-0.1, 0);
    boca_path.absarc(-0.05, 0, 0.05, Math.PI, 0, true);
    boca_path.absarc(0.05, 0, 0.05, Math.PI, 0, true);

    //Cabeza
    cabeza.rotateX(Math.PI/2);
    //Ojos
    ojo1.translate(-0.75,0.5,0.2);
    ojo2.translate(0.75,0.5,0.2);
    //Nariz
    nariz.translate(0,-0.2,0.2);
    // Posicionar los bigotes
    bigote1i.rotateZ(Math.PI/2.5);
    bigote1i.translate(-0.7, -0.2, 0.3);
    bigote2i.rotateZ(Math.PI/2);
    bigote2i.translate(-0.7, -0.4, 0.3);
    bigote3i.rotateZ(-Math.PI/2.5);
    bigote3i.translate(-0.7, -0.6, 0.3);
    bigote1d.rotateZ(-Math.PI/2.5);
    bigote1d.translate(0.7, -0.2, 0.3);
    bigote2d.rotateZ(-Math.PI/2);
    bigote2d.translate(0.7, -0.4, 0.3);
    bigote3d.rotateZ(Math.PI/2.5);
    bigote3d.translate(0.7, -0.6, 0.3);

    // Materiales
    var material1 = new THREE.MeshBasicMaterial({color: 0xFFDC00});
    var material2 = new THREE.MeshBasicMaterial({color: 0xD5AE0F});

    var geometria_orejas = new THREE.ExtrudeGeometry( orejas, ajustesOrejas);
    var geometria_contorno_orejas = new THREE.ExtrudeGeometry( orejas, ajustesContornoOrejas);
    var geometria_boca = new THREE.BufferGeometry().setFromPoints(boca_path.getPoints(50));
    var oreja1 = new THREE.Mesh(geometria_orejas, material1);
    var oreja2 = new THREE.Mesh(geometria_orejas, material1);
    var cabeza_M = new THREE.Mesh(cabeza, material1);
    var ojo1_M = new THREE.Mesh(ojo1, material2);
    var ojo2_M = new THREE.Mesh(ojo2, material2);
    var nariz_M = new THREE.Mesh(nariz, material2);
    var bigote1i_M = new THREE.Mesh(bigote1i, material2);
    var bigote2i_M = new THREE.Mesh(bigote2i, material2);
    var bigote3i_M = new THREE.Mesh(bigote3i, material2);
    var bigote1d_M = new THREE.Mesh(bigote1d, material2);
    var bigote2d_M = new THREE.Mesh(bigote2d, material2);
    var bigote3d_M = new THREE.Mesh(bigote3d, material2);
    var boca_L = new THREE.Line(geometria_boca, material2);

    var contorno_cabeza_M = new THREE.Mesh(contorno_cabeza, material2);
    var contorno_oreja1_M = new THREE.Mesh(geometria_contorno_orejas, material2);
    var contorno_oreja2_M = new THREE.Mesh(geometria_contorno_orejas, material2);
    
    //Orejas
    oreja1.position.set(-0.7,1.85,-0.23);
    oreja2.position.set(0.7,1.85,-0.23);

    //Contorno orejas
    contorno_oreja1_M.position.set(-0.7,1.7,-0.2);
    contorno_oreja1_M.scale.set(1.5,1.5,1.5);
    contorno_oreja2_M.position.set(0.7,1.7,-0.2);
    contorno_oreja2_M.scale.set(1.5,1.5,1.5);

    //Boca 
    boca_L.position.set(0,-0.8,0.3);
    boca_L.rotateX(Math.PI);
    boca_L.scale.set(4,4,4);

    var cara = new THREE.Group();
    cara.add(ojo1_M);
    cara.add(ojo2_M);
    cara.add(nariz_M);
    cara.add(boca_L);
    cara.add(bigote1i_M);
    cara.add(bigote2i_M);
    cara.add(bigote3i_M);
    cara.add(bigote1d_M);
    cara.add(bigote2d_M);
    cara.add(bigote3d_M);
    
    var cara2 = cara.clone();
    cara2.rotateY(Math.PI);
    cara2.position.set(0,0,-0.01);
   // Crear un grupo
    var moneda = new THREE.Group();
    moneda.add(oreja1);
    moneda.add(oreja2);
    moneda.add(cabeza_M);
    moneda.add(contorno_cabeza_M);
    moneda.add(contorno_oreja1_M);
    moneda.add(contorno_oreja2_M);
    moneda.add(cara);
    moneda.add(cara2);

    
    moneda.scale.set(0.25,0.25,0.25);
    // Añadir el grupo al objeto 3D
    this.add(moneda);
      
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
  }
}

export { MyMoneda };