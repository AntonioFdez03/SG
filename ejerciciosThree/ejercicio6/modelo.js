import * as THREE from '../libs/three.module.js'
import * as MTLLOADER from '../libs/MTLLoader.js'
import * as OBJLOADER from '../libs/OBJLoader.js'

class MyModelo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.createGUI(gui, titleGui);

    // Necesitamos las bibliotecas MTLLoader() y OBJLoader()
    var materialLoader = new MTLLOADER.MTLLoader();
    var objectLoader = new OBJLOADER.OBJLoader();

    // Cada funcion load('archivo', function(materials/object))
    materialLoader.load('../models/porsche911/911.mtl', (materials) => {
      objectLoader.setMaterials(materials);
      objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', (object) => {
        this.modelo = object;
        this.add(this.modelo);
      }, null, null);
    });

    // Objeto padre es this - se esta creando hijo, por tanto le afectaran las transformaciones al padre
    this.position.y = 0.6;
  }

  createGUI(gui, titleGui) {
    this.guiControls = {
      animacion: false,
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'animacion').name('Animacion : ');
  }

  update() {
    if (this.guiControls.animacion)
      this.rotation.y += 0.01;
  }
}

export { MyModelo}