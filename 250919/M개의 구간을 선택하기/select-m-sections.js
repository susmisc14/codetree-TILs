const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.

const NOT_BELONG = 0;
const BELONG = 1;

const dp = Array.from({ length: n + 1 }, () =>
  Array.from({ length: m + 1 }, () => new Array(2).fill(-Infinity))
);
for (let i = 0; i <= n; i++) {
    dp[i][0][NOT_BELONG] = 0;
}

for (let i = 1; i <= n; i++) {
    const currentNumber = sequence[i - 1];

    for (let j = 1; j <= m; j++) {
        dp[i][j][NOT_BELONG] = Math.max(dp[i - 1][j][NOT_BELONG], dp[i - 1][j][BELONG]);
        dp[i][j][BELONG] = Math.max(dp[i - 1][j - 1][NOT_BELONG] + currentNumber, dp[i - 1][j][BELONG] + currentNumber);
    }
}

const answer = Math.max(dp[n][m][NOT_BELONG], dp[n][m][BELONG]);
console.log(answer);