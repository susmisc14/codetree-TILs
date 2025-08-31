const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

// Please Write your code here.
const dp = Array.from({ length: N + 1}, () => new Array(K + 1).fill(-Infinity));
dp[0][0] = 0;

for (let i = 1; i <= N; i++) {
    const currentNumber = numbers[i - 1];

    for (let j = 0; j <= K; j++) {
        let start = -Infinity;
        if (currentNumber >= 0 && j === 0) {
            start = currentNumber;
        } else if (currentNumber < 0 && j === 1) {
            start = currentNumber;
        }

        let value = -Infinity;
        if (currentNumber >= 0) {
            if (dp[i - 1][j] !== -Infinity) {
                value = dp[i - 1][j] + currentNumber;
            }
        } else {
            if (j > 0 && dp[i - 1][j - 1] !== -Infinity) {
                value = dp[i - 1][j - 1] + currentNumber;
            }
        }

        dp[i][j] = Math.max(start, value);
    }
}

const result = Math.max(...dp.flat(Infinity));
console.log(result);