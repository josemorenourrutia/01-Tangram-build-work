import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { status } from './main.js';

export function createRuler ( lengthCm = 10, width = 20, fontUrl = '/fonts/helvetiker_regular.typeface.json' ) {
	const length = lengthCm * 1; // cm -> mm (1 unidad = 1mm)
	const markH = 0.1;

	// 1) Cuerpo de la regla
	const shape = new THREE.Shape();
	shape.moveTo( 0, 0 );
	shape.lineTo( length, 0 );
	shape.lineTo( length, width );
	shape.lineTo( 0, width );
	shape.lineTo( 0, 0 );

	const geometry = new THREE.ShapeGeometry( shape );
	const material = new THREE.MeshBasicMaterial( { color: 0xf5deb3 } ); // color madera
	const ruler = new THREE.Mesh( geometry, material );

	// 2) Marcas de la regla (gris)
	const marks = new THREE.Group();

	for ( let i = 0; i <= length; i++ ) {
		let markHeight = 5 * markH;

		if ( i % 10 === 0 ) markHeight = 10;    // cada cm
		if ( i % 50 === 0 ) markHeight = 15;    // cada 5 cm

		const points = [
			new THREE.Vector3( i, width, 0.1 ), // 0.1 para que queden sobre la superficie
			new THREE.Vector3( i, width - markHeight, 0.1 ),
		];

		const geo = new THREE.BufferGeometry().setFromPoints( points );
		const line = new THREE.Line(
			geo,
			new THREE.LineBasicMaterial( { color: 0x555555 } ) // gris
		);

		marks.add( line );
	}

	// 3) Números de la regla (sobre la superficie, extrusión muy baja)
	const numbers = new THREE.Group();
	const loader = new FontLoader();

	loader.load( fontUrl, ( font ) => {
		console.log( "✅ Fuente cargada:", font );
		for ( let cm = 1; cm <= lengthCm; cm++ ) {
			const textGeo = new TextGeometry( cm.toString(), {
				font: font,
				size: 40,      // tamaño número
				height: 0.2,  // extrusión mínima (casi plano)
				curveSegments: 4,
			} );

			const textMat = new THREE.MeshBasicMaterial( { color: 0x555555 } ); // gris
			const textMesh = new THREE.Mesh( textGeo, textMat );

			// posición: centrado en cada cm
			textMesh.position.set( cm * 10 - 2, width - 15, 0.2 );

			numbers.add( textMesh );
		}
	},
		undefined,
		( err ) => {
			console.error( "❌ Error cargando fuente:", err );
		} );

	// Agrupar todo
	const rulerGroup = new THREE.Group();
	rulerGroup.add( ruler );
	rulerGroup.add( marks );
	rulerGroup.add( numbers );

	return rulerGroup;
}
