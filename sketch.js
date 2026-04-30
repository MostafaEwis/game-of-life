const cellSize = 50;
let cGrid;
let nGrid;
let foreColor = 'white';
let backColor = 'black';
let run = true;

function getN(x, y){
	const states = [
		cGrid?.[x - 1]?.[y],
		cGrid?.[x + 1]?.[y],
		cGrid?.[x]?.[y - 1],
		cGrid?.[x]?.[y + 1],
		cGrid?.[x - 1]?.[y - 1],
		cGrid?.[x + 1]?.[y - 1],
		cGrid?.[x - 1]?.[y + 1],
		cGrid?.[x + 1]?.[y + 1],
	];
	return states.reduce((a, v) => v ? a + 1 : a, 0);

}
function setup() {
	createCanvas(700, 700);
	cGrid = Array.from(Array(width / cellSize), () => Array.from(Array(height / cellSize), () => false));
	nGrid = Array.from(Array(width / cellSize), () => Array.from(Array(height / cellSize), () => false));
}

function draw() {
	background(backColor);
	stroke(backColor);
	strokeWeight(2);
	frameRate(2);
	//draw
	cGrid.forEach((row, x) => {
		row.forEach((cell, y) => {
			if(cell){
				fill(foreColor);
				rect(x * cellSize, y * cellSize, cellSize);
			}
		})
	})
	if(run){
		//update
		cGrid.forEach((row, x) => {
			row.forEach((cell, y) => {
				//get the states of the current cell
				const n = getN(x, y);
				//1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
				if(cell && n < 2) nGrid[x][y] = false;
				//2. Any live cell with two or three live neighbours lives on to the next generation.
				if(cell && (n == 2 || n == 3)) nGrid[x][y] = true;
				//3. Any live cell with more than three live neighbours dies, as if by overpopulation.
				if(cell && n > 3) nGrid[x][y] = false;
				//4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				if(!cell && n == 3) nGrid[x][y] = true;

			})
		})
		cGrid = nGrid;
		nGrid = Array.from(Array(width / cellSize), () => Array.from(Array(height / cellSize), () => false));
	}
}
function mouseClicked(e){
	run = false;
	if(e.x <= width && e.y <= height){ 
		const x = int(e.x / cellSize);
		const y = int(e.y / cellSize);
		cGrid[x][y] = !cGrid[x][y];
	}
}
function doubleClicked(){
	run = !run;
}
