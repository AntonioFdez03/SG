import * as THREE from '../libs/three.module.js'

class MyCora extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Crear la forma del corazón
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();

    heartShape.moveTo(x, y);

    heartShape.lineTo(x, y + 2);
    
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 1, y + 1, x + 1.5, y + 1.5);
    heartShape.bezierCurveTo(x + 1.5, y + 2, x + 1, y + 2.5, x , y + 2);
    heartShape.bezierCurveTo(x - 1, y + 2.5, x + -1.5, y + 2, x -1.5, y + 1.5);
    heartShape.bezierCurveTo(x - 1, y + 1, x - 0.5, y + 0.5, x , y);

    
    

    // Crear la geometría extruida
    const extrudeSettings = {
      steps: 1,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 1,
      bevelSegments: 1
    };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // Crear el material
    const material = new THREE.MeshNormalMaterial({color: 0xff0000});

    // Crear la malla y añadirla a la escena
    const MyHeart = new THREE.Mesh(geometry, material);
    this.add(MyHeart);

  
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del corazón
  }
}

export { MyCora };