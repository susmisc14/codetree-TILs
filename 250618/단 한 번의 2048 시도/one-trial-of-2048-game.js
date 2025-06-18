const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const grid = input.slice(0, 4).map(line => line.trim().split(' ').map(Number));
const dir = input[4];

// Please Write your code here.
const sumed = Array.from({ length: 4 }, () => Array.from({ length: 4 }).fill(false));

if (dir === "U") {
    for (let i = 0; i < 4; i++) {
        let j = 0;
        while (j < 4) {
            const minY = Math.max(j - 1, 0);
            const maxY = Math.min(j + 1, 3);

            const currentValue = grid[j][i];
            const prevValue = grid[minY][i];

            if (currentValue === grid[j + 1]?.[i]) {
                grid[j][i] = currentValue + grid[j + 1]?.[i];
                grid[maxY][i] = 0;
                sumed[j][i] = true;
            }

            if (j < maxY && currentValue === 0) {
                grid[j][i] = grid[j + 1][i];
                grid[j + 1][i] = 0;

                if (!sumed[minY][i] && grid[j][i] === grid[j - 1]?.[i]) {
                    grid[minY][i] += grid[j][i];
                    grid[j][i] = 0;
                }

                if (j > minY && prevValue === 0) {
                    grid[j - 1][i] = grid[j][i];
                    grid[j][i] = 0;
                    continue;
                }
            }

            j++;
        }
    }
}

if (dir === "R") {
    for (let i = 0; i < 4; i++) {
        let j = 3;
        while (j >= 0) {
            const minX = Math.max(j - 1, 0);
            const maxX = Math.min(j + 1, 3);

            const currentValue = grid[i][j];
            const prevValue = grid[i][maxX];

            if (currentValue === grid[i][j - 1]) {
                grid[i][j] = currentValue + grid[i][j - 1];
                grid[i][minX] = 0;
                sumed[i][j] = true;
            }

            if (j > minX && currentValue === 0) {
                grid[i][j] = grid[i][j - 1];
                grid[i][j - 1] = 0;

                if (!sumed[i][maxX] && grid[i][j] === grid[i][j + 1]) {
                    grid[i][maxX] += grid[i][j];
                    grid[i][j] = 0;
                }

                if (j < maxX && prevValue === 0) {
                    grid[i][j + 1] = grid[i][j];
                    grid[i][j] = 0;
                    continue;
                }
            }

            j--;
        }
    }
}

if (dir === "D") {
    for (let i = 0; i < 4; i++) {
        let j = 3;
        while (j >= 0) {
            const minY = Math.max(j - 1, 0);
            const maxY = Math.min(j + 1, 3);

            const currentValue = grid[j][i];
            const prevValue = grid[maxY][i];

            if (currentValue === grid[j - 1]?.[i]) {
                grid[j][i] += grid[j - 1]?.[i];
                grid[minY][i] = 0;
                sumed[j][i] = true;
            }

            if (j > minY && grid[j][i] === 0) {
                grid[j][i] = grid[j - 1][i];
                grid[j - 1][i] = 0;

                if (!sumed[maxY][i] && grid[j][i] === grid[j + 1]?.[i]) {
                    grid[maxY][i] += grid[j][i];
                    grid[j][i] = 0;
                }

                if (j < maxY && prevValue === 0) {
                    grid[j + 1][i] = grid[j][i];
                    grid[j][i] = 0;
                    continue;
                }
            }

            j--;
        }
    }
}

if (dir === "L") {
    for (let i = 0; i < 4; i++) {
        let j = 0;
        while (j < 4) {
            const minX = Math.max(j - 1, 0);
            const maxX = Math.min(j + 1, 3);

            const currentValue = grid[i][j];
            const prevValue = grid[i][minX];

            if (currentValue === grid[i][j + 1]) {
                grid[i][j] = currentValue + grid[i][j + 1];
                grid[i][maxX] = 0;
                sumed[i][j] = true;
            }

            if (j < maxX && currentValue === 0) {
                grid[i][j] = grid[i][j + 1];
                grid[i][j + 1] = 0;

                if (!sumed[i][minX] && grid[i][j] === grid[i][j - 1]) {
                    grid[i][minX] += grid[i][j];
                    grid[i][j] = 0;
                }

                if (j > minX && prevValue === 0) {
                    grid[i][j - 1] = grid[i][j];
                    grid[i][j] = 0;
                    continue;
                }
            }

            j++;
        }
    }
}

for (const row of grid) {
    console.log(row.join(" "));
}