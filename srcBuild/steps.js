import * as THREE from 'three';

import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';


export const customLine = ( points, lineWidth = 2, color = 'black' ) => {

	// Geometría de la línea
	const geometry = new LineGeometry();
	geometry.setPositions( points );

	// Material con grosor real
	const material = new LineMaterial( {
		color: color,
		linewidth: lineWidth,  // grosor en unidades de mundo (ajústalo según la cámara)
		resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
	} );

	// Línea
	const line = new Line2( geometry, material );
	// line.computeLineDistances();

	return line;
}

