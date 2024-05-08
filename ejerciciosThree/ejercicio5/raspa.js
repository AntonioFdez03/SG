import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyRaspa extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Material para el cilindro 
    var cilindroMaterial = new THREE.MeshBasicMaterial({color: 0x00000});

    var cilindro_recorte = new THREE.CylinderGeometry(1,1,6.5,32);
    var cilindro_cuerpo = new THREE.CylinderGeometry(1,1,13.5,32);
    var cilindro_raspa = new THREE.CylinderGeometry(3.5,3.5,3,32);

    var cubo_recorte = new THREE.BoxGeometry(2.5,0.5,5);
    
    cilindro_cuerpo.rotateZ(Math.PI/2);
    cilindro_cuerpo.translate(6.2,2.7,0.9);
    cilindro_recorte.rotateX(Math.PI/2);
    cilindro_recorte.translate(-1.5,4,0);
    cilindro_raspa.rotateX(Math.PI/2);
    cilindro_raspa.translate(22,-2,1);
    cubo_recorte.translate(16,3,0);


    var cilindro = new THREE.Mesh(cilindro_recorte, cilindroMaterial);
    var cilindro2 = new THREE.Mesh(cilindro_cuerpo, cilindroMaterial);
    var cilindro3 = new THREE.Mesh(cilindro_raspa, cilindroMaterial);
    var cubo = new THREE.Mesh(cubo_recorte, cilindroMaterial);
    var cubo2 = new THREE.Mesh(cubo_recorte, cilindroMaterial);
    var cubo3 = new THREE.Mesh(cubo_recorte, cilindroMaterial);

    cubo3.translateY(0.1);
    cubo2.translateY(-0.2);
    cubo.translateY(-0.07);
    // Material para el triángulo
    var material = new THREE.MeshBasicMaterial({color: 0x808080});

    // Crear una forma que describa el contorno del triángulo
    var shape = new THREE.Shape();
    shape.lineTo(5,0);
    shape.bezierCurveTo(5,0.5,5,2,2.5,4);
    shape.bezierCurveTo(2.5,4,0,2,0,0);

    var shape2 = new THREE.Shape();
    shape2.bezierCurveTo(1,1,3,1,4,0);
 



    

    const extrudeSettings = {
        steps: 100,
        depth: 1.8,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.7,
        bevelOffset: 0.7,
        bevelSegments: 1,
    };

    // Crear la geometría
    var cabeza = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var cola = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var raspa = new THREE.ExtrudeGeometry(shape2, extrudeSettings);

    // Crear la malla
    var mesh = new THREE.Mesh(cabeza, material);
    var mesh2 = new THREE.Mesh(cola, material);
    var mesh3 = new THREE.Mesh(raspa, material);
    var scale1 = 0.07;
    var scale = 0.1;
    mesh.scale.set(scale,scale,scale);
    cilindro.scale.set(scale,scale,scale);
    cilindro2.scale.set(scale,scale,scale);
    mesh2.scale.set(scale1,scale1,scale1);
    mesh3.scale.set(scale,scale,scale);
    cilindro3.scale.set(scale,scale,scale);
    cubo.scale.set(scale,scale,scale);
    cubo2.scale.set(scale,scale,scale);
    cubo3.scale.set(scale,scale,scale);
    
    

    


    mesh.rotateZ(Math.PI/2);

    mesh2.rotateZ(Math.PI/2);
    mesh2.translateY(-1.5);
    mesh2.translateX(0.09);

    mesh3.translateX(2);
    
   var csg = new CSG();
   //var csg2 = new CSG();


   mesh3.rotateZ(Math.PI/2);
   mesh3.translateY(1.5);
    mesh3.translateX(0.09);

    
  

    csg.subtract([mesh, cilindro]);
    csg.union([cilindro2]);
    csg.union([mesh2]);
    csg.subtract([cubo]);
    csg.subtract([cubo2]);
    csg.subtract([cubo3]);
    csg.union([mesh3]);
    csg.subtract([cilindro3]);
    

    
  

    this.Myraspa = csg.toMesh();

/*
    csg2.subtract([mesh3, cilindro3]);

    this.Myraspa2 = csg2.toMesh();
    this.Myraspa2_2 = csg2.toMesh();

    this.Myraspa2.rotateZ(Math.PI/2);
    this.Myraspa2.translateX(-1.95);
    this.Myraspa2.translateY(-1);


    
    this.Myraspa2_2.rotateZ(Math.PI/2);
    this.Myraspa2_2.translateX(-1.95);
    this.Myraspa2_2.translateY(-0.5);
    
    //this.Myraspa2 = csg2.toMesh();
*/
    

        //this.add(this.Myraspa2);
    // Crear un grupo
   /* var group = new THREE.Group();

    // Añadir todos los objetos al grupo
    group.add(this.Myraspa);
    group.add(this.Myraspa2);
    group.add(this.Myraspa2_2);

    // Añadir el grupo al objeto 3D
    this.add(group);*/
    //this.add(cilindro2);

    this.add(this.Myraspa);

    // Añadir la malla al objeto 3D
    //this.add(mesh);
    //this.add(cilindro);
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
  }
}

export { MyRaspa };