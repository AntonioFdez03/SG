import * as THREE from '../libs/three.module.js'
 
class MyCilindro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cilindroGeom = new THREE.CylinderGeometry ();
    // Como material se crea uno a partir de un color
    var cilindroMat = new THREE.MeshStandardMaterial({color: '#808080'});
    
    // Ya podemos construir el Mesh
    var cilindro = new THREE.Mesh (cilindroGeom, cilindroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cilindro);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    cilindro.position.x = - 2.5;

    // Crear ejes para este modelo
    this.axis = new THREE.AxesHelper (1.5);
    this.axis.position.x = -2.5;
    this.add (this.axis);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
        radioSuperior: 1.0,
        radioInferior: 1.0,
        altura: 1.0,
        resolucion: 3.0,
        reset: () => {
            this.guiControls.radioSuperior = 1.0;
            this.guiControls.radioInferior = 1.0;
            this.guiControls.altura = 2.0;
            this.guiControls.resolucion = 1.0;
        }
    }

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'radioSuperior', 0.1, 2.0, 0.01).name ('Radio Superior : ').listen();
    folder.add (this.guiControls, 'radioInferior', 0.1, 2.0, 0.01).name ('Radio Inferior : ').listen();
    folder.add (this.guiControls, 'altura', 0.1, 2.5, 0.01).name ('Altura : ').listen();
    folder.add (this.guiControls, 'resolucion', 3, 20, 1).name ('Resolucion : ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
}

  update () {
    var cilindroGeom = new THREE.CylinderGeometry(this.guiControls.radioSuperior, this.guiControls.radioInferior, this.guiControls.altura, this.guiControls.resolucion);
    this.children[0].geometry = cilindroGeom;

    this.children[0].rotation.x += 0.005;
    this.children[0].rotation.y += 0.005;
    this.children[0].rotation.z += 0.005;
  }
}

export { MyCilindro };