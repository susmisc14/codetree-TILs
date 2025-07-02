const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const [r, c] = input[1 + n].split(' ').map(Number);

// Please write your code here.
function solve() {
    let cx = c - 1;
    let cy = r - 1;

    for (let i = 0; i < k; i++) {
        const [nx, ny] = move([cx, cy]);

        if (cx === nx && cy === ny) break;

        cx = nx;
        cy = ny;
    }

    return `${cy + 1} ${cx + 1}`;
}

console.log(solve());

// helpers
function move([x, y]) {
    const value = grid[y][x];

    const queue = [];
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const candidates = [];

    queue.push([x, y]);
    visited[y][x] = true;

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    let head = 0;
    while(head < queue.length) {
        const [cx, cy] = queue[head];
        head += 1;

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (inRange(nx, ny) && !visited[ny][nx] && grid[ny][nx] < value) {
                queue.push([nx, ny]);
                candidates.push([grid[ny][nx], nx, ny]);
                visited[ny][nx] = true;
            }
        }
    }


    if (candidates.length === 0) {
        return [x, y];
    }

    candidates.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        } else if (a[2] !== b[2]) {
            return a[2] - b[2];
        } else {
            return a[1] - b[1];
        }
    });

    return [candidates[0][1], candidates[0][2]];
}

function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}