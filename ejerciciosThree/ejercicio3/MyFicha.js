import * as THREE from '../libs/three.module.js'
 
class MyFicha extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    this.points = [];
    // Añadir los puntos que forman la base rectangular del peón
    this.points.push(new THREE.Vector2(0, 0.2));
    this.points.push(new THREE.Vector2(0.3, 0.2));
    this.points.push(new THREE.Vector2(0.3, 0.4));

    for (let i = -1; i <= Math.PI / 2; i += Math.PI / 20) {
      this.points.push(new THREE.Vector2(0.2 * Math.cos(i), 0.2 * Math.sin(i) + 1)); // Aumenta la coordenada y
    }
    
    
    // Crear la geometría de la línea
    var geom = new THREE.BufferGeometry().setFromPoints( this.points );


    // Crear el material de la línea
    var mat = new THREE.LineBasicMaterial(( { color: 0x0000ff } ));

    // Crear la línea
    var peon = new THREE.Line(geom, mat);

    // Añadir la línea al objeto 3D
    this.add(peon);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      resolucion: 3,
      angulo: 0,

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.resolucion = 3;
        this.guiControls.angulo = 0;
      }
  } 

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'resolucion', 3, 30, 1).name ('Resolucion').listen();
    folder.add (this.guiControls, 'angulo', 0, Math.PI * 2, 0.01).name ('Angulo').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Aquí puedes actualizar la geometría del peón basándote en los valores de resolución y ángulo
    // Por ejemplo:
    // Eliminar la geometría anterior
    this.remove(this.children[0]);
    if (this.guiControls.angulo > 0) {
  
      // Crear una nueva geometría de revolución
      var geometry = new THREE.LatheGeometry(this.points, this.guiControls.resolucion, 0, this.guiControls.angulo);
      var material = new THREE.MeshNormalMaterial();
      // Habilitar el sombreado plano
      material.flatShading = true;
      // Indicar que el material necesita ser actualizado en el próximo frame
      material.needsUpdate = true;

      var peon = new THREE.Mesh(geometry, material);
      // Añadir la nueva geometría al objeto 3D
      this.add(peon);
    }else{
      var geom = new THREE.BufferGeometry().setFromPoints( this.points );
      var mat = new THREE.LineBasicMaterial(( { color: 0x0000ff } ));
  
      var peon = new THREE.Line(geom, mat);
      // Añadir la línea al objeto 3D
      this.add(peon);
    }
  }
}

export { MyFicha };