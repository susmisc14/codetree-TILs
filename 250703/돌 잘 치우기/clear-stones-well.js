const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, K, M] = input[0].split(' ').map(Number);
const grid = input.slice(1, 1 + N).map(line => line.split(' ').map(Number));
const startPoints = input.slice(1 + N, 1 + N + K).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const stones = [];
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 1) {
                stones.push([row, col]);
            }
        }
    }

    const result = (function recursive(index, removedStones) {
        if (removedStones.length === M) {
            const newGrid = grid.map((row) => [...row]);
            removedStones.forEach(([row, col]) => {
                newGrid[row][col] = 0;
            });

            return countMove(newGrid, startPoints);
        }

        let maxCount = 0;

        for (let i = index; i < stones.length; i++) {
            removedStones.push(stones[i]);
            maxCount = Math.max(recursive(i + 1, removedStones), maxCount);
            removedStones.pop();
        }

        return maxCount;
    })(0, []);

    return result;
}

console.log(solve());

// helpers
function countMove(grid, startPoints) {
    const queue = [];
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));
    let count = 0;

    for (const startPoint of startPoints) {
        const startRow = startPoint[0] - 1;
        const startCol = startPoint[1] - 1;

        queue.push([startRow, startCol]);
        visited[startRow][startCol] = true;
        count += 1;
    }

    // 시계 방향
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];
    
    let head = 0;
    while (head < queue.length) {
        const [currentRow, currentCol] = queue[head];
        head += 1;

        for (let i = 0; i < 4; i++) {
            const nextRow = currentRow + dr[i];
            const nextCol = currentCol + dc[i];

            if (inRange(nextRow, nextCol) && !visited[nextRow][nextCol] && grid[nextRow][nextCol] === 0) {
                queue.push([nextRow, nextCol]);
                visited[nextRow][nextCol] = true;
                count += 1;
            }
        }
    }

    return count;
}

function inRange(row, col) {
    return row >= 0 && row < N && col >= 0 && col < N;
}