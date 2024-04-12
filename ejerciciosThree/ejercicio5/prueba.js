
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

/*
    cuerpo.bezierCurveTo(x + 8, y, x + 8, y, x + 8, y + 3.5);
    cuerpo.lineTo(x + 8, y + 9.5);
    cuerpo.bezierCurveTo(x + 8, y + 10, x + 8, y + 10, x + 7, y + 10);
    cuerpo.lineTo(x + 3, y + 10);
    cuerpo.bezierCurveTo(x, y + 10, x, y + 10, x, y + 9.5);
    cuerpo.lineTo(x, y + 3.5);
    cuerpo.bezierCurveTo(x, y, x, y, x + 2, y);
*/
    cuerpo.lineTo(x + 11, y );
    cuerpo.bezierCurveTo(x +11.5, y, x + 12 , y+1, x+12, y+2 );
    cuerpo.lineTo(x + 12, y + 12);
    cuerpo.bezierCurveTo(x + 12, y + 13, x + 11.5, y + 14, x + 11, y + 14);
    cuerpo.lineTo(x + 2, y + 14);
    cuerpo.bezierCurveTo(x + 1.5, y + 14, x + 1, y + 13, x + 1, y + 12);
    cuerpo.lineTo(x + 1, y + 2);
    cuerpo.bezierCurveTo(x + 1, y + 1, x + 1.5, y, x + 2, y);


    //Forma de la parte delantera

    const cuerpo2 = new THREE.Shape();
    cuerpo2.moveTo(x+2,y);

    cuerpo2.lineTo(x + 5.5, y );
    cuerpo2.bezierCurveTo(x +6, y+7, x , y+7, x , y );

    const cuerpo3 = new THREE.Shape();  //var caja = new THREE.BoxGeometry(4,7.5,2);
    cuerpo3.lineTo(x+3.5,y);
    cuerpo3.bezierCurveTo(x+4.5,y+7.5,x,y+7.5,x,y);


    


    //Abrir ahujeros sin csg
  


    const extrudeSettings = {
        steps: 5,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.9,
        bevelSize: 0.2,
        bevelOffset: 0.7,
        bevelSegments: 5,   
    };


   /* const extrudeSettings2 = {
      steps: 5,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0.2,
      bevelOffset: 0.7,
      bevelSegments: 5,   
  };

   */

    var geom = new THREE.ExtrudeGeometry( cuerpo, extrudeSettings );
    var material = new THREE.MeshNormalMaterial({ color: 0xff0000, flatShading: false });
    var material2 = new THREE.MeshNormalMaterial({ color: 0x00ff00, flatShading: false });

    var MyPrueba1 = new THREE.Mesh( geom, material ) ;


    var  geom2 = new THREE.ExtrudeGeometry( cuerpo2, extrudeSettings );
    var MyPrueba2 = new THREE.Mesh( geom2, material ) ;

   // var geom3 = new THREE.ExtrudeGeometry( cuerpo3, extrudeSettings2 );
   // var MyPrueba3 = new THREE.Mesh( geom3, material ) ;







   
    MyPrueba2.translateX(0.35);
    MyPrueba2.translateZ(0.2);
    MyPrueba2.translateY(-0.1);


   // MyPrueba3.translateX(0.45);
   // MyPrueba3.translateY(0.8);
   // MyPrueba3.translateZ(0.33);
    //MyPrueba3.rotateX(-10*Math.PI/180);

   
    
    var rampa = new THREE.BoxGeometry(3.8,8,3);
    var caja = new THREE.BoxGeometry(4,7.5,2);
    var cilindro1 = new THREE.CylinderGeometry(1, 1, 10, 32);
    var cilindro2 = new THREE.CylinderGeometry(1, 1, 10, 32);
    var cilindro3 = new THREE.CylinderGeometry(1, 1, 10, 32);
    var cilindro4 = new THREE.CylinderGeometry(2, 2, 2, 32);
    var cilindro5 = new THREE.CylinderGeometry(1.5, 1.5, 10, 32);
    var esfera = new THREE.SphereGeometry(2, 32, 32);
    


    rampa.translate(6.5,10.7,3);
    caja.translate(6.5,10.5,6.8);
    caja.rotateX(-10*Math.PI/180);
    cilindro1.translate(2.2,0,6);
    cilindro1.rotateX(-Math.PI/2);
    cilindro2.translate(11,0,6);
    cilindro2.rotateX(-Math.PI/2);
    cilindro3.translate(6.5,1,2);
    cilindro3.rotateX(-Math.PI/2);
    cilindro4.translate(6.5,-3.5,7.3);
    cilindro4.rotateX(-Math.PI/2);
    cilindro5.translate(6.5,-3.5,12);
    cilindro5.rotateX(-Math.PI/2);
    esfera.translate(6.5,2,2);



    var rampa_r = new THREE.Mesh(rampa, material);
    var Caja = new THREE.Mesh(caja, material2);
    var Cilindro1_r = new THREE.Mesh(cilindro1, material);
    var Cilindro2_r = new THREE.Mesh(cilindro2, material);
    var Cilindro3_r = new THREE.Mesh(cilindro3, material);
    var Cilindro4_r = new THREE.Mesh(cilindro4, material);
    var Cilindro5_r = new THREE.Mesh(cilindro5, material);
    var Esfera = new THREE.Mesh(esfera, material);

    

    var scale = 0.1;
    MyPrueba1.scale.set(scale,scale,scale);
    MyPrueba2.scale.set(scale,scale,scale);
    Cilindro1_r.scale.set(scale,scale,scale);
    Cilindro2_r.scale.set(scale,scale,scale);
    Cilindro3_r.scale.set(scale,scale,scale);
    Cilindro4_r.scale.set(scale,scale,scale);
    Cilindro5_r.scale.set(scale,scale,scale);
    Esfera.scale.set(scale,scale,scale);
    rampa_r.scale.set(scale,scale,scale);
    Caja.scale.set(scale,scale,scale);
    //MyPrueba3.scale.set(scale,scale,scale);



    var csg = new CSG();

    csg.subtract([MyPrueba1, MyPrueba2]);
    csg.subtract([Cilindro1_r, Cilindro2_r]);
    csg.subtract([Cilindro3_r]);
    csg.subtract([Esfera]);
    csg.union([Cilindro4_r]);
    csg.union([rampa_r]);
    csg.subtract([Caja]);
    csg.subtract([Cilindro5_r]);

    this.MyPrueba = csg.toMesh();

    this.MyPrueba.rotateX(-Math.PI/2);

    this.add(this.MyPrueba);
    
    //this.add(Caja);
   // this.add(MyPrueba3);

  
  


   // this.add(Esfera);

    //this.add(Cilindro3_r);

    //this.add(Cilindro1_r);
    //this.add(Cilindro2_r);

//    this.add(MyPrueba1);
   // this.add(MyPrueba2);
    
    
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

export { MyPrueba };