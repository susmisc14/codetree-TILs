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

    // 북(0), 동(1), 남(2), 서(3)
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];

    let dir = 1;
    let time = 0;
    let x = startX - 1;
    let y = startY - 1;

    while (inRange(x, y)) {
        if (visited[y][x][dir]) {
            return -1;
        }
        visited[y][x][dir] = true;

        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (!inRange(nx, ny)) {
            time++;
            break;
        }

        if (grid[ny][nx] === "#") {
            dir = (dir - 1 + 4) % 4;
            continue;
        }

        y = ny;
        x = nx;
        time++;

        const rightDir = (dir + 1) % 4;
        const rx = x + dx[rightDir];
        const ry = y + dy[rightDir];

        // 오른쪽이 벽이 아니라면(길이라면) 오른쪽으로 방향 전환
        if (inRange(rx, ry) && grid[ry][rx] !== '#') {
            dir = rightDir;
        }
    }

    return time;
}

console.log(solve());

// helpers
function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}