import * as THREE from '../libs/three.module.js'
 
class MyToro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var toroGeom = new THREE.TorusGeometry ();
    // Como material se crea uno a partir de un color
    var toroMat = new THREE.MeshStandardMaterial({color: '#808080'});
    
    // Ya podemos construir el Mesh
    var toro = new THREE.Mesh (toroGeom, toroMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (toro);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    toro.position.y = 3;
    toro.position.x = 2.5;

    // Crear ejes para este modelo
    this.axis = new THREE.AxesHelper (1.5);
    this.axis.position.y = 3;
    this.axis.position.x = 2.5;
    this.add (this.axis);

  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
        radioPrincipal: 1.0,
        radioTubo: 0.2,
        resToro: 3,
        resTubo: 3,
        reset: () => {
            this.guiControls.radioPrincipal = 1.0;
            this.guiControls.radioTubo = 0.2;
            this.guiControls.resToro = 3;
            this.guiControls.resTubo = 3;
        }
    }

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'radioPrincipal', 1, 1.5, 0.01).name ('Radio Principal : ').listen();
    folder.add (this.guiControls, 'radioTubo', 0.2, 1.0, 0.01).name ('Radio Tubo : ').listen();
    folder.add (this.guiControls, 'resToro', 3, 30, 1).name ('Res. Toro : ').listen();
    folder.add (this.guiControls, 'resTubo', 3, 30, 1).name ('Res. Tubo : ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
      var toroGeom = new THREE.TorusGeometry(this.guiControls.radioPrincipal, this.guiControls.radioTubo, this.guiControls.resToro, this.guiControls.resTubo);
      this.children[0].geometry = toroGeom;

      this.children[0].rotation.x += 0.005;
      this.children[0].rotation.y += 0.005;
      this.children[0].rotation.z += 0.005;
  }
}

export { MyToro };