import * as THREE from 'three';

import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

const numbersTexture = createRulerNumbersTexture(30);
const lettersData = createLettersTexture();

// ============================
// Crear textura con todos los números
// ============================
function createRulerNumbersTexture(maxNumber = 30) {
	const canvas = document.createElement("canvas");
	canvas.width = 1024;
	canvas.height = 32;

	const ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.font = "16px Arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";

	const step = canvas.width / (maxNumber + 1);
	for (let i = 0; i <= maxNumber; i++) {
		ctx.fillText(i.toString(), step * i + step / 2, canvas.height / 2);
	}

	return new THREE.CanvasTexture(canvas);
}

// ============================
// Crear textura con letras A–Z
// ============================
function createLettersTexture(letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáàéèíóòúÁÀÉÈÍÓÒÚ1234567890") {
	const canvas = document.createElement("canvas");
	canvas.width = 2048;
	canvas.height = 32;
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.font = "16px Arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";

	const step = canvas.width / letters.length;
	for (let i = 0; i < letters.length; i++) {
		ctx.fillText(letters[i], step * i + step / 2, canvas.height / 2);
	}

	return {
		texture: new THREE.CanvasTexture(canvas),
		letters
	};
}

// ============================
// Crear un plano con una letra
// ============================
export function createLetterPlane(letter, size = 0.5) {
	const { texture, letters } = lettersData;
	const index = letters.indexOf(letter);
	if (index === -1) return null;

	const geometry = new THREE.PlaneGeometry(size, size);
	const uStep = 1 / letters.length;
	const uMin = index * uStep;
	const uMax = (index + 1) * uStep;

	const uv = geometry.attributes.uv;
	uv.setXY(0, uMin, 0);
	uv.setXY(1, uMax, 0);
	uv.setXY(2, uMin, 1);
	uv.setXY(3, uMax, 1);
	uv.needsUpdate = true;

	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});

	const plane = new THREE.Mesh(geometry, material);
	plane.scale.set(1, -1, 1);

	return plane;
}

// ============================
// Crear un plano con un número (recorta UVs de la textura)
// ============================
function createNumberPlane(number, texture, maxNumber = 30, size = 0.2) {
	const geometry = new THREE.PlaneGeometry(size, size * 1.);

	const uStep = 1 / (maxNumber + 1);
	const uMin = number * uStep;
	const uMax = (number + 1) * uStep;

	const uv = geometry.attributes.uv;
	uv.setXY(0, uMin, 0);
	uv.setXY(1, uMax, 0);
	uv.setXY(2, uMin, 1);
	uv.setXY(3, uMax, 1);
	uv.needsUpdate = true;

	const material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: true
	});

	const plane = new THREE.Mesh(geometry, material);
	plane.scale.set(1, -1, 1);
	return plane;
}

// --- Función para crear un plano de texto fijo ---
export function makeTextPlane(message, fontSize = 64, color = '#555555') {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 256;
	canvas.height = 256;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = color;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(message, canvas.width / 2, canvas.height / 2);

	const texture = new THREE.CanvasTexture(canvas);
	const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

	const geometry = new THREE.PlaneGeometry(1, 1);
	const mesh = new THREE.Mesh(geometry, material);
	mesh.scale.set(0.8, 0.8, 1); // tamaño ~0.8cm
	return mesh;
}

// --- Función para crear marcas a lo largo de un eje X ---
export function createMarks(length, step = 0.1, majorStep = 1, heightMinor = 0.2, heightMajor = 0.5, color = 0x999999) {
	const marks = new THREE.Group();

	const totalSteps = Math.floor(length / step);
	for (let i = 0; i <= totalSteps; i++) {
		let markHeight = heightMinor;
		if ((i * step) % majorStep === 0) markHeight = heightMajor;

		const x = i * step;
		const points = [
			new THREE.Vector3(x, 0, 0.01),
			new THREE.Vector3(x, -markHeight, 0.01),
		];
		const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color }));
		marks.add(line);
	}

	return marks;
}
// --- Función para crear números a lo largo de un eje X ---
export function createNumbers(length, step = 1, positionY = 0.7, color = '#555555') {
	const numbers = new THREE.Group();
	for (let i = 0; i <= length; i++) {
		const numberMesh = createNumberPlane(i, numbersTexture, 30, 0.6);
		numberMesh.position.set(i, positionY, 0.05);

		numbers.add(numberMesh);
	}
	return numbers;
}

// --- Ejemplo: crear una regla reutilizando marcas y números ---
export function createRuler(lengthCm = 20, widthCm = 2, margin = 0.5) {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(lengthCm + 2 * margin, 0);
	shape.lineTo(lengthCm + 2 * margin, -widthCm);
	shape.lineTo(0, -widthCm);
	shape.lineTo(0, 0);

	const geometry = new THREE.ShapeGeometry(shape);
	const material = new THREE.MeshBasicMaterial({ color: 0xf5deb3, transparent: true });
	const ruler = new THREE.Mesh(geometry, material);
	ruler.position.x = -margin;

	const marks = createMarks(lengthCm, 0.1, 1, 0.2, 0.5);
	// const marks = createMarks( lengthCm - 1 * margin, 0.1, 0.1, 0.2, 0.8, margin * 1 );
	const numbers = createNumbers(lengthCm, 1, -0.8);


	const letters = new THREE.Group();
	const word = "REGLA TeiDSpace";
	for (let i = 0; i < word.length; i++) {
		const letterMesh = createLetterPlane(word[i], 1);
		if (letterMesh) {
			letterMesh.position.set(2 + i * 0.4, -1.5, 0.);
			letters.add(letterMesh);
		}
	}

	const group = new THREE.Group();

	group.add(ruler, marks, numbers, letters);
	return group;
}

// --- Escuadra 45°-45°-90° ---
export function createSetSquareRuler(size = 10, margin = 0.5) {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(size, 0);
	shape.lineTo(0, -size);
	shape.lineTo(0, 0);

	const geometry = new THREE.ShapeGeometry(shape);
	const material = new THREE.MeshBasicMaterial({ color: 0xf5deb3, transparent: true, opacity: 0.6 });
	const triangle = new THREE.Mesh(geometry, material);
	triangle.position.x = -margin;

	// Marcas en el eje horizontal
	const marksX = createMarks(size - 1.3 * margin, 0.1, 1, 0.2, 0.5);
	const numbersX = createNumbers(size - 3 * margin, 1, -0.8);

	const letters = new THREE.Group();
	const word = "ESCUADRA TeiDSpace";
	for (let i = 0; i < word.length; i++) {
		const letterMesh = createLetterPlane(word[i], 1);
		// const letterMesh = createLetterPlane( word[i], lettersData, 1 );
		if (letterMesh) {
			letterMesh.position.set(2 + i * 0.4, -1.5, 0.);
			letters.add(letterMesh);
		}
	}

	const group = new THREE.Group(letters);
	group.add(triangle, marksX, numbersX, letters);//, marksY, numbersY );
	return group;
}

// --- Cartabón 30°-60°-90° ---
export function createTriangleRuler(size = 10, margin = 0.5) {
	const width = Math.sqrt(3) * size;
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(width, 0);
	shape.lineTo(0, -size);
	shape.lineTo(0, 0);

	const geometry = new THREE.ShapeGeometry(shape);
	const material = new THREE.MeshBasicMaterial({ color: 0xf5deb3, transparent: true, opacity: 0.6 });
	const triangle = new THREE.Mesh(geometry, material);
	triangle.position.x = -margin;

	// Marcas en la base (horizontal)
	const marksX = createMarks(width - 2 * margin, 0.1, 1, 0.2, 0.5);
	const numbersX = createNumbers(width - 4 * margin, 1, -0.8);

	const letters = new THREE.Group();
	const word = "CARTABÓN TeiDSpace";
	for (let i = 0; i < word.length; i++) {
		const letterMesh = createLetterPlane(word[i], 1);
		// const letterMesh = createLetterPlane( word[i], lettersData, 1 );
		if (letterMesh) {
			letterMesh.position.set(2 + i * 0.4, -1.5, 0.);
			letters.add(letterMesh);
		}
	}

	const group = new THREE.Group();
	group.add(triangle, marksX, numbersX, letters);//, marksY, numbersY );
	return group;
}

export const customLine = (points, lineWidth = 2, color = 'black') => {

	// Geometría de la línea
	const geometry = new LineGeometry();
	geometry.setPositions(points);

	// Material con grosor real
	const material = new LineMaterial({
		color: color,
		linewidth: lineWidth,  // grosor en unidades de mundo (ajústalo según la cámara)
		resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
	});

	// Línea
	const line = new Line2(geometry, material);
	line.userData.points = points;
	// line.computeLineDistances();

	return line;
}

export const customArcLine = (maxPoints, color = 'black') => {

	// Preasignar el buffer
	const positions = new Float32Array(maxPoints * 3);
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geometry.setDrawRange(0, 0); // al inicio nada visible

	const material = new THREE.LineBasicMaterial({ color: color });
	const arcLine = new THREE.Line(geometry, material);

	// return { arcLine, positions, geometry };
	return arcLine;
}



