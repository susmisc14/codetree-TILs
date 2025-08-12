const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
const total = sequence.reduce((acc, current) => acc + current, 0);

const OFFSET = total;
const DP_SIZE = 2 * OFFSET + 1;

let dp = new Array(DP_SIZE).fill(-1);
dp[OFFSET] = 0;

for (let i = 0; i < N; i++) {
    const currentNumber = sequence[i];
    const nextDp = [...dp];

    for (let diff = -total; diff <= total; diff++) {
        const currentSumA = dp[diff + OFFSET];

        if (currentSumA === -1) continue;
        
        const diffAddToA = diff + currentNumber;
        nextDp[diffAddToA + OFFSET] = Math.max(
            currentSumA + currentNumber,
            nextDp[diffAddToA + OFFSET]
        );

        const diffAddToB = diff - currentNumber;
        nextDp[diffAddToB + OFFSET] = Math.max(
            currentSumA,
            nextDp[diffAddToB + OFFSET]
        );
    }

    dp = nextDp;
}

const result = dp[OFFSET];
console.log(result > 0 ? result : 0);