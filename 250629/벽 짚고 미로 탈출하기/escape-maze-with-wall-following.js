const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
let [startX, startY] = input[1].split(' ').map(Number);
const grid = input.slice(2, 2 + n);

// Please Write your code here.
function solve() {
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => new Array(4).fill(false))
    );

    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];

    let x = startX - 1;
    let y = startY - 1;
    let dir = 1;
    let time = 0;

    while (true) {
        if (visited[y][x][dir]) {
            return -1;
        }
        visited[y][x][dir] = true;

        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (inRange(nx, ny) && grid[ny][nx] === "#") {
            dir = (dir - 1 + 4) % 4;
        } else {
            if (!inRange(nx, ny)) {
                time += 1;
                break;
            }

            const rightDirAfterMove = (dir + 1) % 4;
            const rx = nx + dx[rightDirAfterMove];
            const ry = ny + dy[rightDirAfterMove];

            if (!inRange(rx, ry) || grid[ry][rx] === "#") {
                x = nx;
                y = ny;
                time += 1;
            } else {
                x = rx;
                y = ry;
                dir = rightDirAfterMove;
                time += 2;
            }
        }
    }
    
    return time;
}

console.log(solve());

// helpers
function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}