const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
let [startX, startY] = input[1].split(' ').map(Number);
const grid = input.slice(2, 2 + n);

// Please Write your code here.
function solve() {
    const visited = new Set();

    // 북(0), 동(1), 남(2), 서(3)
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];

    let dir = 1;
    let time = 0;

    let x = startX - 1;
    let y = startY - 1;

    while (true) {
        const state = `${x}-${y}-${dir}`;
        if (visited.has(state)) {
            return -1;
        }
        visited.add(state);

        const rightDir = (dir + 1) % 4;
        const rx = x + dx[rightDir];
        const ry = y + dy[rightDir];

        if (inRange(rx, ry) && grid[ry][rx] !== "#") {
            dir = rightDir;
            y = ry;
            x = rx;
            time++;

            if (!inRange(x, y)) break;

            continue;
        }
        
        const fx = x + dx[dir];
        const fy = y + dy[dir];

        if (inRange(fx, fy) && grid[fy][fx] !== "#") {
            y = fy;
            x = fx;
            time++;

            if (!inRange(x, y)) break;

            continue;
        }

        dir = (dir - 1 + 4) % 4;
    }

    return time;
}

console.log(solve());

// helpers
function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}