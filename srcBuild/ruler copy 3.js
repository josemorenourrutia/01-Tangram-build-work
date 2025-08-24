import * as THREE from 'three';

function makeTextPlane ( message, fontSize = 64, color = '#555555' ) {
	const canvas = document.createElement( 'canvas' );
	const ctx = canvas.getContext( '2d' );

	canvas.width = 256;
	canvas.height = 256;

	// fondo transparente
	ctx.clearRect( 0, 0, canvas.width, canvas.height );

	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = color;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText( message, canvas.width / 2, canvas.height / 2 );

	const texture = new THREE.CanvasTexture( canvas );
	const material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );

	const geometry = new THREE.PlaneGeometry( 1, 1 );
	const mesh = new THREE.Mesh( geometry, material );

	// escalar plano al tamaño adecuado
	mesh.scale.set( 0.8, 0.8, 1 ); // ~0.8 cm de alto

	return mesh;
}

export function createRuler ( lengthCm = 15, widthCm = 2 ) {
	const length = lengthCm;
	const width = widthCm;
	const desp = 0.5;

	// 1) Cuerpo de la regla
	const shape = new THREE.Shape();
	shape.moveTo( -desp, 0 );
	shape.lineTo( length + desp, 0 );
	shape.lineTo( length + desp, width );
	shape.lineTo( -desp, width );
	shape.lineTo( -desp, 0 );

	const geometry = new THREE.ShapeGeometry( shape );
	const material = new THREE.MeshBasicMaterial( { color: 0xf5deb3 } );
	const ruler = new THREE.Mesh( geometry, material );

	// 2) Marcas
	const marks = new THREE.Group();
	for ( let i = 0; i <= length * 10; i++ ) {
		let markHeight = 0.2;
		if ( i % 10 === 0 ) markHeight = 0.4;
		if ( i % 50 === 0 ) markHeight = 0.5;

		const x = i / 10;
		const points = [
			new THREE.Vector3( x, width, 0.01 ),
			new THREE.Vector3( x, width - markHeight, 0.01 ),
		];
		const geo = new THREE.BufferGeometry().setFromPoints( points );
		const line = new THREE.Line(
			geo,
			new THREE.LineBasicMaterial( { color: 0x555555 } )
		);
		marks.add( line );
	}

	// 3) Números (como planos fijos)
	const numbers = new THREE.Group();
	for ( let cm = 0; cm <= lengthCm; cm++ ) {
		const plane = makeTextPlane( cm.toString(), 128, '#555555' );
		plane.position.set( cm, width - 0.8, 0.05 ); // un poco encima del plano
		numbers.add( plane );
	}

	// Agrupar todo
	const rulerGroup = new THREE.Group();
	rulerGroup.add( ruler );
	rulerGroup.add( marks );
	rulerGroup.add( numbers );

	return rulerGroup;
}
