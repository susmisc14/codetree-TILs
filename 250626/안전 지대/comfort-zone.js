const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].trim().split(' ').map(Number);
const grid = input.slice(1, 1 + Number(n)).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    const maxHeight = getMaxHeight(grid);

    const [level, numberOfSafeArea] = (function recursive(level, bestLevel, maxCount) {
        if (level > maxHeight) {
            return maxCount === 0 ? [1, 0] : [bestLevel, maxCount];
        }

        let newGrid = Array.from({ length: n }, () => new Array(m).fill(0));
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (grid[r][c] <= level) continue;

                newGrid[r][c] = grid[r][c];
            }
        }

        const currentCount = countSafeArea(newGrid);

        if (currentCount > maxCount) {
            return recursive(level + 1, level, currentCount);
        } else {
            return recursive(level + 1, bestLevel, maxCount);
        }
    })(1, 1, 0);

    return `${level} ${numberOfSafeArea}`;
}

console.log(solve());

// helpers
function countSafeArea(grid) {
    const visited = Array.from({ length: n }, () => new Array(m).fill(false));

    // 시계 방향
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const dfs = (x, y) => {
        visited[y][x] = true;

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;

            if (grid[ny][nx] !== 0 && !visited[ny][nx]) {
                dfs(nx, ny);
            };
        }
    }
    
    let result = 0;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            if (visited[r][c] || grid[r][c] === 0) continue;

            dfs(c, r);
            
            result++;
        }
    }

    return result;
}

function getMaxHeight(grid) {
    let result = 0;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            result = Math.max(grid[r][c], result);
        }
    }

    return result;
}