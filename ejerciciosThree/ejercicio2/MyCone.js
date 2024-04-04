import * as THREE from '../libs/three.module.js'
 
class Mycono extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var conoGeom = new THREE.ConeGeometry ();
    // Como material se crea uno a partir de un color
    var conoMat = new THREE.MeshStandardMaterial({color: '#808080'});
    
    // Ya podemos construir el Mesh
    var cono = new THREE.Mesh (conoGeom, conoMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cono);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    cono.position.y = 3;

    // Crear ejes para este modelo
    this.axis = new THREE.AxesHelper (1.5);
    this.axis.position.y = 3;
    this.add (this.axis);

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
        radio : 1.0,
        altura : 1.0,
        resolucion : 3.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radio = 1.0;
        this.guiControls.altura = 1.0;
        this.guiControls.resolucion = 3.0;
        
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 0.1, 1.5, 0.01).name ('Radio : ').listen();
    folder.add (this.guiControls, 'altura', 0.1, 2.0, 0.01).name ('Altura : ').listen();
    folder.add (this.guiControls, 'resolucion', 3, 15.0, 0.01).name ('Resolucion : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    var conoGeom = new THREE.ConeGeometry(this.guiControls.radio, this.guiControls.altura, this.guiControls.resolucion);
    this.children[0].geometry = conoGeom;

    this.children[0].scale.set (this.guiControls.radio, this.guiControls.altura, this.guiControls.radio);
    
    // Rotar el toro
    this.children[0].rotation.x += 0.005;
    this.children[0].rotation.y += 0.005;
    this.children[0].rotation.z += 0.005;
  }
}

export { Mycono };