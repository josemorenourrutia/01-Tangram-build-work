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
  sizeTangram: 12,
  maxPoints: 128 / 4
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
  tools.compass.visible = false;
  // tools.compass.position.y = - 5 + 12;
  // compas.position.z = 1;
  // tools.compass.scale.set(-1, -1, 1)
  // compas.rotateZ( Math.PI / 2 )

  scene.add(tools.compass)

  // Circle
  const circle = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 16),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  ); drawElements.add(circle);
  drawElements.userData.circle = circle;

  // Letters
  drawElements.userData.sizeLetter = 1.;

  // A1
  let numberMesh = createLetterPlane("1", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A1 = numberMesh;

  // A2
  numberMesh = createLetterPlane("2", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A2 = numberMesh;

  // A3
  numberMesh = createLetterPlane("3", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A3 = numberMesh;

  // A4
  numberMesh = createLetterPlane("4", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A4 = numberMesh;

  // A5
  numberMesh = createLetterPlane("5", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A5 = numberMesh;

  // A6
  numberMesh = createLetterPlane("6", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A6 = numberMesh;

  // A7
  numberMesh = createLetterPlane("7", drawElements.userData.sizeLetter * 1.5);
  numberMesh.position.set(0, 0, 0);
  numberMesh.visible = false;
  drawElements.add(numberMesh);
  drawElements.userData.A7 = numberMesh;

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
  let lineMesh = customLine([0, 0, 0, 12, 0, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AB = lineMesh;

  // Line AC
  lineMesh = customLine([0, 0, 0, 0, 12, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AC = lineMesh;

  // Line CD
  lineMesh = customLine([0, 12, 0, 12, 12, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.CD = lineMesh;

  // Line BD
  lineMesh = customLine([12, 0, 0, 12, 12, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.BD = lineMesh;


  // Line AD
  lineMesh = customLine([0, 0, 0, 12, 12, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.AD = lineMesh;

  // Line MM'
  lineMesh = customLine([6, 0, 0, 6, 0.3, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.MM = lineMesh;

  // Line ME
  lineMesh = customLine([6, 0, 0, 12, 6, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.ME = lineMesh;

  // Line CF
  lineMesh = customLine([0, 12, 0, 9, 3, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.CF = lineMesh;

  // Line FG
  lineMesh = customLine([9, 3, 0, 9, 9, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.FG = lineMesh;

  // Line MH
  lineMesh = customLine([6, 0, 0, 3, 3, 0]);
  lineMesh.visible = false;
  drawElements.add(lineMesh);
  drawElements.userData.MH = lineMesh;

  // ARCS

  // BAC
  let arc = customArcLine(config.maxPoints, 'black')
  arc.visible = false;
  drawElements.add(arc);
  drawElements.userData.BAC = arc;

  // C1
  arc = customArcLine(config.maxPoints, 'black')
  arc.visible = false;
  drawElements.add(arc);
  drawElements.userData.C1 = arc;

  // C2
  arc = customArcLine(config.maxPoints, 'black')
  arc.visible = false;
  drawElements.add(arc);
  drawElements.userData.C2 = arc;

  drawElements.position.y = -5;
  scene.add(drawElements)

  console.log(drawElements.userData.A)
  // const line1 = customLine([0, 0, 0, 0, 0, 0]);
  // line1.position.y = -5;
  // // let letterMesh = createLetterPlane("A", 1.);
  // // letterMesh.position.y = -0.7;
  // // letterMesh.visible = false;

  // line1.add(letterMesh)
  // letterMesh = createLetterPlane("B", 1.);
  // letterMesh.position.x = 12
  // letterMesh.position.y = -0.7;
  // letterMesh.visible = false;
  // line1.add(letterMesh)
  // scene.add(line1);

  // const line2 = customLine([0, 0, 0, 0, 0, 0]);
  // line2.position.y = -5;
  // letterMesh = createLetterPlane("C", 1.);
  // letterMesh.position.x = 0
  // letterMesh.position.y = 12.7
  // letterMesh.visible = false;
  // line2.add(letterMesh)
  // scene.add(line2);

  // // Paso 2
  // esquadra.position.y = -5 + 0.5;
  // esquadra.rotateZ(Math.PI / 2)
  // cartabon.position.x = 7;
  // cartabon.position.y = -5 - 15 * Math.sqrt(3) / 2 + 0.5 / 2;
  // cartabon.rotateZ(Math.PI - Math.PI / 6)

  // // Parámetros del arco
  // const radius = 12;
  // let centroY = -5, centroX = 0;
  // let startAngle = 0;
  // let endAngle = Math.PI * 0.5;
  // // let startAngle = Math.PI / 20;
  // // let endAngle = -startAngle;


  // const maxPoints = Math.floor(Math.abs(endAngle - startAngle) * 100);
  // let sign = 1;
  // let angle1 = (endAngle - startAngle) / maxPoints;

  // let ang = Math.acos(radius / armLength / 2)
  // // compas.children[0].rotateZ( sign * ( Math.PI - 2 * ang ) )
  // // compas.rotateZ( sign * ang + startAngle )
  // compas.children[0].rotation.z = Math.PI;
  // compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
  // compas.rotation.z = Math.PI
  // compas.rotateZ(sign * ang + startAngle)
  // compas.position.y = centroY;
  // const arc1 = customArcLine(maxPoints, 'black')
  // scene.add(arc1.arcLine);
  // const arc2 = customArcLine(maxPoints, 'black')
  // scene.add(arc2.arcLine);
  // const arc3 = customArcLine(maxPoints, 'black')
  // scene.add(arc3.arcLine);

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

  // // Paso 4
  // const line3 = customLine([0, 0, 0, 0, 0, 0]);
  // line3.position.y = -5;
  // letterMesh = createLetterPlane("D", 1.);
  // letterMesh.position.x = 12;
  // letterMesh.position.y = 12.7;
  // letterMesh.visible = false;
  // line3.add(letterMesh)
  // scene.add(line3);

  // const line4 = customLine([0, 0, 0, 0, 0, 0]);
  // line4.position.y = -5;
  // // letterMesh = createLetterPlane( "D", 1. );
  // // letterMesh.position.x = 12.5;
  // // letterMesh.position.y = 12.5;
  // // letterMesh.visible = false;
  // // line4.add( letterMesh )
  // scene.add(line4);

  // let currentPoints = 0;
  // let nLine = 0;
  // function animate() {
  //   requestAnimationFrame(animate);

  //   const t = currentPoints / (maxPoints - 1);

  //   if (nLine === 0) lineStepByStepArray(line1, [0, 0, 0, 12, 0, 0], t);
  //   if (nLine === 1) lineStepByStepArray(line2, [0, 0, 0, 0, 12, 0], t);

  //   if (currentPoints === maxPoints - 1 && nLine === 0) {
  //     nLine = 1; currentPoints = 0;
  //     line1.children[0].visible = true;
  //     line1.children[1].visible = true;
  //     ruler.visible = false;

  //     esquadra.visible = true;
  //     cartabon.visible = true;
  //     return;
  //   }
  //   if (currentPoints === maxPoints - 1 && nLine === 1) {
  //     nLine = 2; currentPoints = 0;
  //     return;
  //   }
  //   // if ( currentPoints === maxPoints - 1 && nLine === 2 ) {
  //   //   nLine = 3; currentPoints = 0;
  //   //   return
  //   // }
  //   // if ( currentPoints > maxPoints ) return;

  //   if (nLine === 2) {
  //     esquadra.visible = false;
  //     cartabon.visible = false;
  //     line2.children[0].visible = true;

  //     compas.visible = true;
  //     compas.rotateZ(angle1);
  //     arcStepByStep(arc1, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
  //     // nLine = 3;
  //   }
  //   if (currentPoints === maxPoints - 1 && nLine === 2) {
  //     nLine = 3; currentPoints = 0;
  //     arc1.arcLine.visible = false;
  //     centroY = -5 + 12;
  //     startAngle = Math.PI / 20;
  //     endAngle = -startAngle;

  //     // maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );
  //     sign = -1;
  //     angle1 = (endAngle - startAngle) / maxPoints;

  // ang = Math.acos( radius / armLength / 2 )
  //     compas.children[0].rotation.z = Math.PI;
  //     compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
  //     compas.rotation.z = Math.PI
  //     compas.rotateZ(sign * ang + startAngle)
  //     compas.position.y = centroY;
  //     return
  //   }
  //   if (nLine === 3) {

  //     compas.visible = true;
  //     compas.rotateZ(angle1);
  //     arcStepByStep(arc2, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
  //   }

  //   if (currentPoints === maxPoints - 1 && nLine === 3) {
  //     nLine = 4; currentPoints = 0;
  //     centroX = 12;
  //     centroY = -5;
  //     startAngle = Math.PI / 2 - Math.PI / 20;
  //     endAngle = Math.PI / 2 + Math.PI / 20;

  //     // maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );
  //     sign = 1;
  //     angle1 = (endAngle - startAngle) / maxPoints;

  //     // ang = Math.acos( radius / armLength / 2 )
  //     compas.children[0].rotation.z = Math.PI;
  //     compas.children[0].rotateZ(sign * (Math.PI - 2 * ang))
  //     compas.rotation.z = Math.PI
  //     compas.rotateZ(sign * ang + startAngle)
  //     compas.position.x = centroX;
  //     compas.position.y = centroY;
  //     return
  //   }
  //   if (nLine === 4) {

  //     compas.visible = true;
  //     compas.rotateZ(angle1);
  //     arcStepByStep(arc3, currentPoints, centroX, centroY, radius, startAngle, endAngle, t);
  //   }
  //   if (currentPoints === maxPoints - 1 && nLine === 4) {
  //     nLine = 5; currentPoints = 0;
  //     compas.visible = false;
  //     ruler.visible = true;
  //     ruler.position.y = -5 + 12;

  //     return
  //   }
  //   if (nLine === 5) {

  //     lineStepByStepArray(line3, [0, 12, 0, 12, 12, 0], t);
  //   }
  //   if (currentPoints === maxPoints - 1 && nLine === 5) {
  //     nLine = 6; currentPoints = 0;
  //     compas.visible = false;
  //     ruler.visible = true;
  //     ruler.rotation.z = Math.PI / 2;
  //     ruler.position.x = 12.;
  //     ruler.position.y = -5.;

  //     return
  //   }
  //   if (nLine === 6) {

  //     lineStepByStepArray(line4, [12, 0, 0, 12, 12, 0], t);
  //   }

  //   if (currentPoints === maxPoints - 1 && nLine === 6) {
  //     line3.children[0].visible = true;
  //     nLine = 7; currentPoints = 0;
  //     compas.visible = false;
  //     ruler.visible = true;
  //     ruler.rotation.z = 0.;
  //     ruler.position.y = 12.;

  //     arc2.arcLine.visible = false;
  //     arc3.arcLine.visible = false;
  //     return
  //   }
  //   if (nLine === 7) {

  //     // lineStepByStepArray( line4, [12, 0, 0, 12, 12, 0], t );
  //   }

  //   currentPoints++;
  //   renderer.render(scene, camera);
  // }

  const managerSteps = [
    (t) => {
      drawElements.userData.A.position.y = -1.2;
      drawElements.userData.A.visible = true;
    },
    (t) => {
      const startPos = 20;
      const endPos = 0;
      tools.ruler.position.x = startPos + (endPos - startPos) * t;
      tools.ruler.position.y = -5 - 0.05;
      tools.ruler.visible = true;
    },
    (t) => { },
    (t) => {
      drawElements.userData.AB.visible = true;
      const p = lineStepByStepArray(drawElements.userData.AB, drawElements.userData.AB.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      tools.ruler.visible = false;
      drawElements.userData.B.position.x = 12;
      drawElements.userData.B.position.y = -1.2;
      drawElements.userData.B.visible = true;
    },
    (t) => {
      let startPos = 7;
      let endPos = -5 - 15 * Math.sqrt(3) / 2 + 0.5 / 2;
      tools.triangleRuler.visible = true;
      tools.triangleRuler.position.x = 7;
      tools.triangleRuler.position.y = startPos + (endPos - startPos) * t - 0.05;
      tools.triangleRuler.rotation.z = Math.PI - Math.PI / 6;
    },
    (t) => { },
    (t) => {
      let startPos = 20;
      let endPos = 0;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = startPos + (endPos - startPos) * t;
      tools.setSquareRuler.position.y = -5 + 0.5 - 0.05;
      tools.setSquareRuler.rotation.z = Math.PI / 2
    },
    (t) => { },
    (t) => {
      drawElements.userData.AC.visible = true;
      const p = lineStepByStepArray(drawElements.userData.AC, drawElements.userData.AC.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => {
      tools.triangleRuler.visible = false;
      tools.setSquareRuler.visible = false;
    },
    (t) => {
      drawElements.userData.BAC.visible = true;
      let centroX = 0, centroY = 0;
      const radius = 12;
      const startAngle = 0, endAngle = Math.PI / 2;
      const p = arcStepByStep(drawElements.userData.BAC, Math.round(t * config.maxPoints), centroX, centroY, radius, startAngle, endAngle, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);

      centroY = -5;
      const armLength = 10;
      let sign = 1;

      let ang = Math.acos(radius / armLength / 2)
      tools.compass.children[0].rotation.z = Math.PI + sign * (Math.PI - 2 * ang)
      tools.compass.rotation.z = sign * ang + startAngle + (endAngle - startAngle) * t;
      tools.compass.position.y = centroY;
      tools.compass.visible = true;
    },
    (t) => {
      drawElements.userData.C.position.y = 13.2;
      drawElements.userData.C.visible = true;
    },
    (t) => {
      drawElements.userData.BAC.visible = false;
      drawElements.userData.C1.visible = true;
      let centroX = 0, centroY = 12;
      const radius = 12;
      const startAngle = Math.PI / 30, endAngle = -startAngle;
      const p = arcStepByStep(drawElements.userData.C1, Math.round(t * config.maxPoints), centroX, centroY, radius, startAngle, endAngle, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);

      centroY = -5 + 12;
      const armLength = 10;
      let sign = -1;

      let ang = Math.acos(radius / armLength / 2)
      tools.compass.children[0].rotation.z = Math.PI + sign * (Math.PI - 2 * ang)
      tools.compass.rotation.z = sign * ang + startAngle + (endAngle - startAngle) * t;
      tools.compass.position.y = centroY;
      tools.compass.visible = true;

    },
    (t) => {
      drawElements.userData.C2.visible = true;
      let centroX = 12, centroY = 0;
      const radius = 12;
      const startAngle = Math.PI / 2 - Math.PI / 30, endAngle = Math.PI / 2 + Math.PI / 30;
      const p = arcStepByStep(drawElements.userData.C2, Math.round(t * config.maxPoints), centroX, centroY, radius, startAngle, endAngle, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);

      centroY = -5 + 0;
      const armLength = 10;
      let sign = 1;

      let ang = Math.acos(radius / armLength / 2)
      tools.compass.children[0].rotation.z = Math.PI + sign * (Math.PI - 2 * ang)
      tools.compass.rotation.z = sign * ang + startAngle + (endAngle - startAngle) * t;
      tools.compass.position.x = centroX;
      tools.compass.position.y = centroY;
      tools.compass.visible = true;
    },
    (t) => {
      tools.compass.visible = false;
      const startPos = 20;
      const endPos = 0;
      tools.ruler.position.x = startPos + (endPos - startPos) * t;
      tools.ruler.position.y = -5 - 0.05 + 12;
      tools.ruler.visible = true;
    },
    (t) => {
      drawElements.userData.CD.visible = true;
      const p = lineStepByStepArray(drawElements.userData.CD, drawElements.userData.CD.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => {
      const startPos = 20;
      const endPos = 12;
      tools.ruler.position.x = startPos + (endPos - startPos) * t + 0.05;
      tools.ruler.position.y = -5 - 0.05;
      tools.ruler.rotation.z = Math.PI / 2;
      tools.ruler.visible = true;
    },
    (t) => {
      drawElements.userData.BD.visible = true;
      const p = lineStepByStepArray(drawElements.userData.BD, drawElements.userData.BD.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => {
      drawElements.userData.C1.visible = false;
      drawElements.userData.C2.visible = false;
      tools.ruler.visible = false;

      drawElements.userData.D.position.x = 12;
      drawElements.userData.D.position.y = 13.2;
      drawElements.userData.D.visible = true;
    },
    (t) => {
      const startPos = 20;
      const endPos = 0;
      tools.ruler.position.x = startPos + (endPos - startPos) * t + 0.05;
      tools.ruler.position.y = -5 - 0.05;
      tools.ruler.rotation.z = Math.PI / 4;
      tools.ruler.visible = true;
    },
    (t) => { },
    (t) => {
      drawElements.userData.AD.visible = true;
      const p = lineStepByStepArray(drawElements.userData.AD, drawElements.userData.AD.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      const startPos = 20;
      const endPos = 0;
      tools.ruler.position.x = startPos + (endPos - startPos) * t + 0.05;
      tools.ruler.position.y = -5 - 0.05;
      tools.ruler.rotation.z = 0;
      tools.ruler.visible = true;
    },
    (t) => { },
    (t) => {
      drawElements.userData.MM.visible = true;
      const p = lineStepByStepArray(drawElements.userData.MM, drawElements.userData.MM.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      drawElements.userData.M.position.x = 6;
      drawElements.userData.M.position.y = -1.2;
      drawElements.userData.M.visible = true;
    },
    (t) => { },
    (t) => {
      tools.ruler.visible = false;
      let startPos = 7;
      let endPos = -5;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = 0;
      tools.setSquareRuler.position.y = startPos + (endPos - startPos) * t;
      tools.setSquareRuler.rotation.z = Math.PI / 4
    },
    (t) => { },
    (t) => {
      const ang = Math.PI / 4;
      const vector = { x: Math.cos(ang), y: Math.sin(ang) }
      let startPos = 7;
      let endPos = -5 - 15 * Math.sqrt(3) / 2 + 0.5 / 2;
      tools.triangleRuler.visible = true;
      tools.triangleRuler.position.x = -5 - 0.5 / 2 - 0.5 * vector.x;
      tools.triangleRuler.position.y = startPos + (endPos - startPos) * t - 0.5 * vector.y;
      tools.triangleRuler.rotation.z = 3 * Math.PI / 4 - Math.PI / 6;
    },
    (t) => { },
    (t) => {
      const ang = Math.PI / 4;
      const vector = { x: Math.cos(ang), y: Math.sin(ang) }
      let startPosX = 0;
      let endPosX = startPosX + 3 * Math.sqrt(2) * vector.x;
      let startPosY = -5;
      let endPosY = startPosY - 3 * Math.sqrt(2) * vector.y;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = startPosX + (endPosX - startPosX) * t;
      tools.setSquareRuler.position.y = startPosY + (endPosY - startPosY) * t;
      tools.setSquareRuler.rotation.z = Math.PI / 4
    },
    (t) => { },
    (t) => {
      drawElements.userData.ME.visible = true;
      const p = lineStepByStepArray(drawElements.userData.ME, drawElements.userData.ME.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      tools.setSquareRuler.visible = false;
      tools.triangleRuler.visible = false;
      drawElements.userData.E.position.x = 12 + 0.4;
      drawElements.userData.E.position.y = 6;
      drawElements.userData.E.visible = true;
    },
    (t) => { },
    (t) => {
      const startPos = 20;
      const endPos = 0;
      tools.ruler.position.x = startPos + (endPos - startPos) * t - 0.05;
      tools.ruler.position.y = -5 + 12 - 0.05;
      tools.ruler.rotation.z = -Math.PI / 4;
      tools.ruler.visible = true;
    },
    (t) => { },
    (t) => {
      drawElements.userData.CF.visible = true;
      const p = lineStepByStepArray(drawElements.userData.CF, drawElements.userData.CF.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      tools.ruler.visible = false;
      drawElements.userData.F.position.x = 9 + 0.4;
      drawElements.userData.F.position.y = 3 - 0.4;
      drawElements.userData.F.visible = true;

      drawElements.userData.O.position.x = 6;
      drawElements.userData.O.position.y = 6 + 0.8;
      drawElements.userData.O.visible = true;
    },
    (t) => { },
    (t) => {
      let startPos = 20;
      let endPos = 12;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = startPos + (endPos - startPos) * t;
      tools.setSquareRuler.position.y = -5;
      tools.setSquareRuler.rotation.z = Math.PI / 2
    },
    (t) => { },
    (t) => {
      let startPos = 7;
      let endPos = -5 - 15 * Math.sqrt(3) / 2 + 0.5 / 2;
      tools.triangleRuler.visible = true;
      tools.triangleRuler.position.x = 12;
      tools.triangleRuler.position.y = startPos + (endPos - startPos) * t - 0.5;
      tools.triangleRuler.rotation.z = Math.PI - Math.PI / 6;
    },
    (t) => { },
    (t) => {
      let startPos = 12;
      let endPos = 9 + 0.05;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = startPos + (endPos - startPos) * t + 0.025;
      tools.setSquareRuler.position.y = -5;
      tools.setSquareRuler.rotation.z = Math.PI / 2
    },
    (t) => { },
    (t) => {
      drawElements.userData.FG.visible = true;
      const p = lineStepByStepArray(drawElements.userData.FG, drawElements.userData.FG.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      tools.setSquareRuler.visible = false;
      tools.triangleRuler.visible = false;
      drawElements.userData.G.position.x = 9 - 0.4;
      drawElements.userData.G.position.y = 9 + 0.4;
      drawElements.userData.G.visible = true;
    },
    (t) => { },
    (t) => {
      tools.ruler.visible = false;
      let startPos = 7;
      let endPos = -5 + 3;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = 9;
      tools.setSquareRuler.position.y = startPos + (endPos - startPos) * t;
      tools.setSquareRuler.rotation.z = 3 * Math.PI / 4
    },
    (t) => { },
    (t) => {
      const ang = Math.PI / 4;
      const vector = { x: Math.cos(ang), y: Math.sin(ang) }
      let startPos = 7 - 14.75 * vector.y;
      let endPos = - 14.75 * vector.y;
      tools.triangleRuler.visible = true;
      tools.triangleRuler.position.x = 9 + 14.5 * vector.x;
      tools.triangleRuler.position.y = startPos + (endPos - startPos) * t;
      tools.triangleRuler.rotation.z = 5 * Math.PI / 4 - Math.PI / 6;
    },
    (t) => { },
    (t) => {
      const ang = Math.PI / 4;
      const vector = { x: Math.cos(ang), y: Math.sin(ang) }
      let startPosX = 9;
      let endPosX = startPosX - 3 * Math.sqrt(2) * vector.x + 0.05;
      let startPosY = -5 + 3;
      let endPosY = startPosY - 3 * Math.sqrt(2) * vector.y + 0.05;
      tools.setSquareRuler.visible = true;
      tools.setSquareRuler.position.x = startPosX + (endPosX - startPosX) * t;
      tools.setSquareRuler.position.y = startPosY + (endPosY - startPosY) * t;
      tools.setSquareRuler.rotation.z = 3 * Math.PI / 4
    },
    (t) => { },
    (t) => {
      drawElements.userData.MH.visible = true;
      const p = lineStepByStepArray(drawElements.userData.MH, drawElements.userData.MH.userData.points, t);
      drawElements.userData.circle.position.set(p.x, p.y, p.z);
    },
    (t) => { },
    (t) => {
      tools.setSquareRuler.visible = false;
      tools.triangleRuler.visible = false;
      drawElements.userData.circle.visible = false
    },
    (t) => { },
    (t) => {
      tools.setSquareRuler.visible = false;
      tools.triangleRuler.visible = false;
      drawElements.userData.circle.visible = false
    },
    (t) => { },
    (t) => {
      drawElements.userData.A.visible = false;
      drawElements.userData.B.visible = false;
      drawElements.userData.C.visible = false;
      drawElements.userData.D.visible = false;
      drawElements.userData.E.visible = false;
      drawElements.userData.F.visible = false;
      drawElements.userData.G.visible = false;
      drawElements.userData.O.visible = false;
      drawElements.userData.M.visible = false;
      drawElements.userData.MM.visible = false;

      drawElements.userData.A1.position.x = 3;
      drawElements.userData.A1.position.y = 1;
      drawElements.userData.A1.visible = true;

      drawElements.userData.A2.position.x = 7.8;
      drawElements.userData.A2.position.y = 6;
      drawElements.userData.A2.visible = true;

      drawElements.userData.A3.position.x = 2;
      drawElements.userData.A3.position.y = 6;
      drawElements.userData.A3.visible = true;

      drawElements.userData.A4.position.x = 6;
      drawElements.userData.A4.position.y = 9.5;
      drawElements.userData.A4.visible = true;

      drawElements.userData.A5.position.x = 10.5;
      drawElements.userData.A5.position.y = 2;
      drawElements.userData.A5.visible = true;

      drawElements.userData.A6.position.x = 6;
      drawElements.userData.A6.position.y = 3;
      drawElements.userData.A6.visible = true;

      drawElements.userData.A7.position.x = 10.5;
      drawElements.userData.A7.position.y = 7;
      drawElements.userData.A7.visible = true;
    },


  ]

  let currentPoints = 0;
  let t = 0;
  let step;
  console.log(drawElements.userData.BAC)
  function animate() {

    step = Math.floor(currentPoints / (config.maxPoints + 1));
    if (step > 69) return;
    requestAnimationFrame(animate);
    // Paso 1
    t = (currentPoints % (config.maxPoints + 1)) / config.maxPoints;

    for (let i = 0; i < step; i++) {
      managerSteps[i](1);
    }
    managerSteps[step](t);
    renderer.render(scene, camera);

    currentPoints++;
  }
  animate();



})