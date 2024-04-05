import * as THREE from '../libs/three.module.js'

class MyCora extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Crear la forma del corazón
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();

    heartShape.moveTo(x, y);

    //heartShape.lineTo(x, y + 2);
    
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 1, y + 1, x + 1.5, y + 1.5);
    heartShape.bezierCurveTo(x + 1.5, y + 2, x + 1, y + 2.5, x , y + 1.5);
    heartShape.bezierCurveTo(x - 1, y + 2.5, x + -1.5, y + 2, x -1.5, y + 1.5);
    heartShape.bezierCurveTo(x - 1, y + 1, x - 0.5, y + 0.5, x , y);

    this.points = []
    this.points.push(new THREE.Vector3(6, 5, 11));
    this.points.push(new THREE.Vector3(4, 4, 4));
    this.points.push(new THREE.Vector3(3, 2, 3));
    this.points.push(new THREE.Vector3(0, 0, 0));


      
   
       // Crear la trayectoria de barrido
       const path = new THREE.CatmullRomCurve3(this.points);

    // Crear la geometría extruida
    const extrudeSettings = {
      steps: 100,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.7,
      bevelSize: 0.7,
      bevelOffset: 0.7,
      bevelSegments: 1,
      extrudePath: path
    };


     

   
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // Crear el material
    const material = new THREE.MeshNormalMaterial({color: 0xff0000});

    // Crear la malla y añadirla a la escena
    const MyHeart = new THREE.Mesh(geometry, material);
    var scale = 0.1;
    MyHeart.scale.set(scale,scale,scale);


    MyHeart.rotation.x = Math.PI / 2; // Rotar 90 grados alrededor del eje x

    this.add(MyHeart);



  
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
    this.children[0].rotation.y += 0.05;
  }


  
}

export { MyCora };