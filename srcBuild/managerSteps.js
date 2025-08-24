export const lineStepByStepVectors = (line, start, end, t) => {
	line.geometry.setPositions([
		start.x,
		start.y,
		start.z,
		start.x + t * (end.x - start.x),
		start.y + t * (end.y - start.y),
		start.z + t * (end.z - start.z)
	]);
	// line.computeLineDistances();
}

export const lineStepByStepArray = (line, points, t) => {
	const endPoint = {
		x: points[0] + t * (points[3] - points[0]),
		y: points[1] + t * (points[4] - points[1]),
		z: points[2] + t * (points[5] - points[2])
	}
	line.geometry.setPositions([
		points[0],
		points[1],
		points[2],
		endPoint.x,
		endPoint.y,
		endPoint.z
	]);
	return endPoint;
	// line.computeLineDistances();
}

export const arcStepByStep = (arc, currentPoints, centroX, centroY, radius, startAngle, endAngle, t) => {
	const angle = startAngle + (endAngle - startAngle) * t;
	const endPoint = {
		x: centroX + Math.cos(angle) * radius,
		y: centroY + Math.sin(angle) * radius,
		z: 0
	}

	const positions = arc.geometry.attributes.position.array;


	positions[currentPoints * 3 + 0] = endPoint.x; // x
	positions[currentPoints * 3 + 1] = endPoint.y; // y
	positions[currentPoints * 3 + 2] = 0;                       // z

	arc.geometry.setDrawRange(0, currentPoints); // 👈 ahora sí, conecta puntos secuenciales
	arc.geometry.attributes.position.needsUpdate = true;

	// arc.computeLineDistances();
	return endPoint;
}
