import * as THREE from 'three';
import { createMarks, createNumbers } from './ruler.js'
// --- Compás básico ---
export function createCompass ( armLength = 10, armWidth = 0.2, pivotRadius = 0.3 ) {
	const group = new THREE.Group();


	// --- Brazo 1 (punta de metal) ---
	const shape1 = new THREE.Shape();
	shape1.moveTo( 0, armWidth / 3 );
	shape1.lineTo( armLength, armWidth );
	shape1.lineTo( armLength, -armWidth );
	shape1.lineTo( 0, -armWidth / 3 );
	shape1.lineTo( 0, armWidth / 3 );


	const geo1 = new THREE.ShapeGeometry( shape1 );
	const mat1 = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, side: THREE.DoubleSide } );
	const arm1 = new THREE.Mesh( geo1, mat1 );
	arm1.position.set( 0, -armLength, 0 );
	// arm1.rotateZ( Math.PI / 2 );

	// --- Brazo 2 (lápiz) ---
	const shape2 = new THREE.Shape();
	shape2.moveTo( 0, armWidth );
	shape2.lineTo( armLength, armWidth / 3 );
	shape2.lineTo( armLength, -armWidth / 3 );
	shape2.lineTo( 0, -armWidth );
	shape2.lineTo( 0, 0 );

	const geo2 = new THREE.ShapeGeometry( shape2 );
	const mat2 = new THREE.MeshBasicMaterial( { color: 0xdddddd, side: THREE.DoubleSide } );
	const arm2 = new THREE.Mesh( geo2, mat2 );
	arm2.position.set( armLength, 0, 0 );
	// arm2.rotateZ( Math.PI );

	// --- Pivot central ---
	const pivotGeo = new THREE.CircleGeometry( pivotRadius, 32 );
	const pivotMat = new THREE.MeshBasicMaterial( { color: 0x333333 } );
	const pivot = new THREE.Mesh( pivotGeo, pivotMat );
	pivot.position.set( armLength, 0, 0.05 );

	arm1.add( arm2, pivot );

	group.add( arm1 );
	return arm1;
}

export function createCompassAdvanced ( armLength = 10, armWidth = 0.2, pivotRadius = 0.3, margin = 0.3 ) {
	const group = new THREE.Group();

	// --- Brazo con punta metálica ---
	const tipShape = new THREE.Shape();
	tipShape.moveTo( 0, 0 );
	tipShape.lineTo( armLength, 0 );
	tipShape.lineTo( armLength, armWidth );
	tipShape.lineTo( 0, armWidth );
	tipShape.lineTo( 0, 0 );

	const tipGeo = new THREE.ShapeGeometry( tipShape );
	const tipMat = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, side: THREE.DoubleSide } );
	const armTip = new THREE.Mesh( tipGeo, tipMat );

	// --- Brazo con lápiz ---
	const pencilShape = new THREE.Shape();
	pencilShape.moveTo( 0, 0 );
	pencilShape.lineTo( armLength, 0 );
	pencilShape.lineTo( armLength, armWidth );
	pencilShape.lineTo( 0, armWidth );
	pencilShape.lineTo( 0, 0 );

	const pencilGeo = new THREE.ShapeGeometry( pencilShape );
	const pencilMat = new THREE.MeshBasicMaterial( { color: 0xdddddd, side: THREE.DoubleSide } );
	const armPencil = new THREE.Mesh( pencilGeo, pencilMat );
	armPencil.position.set( 0, -armWidth - 0.05, 0 );

	// --- Marcas y números en brazo metálico ---
	const marksTip = createMarks( armLength - 2 * margin, 0.1, 1, 0.1, 0.3, margin );
	const numbersTip = createNumbers( armLength - 2 * margin, 1, margin, -0.4 );
	marksTip.position.set( 0, armWidth, 0.01 );
	numbersTip.position.set( 0, armWidth, 0.05 );

	// --- Marcas y números en brazo lápiz ---
	const marksPencil = createMarks( armLength - 2 * margin, 0.1, 1, 0.1, 0.3, margin );
	const numbersPencil = createNumbers( armLength - 2 * margin, 1, margin, -0.4 );
	marksPencil.position.set( 0, -armWidth * 2 - 0.05, 0.01 );
	numbersPencil.position.set( 0, -armWidth * 2 - 0.05, 0.05 );

	// --- Pivot central ---
	const pivotGeo = new THREE.CircleGeometry( pivotRadius, 32 );
	const pivotMat = new THREE.MeshBasicMaterial( { color: 0x333333 } );
	const pivot = new THREE.Mesh( pivotGeo, pivotMat );
	pivot.position.set( 0, 0, 0.05 );

	group.add( armTip, armPencil, marksTip, numbersTip, marksPencil, numbersPencil, pivot );
	return group;
}

// Compás simple
export function createSimpleCompass ( armLength = 10, armWidth = 0.2, pivotRadius = 0.3 ) {
	const group = new THREE.Group();

	// Brazo 1 (punta metálica)
	const shape1 = new THREE.Shape();
	shape1.moveTo( 0, 0 );
	shape1.lineTo( armLength, 0 );
	shape1.lineTo( armLength, armWidth );
	shape1.lineTo( 0, armWidth );
	shape1.lineTo( 0, 0 );
	const mesh1 = new THREE.Mesh( new THREE.ShapeGeometry( shape1 ), new THREE.MeshBasicMaterial( { color: 0xaaaaaa } ) );
	group.add( mesh1 );

	// Brazo 2 (lápiz)
	const shape2 = new THREE.Shape();
	shape2.moveTo( 0, 0 );
	shape2.lineTo( armLength, 0 );
	shape2.lineTo( armLength, armWidth );
	shape2.lineTo( 0, armWidth );
	shape2.lineTo( 0, 0 );
	const mesh2 = new THREE.Mesh( new THREE.ShapeGeometry( shape2 ), new THREE.MeshBasicMaterial( { color: 0xdddddd } ) );
	mesh2.position.set( 0, -armWidth - 0.05, 0 );
	group.add( mesh2 );

	// Pivot central
	const pivot = new THREE.Mesh(
		new THREE.CircleGeometry( pivotRadius, 32 ),
		new THREE.MeshBasicMaterial( { color: 0x333333 } )
	);
	pivot.position.set( 0, 0, 0.05 );
	group.add( pivot );

	return group;
}

// Crear compás realista simplificado
export function createRealCompass ( armLength = 8, armWidth = 0.2, pivotRadius = 0.3 ) {
	const group = new THREE.Group();

	// Brazo punta metálica (fijo)
	const tipShape = new THREE.Shape();
	tipShape.moveTo( 0, 0 );
	tipShape.lineTo( armLength, 0 );
	tipShape.lineTo( armLength, armWidth );
	tipShape.lineTo( 0, armWidth );
	tipShape.lineTo( 0, 0 );
	const tipArm = new THREE.Mesh( new THREE.ShapeGeometry( tipShape ), new THREE.MeshBasicMaterial( { color: 0xaaaaaa } ) );
	group.add( tipArm );

	// Brazo lápiz
	const pencilShape = new THREE.Shape();
	pencilShape.moveTo( 0, 0 );
	pencilShape.lineTo( armLength, 0 );
	pencilShape.lineTo( armLength, armWidth );
	pencilShape.lineTo( 0, armWidth );
	pencilShape.lineTo( 0, 0 );
	const pencilArm = new THREE.Mesh( new THREE.ShapeGeometry( pencilShape ), new THREE.MeshBasicMaterial( { color: 0xdddddd } ) );

	// Pivot de unión entre brazos
	const pivot = new THREE.Group();
	pivot.add( pencilArm );
	pencilArm.position.set( 0, -armWidth - 0.05, 0 ); // separación vertical
	group.add( pivot );

	// Fijar posición del pivot en el brazo metálico
	pivot.position.set( armLength * 0.3, armWidth * 0.5, 0 ); // se puede ajustar para el radio

	return { group, pivot, pencilArm, tipArm };
}

