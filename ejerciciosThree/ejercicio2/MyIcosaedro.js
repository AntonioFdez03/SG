import * as THREE from '../libs/three.module.js'
 
class MyIcosaedro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var icosaedroGeom = new THREE.IcosahedronGeometry ();
    // Como material se crea uno a partir de un color
    var icosaedroMat = new THREE.MeshStandardMaterial({color: '#808080'});
    
    // Ya podemos construir el Mesh
    var icosaedro = new THREE.Mesh (icosaedroGeom, icosaedroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (icosaedro);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    icosaedro.position.x = 2.5;

    // Crear ejes para este modelo
    this.axis = new THREE.AxesHelper (1.5);
    this.axis.position.x = 2.5;
    this.add (this.axis);

  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
        radio: 1.0,
        subdivision: 0,
        reset: () => {
            this.guiControls.radio = 1.0;
            this.guiControls.subdivision = 0;
        }
    }

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'radio', 1, 2.0, 0.01).name ('Radio : ').listen();
    folder.add (this.guiControls, 'subdivision', 0, 5, 1).name ('Subdivision : ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
      var icosaedroGeom = new THREE.IcosahedronGeometry(this.guiControls.radio, this.guiControls.subdivision);
      this.children[0].geometry = icosaedroGeom;

      this.children[0].rotation.x += 0.005;
      this.children[0].rotation.y += 0.005;
      this.children[0].rotation.z += 0.005;
  }
}

export { MyIcosaedro };