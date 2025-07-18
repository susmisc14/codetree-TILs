const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K] = input[0].split(" ").map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(" ").map(Number));

// Please Write your code here.
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solve() {
    const mandarin = Array.from({ length: N }, () => new Array(N).fill(-1));
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));
    const queue = [];

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 2) {
                queue.push([row, col, 0]);
                visited[row][col] = true;
            } else if (grid[row][col] === 1) {
                mandarin[row][col] = -2;
            }
        }
    }

    while (queue.length > 0) {
        const [currentRow, currentCol, time] = queue.shift();

        mandarin[currentRow][currentCol] = time;

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];

            if (!inRange(nextRow, nextCol) || visited[nextRow][nextCol] || grid[nextRow][nextCol] === 0) continue;

            queue.push([nextRow, nextCol, time + 1]);
            visited[nextRow][nextCol] = true;
        }
    }

    return mandarin
            .map((row) => row.join(" "))
            .join("\n");
}

console.log(solve());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}