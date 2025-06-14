const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const A = input[1].split(' ').map(Number);

// Please Write your code here.

function solve(n, numbers) {
    let totalSum = 0;
    for (const number of numbers) {
        totalSum += number;
    }

    const diff = (function recursive(index, count, currentSum) {
        if (count === n) {
            const otherSum = totalSum - currentSum;
            return Math.abs(currentSum - otherSum);
        }

        if (index === 2 * n) {
            return Infinity;
        }

        const diff1 = recursive(index + 1, count + 1, currentSum + numbers[index]);
        const diff2 = recursive(index + 1, count, currentSum);

        return Math.min(diff1, diff2);
    })(0, 0, 0);

    return diff;
}

console.log(solve(n, A));
