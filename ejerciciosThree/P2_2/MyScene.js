// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

// Clases de mi proyecto

import { MyBomba } from './bomba.js'
import { MyMoneda } from './moneda.js'
import { MyRaspa } from './raspa.js'
import { MyRayo } from './rayo.js'
import { MyRaton } from './raton.js'
import { MyCircuito } from './circuito.js'
import {MyGato} from './gato.js'
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, creamos e inicializamos los distintos elementos que usaremos
    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI ();
    this.initStats();
    this.createLights ();
    this.createCamera ();
    this.createGround ();
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
    //Variables para el juego
    this.velocidadGato = 0.0005;
    this.t = 0;
    this.rotationZ=0;
    this.puntos = 0;
    this.camara_gato = true;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Crear la curva del   
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(5, 0, 0),//Fin curva e inicio curva
      new THREE.Vector3(7.5, 2, 0),
      new THREE.Vector3(10, 2.7, 0),//Punto mas alto de la curva
      new THREE.Vector3(12.5, 2, 0),
      new THREE.Vector3(15, 0, 0),//Fin curva e inicio del giro
      new THREE.Vector3(23, 2, 2),
      new THREE.Vector3(25, 0, 5),//Fin giro e inicio recta
      new THREE.Vector3(25, 0, 10),
      new THREE.Vector3(23, -2, 13),//Fin recta e inicio curva
      new THREE.Vector3(15, 0, 15),
      new THREE.Vector3(10, 0, 15),//Inicio espiral
      new THREE.Vector3(7, 0.5, 13), new THREE.Vector3(6, 1, 10), new THREE.Vector3(7, 1.5, 7), new THREE.Vector3(10, 2, 6), new THREE.Vector3(13, 2.5, 7), new THREE.Vector3(14, 3, 10), new THREE.Vector3(13, 3.5, 13),
      new THREE.Vector3(10, 4, 14),//Segunda vuelta
      new THREE.Vector3(7, 4.5, 13), new THREE.Vector3(6, 5, 10), new THREE.Vector3(7, 5.5, 7), new THREE.Vector3(10, 6, 6), new THREE.Vector3(13, 6.5, 7), new THREE.Vector3(14, 7, 10), new THREE.Vector3(13, 7.5, 13),
      new THREE.Vector3(10, 8, 14),//Tercera vuelta
      new THREE.Vector3(7, 8.5, 13), new THREE.Vector3(6, 9, 10), new THREE.Vector3(7, 9.5, 7),
      new THREE.Vector3(10, 10, 5),//Fin espiral 
      new THREE.Vector3(15, 10, 5), // Inicio looping
      new THREE.Vector3(18, 12, 4),
      new THREE.Vector3(19, 15, 3), // Punto más a la derecha del looping
      new THREE.Vector3(18, 17.75, 2),
      new THREE.Vector3(15, 19, 1), // Punto más alto del looping
      new THREE.Vector3(12, 17.75, 0),
      new THREE.Vector3(11, 15, 0), // Punto más a la izquierda del looping
      new THREE.Vector3(12, 12, 0),
      new THREE.Vector3(15, 10, 0),  // Fin looping e inicio recta
      new THREE.Vector3(20, 10, 0),//Fin recta e inicio curva
      new THREE.Vector3(23, 10, 2),
      new THREE.Vector3(24, 10, 5),//Mitad de la curva   
      new THREE.Vector3(23, 10, 8),
      new THREE.Vector3(20, 10, 10),//Fin curva e inicio recta
      new THREE.Vector3(12, 10, 10), new THREE.Vector3(10, 0, 10), new THREE.Vector3(8, -3, 10), new THREE.Vector3(5, -4, 10), new THREE.Vector3(2, -3, 8), new THREE.Vector3(1, 0, 5), new THREE.Vector3(2, 0, 2),
      new THREE.Vector3(5, 0, 0),//Fin circuito
    ]);

    this.models = [];
    // Gato
    this.models.push(new MyGato(this.gui, "Controles del gato"));
    this.models[0].scale.set(0.05, 0.05, 0.05);
    this.models[0].gato_skate.position.y += 8.28;
    this.models[0].camera.position.set(0, 12, -3.5);
    this.models[0].camera.lookAt(0,0.6,0);
    this.models[0].gato_skate.position.y += 2;
    // Circuito
    this.models.push(new MyCircuito(this.gui, "Controles del circuito", this.curve));
    //Generar ratones y aleatoriamente los demás objetos
    this.GenerarObjetos();
    this.models.forEach(model => this.add(model));

    //Eventos de teclado y ratón para los movimientos del gato y alternar la cámara
    this.EventosTeclado();
    this.EventosRaton();
  }

  GenerarObjetos() {
    let positions = [
      { x: 0, y: 0.55, z: 0 }, // Arriba
      { x: -0.55, y: 0, z: 0 }, // Izquierda
      { x: 0, y: -0.55, z: 0 }, // Abajo
      { x: 0.55, y: 0, z: 0 }  // Derecha
    ];

    for (let i = 0; i < this.curve.points.length; i++) {
      let model;
      let randomValue = Math.random();

      if (randomValue < 0.60) { // 60% de probabilidad de que sea una moneda
        model = new MyMoneda(this.gui, "Controles de la moneda");
      } else if (randomValue < 0.65) { // 5% de probabilidad de que sea un rayo
        model = new MyRayo(this.gui, "Controles del rayo");
      /*} else if (randomValue < 0.80) { // 15% de probabilidad de que sea una raspa
        model = new MyRaspa(this.gui, "Controles de la raspa");
      */ } else { // 20% de probabilidad de que sea una bomba
        model = new MyBomba(this.gui, "Controles de la bomba");
      }
      model.scale.set(0.2, 0.2, 0.2);
      // Añade un valor a la coordenada y para que el modelo esté por encima del tubo
      // Usa el módulo de i con 4 para rotar entre las cuatro posiciones cada dos objetos
      let positionIndex = Math.floor(i / 2) % 4;
      model.position.set(
        this.curve.points[i].x + positions[Math.floor(i / 2) % 4].x,
        this.curve.points[i].y + positions[Math.floor(i / 2) % 4].y,
        this.curve.points[i].z
      );
      if (positionIndex === 2) {
        model.rotateX(Math.PI);
      }
      
      if (positionIndex === 1) {
        model.rotateZ(+Math.PI/2);
      }
      if (positionIndex === 3) {
        model.rotateZ(-Math.PI/2);
      }
      model.rotateY(Math.PI/2);
      this.models.push(model);
    }

    this.GenerarRatones();
  }

  GenerarRatones(){
    this.ratones = [];

    // Define las posiciones para los ratones a lo largo de la curva (entre 0 y 1)
    let posiciones = [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.7, 0.77, 0.84,  1];

    for (let i = 0; i < posiciones.length; i++) {
        let raton = new MyRaton(this.gui, "Controles del ratón");
        raton.scale.set(0.2, 0.2, 0.2);
        // Posicionar el ratón en la posición correspondiente de la curva
        let point = this.curve.getPointAt(posiciones[i]);
        raton.position.set(point.x, point.y + 1, point.z); // Ajusta el valor "1" para cambiar la altura
        // Añade todas las mallas del ratón a this.ratones
        raton.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                this.ratones.push(child);
            }
        });
        this.add(raton);   
    }
  }

  EventosTeclado() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'a'||event.key === 'A') {
          // Marcar la tecla izquierda como no presionada
          this.rotationZ -= 0.1;      
      } else if (event.key === 'd'|| event.key === 'D'){
          // Marcar la tecla derecha como no presionada
          this.rotationZ += 0.1;
      }
      if (event.key === ' ') { //Espacio para alternar la cámara
        this.camara_gato = !this.camara_gato;
      }

    });
  }

  EventosRaton(){
    window.addEventListener('mousedown', (event) => {
      if (event.button === 1) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.getCamera());

        let intersects = this.raycaster.intersectObjects(this.ratones, true);

        if (intersects.length > 0) {
          let closest = intersects[0].object;
          let raton = closest.parent;

          // Eliminar completamente el ratón
          while (raton.children.length > 0) {
            let child = raton.children[0];
            raton.remove(child);
            child.geometry.dispose();
            child.material.dispose();
          }

          // Eliminar el grupo del ratón de la escena
          this.remove(raton);

          // Eliminar el ratón del array de ratones
          let index = this.ratones.indexOf(raton);
          if (index !== -1) this.ratones.splice(index, 1);

          // Aumentar los puntos en 5 por cada ratón eliminado
          this.puntos += 5;
          this.guiControls.puntos = this.puntos; // Actualiza la propiedad de puntos en la interfaz de usuario
          console.log(`Puntos: ${this.puntos}`); // Muestra los puntos en la consola
        }
      }
    });
  }

  initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    $("#Stats-output").append( stats.domElement );
    this.stats = stats;
  }
  
  createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    this.camera.position.set (4, 2, 4);
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    this.cameraControl.target = look;
  }
  
  createGround () {
    var geometryGround = new THREE.BoxGeometry (10,0.2,10);
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshStandardMaterial ({map: texture});
    var ground = new THREE.Mesh (geometryGround, materialGround);
    ground.position.y = -0.1;
  }
  
  createGUI () {
    var gui = new GUI();
    this.guiControls = {
      lightPower : 500.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 0.5,   
      axisOnOff : true,
      puntos: 0
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    // Crea una nueva sección para los puntos
    var puntosFolder = gui.addFolder('Puntos');
    // Añade un control para 'puntos' y guarda la referencia en this.puntosControl
    this.puntosControl = puntosFolder.add (this.guiControls, 'puntos').listen()
      .name('Puntos: ');
    
    return gui;
}
  createLights () {
    // Se crea una luz ambiental
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    // Se crea una luz focal que va a ser la luz principal de la escena
    this.pointLight = new THREE.PointLight( 0xffffff );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 2, 3, 1 );
    this.add (this.pointLight);
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    var renderer = new THREE.WebGLRenderer();
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
   if( this.camara_gato ){
      return this.models[0].camera;
   }else{
    return this.camera;
   }
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  AnimacionGato() {
    // Mover el gato a lo largo de la curva
    this.t -= this.velocidadGato;
    if (this.t < 0) this.t = 1;
    let position = this.curve.getPointAt(this.t);
    // Calcular la tangente de la curva en este punto
    let tangent = this.curve.getTangentAt(this.t).normalize();
    // Ajustar la posición del gato
    this.models[0].position.copy(position);
    // Hacer que el gato mire en la dirección en la que se está moviendo
    this.models[0].lookAt(position.clone().add(tangent));
    // Se actualiza el resto del modelo
    this.models[0].update();
    this.models[0].rotateY(Math.PI);
    this.models[0].rotateZ(this.rotationZ);
  }

  Colisiones() {
    // Crear una caja de límites para el gato
    let gatoBox = new THREE.Box3().setFromObject(this.models[0]);

    for (let i = this.models.length - 1; i >= 1; i--) { // Comienza desde el final y salta el gato
        // Crear una caja de límites para el modelo actual
        let modelBox = new THREE.Box3().setFromObject(this.models[i]);
        // Si las cajas se intersectan, asumimos que hay una colisión
        if (gatoBox.intersectsBox(modelBox)) {
          // Si el modelo es una moneda
          if (this.models[i] instanceof MyMoneda) {
              // Aumenta los "puntos" en 1
              this.puntos += 1;
              // Actualiza los puntos en la interfaz de usuario
              this.guiControls.puntos = this.puntos;
              // Forzar la actualización de la interfaz de usuario
              this.puntosControl.updateDisplay();
          }
          // Si el modelo es una bomba
          else if (this.models[i] instanceof MyBomba) {
              // Reduce la velocidad del gato en un 25%
              this.velocidadGato *= 0.75;
              this.puntos -= 5;
              // Actualiza los puntos en la interfaz de usuario
              this.guiControls.puntos = this.puntos;
              // Forzar la actualización de la interfaz de usuario
              this.puntosControl.updateDisplay();
          }
          // Si el modelo es un rayo
          else if (this.models[i] instanceof MyRayo) {
              // Aumenta la velocidad del gato en un 30%
              this.velocidadGato *= 1.50;

              this.puntos += 10;
              // Actualiza los puntos en la interfaz de usuario
              this.guiControls.puntos = this.puntos;
              // Forzar la actualización de la interfaz de usuario
              this.puntosControl.updateDisplay();
          }
          // Si el modelo no es el circuito
          if (!(this.models[i] instanceof MyCircuito)) {
              // Elimina el modelo de la escena
              this.remove(this.models[i]);
              this.models.splice(i, 1);
          }
      }
    }

    this.models.forEach(model => model.update());
  }

  AnimacionRaton(){
    // Actualizar la rotación de cada ratón para que apunte al gato
    let gatoPosition = this.models[0].position;
    this.ratonTime = (this.ratonTime || 0) + 0.01; // Velocidad de oscilación
    this.ratones.forEach(raton => {
        // Calcula una posición de oscilación
        let oscilacion = Math.sin(this.ratonTime) * 0.05; // Distancia de oscilación
        // Ajusta la posición del ratón
        raton.position.x += oscilacion;
        // Hacer que el ratón mire al gato
        raton.lookAt(gatoPosition);
    });
  }

  AnimacionMoneda() {
    // Hacer que las monedas giren
    this.models.forEach(model => {
      if (model instanceof MyMoneda) {
        model.rotateY(0.15);
      }
    });
  }

  update () {
    if (this.stats) this.stats.update();
    // Se actualizan los elementos de la escena para cada frame
    this.cameraControl.update();

    this.AnimacionGato();
    this.Colisiones();
    this.AnimacionRaton();
    this.AnimacionMoneda();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    requestAnimationFrame(() => this.update());
  }
}

/// La función   main
$(function () {
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");
  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  // Que no se nos olvide, la primera visualización.
  scene.update();
});