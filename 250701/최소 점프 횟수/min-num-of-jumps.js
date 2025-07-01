const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const nums = input[1].split(' ').map(Number);

// Please write your code here.
function solve() {
    const dp = new Array(n).fill(-1);

    const result = (function recursive (position) {
        // Base Case
        if (position + 1 >= n) {
            return 0;
        }

        if (dp[position] !== -1) {
            return dp[position];
        }

        // Recursive Step
        const step = nums[position];
        let minCount = Number.MAX_SAFE_INTEGER;

        for (let i = 1; i <= step; i++) {
            const updatedCount = recursive(position + i);
            if (updatedCount !== Number.MAX_SAFE_INTEGER) {
                minCount = Math.min(updatedCount + 1, minCount);
            }
        }

        dp[position] = minCount;
        return minCount;
    })(0, 0);

    return result !== Number.MAX_SAFE_INTEGER ? result : -1;
}

console.log(solve());