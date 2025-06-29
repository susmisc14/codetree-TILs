const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const [startY, startX] = input[1].split(' ').map(Number);
const grid = input.slice(2, 2 + n);

// Please Write your code here.
function solve() {
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => Array(4).fill(false))
    );

    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];

    let dir = 1;
    let time = 0;

    let cx = startX - 1;
    let cy = startY - 1;

    while (inRange(cx, cy)) {
        if (visited[cy][cx][dir]) {
            return -1;
        }
        visited[cy][cx][dir] = true;

        const nx = cx + dx[dir];
        const ny = cy + dy[dir];
        
        if (inRange(nx, ny) && grid[ny][nx] === "#") {
            dir = (dir - 1 + 4) % 4;
        } else if (!inRange(nx, ny)) {
            cx = nx;
            cy = ny;
            time += 1;
        } else {
            const rx = nx + dx[(dir + 1) % 4];
            const ry = ny + dy[(dir + 1) % 4];

            if (inRange(rx, ry) && grid[ry][rx] === "#") {
                cx = nx;
                cy = ny;
                time += 1;
            } else {
                dir = (dir + 1) % 4;
                cx = rx;
                cy = ry;
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