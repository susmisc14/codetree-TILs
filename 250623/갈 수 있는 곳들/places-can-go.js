const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.trim().split(' ').map(Number));
const startPoints = input.slice(n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const visited = Array.from({ length: n }, () => new Array(n).fill(false));

// 시계 방향
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

for (const point of startPoints) {
    const sx = point[1] - 1;
    const sy = point[0] - 1;
    
    const queue = [[sx, sy]];

    visited[sy][sx] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            if (grid[ny][nx] === 0 && !visited[ny][nx]) {
                queue.push([nx, ny]);
                visited[ny][nx] = true;
            };
        }
    }
}

let total = 0;
for (let i = 0; i < n; i++) {
    total += visited[i].filter((current) => current).length;
}

console.log(total);