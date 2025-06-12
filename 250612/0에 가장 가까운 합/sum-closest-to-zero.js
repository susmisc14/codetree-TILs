const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = parseInt(input[0]);
const numbers = input[1].split(' ').map(Number);

// Please Write your code here.
numbers.sort((a, b) => a - b);

let left = 0;
let right = n - 1;
let result = Infinity;

while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (Math.abs(sum) < result) {
        result = Math.abs(sum);
    }

    if (sum === 0) break;

    if (sum < 0) {
        left++;
    } else {
        right--;
    }
}

console.log(result);
