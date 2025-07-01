const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const nums = input[1].split(' ').map(Number);

// Please write your code here.
function solve() {
    const result = (function recursive (position, count) {
        // Base Case
        if (position + 1 >= n) {
            return count;
        }

        // Recursive Step
        const step = nums[position];
        let minCount = -1;

        for (let i = 1; i <= step; i++) {
            const foundCount = recursive(position + i, count + 1);

            if (minCount !== -1) {
                minCount = Math.min(foundCount, minCount);
            } else {
                minCount = foundCount;
            }
        }

        return minCount;
    })(0, 0);

    return result;
}

console.log(solve());