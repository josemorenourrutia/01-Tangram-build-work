import * as THREE from 'three';
// =====================
// 1️⃣ Crear compás
// =====================
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

	// Posicionar pivot (define radio del círculo)
	pivot.position.set( armLength * 0.3, armWidth * 0.5, 0 );

	return { group, tipArm, pivot, pencilArm };
}
