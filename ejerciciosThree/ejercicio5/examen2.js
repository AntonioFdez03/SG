import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
class MyExamen2 extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);
    var Mat = new THREE.MeshNormalMaterial();
    Mat.flatShading = true;
    Mat.needsUpdate = true;

    var Cilindro1 = new THREE.CylinderGeometry(0.5,1,10,32);
    var Cilindro2 = new THREE.CylinderGeometry(1,1,10,32);
    var Cilindro3 = new THREE.CylinderGeometry(0.5,1,10,32);
    var Cilindro4 = new THREE.CylinderGeometry(1,1,10,32);
    var Cilindro5 = new THREE.CylinderGeometry(2,2,4,22);
    var Cubo = new THREE.BoxGeometry(5.5,4,7.5);


    Cilindro1.translate(0,0,-2)
    Cilindro2.translate(3.75,0,0);
    Cilindro3.translate(8,0,-2);
    Cilindro4.translate(3.75,0,-9);
    Cilindro5.translate(3.75,2.4,-4.5);
    //Cilindro5.rotateX(-10*(Math.PI/180));
    Cubo.translate(3.75,7.9,-6.3);

    Cubo.rotateX(-22*(Math.PI/180));
    

    var Cilindro1_r = new THREE.Mesh(Cilindro1,Mat);
    var Cilindro2_r = new THREE.Mesh(Cilindro2,Mat);
    var Cilindro3_r = new THREE.Mesh(Cilindro3,Mat);
    var Cilindro4_r = new THREE.Mesh(Cilindro4,Mat);
    var Cilindro5_r = new THREE.Mesh(Cilindro5,Mat);
    var Cubo_r = new THREE.Mesh(Cubo,Mat);

    

        // Crear la geometría del plano
  
        



    //Material cilindro
    
    const x = 0, y = 0;
    
    const cuerpo = new THREE.Shape();
    cuerpo.moveTo(x+2,y);

  

  
    //cuerpo.bezierCurveTo(x, y + 1, x, y, x + 1, y);
    //cuerpo.lineTo(x + 2, y);
    cuerpo.bezierCurveTo(x + 8, y, x + 8, y, x + 8, y + 3.5);
    cuerpo.lineTo(x + 8, y + 9.5);
    cuerpo.bezierCurveTo(x + 8, y + 10, x + 8, y + 10, x + 7, y + 10);
    cuerpo.lineTo(x + 3, y + 10);
    cuerpo.bezierCurveTo(x, y + 10, x, y + 10, x, y + 9.5);
    cuerpo.lineTo(x, y + 3.5);
    cuerpo.bezierCurveTo(x, y, x, y, x + 2, y);
    
    //cuerpo.bezierCurveTo(x, y , x, y , x+3 , y );
    //cuerpo.lineTo(x + 5, y );
    

    const cuerpo2 = new THREE.Shape();
    cuerpo2.moveTo(x, y);
    cuerpo2.lineTo(x + 5, y);
    cuerpo2.bezierCurveTo(x + 5, y + 7.5, x, y + 7.5, x, y);
    


    const cuerpo3 = new THREE.Shape();
    cuerpo3.moveTo(x, y);
    cuerpo3.lineTo(x + 1.2, y);
    cuerpo3.bezierCurveTo(x + 1.2, y + 4.75, x, y + 4.75, x, y);
    cuerpo3.lineTo(x, y);
    
    const extrudeSettings = {
        steps: 100,
        depth: 1.5,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.7,
        bevelOffset: 0.7,
        bevelSegments: 1,
    };

    
    
    const extrudeSettings2 = {
      steps: 100,
      depth: 5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.7,
      bevelOffset: 0.7,
      bevelSegments: 1,
  };


    const extrudeSettings3 = {
      steps: 100,
      depth: 3,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.7,
      bevelOffset: 0.7,
      bevelSegments: 1,
  };



  
    var geom = new THREE.ExtrudeGeometry(cuerpo, extrudeSettings);
    var geom2 = new THREE.ExtrudeGeometry(cuerpo2, extrudeSettings2);
    var geom3 = new THREE.ExtrudeGeometry(cuerpo3, extrudeSettings3);

    // Crear el material
    // Crear el material
   var materiales = new THREE.MeshNormalMaterial({ color: 0xff0000, flatShading: false });


    // Crear la malla y añadirla a la escena
    var MyExamen2 = new THREE.Mesh(geom, materiales);

    var MyExamen2_2 = new THREE.Mesh(geom2, materiales);
    
    var MyExamen2_3 = new THREE.Mesh(geom3, materiales);
    

    MyExamen2_3.rotateX(-Math.PI/2);
    MyExamen2_3.translateZ(0.14);
    MyExamen2_3.translateY(0.6);

    MyExamen2_3.translateX(0.315);

    MyExamen2.rotateX(-Math.PI/2);




    

    

    

    MyExamen2_2.rotateX(-Math.PI/2);

    MyExamen2_2.translateZ(0.1);

    MyExamen2_2.translateX(0.25);

    MyExamen2_2.translateY(-0.1);
    
    

   

    

    var scale = 0.1;
    MyExamen2.scale.set(scale,scale,scale);
    MyExamen2_2.scale.set(scale/2,scale/2,scale/2);
    Cilindro1_r.scale.set(scale,scale,scale);
    Cilindro2_r.scale.set(scale,scale,scale);
    Cilindro3_r.scale.set(scale,scale,scale);
    Cilindro4_r.scale.set(scale,scale,scale);
    Cilindro5_r.scale.set(scale,scale,scale);
    MyExamen2_3.scale.set(scale,scale,scale);
    Cubo_r.scale.set(scale,scale,scale);
    


    var csg = new CSG();
    
    csg.subtract([MyExamen2,MyExamen2_2]);
    csg.subtract([Cilindro2_r]);
    csg.subtract([Cilindro1_r]);
    csg.subtract([Cilindro3_r]);
    csg.union([Cilindro5_r]);
    csg.union([MyExamen2_3]);
    csg.subtract([Cilindro4_r]);
   csg.subtract([Cubo_r]);

   

    this.MyExamen2 = csg.toMesh();
    

   
    this.add(this.MyExamen2);
    //this.add(Cubo_r);
 
 
    //this.add(Cilindro1_r);
    //this.add(Cilindro3_r);
    //this.add(Cilindro2_r);
    //this.add(MyExamen2);
    //this.add(MyExamen2_2);


    
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    //this.children[0].rotation.y += 0.05;
    
  }


  
}

export { MyExamen2 };