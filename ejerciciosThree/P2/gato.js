import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class MyGato extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui,titleGui);

        // Crear geometrías
        //Gato
        var cabeza = new THREE.SphereGeometry(0.5,32,32);
        var oreja = new THREE.ConeGeometry(0.2, 0.5, 32);
        var oreja2 = oreja.clone();
        var interior_oreja = new THREE.ConeGeometry(0.1, 0.27, 32);
        var interior_oreja2 = interior_oreja.clone();
        var ojo = new THREE.SphereGeometry(0.05, 32, 32);
        var ojo2 = ojo.clone();
        var nariz = new THREE.SphereGeometry(0.05, 32, 32);
        var bigote1i = new THREE.CylinderGeometry(0.005, 0.005, 0.3, 32);
        var bigote2i = bigote1i.clone();
        var bigote3i = bigote1i.clone();
        var bigote1d = bigote1i.clone();
        var bigote2d = bigote1i.clone();
        var bigote3d = bigote1i.clone();
        var cuerpo = new THREE.CylinderGeometry(0.35, 0.35, 0.75, 32);
        var cuerpo_2 = new THREE.SphereGeometry(0.35, 32, 32);
        var cuerpo_3 = cuerpo_2.clone();
        var pataCentral = new THREE.CylinderGeometry(0.1, 0.1, 0.35, 32);
        var pataExtremo1 = new THREE.SphereGeometry(0.1, 32, 32);
        var pataExtremo2 = pataExtremo1.clone();
        var pata_superior = new THREE.SphereGeometry(0.2, 32, 32);

        var boca_path = new THREE.Path();
        boca_path.moveTo(-0.1, 0);
        boca_path.absarc(-0.05, 0, 0.05, Math.PI, 0, true);
        boca_path.absarc(0.05, 0, 0.05, Math.PI, 0, true);

        var geometry = new THREE.BufferGeometry().setFromPoints(boca_path.getPoints(50));

        //Skate
        var tabla = new THREE.BoxGeometry(1,0.1,1,32);
        var tabla_extremo1 = new THREE.CylinderGeometry(0.5,0.5,0.1,32);
        var tabla_extremo2 = tabla_extremo1.clone();
        var eje_delantero = new THREE.CylinderGeometry(0.05,0.05,0.7,32);
        var eje_trasero = eje_delantero.clone();
        var soporte_eje1 = new THREE.CylinderGeometry(0.05,0.05,0.15,32);
        var soporte_eje2 = soporte_eje1.clone();
        var rueda = new THREE.CylinderGeometry(0.12,0.12,0.1,32);
        var rueda2 = rueda.clone();
        var rueda3 = rueda.clone();
        var rueda4 = rueda.clone();

        // Posicionar las orejas
        oreja.translate(0, 0.6, 0);
        oreja.rotateZ(Math.PI/4.5);
        oreja2.translate(0, 0.6, 0);
        oreja2.rotateZ(-Math.PI/4.5);

        // Posicionar el interior de las orejas
        interior_oreja.translate(0, 0.6, 0.07);
        interior_oreja.rotateZ(Math.PI/4.5);
        interior_oreja.rotateX(-0.03);
        interior_oreja2.translate(0, 0.6, 0.07);
        interior_oreja2.rotateZ(-Math.PI/4.5);
        interior_oreja2.rotateX(-0.03);
        
        // Posicionar los ojos
        ojo.translate(-0.2, 0.1, 0.45);
        ojo2.translate(0.2, 0.1, 0.45);

        //Posicionar la nariz
        nariz.translate(0, -0.05, 0.5);

        // Posicionar los bigotes
        bigote1i.rotateZ(Math.PI/2.5);
        bigote1i.translate(-0.2, -0.05, 0.5);
        bigote2i.rotateZ(Math.PI/2);
        bigote2i.translate(-0.2, -0.1, 0.5);
        bigote3i.rotateZ(-Math.PI/2.5);
        bigote3i.translate(-0.2, -0.15, 0.5);
        bigote1d.rotateZ(-Math.PI/2.5);
        bigote1d.translate(0.2, -0.05, 0.5);
        bigote2d.rotateZ(-Math.PI/2);
        bigote2d.translate(0.2, -0.1, 0.5);
        bigote3d.rotateZ(Math.PI/2.5);
        bigote3d.translate(0.2, -0.15, 0.5);
      
        // Posicionar el cuerpo
        cuerpo.rotateX(Math.PI/2);
        cuerpo.translate(0,-0.2,-0.5);
        cuerpo_2.translate(0, -0.2, -0.85);
        cuerpo_3.translate(0, -0.2, -0.15);

        // Posicionar la pata
        pataExtremo1.translate(0, -0.2, 0);
        pataExtremo2.translate(0, 0.2, 0);
        pata_superior.translate(0, -0.15, -0.1);

       // Posicionar la tabla
        tabla_extremo1.translate(0, 0, 0.5);
        tabla_extremo2.translate(0, 0, -0.5);
        eje_delantero.rotateZ(Math.PI/2);
        eje_delantero.translate(0, -0.17, 0.6);
        eje_trasero.rotateZ(Math.PI/2);
        eje_trasero.translate(0, -0.17, -0.6);
        soporte_eje1.translate(0, -0.1, 0.6);
        soporte_eje2.translate(0, -0.1, -0.6);
        rueda.rotateZ(Math.PI/2);
        rueda.translate(0.25, -0.17, 0.6);
        rueda2.rotateZ(Math.PI/2);
        rueda2.translate(-0.25, -0.17, 0.6);
        rueda3.rotateZ(Math.PI/2);
        rueda3.translate(0.25, -0.17, -0.6);
        rueda4.rotateZ(Math.PI/2);
        rueda4.translate(-0.25, -0.17, -0.6);

        // Crear material
        var material = new THREE.MeshBasicMaterial({color:0xFFC085});
        var materialOjos = new THREE.MeshBasicMaterial({color:0x000000});
        var materialOrejas = new THREE.MeshBasicMaterial({color:0xFF6A8E});
        var materialNariz = new THREE.MeshBasicMaterial({color:0xF1846C});
        var materialCuerpo = new THREE.MeshBasicMaterial({color:0xFFB074});
        var materialPatas = new THREE.MeshBasicMaterial({color:0xF7C99B});
        var materialBigotes = new THREE.MeshBasicMaterial({color:0xDFDCDE});
        var materialTabla = new THREE.MeshBasicMaterial({color:0xB22222});
        var materialEjeRuedas = new THREE.MeshBasicMaterial({color:0x606060});

        // Crear mallas
        var cabeza_M = new THREE.Mesh(cabeza, material);
        var oreja_M = new THREE.Mesh(oreja, material);
        var oreja2_M = new THREE.Mesh(oreja2, material);
        var orejaInterior_M = new THREE.Mesh(interior_oreja, materialNariz);
        var orejaInterior2_M = new THREE.Mesh(interior_oreja2, materialNariz);
        var ojo_M = new THREE.Mesh(ojo, materialOjos);
        var ojo2_M = new THREE.Mesh(ojo2, materialOjos);
        var nariz_M = new THREE.Mesh(nariz, materialNariz);
        var bigote1i_M = new THREE.Mesh(bigote1i, materialBigotes);
        var bigote2i_M = new THREE.Mesh(bigote2i, materialBigotes);
        var bigote3i_M = new THREE.Mesh(bigote3i, materialBigotes);
        var bigote1d_M = new THREE.Mesh(bigote1d, materialBigotes);
        var bigote2d_M = new THREE.Mesh(bigote2d, materialBigotes);
        var bigote3d_M = new THREE.Mesh(bigote3d, materialBigotes);
        var boca = new THREE.Line(geometry, materialOjos);
        var cuerpo_M = new THREE.Mesh(cuerpo, materialCuerpo);
        var cuerpo2_M = new THREE.Mesh(cuerpo_2, materialCuerpo);
        var cuerpo3_M = new THREE.Mesh(cuerpo_3, materialCuerpo);
        var pataCentral_M = new THREE.Mesh(pataCentral, materialPatas);
        var pataExtremo1_M = new THREE.Mesh(pataExtremo1, materialPatas);
        var pataExtremo2_M = new THREE.Mesh(pataExtremo2, materialPatas);
        var pataSuperior_M = new THREE.Mesh(pata_superior, materialPatas);

        var tabla_M = new THREE.Mesh(tabla, materialTabla);
        var tablaExtremo1_M = new THREE.Mesh(tabla_extremo1, materialTabla);
        var tablaExtremo2_M = new THREE.Mesh(tabla_extremo2, materialTabla);
        var ejeDelantero_M = new THREE.Mesh(eje_delantero, materialEjeRuedas);
        var ejeTrasero_M = new THREE.Mesh(eje_trasero, materialEjeRuedas);
        var soporteEje1_M = new THREE.Mesh(soporte_eje1, materialEjeRuedas);
        var soporteEje2_M = new THREE.Mesh(soporte_eje2, materialEjeRuedas);
        var rueda_M = new THREE.Mesh(rueda, materialOjos);
        var rueda2_M = new THREE.Mesh(rueda2, materialOjos);
        var rueda3_M = new THREE.Mesh(rueda3, materialOjos);
        var rueda4_M = new THREE.Mesh(rueda4, materialOjos);

        boca.rotateX(Math.PI);
        boca.position.set(0, -0.15, 0.47);

        //GRUPOS - CABEZA
        this.cabeza_entera = new THREE.Group();
        this.cabeza_entera.add(cabeza_M);
        this.cabeza_entera.add(oreja_M);
        this.cabeza_entera.add(oreja2_M);
        this.cabeza_entera.add(orejaInterior_M);
        this.cabeza_entera.add(orejaInterior2_M);
        this.cabeza_entera.add(ojo_M);
        this.cabeza_entera.add(ojo2_M);
        this.cabeza_entera.add(nariz_M);
        this.cabeza_entera.add(bigote1i_M);
        this.cabeza_entera.add(bigote2i_M);
        this.cabeza_entera.add(bigote3i_M);
        this.cabeza_entera.add(bigote1d_M);
        this.cabeza_entera.add(bigote2d_M);
        this.cabeza_entera.add(bigote3d_M);
        this.cabeza_entera.add(boca);

        this.cabeza_entera.scale.set(0.65,0.65,0.65);
        this.cabeza_entera.position.set(0,0,0.1);

        //CUERPO
        var cuerpo_entero = new THREE.Group();
        cuerpo_entero.add(cuerpo_M);
        cuerpo_entero.add(cuerpo2_M);
        cuerpo_entero.add(cuerpo3_M);

        cuerpo_entero.scale.set(1,0.9,0.8);
        cuerpo_entero.position.set(0,0,-0.1);

        //PATAS
        var pata = new THREE.Group();
        pata.add(pataCentral_M);
        pata.add(pataExtremo1_M);
        pata.add(pataExtremo2_M);
        pata.add(pataSuperior_M);
        
        pata.rotateX(Math.PI/2);
        pata.position.set(0.2,-0.4,0);

        var pata2 = pata.clone();
        var pata3 = pata.clone();
        var pata4 = pata.clone();

        this.cola1 = cuerpo_entero.clone();
        this.cola2 = cuerpo_entero.clone();
        pata2.position.set(-0.2,-0.4,0);
        pata3.position.set(0.27,-0.4,-0.7);
        pata4.position.set(-0.27,-0.4,-0.7);
        this.cola1.scale.set(0.2, 0.2, 0.2);
        this.cola1.position.set(0, 0.15, -0.75); // Posición original de cola1
        this.cola1.rotation.set(Math.PI / 2, 0, 0); // Rotación original de cola1
        this.cola2.position.set(0, 0, -1.25);
        this.cola1.add(this.cola2);
        this.cola2.scale.set(1, 1, 1.1);
        
        //Materiales de la cola
        this.cola1.children.forEach((child) => {
          child.material = materialPatas;
         });

         this.cola2.children.forEach((child) => {
          child.material = materialPatas;
         });

        //GATO
        var gato = new THREE.Group();

        gato.add(this.cabeza_entera);
        gato.add(cuerpo_entero);
        gato.add(pata);
        gato.add(pata2);
        gato.add(pata3);
        gato.add(pata4);
        gato.add(this.cola1);

        gato.position.set(0,0.5,0.4);

        var skate = new THREE.Group();
        skate.add(tabla_M);
        skate.add(tablaExtremo1_M);
        skate.add(tablaExtremo2_M);
        skate.add(ejeDelantero_M);
        skate.add(ejeTrasero_M);
        skate.add(rueda_M);
        skate.add(rueda2_M);
        skate.add(rueda3_M);
        skate.add(rueda4_M);
        skate.add(soporteEje1_M);
        skate.add(soporteEje2_M);

        this.add(gato);
        this.add(skate);
        
    }

    createGUI (gui,titleGui) {
        // Aquí puedes añadir controles para la interfaz gráfica de usuario
    }

    update () {
        // Aquí puedes actualizar la geometría del gato
        var time = Date.now() * 0.003;
        var time1 = Date.now() * 0.001;

        // Mover cola1 y cola2 suavemente
        this.cola1.rotation.y = Math.sin(time) * 0.5;
        this.cola2.rotation.y = Math.sin(time) * 0.5;
        this.cabeza_entera.rotation.y = Math.sin(time1) * 0.5;
    }
}

export { MyGato };