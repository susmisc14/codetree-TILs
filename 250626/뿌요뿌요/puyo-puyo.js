const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const grid = input.slice(1, n + 1).map(row => row.split(" ").map(Number));

// Please write your code here.
function solve() {
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const dfs = (x, y) => {
        let size = 1;

        visited[y][x] = true;

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

            if (grid[ny][nx] === grid[y][x] && !visited[ny][nx]) {
                size += dfs(nx, ny);
            }
        }

        return size;
    }

    let boomCount = 0;
    let maxBlockSize = 0;

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (visited[r][c]) continue;

            const blockSize = dfs(c, r);
            maxBlockSize = Math.max(blockSize, maxBlockSize);

            if (blockSize >= 4) {
                boomCount++
            }
        }
    }

    return `${boomCount} ${maxBlockSize}`
}

console.log(solve());