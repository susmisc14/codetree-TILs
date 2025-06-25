const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [n, m, c] = input[0].trim().split(' ').map(Number);
const weights = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
function solve() {
    let result = 0;

    for (let r1 = 0; r1 < n; r1++) {
        for(let c1 = 0; c1 <= n - m; c1++) {
            for (let r2 = 0; r2 < n; r2++) {
                for (let c2 = 0; c2 <= n - m; c2++) {
                    if (r1 !== r2) {
                        const thief1Blocks = weights[r1].slice(c1, c1 + m);
                        const thief1Value = calculateMaxPrice(thief1Blocks);

                        const thief2Blocks = weights[r2].slice(c2, c2 + m);
                        const thief2Value = calculateMaxPrice(thief2Blocks);

                        result = Math.max(thief1Value + thief2Value, result);
                    } else if (r1 === r2) {
                        if (c1 + m <= c2 || c2 + m <= c1) {
                            const thief1Blocks = weights[r1].slice(c1, c1 + m);
                            const thief1Value = calculateMaxPrice(thief1Blocks);

                            const thief2Blocks = weights[r2].slice(c2, c2 + m);
                            const thief2Value = calculateMaxPrice(thief2Blocks);

                            result = Math.max(thief1Value + thief2Value, result);
                        }
                    }
                }
            }
        }
    }

    return result;
}

console.log(solve());

// helpers
function calculateMaxPrice(blocks) {
    const result = (function recursive(index, weightSum, valueSum) {
        if (index === m) {
            return weightSum <= c ? valueSum : 0;
        }

        const currentWeight = blocks[index];
        const currentValue = blocks[index] ** 2;

        const resultWhenSkipped = recursive(index + 1, weightSum, valueSum);
        
        let resultWhenTaken = 0;
        if (weightSum + currentWeight <= c) {
            resultWhenTaken = recursive(index + 1, weightSum + currentWeight, valueSum + currentValue);
        }

        return Math.max(resultWhenSkipped, resultWhenTaken);
    })(0, 0, 0);

    return result;
}