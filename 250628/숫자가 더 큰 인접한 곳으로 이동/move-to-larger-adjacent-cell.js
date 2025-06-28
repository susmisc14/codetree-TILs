const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

let [n, currX, currY] = input[0].trim().split(' ').map(Number);
let grid = input.slice(1, n + 1).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const values = [];
    
    // 상하좌우 방향
    const dx = [0, 0, -1, 1];
    const dy = [1, -1, 0, 0];

    let x = currX - 1;
    let y = currY - 1;

    while (true) {
        values.push(grid[y][x]);

        let ended = true;

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            if (grid[ny][nx] > grid[y][x]) {
                x = nx;
                y = ny;
                ended = false;
                break;
            }
        }

        if (ended) break;
    }

    return values.join(" ");
}

console.log(solve());