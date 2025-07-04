const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K, U, D] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const coords = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            coords.push([row, col]);
        }
    }

    const result = (function recursive(index, cities) {
        if (cities.length === K) {
            const count = countReachableCities(cities);

            return count;
        }

        let maxCount = 0;

        for (let i = index; i < coords.length; i++) {
            maxCount = Math.max(recursive(index + 1, [...cities, coords[i]]), maxCount);
        }

        return maxCount;
    })(0, []);

    return result;
}

console.log(solve());
// solve()

// helpers
function countReachableCities(cities) {
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));
    const queue = [];
    let head = 0;

    for (const [row, col] of cities) {
        if (!visited[row][col]) {
            queue.push([row, col]);
            visited[row][col] = true;
        }
    }

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    while (head < queue.length) {
        const [currentRow, currentCol] = queue[head];
        head += 1;

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];

            if (!inRange(nextRow, nextCol)) continue;

            if (!visited[nextRow][nextCol] && canMove(currentRow, currentCol, nextRow, nextCol)) {
                queue.push([nextRow, nextCol]);
                visited[nextRow][nextCol] = true;
            }
        }
    }

    return head;
}

function canMove(row1, col1, row2, col2) {
    const diff = Math.abs(grid[row1][col1] - grid[row2][col2]);

    return diff >= U && diff <= D;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}