import * as THREE from 'three'

import { initScene } from './initScene.js';
import { createRuler, createSetSquare, createTriangleRuler, customLine, customArcLine, createLetterPlane } from './ruler.js'
import { createCompass, createCompassAdvanced, createSimpleCompass, createRealCompass } from './compas.js'

import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// import { customLine } from './steps.js'
import { lineStepByStepVectors, lineStepByStepArray, arcStepByStep } from './managerSteps.js'

export const status = { update: undefined }

const props = {
  backgroundColor: 0xf0f0f0,
}


initScene( props )( ( { scene, camera, renderer } ) => {

  status.update = () => renderer.render( scene, camera )
  const geometry1 = new THREE.PlaneGeometry( 9, 9 ); // ajusta tamaño
  status.material = new THREE.MeshBasicMaterial( { opacity: 0.2, transparent: true } );
  const plane = new THREE.Mesh( geometry1, status.material );
  const letterMesh = createLetterPlane( "C", 1.5 );
  letterMesh.position.x = -1
  letterMesh.position.y = -5
  plane.add( letterMesh )
  scene.add( plane );

  const scalePiece = 1.5;
  const scalePlane = scalePiece / 2;
  plane.position.z = -1000; // lo colocas detrás de tus piezas
  plane.scale.set( scalePlane, scalePlane, 1 );

  const ruler = createRuler( 20, 2 );
  ruler.position.x = -10.5;
  ruler.position.y = -5.;
  ruler.rotateZ( Math.PI / 2 )

  scene.add( ruler )

  const esquadra = createSetSquare( 15, 0.5 );
  esquadra.position.y = -5 + 0.5;
  esquadra.rotateZ( Math.PI / 2 )

  scene.add( esquadra )

  const cartabon = createTriangleRuler( 15, 0.5 );
  cartabon.position.x = 7;
  cartabon.position.y = -1 - 15 * Math.sqrt( 3 ) / 2 + 0.5 / 2;
  cartabon.rotateZ( Math.PI - Math.PI / 6 )

  scene.add( cartabon )

  const armLength = 10
  const compas = createCompass( armLength )
  compas.visible = false;
  compas.position.y = - 5 + 12;
  compas.scale.set( -1, -1, 1 )
  compas.rotateZ( Math.PI / 2 )

  scene.add( compas )

  const line1 = customLine( [0, 0, 0, 0, 0, 0] );
  line1.position.y = -5;
  scene.add( line1 );

  const line2 = customLine( [0, 0, 0, 0, 0, 0] );
  line2.position.y = -5;
  scene.add( line2 );

  // Parámetros del arco
  const radius = 12;
  const centroY = -5 + 0;
  // const startAngle = -Math.PI / 20;
  // const endAngle = Math.PI / 20;
  const startAngle = 0;
  const endAngle = Math.PI * 0.5;
  // const endAngle = 0;
  // const startAngle = Math.PI * 0.5;

  const maxPoints = Math.floor( Math.abs( endAngle - startAngle ) * 100 );

  const sign = 1;
  const angle1 = ( endAngle - startAngle ) / maxPoints;
  // const ang = Math.PI / 2 - Math.acos( radius / armLength / 2 )
  // compas.children[0].rotateZ( sign * 2 * ang )
  // compas.rotateZ( sign * ( 0.5 * Math.PI - ang ) + startAngle )

  const ang = Math.acos( radius / armLength / 2 )
  // compas.children[0].rotateZ( sign * 2 * ( Math.PI / 2 - ang ) )
  compas.children[0].rotateZ( sign * ( Math.PI - 2 * ang ) )
  compas.rotateZ( sign * ang + startAngle )


  compas.position.y = centroY;

  const arc = customArcLine( maxPoints, 'black' )
  scene.add( arc.arcLine );


  // const labelRenderer = new CSS2DRenderer();
  // labelRenderer.setSize( window.innerWidth, window.innerHeight );
  // labelRenderer.domElement.style.position = 'absolute';
  // labelRenderer.domElement.style.top = '0';
  // document.body.appendChild( labelRenderer.domElement );

  // const div = document.createElement( 'div' );
  // div.textContent = "A";
  // div.style.color = '#aaaaaa';
  // div.style.fontSize = "16px";

  // const label = new CSS2DObject( div );
  // label.position.set( 0, -5.2, 0 ); // posición del punto
  // scene.add( label );



  let currentPoints = 0;
  let nLine = 0;
  function animate () {
    requestAnimationFrame( animate );

    const t = currentPoints / ( maxPoints - 1 );

    if ( nLine === 0 ) lineStepByStepArray( line1, [0, 0, 0, 12, 0, 0], t );
    if ( nLine === 1 ) lineStepByStepArray( line2, [0, 0, 0, 0, 12, 0], t );

    if ( currentPoints === maxPoints - 1 && nLine === 0 ) { nLine = 1; currentPoints = 0; return; }
    if ( currentPoints === maxPoints - 1 && nLine === 1 ) { nLine = 2; currentPoints = 0; return; }
    if ( currentPoints > maxPoints && nLine === 2 ) return;
    if ( currentPoints > maxPoints ) return;

    if ( nLine === 2 ) {
      compas.visible = true;
      compas.rotateZ( angle1 );
      arcStepByStep( arc, currentPoints, centroY, radius, startAngle, endAngle, t );
    }
    currentPoints++;
    renderer.render( scene, camera );
  }
  animate();


} )