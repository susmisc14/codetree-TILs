const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + n).map(line => line.split(' ').map(Number));
const [r, c] = input[1 + n].split(' ').map(Number);

// Please write your code here.
const disabled = {};

// 시계 방향
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function solve() {
    let cx = c - 1;
    let cy = r - 1;

    for (let i = 0; i < k; i++) {
        const position = move(cx, cy);
        cx = position[0];
        cy = position[1];
    }

    return `${cy + 1} ${cx + 1}`;
}

console.log(solve());

// helpers
function move(cx, cy) {
    let moved = false;

    for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (!inRange(nx, ny) || grid[ny][nx] >= grid[cy][cx]) continue;

        moved = true;
    }

    if (!moved) {
        return [cx, cy];
    }

    const result = [];
    let tempValue = 0;

    for (let r = n - 1; r >= 0; r--) {
        for (let c = n - 1; c >= 0; c--) {
            if (c > disabled[r]) continue;

            if (grid[r][c] < grid[cy][cx] && grid[r][c] >= tempValue) {
                result[0] = c;
                result[1] = r;
                tempValue = grid[r][c];
            }
        }
    }

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] !== grid[result[1]][result[0]]) continue;
            disabled[r] = c;
        }
    }

    return result;
}

function inRange(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
}