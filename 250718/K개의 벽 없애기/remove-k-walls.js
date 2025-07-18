const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));
const [r1, c1] = input[1 + N].split(' ').map(Number);
const [r2, c2] = input[2 + N].split(' ').map(Number);

// Please Write your code here.
const startRow = r1 - 1;
const startCol = c1 - 1;
const endRow = r2 - 1;
const endCol = c2 - 1;

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solve() {
    const walls = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] !== 1) continue;

            walls.push([row, col]);
        }
    }

    const wallCombinations = (function recursive(index, combination) {
        if (combination.length === walls.length - K) {
            return [combination];
        }

        if (index === walls.length) {
            return [];
        }

        const resultWhenPicked = recursive(index + 1, [...combination, walls[index]]);
        const resultWhenSkipped = recursive(index + 1, combination);

        return [...resultWhenPicked, ...resultWhenSkipped];
    })(0, []);

    let minTime = Infinity;

    for (const walls of wallCombinations) {
        const newGrid = Array.from({ length: N }, () => new Array(N).fill(0));
        for (const [row, col] of walls) {
            newGrid[row][col] = 1;
        }

        const visited = Array.from({ length: N }, () => new Array(N).fill(false));
        const queue = [];

        queue.push([startRow, startCol, 0]);
        visited[startRow][startCol] = true;

        while (queue.length > 0) {
            const [currentRow, currentCol, time] = queue.shift();

            if (currentRow === endRow && currentCol === endCol) {
                minTime = Math.min(time, minTime);
                break;
            }

            for (let i = 0; i < 4; i++) {
                const nextRow = currentRow + dr[i];
                const nextCol = currentCol + dc[i];

                if (!inRange(nextRow, nextCol) || visited[nextRow][nextCol] || newGrid[nextRow][nextCol] === 1) continue;
                
                visited[nextRow][nextCol] = true;
                queue.push([nextRow, nextCol, time + 1]);
            }
        }
    }

    return minTime === Infinity ? -1 : minTime;
}

console.log(solve());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}