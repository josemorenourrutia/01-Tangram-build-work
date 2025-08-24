import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function createRuler ( lengthCm = 15, widthCm = 2, fontUrl = '/fonts/helvetiker_regular.typeface.json' ) {
	const length = lengthCm; // en cm directamente
	const width = widthCm;

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

	// 2) Marcas
	const marks = new THREE.Group();

	for ( let i = 0; i <= length * 10; i++ ) {
		let markHeight = 0.2; // mm: marca básica

		if ( i % 10 === 0 ) markHeight = 0.5;   // cada cm
		if ( i % 50 === 0 ) markHeight = 0.8;   // cada 5 cm

		const x = i / 10; // porque 10 marcas por cm
		const points = [
			new THREE.Vector3( x, width, 0.05 ),
			new THREE.Vector3( x, width - markHeight, 0.05 ),
		];

		const geo = new THREE.BufferGeometry().setFromPoints( points );
		const line = new THREE.Line(
			geo,
			new THREE.LineBasicMaterial( { color: 0x555555 } ) // gris
		);

		marks.add( line );
	}

	// 3) Números (en cada cm)
	const numbers = new THREE.Group();
	const loader = new FontLoader();

	loader.load(
		fontUrl,
		( font ) => {
			console.log( "✅ Fuente cargada:", font );
			for ( let cm = 1; cm <= lengthCm; cm++ ) {
				const textGeo = new TextGeometry( cm.toString(), {
					font: font,
					size: 0.5,    // 5 mm de alto
					height: 0.5, // casi plano
					curveSegments: 4,
				} );
				textGeo.computeBoundingBox();
				textGeo.center();

				const textMat = new THREE.MeshBasicMaterial( { color: 0x555555 } );
				const textMesh = new THREE.Mesh( textGeo, textMat );

				textMesh.position.set( cm, width - 1.2, 0.2 ); // sobre la superficie

				numbers.add( textMesh );
			}
		},
		undefined,
		( err ) => console.error( "❌ Error cargando fuente:", err )
	);

	// Agrupar todo
	const rulerGroup = new THREE.Group();
	rulerGroup.add( ruler );
	rulerGroup.add( marks );
	rulerGroup.add( numbers );

	return rulerGroup;
}
