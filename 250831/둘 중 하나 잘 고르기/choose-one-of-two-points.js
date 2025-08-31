const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);

const cardPairs = [[0, 0]];
for (let i = 1; i < input.length; i++) {
    cardPairs.push(input[i].split(" ").map(Number));
}

// Please write your code here.
const DP_SIZE = 2 * N + 1;
const dp = Array.from({ length: DP_SIZE }, () => new Array(2).fill(0));

for (let i = 1; i < DP_SIZE; i++) {
    const [currentA, currentB] = cardPairs[i];
    
    for (let j = 0; j <= N; j++) {
        if (i < j) continue;
        if (i - j > N) continue;

        let sumFromA = -1;
        if (j > 0 && dp[i - 1][j - 1] !== -1) {
            sumFromA = dp[i - 1][j - 1] + currentA;
        }

        let sumFromB = -1;
        if (i - 1 >= j && dp[i - 1][j] !== -1) {
            sumFromB = dp[i - 1][j] + currentB;
        }

        dp[i][j] = Math.max(sumFromA, sumFromB);
    }
}


const result = dp[2 * N][N];
console.log(result);