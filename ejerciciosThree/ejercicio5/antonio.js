import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
class MyAntonio extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);



    const x = 0, y = 0;
    const cuerpo = new THREE.Shape();
    cuerpo.moveTo(x+2,y);

    cuerpo.lineTo(x + 14, y );
    cuerpo.lineTo(x + 14, y + 12);
    cuerpo.bezierCurveTo(x +3, y+12, x+2  , y+12, x+2, y );
    //cuerpo.lineTo(x+2 , y + 12);



    const extrudeSettings = {
        steps: 5,
        depth: 10,
        bevelEnabled: true,
        bevelThickness: 0.9,
        bevelSize: 0.9,
        bevelSegments: 5
    };

    const extrudeSettings2 = {
        steps: 5,
        depth:5,
        bevelEnabled: true,
        bevelThickness: 0.9,
        bevelSize: 1.4,
        bevelSegments: 5
    };

    const MyAnt = new THREE.ExtrudeGeometry(cuerpo, extrudeSettings);
    const MyAnt2 = new THREE.ExtrudeGeometry(cuerpo, extrudeSettings2);
    var material = new THREE.MeshNormalMaterial({ color: 0xff0000, flatShading: false });
    var MyAnt_r = new THREE.Mesh(MyAnt, material);
    var MyAnt_r2 = new THREE.Mesh(MyAnt2, material);

    
    MyAnt_r2.translateZ(0.25);
    MyAnt_r2.translateY(0.15);


    var cilindro1 = new THREE.CylinderGeometry(1.5,1.5,14,32);
    var cilindro2 = new THREE.CylinderGeometry(1.5,1.5,10,32);
    var esfera = new THREE.SphereGeometry(2.5,32,32);

    cilindro1.translate(9.8,4,-5);
    cilindro1.rotateX(Math.PI/2);

    cilindro2.translate(8.5,3,4.8);

    esfera.translate(8.5,1.5,4.8);

    var cilindro1_M = new THREE.Mesh(cilindro1, material);
    var cilindro2_M = new THREE.Mesh(cilindro2, material);
    var esfera_M = new THREE.Mesh(esfera, material);




    var scale = 0.1;
    MyAnt_r.scale.set(scale,scale,scale);
    MyAnt_r2.scale.set(scale,scale,scale);
    cilindro1_M.scale.set(scale,scale,scale);
    cilindro2_M.scale.set(scale,scale,scale);
    esfera_M.scale.set(scale,scale,scale);



    var csg = new CSG();
    csg.subtract([MyAnt_r, MyAnt_r2]);
    csg.subtract([cilindro1_M]);
    csg.subtract([cilindro2_M]);
    csg.subtract([esfera_M]);
    this.MyAntonio = csg.toMesh();



    this.add(this.MyAntonio);

    
    //this.add(MyAnt_r);
    //this.add(MyAnt_r2);

  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
    
          // Suponiendo que 'Caja' es una malla que has añadido a 'MyPrueba'
    
      
      }
    
  






}

export { MyAntonio };