import * as THREE from 'three'

import { initScene } from './initScene.js';
import { createRuler, createSetSquareRuler, createTriangleRuler, customLine, customArcLine, createLetterPlane } from './ruler.js'
import { createCompass } from './compas.js'

// import { customLine } from './steps.js'
import { lineStepByStepVectors, lineStepByStepArray, arcStepByStep } from './managerSteps.js'

export const status = { update: undefined }

const props = {
  backgroundColor: 0xf0f0f0,
}

export const config = {
  sizeTangram: 12
}

export const tools = {
  lengthRuler: 20, lengthSetSquareRuler: 15, lengthTriangleRuler: 15,
  marginRuler: 0.5, marginSetSquareRuler: 0.5, marginTriangleRuler: 0.5,
  widthRuler: 2,
  lengthCompass: 10
}

export const drawElements = new THREE.Group();


initScene(props)(({ scene, camera, renderer }) => {

  // status.update = () => renderer.render( scene, camera )
  const geometry1 = new THREE.PlaneGeometry(9, 9); // ajusta tamaño
  status.material = new THREE.MeshBasicMaterial({ opacity: 0.2, transparent: true });
  const plane = new THREE.Mesh(geometry1, status.material);
  scene.add(plane);

  const scalePiece = 1.5;
  const scalePlane = scalePiece / 2;
  plane.position.z = -1000; // lo colocas detrás de tus piezas
  plane.scale.set(scalePlane, scalePlane, 1);

  // Regla
  tools.ruler = createRuler(tools.lengthRuler, tools.widthRuler);
  tools.ruler.visible = false;

  scene.add(tools.ruler)

  // Escuadra
  tools.setSquareRuler = createSetSquareRuler(tools.lengthSetSquareRuler, tools.marginSetSquareRuler);
  tools.setSquareRuler.visible = false;

  scene.add(tools.setSquareRuler)

  // Cartabon
  tools.triangleRuler = createTriangleRuler(tools.lengthTriangleRuler, tools.marginTriangleRuler);
  tools.triangleRuler.visible = false;

  scene.add(tools.triangleRuler)

  // const armLength = 10
  tools.compass = createCompass(tools.lengthCompass)
  tools.compas.visible = false;
  tools.compas.position.y = - 5 + 12;
  // compas.position.z = 1;
  tools.compas.scale.set(-1, -1, 1)
  // compas.rotateZ( Math.PI / 2 )

  scene.add(tools.compass)

  // Letters
  drawElements.userData.sizeLetter = 1.;

  // A
  let letterMesh = createLetterPlane("A", drawElements.userData.sizeLetter);
  letterMesh.position.set(0, 0, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.A = letterMesh;

  // B
  letterMesh = createLetterPlane("B", drawElements.userData.sizeLetter);
  letterMesh.position.set(config.sizeTangram, 0, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.B = letterMesh;

  // C
  letterMesh = createLetterPlane("C", drawElements.userData.sizeLetter);
  letterMesh.position.set(0, config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.C = letterMesh;

  // D
  letterMesh = createLetterPlane("D", drawElements.userData.sizeLetter);
  letterMesh.position.set(config.sizeTangram, config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.D = letterMesh;

  // E
  letterMesh = createLetterPlane("E", drawElements.userData.sizeLetter);
  letterMesh.position.set(config.sizeTangram, config.sizeTangram / 2, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.E = letterMesh;

  // F
  letterMesh = createLetterPlane("F", drawElements.userData.sizeLetter);
  letterMesh.position.set(0.75 * config.sizeTangram, 0.25 * config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.F = letterMesh;

  // G
  letterMesh = createLetterPlane("G", drawElements.userData.sizeLetter);
  letterMesh.position.set(0.75 * config.sizeTangram, 0.75 * config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.G = letterMesh;

  // H
  letterMesh = createLetterPlane("H", drawElements.userData.sizeLetter);
  letterMesh.position.set(0.25 * config.sizeTangram, 0.25 * config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.H = letterMesh;

  // M
  letterMesh = createLetterPlane("M", drawElements.userData.sizeLetter);
  letterMesh.position.set(0.5 * config.sizeTangram, 0, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.M = letterMesh;

  // O
  letterMesh = createLetterPlane("O", drawElements.userData.sizeLetter);
  letterMesh.position.set(0.5 * config.sizeTangram, 0.5 * config.sizeTangram, 0);
  letterMesh.visible = false;
  drawElements.add(letterMesh);
  drawElements.userData.O = letterMesh;

  scene.add(drawElements);

  // Lines

  // Line AB
  let lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AB = lineMesh;

  // Line AC
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AC = lineMesh;

  // Line CD
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.CD = lineMesh;

  // Line BD
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.BD = lineMesh;


  // Line AD
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AD = lineMesh;

  // Line ME
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.ME = lineMesh;

  // Line CF
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.CF = lineMesh;

  // Line FG
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.FG = lineMesh;

  // Line HM
  lineMesh = customLine([0, 0, 0, 0, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.HM = lineMesh;




  const line1 = customLine([0, 0, 0, 0, 0, 0]);
  line1.position.y = -5;
  // let letterMesh = createLetterPlane("A", 1.);
  // letterMesh.position.y = -0.7;
  // letterMesh.visible = false;

  line1.add(letterMesh)
  letterMesh = createLetterPlane("B", 1.);
  letterMesh.position.x = 12
  letterMesh.position.y = -0.7;
  letterMesh.visible = false;
  line1.add(letterMesh)
  scene.add(line1);

  const line2 = customLine([0, 0, 0, 0, 0, 0]);
  line2.position.y = -5;
  letterMesh = createLetterPlane("C", 1.);
  letterMesh.position.x = 0
  letterMesh.position.y = 12.7
  letterMesh.visible = false;
  line2.add(letterMesh)
  scene.add(line2);

  // Paso 2
  esquadra.position.y = -5 + 0.5;
  esquadra.rotateZ(Math.PI / 2)
  cartabon.position.x = 7;
  cartabon.position.y = -5 - 15 * Math.sqrt(3) / 2 + 0.5 / 2;
  cartabon.rotateZ(Math.PI - Math.PI / 6)

  // Parámetros del arco
  const radius = 12;
  let centroY = -5, centroX = 0;
  let startAngle = 0;
  let endAngle = Math.PI * 0.5;
  // let startAngle = Math.PI / 20;
  // let endAngle = -startAngle;


  const maxPoints = Math.floor(Math.abs(endAngle - startAngle) * 100);
  let sign = 1;
  let angle1 = (endAngle - startAngle) / maxPoints;

  let ang = Math.acos(radius / armLength / 2)
  // compas.children[0].rotateZ( sign * ( Math.PI - 2 * ang ) )
  // compas.rotateZ( sign * ang + startAngle )
  compas.children[0].rotation.z = Math.PI;
  compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
  compas.rotation.z = Math.PI
  compas.rotateZ(sign * ang + startAngle)
  compas.position.y = centroY;
  const arc1 = customArcLine(maxPoints, 'black')
  scene.add(arc1.arcLine);
  const arc2 = customArcLine(maxPoints, 'black')
  scene.add(arc2.arcLine);
  const arc3 = customArcLine(maxPoints, 'black')
  scene.add(arc3.arcLine);

  // Paso 3

  // Parámetros del arco
  // const radius = 12;
  // centroY = -5 + 12;
  // startAngle = Math.PI / 20;
  // endAngle = -startAngle;

  // // maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );
  // sign = -1;
  // angle1 = ( endAngle - startAngle ) / maxPoints;

  // ang = Math.acos( radius / armLength / 2 )
  // compas.children[0].rotation.z = Math.PI;
  // compas.children[0].rotateZ( sign * ( Math.PI - 2 * ang ) )
  // compas.rotation.z = Math.PI
  // compas.rotateZ( sign * ang + startAngle )
  // // compas.children[0].rotateZ( sign * ( Math.PI - 2 * ang ) )
  // // compas.rotateZ( sign * ang + startAngle )
  // compas.position.y = centroY;
  // // // const arc = customArcLine( maxPoints, 'black' )
  // // // scene.add( arc.arcLine );

  // Paso 4
  const line3 = customLine([0, 0, 0, 0, 0, 0]);
  line3.position.y = -5;
  letterMesh = createLetterPlane("D", 1.);
  letterMesh.position.x = 12;
  letterMesh.position.y = 12.7;
  letterMesh.visible = false;
  line3.add(letterMesh)
  scene.add(line3);

  const line4 = customLine([0, 0, 0, 0, 0, 0]);
  line4.position.y = -5;
  // letterMesh = createLetterPlane( "D", 1. );
  // letterMesh.position.x = 12.5;
  // letterMesh.position.y = 12.5;
  // letterMesh.visible = false;
  // line4.add( letterMesh )
  scene.add(line4);



  let currentPoints = 0;
  let nLine = 0;
  function animate() {
    requestAnimationFrame(animate);

    const t = currentPoints / (maxPoints - 1);

    if (nLine === 0) lineStepByStepArray(line1, [0, 0, 0, 12, 0, 0], t);
    if (nLine === 1) lineStepByStepArray(line2, [0, 0, 0, 0, 12, 0], t);

    if (currentPoints === maxPoints - 1 && nLine === 0) {
      nLine = 1; currentPoints = 0;
      line1.children[0].visible = true;
      line1.children[1].visible = true;
      ruler.visible = false;

      esquadra.visible = true;
      cartabon.visible = true;
      return;
    }
    if (currentPoints === maxPoints - 1 && nLine === 1) {
      nLine = 2; currentPoints = 0;
      return;
    }
    // if ( currentPoints === maxPoints - 1 && nLine === 2 ) {
    //   nLine = 3; currentPoints = 0;
    //   return
    // }
    // if ( currentPoints > maxPoints ) return;

    if (nLine === 2) {
      esquadra.visible = false;
      cartabon.visible = false;
      line2.children[0].visible = true;

      compas.visible = true;
      compas.rotateZ(angle1);
      arcStepByStep(arc1, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
      // nLine = 3;
    }
    if (currentPoints === maxPoints - 1 && nLine === 2) {
      nLine = 3; currentPoints = 0;
      arc1.arcLine.visible = false;
      centroY = -5 + 12;
      startAngle = Math.PI / 20;
      endAngle = -startAngle;

      // maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );
      sign = -1;
      angle1 = (endAngle - startAngle) / maxPoints;

      // ang = Math.acos( radius / armLength / 2 )
      compas.children[0].rotation.z = Math.PI;
      compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
      compas.rotation.z = Math.PI
      compas.rotateZ(sign * ang + startAngle)
      compas.position.y = centroY;
      return
    }
    if (nLine === 3) {

      compas.visible = true;
      compas.rotateZ(angle1);
      arcStepByStep(arc2, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
    }

    if (currentPoints === maxPoints - 1 && nLine === 3) {
      nLine = 4; currentPoints = 0;
      centroX = 12;
      centroY = -5;
      startAngle = Math.PI / 2 - Math.PI / 20;
      endAngle = Math.PI / 2 + Math.PI / 20;

      // maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );
      sign = 1;
      angle1 = (endAngle - startAngle) / maxPoints;

      // ang = Math.acos( radius / armLength / 2 )
      compas.children[0].rotation.z = Math.PI;
      compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
      compas.rotation.z = Math.PI
      compas.rotateZ(sign * ang + startAngle)
      compas.position.x = centroX;
      compas.position.y = centroY;
      return
    }
    if (nLine === 4) {

      compas.visible = true;
      compas.rotateZ(angle1);
      arcStepByStep(arc3, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
    }
    if (currentPoints === maxPoints - 1 && nLine === 4) {
      nLine = 5; currentPoints = 0;
      compas.visible = false;
      ruler.visible = true;
      ruler.position.y = -5 + 12;

      return
    }
    if (nLine === 5) {

      lineStepByStepArray(line3, [0, 12, 0, 12, 12, 0], t);
    }
    if (currentPoints === maxPoints - 1 && nLine === 5) {
      nLine = 6; currentPoints = 0;
      compas.visible = false;
      ruler.visible = true;
      ruler.rotation.z = Math.PI / 2;
      ruler.position.x = 12.;
      ruler.position.y = -5.;

      return
    }
    if (nLine === 6) {

      lineStepByStepArray(line4, [12, 0, 0, 12, 12, 0], t);
    }

    if (currentPoints === maxPoints - 1 && nLine === 6) {
      line3.children[0].visible = true;
      nLine = 7; currentPoints = 0;
      compas.visible = false;
      ruler.visible = true;
      ruler.rotation.z = 0.;
      ruler.position.y = 12.;

      arc2.arcLine.visible = false;
      arc3.arcLine.visible = false;
      return
    }
    if (nLine === 7) {

      // lineStepByStepArray( line4, [12, 0, 0, 12, 12, 0], t );
    }

    currentPoints++;
    renderer.render(scene, camera);
  }
  animate();


})