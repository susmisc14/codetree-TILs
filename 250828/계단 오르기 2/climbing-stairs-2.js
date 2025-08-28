const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const coins = input[1].split(" ").map(Number);

// Please Write your code here.
const COUNT = 3;

const dp = Array.from({ length: N + 1 }, () => new Array(COUNT + 1).fill(-Infinity));
dp[0][0] = 0;

for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= COUNT; j++) {
        const currentCoin = coins[i - 1];

        if (i === N) {
            if (j > 0 && dp[i - 1][j - 1] !== -Infinity) {
                dp[i][j] = dp[i - 1][j - 1] + currentCoin;
            }
            continue;
        }

        let valueFromOneStep = -Infinity;
        let valueFromTwoStep = -Infinity;

        if (i - 1 >= 0 && j > 0 && dp[i - 1][j - 1] !== -Infinity) {
            valueFromOneStep = dp[i - 1][j - 1] + currentCoin;
        }

        if (i - 2 >= 0 && dp[i - 2][j] !== -Infinity) {
            valueFromTwoStep = dp[i - 2][j] + currentCoin;
        }

        dp[i][j] = Math.max(valueFromOneStep, valueFromTwoStep);
    }
}

const result = Math.max(...dp[N]);
console.log(result);