const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numbers = [0].concat(input[1].trim().split(" ").map(Number));

// Please Write your code here.
const OFFSET = 20;
const MAX = 40;
const MIN = 0;

const dp = Array.from({ length: N + 1 }, () => new Array(MAX + 1).fill(0n));
dp[0][OFFSET] = 1n;

for (let i = 1; i <= N; i++) {
    const currentNumber = numbers[i];

    for (let j = MIN; j <= MAX; j++) {
        if (dp[i - 1][j] > 0n) {
            const prevCount = dp[i - 1][j];
            let newIndex = 0;

            index = j + currentNumber;
            if (index <= MAX) {
                dp[i][index] += prevCount;
            }

            index = j - currentNumber;
            if (index >= MIN) {
                dp[i][index] += prevCount;
            }
        }
    }
}

const result = dp[N][M + OFFSET].toString();
console.log(result);