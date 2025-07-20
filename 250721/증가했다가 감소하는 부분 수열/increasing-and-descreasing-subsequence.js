const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const N = Number(input[0]);
const sequence = input[1].split(' ').map(Number);

// Please Write your code here.
function solve() {
    const dpInc = new Array(N).fill(1);
    for (let i = 1; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (sequence[j] >= sequence[i]) continue;

            dpInc[i] = Math.max(dpInc[i], dpInc[j] + 1);
        }
    }

    const dpDec = new Array(N).fill(1);
    for (let i = N - 2; i >= 0; i--) {
        for (let j = N - 1; j > i; j--) {
            if (sequence[j] >= sequence[i]) continue;

            dpDec[i] = Math.max(dpDec[i], dpDec[j] + 1);
        }
    }

    let maxLength = 0;
    for (let i = 0; i < N; i++) {
        maxLength = Math.max(dpInc[i] + dpDec[i] - 1, maxLength);
    }

    return maxLength;
}

console.log(solve());