import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'
class MyExamen extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);


    //Material cilindro
    var Mat = new THREE.MeshNormalMaterial();
        Mat.flatShading = true;
        Mat.needsUpdate = true;
    //Cilindro
    var cilindro_recorte = new THREE.CylinderGeometry(1,1,10,32);
    var cilindro_central = new THREE.CylinderGeometry(1,1,10,32);
    var esfera_central = new THREE.SphereGeometry(2,32,32);

   
    cilindro_recorte.rotateX(Math.PI/2);

    cilindro_recorte.translate(2,2.5,4);
    cilindro_central.translate(2,0,4);
    esfera_central.translate(2,1,4);
    var cilindro_interior_M = new THREE.Mesh(cilindro_recorte, Mat);
    var cilindro_central_M = new THREE.Mesh(cilindro_central, Mat);
    var esfera_central_M = new THREE.Mesh(esfera_central, Mat);
   
   
    // Crear la forma de la pieza de recorte
    const x = 0, y = 0;

    const perfil_recorte = new THREE.Shape();
    perfil_recorte.moveTo(x-1,y);
    perfil_recorte.lineTo(x + 6, y );
  
    perfil_recorte.bezierCurveTo(x+6, y+5, x+4.5, y+5.5,x-1, y+5.5);

    const extrudeSettings_recorte = {
        steps: 100,
        depth: 4,
        bevelEnabled: true,
        bevelThickness: 0.7,
        bevelSize: 0.7,
        bevelOffset: 0.7,
        bevelSegments: 1,
        };
   
    var geometry_recorte = new THREE.ExtrudeGeometry(perfil_recorte, extrudeSettings_recorte);
    var material_recorte = new THREE.MeshNormalMaterial({color: 0xff0000});
    var examencito_recorte = new THREE.Mesh(geometry_recorte, material_recorte);
    
    examencito_recorte.position.set(0,0.1,0.2);
    


    // Crear la forma de la pieza 

    const perfil = new THREE.Shape();

    perfil.lineTo(x + 5, y );
  
    perfil.bezierCurveTo(x+5, y+5, x+4.5, y+5.5,x, y+5.5);
    
    
    const extrudeSettings = {
      steps: 100,
      depth: 8,
      bevelEnabled: true,
      bevelThickness: 0.7,
      bevelSize: 0.7,
      bevelOffset: 0.7,
      bevelSegments: 1,
    };

    var geometry = new THREE.ExtrudeGeometry(perfil, extrudeSettings);

    // Crear el material
    var material = new THREE.MeshNormalMaterial({color: 0xff0000});

    // Crear la malla y añadirla a la escena
    var MyExamen = new THREE.Mesh(geometry, material);


    //Escalar todos los componentes
    var scale = 0.1;
    MyExamen.scale.set(scale,scale,scale);
    examencito_recorte.scale.set(scale,scale,scale);
    cilindro_interior_M.scale.set(scale,scale,scale);
    cilindro_central_M.scale.set(scale,scale,scale);
    esfera_central_M.scale.set(scale,scale,scale);
   

    //Cortas la pieza
    var csg = new CSG();
    csg.subtract([MyExamen,examencito_recorte]);
    csg.subtract([cilindro_interior_M]);
    csg.subtract([cilindro_central_M]);
    csg.subtract([esfera_central_M]);
    this.MyExamen = csg.toMesh();

    //Añadir a la escena
    this.add(this.MyExamen);
    


   


    


  
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    this.children[0].rotation.y += 0.05;
    
  }


  
}

export { MyExamen };