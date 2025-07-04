const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K, U, D] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const result = (function recursive(cities) {
        if (cities.length === K) {
            const visited = Array.from({ length: N }, () => new Array(N).fill(false));

            return cities.reduce((acc, current) => acc + countMove(current, visited), 0);
        }

        let maxCount = 0;

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                maxCount = Math.max(recursive([...cities, [row, col]]), maxCount);
            }
        }

        return maxCount;
    })([]);

    return result;
}

console.log(solve());

// helpers
function countMove(startPosition, visited) {
    const queue = [startPosition];
    let head = 0;

    visited[startPosition[0]][startPosition[1]] = true;

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    let count = 0;

    while(head < queue.length) {
        const [currentRow, currentCol] = queue[head];
        head += 1;
        count += 1;

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];

            if (!inRange(nextRow, nextCol)) continue;

            if (!visited[nextRow][nextCol] && canMove(grid[currentRow][currentCol], grid[nextRow][nextCol])) {
                queue.push([nextRow, nextCol]);
                visited[nextRow][nextCol] = true;
            }
        }
    }

    return count;
}

function canMove(a, b) {
    const diff = Math.abs(a - b);
    return diff >= U && diff <= D;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}