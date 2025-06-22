const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
const queue = [[0, 0]];
const visited = Array.from({ length: n }, () => new Array(m).fill(false));
let result = 0;

// 시계 방향
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

visited[0][0] = true;

while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === m - 1 && y === n - 1) {
        result = 1;
        break;
    }

    visited[y][x] = true;
    
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;

        if (grid[ny][nx] === 0 || visited[ny][nx]) continue;

        queue.push([nx, ny]);
    }
}

console.log(result);