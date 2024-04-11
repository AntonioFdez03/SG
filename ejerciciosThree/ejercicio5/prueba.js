
import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
class MyPrueba extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    
    const x = 0, y = 0;
    
    //Forma de la base
    const cuerpo = new THREE.Shape();
    cuerpo.moveTo(x+2,y);


    cuerpo.bezierCurveTo(x + 8, y, x + 8, y, x + 8, y + 3.5);
    cuerpo.lineTo(x + 8, y + 9.5);
    cuerpo.bezierCurveTo(x + 8, y + 10, x + 8, y + 10, x + 7, y + 10);
    cuerpo.lineTo(x + 3, y + 10);
    cuerpo.bezierCurveTo(x, y + 10, x, y + 10, x, y + 9.5);
    cuerpo.lineTo(x, y + 3.5);
    cuerpo.bezierCurveTo(x, y, x, y, x + 2, y);

/*    cuerpo.lineTo(x + 11, y );
    cuerpo.bezierCurveTo(x +11.5, y, x + 12 , y+1, x+12, y+2 );
    cuerpo.lineTo(x + 12, y + 12);
    cuerpo.bezierCurveTo(x + 12, y + 13, x + 11.5, y + 14, x + 11, y + 14);
    cuerpo.lineTo(x + 2, y + 14);
    cuerpo.bezierCurveTo(x + 1.5, y + 14, x + 1, y + 13, x + 1, y + 12);
    cuerpo.lineTo(x + 1, y + 2);
    cuerpo.bezierCurveTo(x + 1, y + 1, x + 1.5, y, x + 2, y);
*/

    //Forma de la parte delantera

    const cuerpo2 = new THREE.Shape();
    cuerpo2.moveTo(x+2,y);

    cuerpo2.lineTo(x + 5.5, y );
    cuerpo2.bezierCurveTo(x +6, y+5, x , y+5, x , y );


    


    //Abrir ahujeros sin csg
    const agujero2 = new THREE.Path();
    agujero2.absarc(10.5, 5, 1, 0, Math.PI * 2, false); // Cambia los valores para ajustar la posición y el tamaño del agujero
    cuerpo.holes.push(agujero2);

    const agujero = new THREE.Path();
    agujero.absarc(2.5, 5, 1, 0, Math.PI * 2, false); // Cambia los valores para ajustar la posición y el tamaño del agujero
    cuerpo.holes.push(agujero);


    const extrudeSettings = {
        steps: 60,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.7,
        bevelSize: 0.2,
        bevelOffset: 0.7,
        bevelSegments: 200,   
    };

    const extrudeSettings2 = {
        steps: 60,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.7,
        bevelSize: 0.2,
        bevelOffset: 0.7,
        bevelSegments: 200,   
    };

    var geom = new THREE.ExtrudeGeometry( cuerpo, extrudeSettings );
    var material = new THREE.MeshNormalMaterial({ color: 0xff0000, flatShading: false });

    var MyPrueba1 = new THREE.Mesh( geom, material ) ;


    var  geom = new THREE.ExtrudeGeometry( cuerpo2, extrudeSettings2 );
    var MyPrueba2 = new THREE.Mesh( geom, material ) ;

    MyPrueba2.translateX(0.35);
    MyPrueba2.translateZ(0.2);
    var scale = 0.1;
    MyPrueba1.scale.set(scale,scale,scale);
    MyPrueba2.scale.set(scale,scale,scale);
    

    var geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 0, 0); // Set the position of the cylinder

    var csg = new CSG();

    csg.union(cylinder);

    this.MyPrueba = csg.toMesh();

    this.add(this.MyPrueba);

    //this.add(MyPrueba1);
    //this.add(MyPrueba2);
    
    
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
    
  }


  
}

export { MyPrueba };