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
//import { MyRaton } from './raton.js'
import { MyCircuito } from './circuito.js'
import {MyGato} from './gato.js'
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    this.velocidadGato = 0.0005; // Velocidad inicial del gato
    
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.puntos = 0;
   
    
    this.initStats();
    this.velocidadGato = 0.0005; // Velocidad inicial del gato
    
    // Construimos los distinos elementos que tendremos en la escena
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Un suelo 
    this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    // Todas las unidades están en metros
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
    
    // Crear la curva
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
            new THREE.Vector3(7, 0.5, 13),
            new THREE.Vector3(6, 1, 10),
            new THREE.Vector3(7, 1.5, 7),
            new THREE.Vector3(10, 2, 6),
            new THREE.Vector3(13, 2.5, 7),
            new THREE.Vector3(14, 3, 10),
            new THREE.Vector3(13, 3.5, 13),
            new THREE.Vector3(10, 4, 14),//Segunda vuelta
            new THREE.Vector3(7, 4.5, 13),
            new THREE.Vector3(6, 5, 10),
            new THREE.Vector3(7, 5.5, 7),
            new THREE.Vector3(10, 6, 6),
            new THREE.Vector3(13, 6.5, 7),
            new THREE.Vector3(14, 7, 10),
            new THREE.Vector3(13, 7.5, 13),
            new THREE.Vector3(10, 8, 14),//Tercera vuelta
            new THREE.Vector3(7, 8.5, 13),
            new THREE.Vector3(6, 9, 10),
            new THREE.Vector3(7, 9.5, 7),
            new THREE.Vector3(10, 10, 5),//Fin espiral 
            new THREE.Vector3(15, 10, 5),//Inicio looping
            new THREE.Vector3(18, 12, 4),
            new THREE.Vector3(19, 15, 3),//Punto mas a la derecha del looping
            new THREE.Vector3(18, 18, 2),
            new THREE.Vector3(15, 19, 1),//Punto mas alto del looping
            new THREE.Vector3(12, 18, 0),
            new THREE.Vector3(11, 15, 0),//Punto mas a la izquierda del looping
            new THREE.Vector3(12, 12, 0),
            new THREE.Vector3(15, 10, 0),//Fin looping e inicio recta
            new THREE.Vector3(20, 10, 0),//Fin recta e inicio curva
            new THREE.Vector3(23, 10, 2),
            new THREE.Vector3(24, 10, 5),//Mitad de la curva   
            new THREE.Vector3(23, 10, 8),
            new THREE.Vector3(20, 10, 10),//Fin curva e inicio recta
            new THREE.Vector3(12, 10, 10),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(8, -3, 10),
            new THREE.Vector3(5, -4, 10),
            new THREE.Vector3(2, -3, 8),
            new THREE.Vector3(1, 0, 5),
            new THREE.Vector3(2, 0, 2),
            new THREE.Vector3(5, 0, 0),//Fin circuito
    ]);

    // Por último creamos el modelo.
    // Por último creamos el modelo.
this.models = [];
this.models.push(new MyGato(this.gui, "Controles del gato"));
this.models[0].scale.set(0.05, 0.05, 0.05);
this.models.push(new MyCircuito(this.gui, "Controles del circuito", this.curve));

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

  model.rotateY(Math.PI/2);

  this.models.push(model);
}
    this.models.forEach(model => this.add(model));
    
    this.models[0].rotation.y = Math.PI;
    this.t = 0;

    this.leftArrowDown = false;
    this.rightArrowDown = false;
    this.rotationZ=0;
    this.angle = 0;

    // Definimos un vector de desplazamiento
    this.displacement = new THREE.Vector3();

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
          // Marcar la tecla izquierda como presionada
          this.leftArrowDown = true;
          // Calcular el vector de desplazamiento en el sistema de coordenadas locales del gato
          let localDisplacement = new THREE.Vector3(0.1, 0, 0); // Por ejemplo, mover a la izquierda
          localDisplacement.applyQuaternion(this.models[0].quaternion);

          this.rotationZ -= 0.2;
          // Actualizar el desplazamiento global
          this.displacement.add(localDisplacement);
      } else if (event.key === 'ArrowRight') {
          // Marcar la tecla derecha como presionada
          this.rightArrowDown = true;

          // Calcular el vector de desplazamiento en el sistema de coordenadas locales del gato
          let localDisplacement = new THREE.Vector3(-0.1, 0, 0); // Por ejemplo, mover a la derecha
          localDisplacement.applyQuaternion(this.models[0].quaternion);
          
          // Actualizar el desplazamiento global
          this.displacement.add(localDisplacement);
          this.rotationZ += 0.2;
      }
  });
  
  document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowLeft') {
          // Marcar la tecla izquierda como no presionada
          this.leftArrowDown = false;       
      } else if (event.key === 'ArrowRight') {
          // Marcar la tecla derecha como no presionada
          this.rightArrowDown = false;
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
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    // Recuerda: Todas las unidades están en metros
    // También se indica dónde se coloca
    this.camera.position.set (4, 2, 4);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (10,0.2,10);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshStandardMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    //this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
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
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
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
    
    // Se instancia un Renderer   WebGL
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
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
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
  
  update () {
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    this.cameraControl.update();
  
    // Mover el gato a lo largo de la curva
    this.t -= this.velocidadGato;
    if (this.t < 0) this.t = 1;
    let position = this.curve.getPointAt(this.t);
  
    // Calcular la tangente de la curva en este punto
    let tangent = this.curve.getTangentAt(this.t).normalize();
    
    position.add(this.displacement);  
    // Ajustar la posición del gato
    this.models[0].position.copy(position);
  
    // Hacer que el gato mire en la dirección en la que se está moviendo
    this.models[0].lookAt(position.clone().add(tangent));
  
    // Mover el gato 0.5 unidades en su eje Y local
    this.models[0].translateY(0.515);
    // Se actualiza el resto del modelo
    this.models[0].update();
    
    this.models[0].rotateY(Math.PI);
    this.models[0].rotateZ(this.rotationZ);

    for (let i = this.models.length - 1; i >= 1; i--) { // Comienza desde el final y salta el gato
      // Calcula la distancia entre el gato y el modelo
      let distancia = this.models[0].position.distanceTo(this.models[i].position);
    
      // Si la distancia es menor que un cierto umbral, asumimos que hay una colisión
      if (distancia < 0.5) {
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
        }
        // Si el modelo es una raspa
       /* else if (this.models[i] instanceof MyRaspa) {
          // Aumenta la velocidad del gato en un 10%
          this.velocidadGato *= 1.10;
        }*/
        // Si el modelo es un rayo
        else if (this.models[i] instanceof MyRayo) {
          // Aumenta la velocidad del gato en un 30%
          this.velocidadGato *= 1.30;
        }
    
        // Elimina el modelo de la escena
        this.remove(this.models[i]);
        this.models.splice(i, 1);
      }
    }

    this.models.forEach(model => model.update());
  
    // Actualizar la posición de la cámara para que siga al gato desde atrás y un poco por encima
   /* let cameraOffset = tangent.clone().multiplyScalar(0.5); // Ajustado a 0.5 para colocar la cámara detrás del gato
    cameraOffset.y += 0.1; // Ajusta la cámara un poco más baja
    let cameraPosition = new THREE.Vector3().addVectors(this.models[0].position, cameraOffset);
    this.camera.position.copy(cameraPosition);
  
    // Hacer que la cámara mire al gato
    this.camera.lookAt(this.models[0].position);
    */
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