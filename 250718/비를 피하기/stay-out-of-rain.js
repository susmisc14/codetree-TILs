const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, H, M] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const result = Array.from({ length: N }, () => new Array(N).fill(0));
    
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] !== 2) continue;
            
            const visited = Array.from({ length: N }, () => new Array(N).fill(0));
            const queue = [];

            queue.push([row, col, 0]);
            visited[row][col] = true;

            let minDistance = -1;

            while (queue.length > 0) {
                const [currentRow, currentCol, distance] = queue.shift();

                if (grid[currentRow][currentCol] === 3) {
                    minDistance = distance;
                    break;
                }

                for (let i = 0; i < 4; i++) {
                    const nextRow = currentRow + dr[i];
                    const nextCol = currentCol + dc[i];

                    if (!inRange(nextRow, nextCol) || visited[nextRow][nextCol] || grid[nextRow][nextCol] === 1) continue;

                    queue.push([nextRow, nextCol, distance + 1]);
                    visited[nextRow][nextCol] = true;
                }
            }

            result[row][col] = minDistance;
        }
    }

    return result
            .map((current) => current.join(" "))
            .join("\n")
}

console.log(solve());

// helpers
function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}