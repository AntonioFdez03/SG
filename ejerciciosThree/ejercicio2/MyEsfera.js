import * as THREE from '../libs/three.module.js'
 
class MyEsfera extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var esferaGeom = new THREE.SphereGeometry ();
    // Como material se crea uno a partir de un color
    var esferaMat = new THREE.MeshStandardMaterial({color: '#808080'});
    
    // Ya podemos construir el Mesh
    var esfera = new THREE.Mesh (esferaGeom, esferaMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (esfera);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    esfera.position.y = 3;
    esfera.position.x = -2.5;

    // Crear ejes para este modelo
    this.axis = new THREE.AxesHelper (1.5);
    this.axis.position.y = 3;
    this.axis.position.x = -2.5;
    this.add (this.axis);

  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
        radio: 1.0,
        resEcuador: 3,
        resMeridiano: 2,

        reset: () => {
            this.guiControls.radio = 1.0;
            this.guiControls.resEcuador = 3;
            this.guiControls.resMeridiano = 2;
        }
    }

    var folder = gui.addFolder (titleGui);
    folder.add (this.guiControls, 'radio', 1, 1.5, 0.01).name ('Radio : ').listen();
    folder.add (this.guiControls, 'resEcuador', 3, 30, 1).name ('Res. Ecuador : ').listen();
    folder.add (this.guiControls, 'resMeridiano', 2, 30, 1).name ('Res. Meridiano : ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
}

  update () {
      var esferaGeom = new THREE.SphereGeometry(this.guiControls.radio, this.guiControls.resEcuador, this.guiControls.resMeridiano);
      this.children[0].geometry = esferaGeom;
      
      this.children[0].rotation.x += 0.01;
      this.children[0].rotation.y += 0.01;
      this.children[0].rotation.z += 0.01;
  }
}

export { MyEsfera };