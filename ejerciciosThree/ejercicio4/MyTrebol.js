import * as THREE from '../libs/three.module.js'

class MyTrebol extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    // Crear la forma del trébol
    const trebolShape = new THREE.Shape();

    trebolShape.moveTo(0, 0);
    trebolShape.bezierCurveTo(6, -10, 15, 3, 3, 5); 
    trebolShape.bezierCurveTo(7, 17, -7, 17, -3, 5); 
    trebolShape.bezierCurveTo(-15, 5, -8, -10, 0, 0); 

    // Crear la geometría extruida
    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(trebolShape, extrudeSettings);

    // Crear el material
    const material = new THREE.MeshNormalMaterial({color: 0x00ff00});

    // Crear la malla y añadirla a la escena
    const MyTrebol = new THREE.Mesh(geometry, material);
    MyTrebol.scale.set(0.1, 0.1, 0.1);

    this.add(MyTrebol);

    // Crear el soporte
    const supportGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const supportMaterial = new THREE.MeshNormalMaterial({color: 0x00ff00});
    const support = new THREE.Mesh(supportGeometry, supportMaterial);
    support.position.y = -0.6; // Ajustar la posición y para que el soporte esté debajo del trébol
    support.scale.set(0.1, 0.1, 0.1); // Ajustar la escala para que el soporte tenga el tamaño adecuado

    this.add(support);
  }

  createGUI (gui,titleGui) {
    // Aquí puedes añadir controles para la interfaz gráfica de usuario
  }

  update () {
    // Aquí puedes actualizar la geometría del trébol
    this.rotation.y += 0.01;
  }
}

export { MyTrebol };