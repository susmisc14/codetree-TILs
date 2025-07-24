const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(" ").map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(" ").map(Number));
const numbers = input[1 + N].split(" ").map(Number);

// Please Write your code here.
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

function solve() {
    const newGrid = Array.from({ length: N }, () => Array.from({ length: N }, () => []));
    const coords = Array(N * N + 1);

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const number = grid[row][col];
            newGrid[row][col].push(number);
            coords[number] = [row, col];
        }
    }

    for (const number of numbers) {
        const [row, col] = coords[number];
        const stack = newGrid[row][col];

        let maxNeighbor = 0;
        let nextCoord = null;

        for (let i = 0; i < 8; i++) {
            const nextRow = row + dr[i];
            const nextCol = col + dc[i];

            if (inRange(nextRow, nextCol) && newGrid[nextRow][nextCol].length > 0) {
                const neighborStack = newGrid[nextRow][nextCol];
                const largestNumber = Math.max(...neighborStack);

                if (largestNumber > maxNeighbor) {
                    maxNeighbor = largestNumber;
                    nextCoord = [nextRow, nextCol];
                }
            }
        }

        if (nextCoord === null) continue;

        const index = stack.indexOf(number);
        const movingStack = stack.splice(index);

        newGrid[nextCoord[0]][nextCoord[1]] = newGrid[nextCoord[0]][nextCoord[1]].concat(movingStack);

        for (const current of movingStack) {
            coords[current] = nextCoord;
        }
    }

    return newGrid
            .map((row) => row.map((col) => (col.length === 0 ? "None" : col.reverse().join(" "))).join("\n"))
            .join("\n");
}

console.log(solve());

// Helpers
function inRange (row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}