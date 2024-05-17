// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import { MyJuego } from './MyJuego.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, creamos e inicializamos los distintos elementos que usaremos
    this.renderer = this.createRenderer(myCanvas);
    const loader = new THREE.TextureLoader();
    const texture = loader.load('images/cielo3.jpg', () => {
      // Actualizar el renderizador una vez que la textura se haya cargado
      this.renderer.render(this);
    });

    // Establecer la textura como fondo
    this.background = texture;
    this.background.wrapS = THREE.RepeatWrapping;
    this.background.wrapT = THREE.RepeatWrapping;
    this.background.repeat.set(1, 1); // Ajusta estos valores según el tamaño de tu imagen
    this.gui = this.createGUI ();
    this.initStats();
    this.createLights ();
    this.createCamera ();
    this.createGround ();
    this.axis = new THREE.AxesHelper (2);
    this.add (this.axis);
    this.models = [];
    this.models.push(new MyJuego(this.gui, "Controles del juego"));
    this.models.forEach(model => this.add(model));
    this.AlternarCamara();
  }

  AlternarCamara() {
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') { //Espacio para alternar la cámara
        this.camara_gato = !this.camara_gato;
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


      var purpleLightFolder = gui.addFolder('Purple Light');
      this.guiControls.purpleLightPower = 500.0;
      purpleLightFolder.add(this.guiControls, 'purpleLightPower', 0, 1000, 20)
        .name('Potencia: ')
        .onChange((value) => this.setPurpleLightPower(value));
    
      // Crea una nueva sección para la luz verde
      var greenLightFolder = gui.addFolder('Green Light');
      this.guiControls.greenLightPower = 500.0;
      greenLightFolder.add(this.guiControls, 'greenLightPower', 0, 1000, 20)
        .name('Potencia: ')
        .onChange((value) => this.setGreenLightPower(value));
    
    
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

    // Crea una luz puntual morada
    this.purpleLight = new THREE.PointLight(0x800080); // Color morado en hexadecimal
    this.purpleLight.intensity = this.guiControls.purpleLightPower;
    this.purpleLight.position.set(0, 0, 0); // Posición central
    this.add(this.purpleLight);

    // Crea una luz puntual verde
    this.greenLight = new THREE.PointLight(0x008000); // Color verde en hexadecimal
    this.greenLight.intensity = this.guiControls.greenLightPower;
    this.greenLight.position.set(0, 0, 0); // Posición central
    this.add(this.greenLight);

                
    // Crea una luz puntual verde
    this.tunelLight = new THREE.SpotLight(0xFF0000); // Color verde en hexadecimal
    this.tunelLight.position.set(19, 11.8, 10); // Posición central
    this.tunelLight.target.position.set(1.5, 10, 10);
    this.tunelLight.distance = 5;
    this.add(this.tunelLight);

    this.tunelLight2 = new THREE.SpotLight(0xFF0000); // Color verde en hexadecimal
    this.tunelLight2.position.set(20, 11.8, 10); // Posición central
    this.tunelLight2.target.position.set(15.5, 10, 10);
    this.tunelLight2.distance = 5;
    this.add(this.tunelLight2);

    // Variables para controlar la animación
    this.lightOn = true; // Estado inicial de las luces

    // Función para encender y apagar las luces
    this.toggleLights = function () {
        this.lightOn = !this.lightOn;
        this.tunelLight.intensity = this.lightOn ? 500 : 0;
        this.tunelLight2.intensity = this.lightOn ? 500 : 0;
    };

    // Inicia la animación
    this.lightInterval = setInterval(this.toggleLights.bind(this), 1000); // Cambia el estado de las luces cada segundo
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setPurpleLightPower (valor) {
    this.purpleLight.intensity = valor;
  }
  
  setGreenLightPower (valor) {
    this.greenLight.intensity = valor;
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
      return this.models[0].models[0].camera;
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

  update () {
    if (this.stats) this.stats.update();
    // Se actualizan los elementos de la escena para cada frame
    this.cameraControl.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    this.models.forEach(model => model.update());
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