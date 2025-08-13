const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const sequence = input[1].split(" ").map(Number);

// Please Write your code here.
const total = sequence.reduce((acc, current) => acc + current, 0);

if (total % 2 !== 0) {
    console.log("No");
    return;
}

const targetSum = total / 2;
let currentSum = 0;
let partitionsFound = 0;

for (let i = 0; i < N; i++) {
    currentSum += sequence[i];

    if (currentSum > targetSum) {
        console.log("No");
        break;
    }

    if (currentSum === targetSum) {
        partitionsFound++;
        currentSum = 0;
    }
}
    
const result = partitionsFound === 2 && currentSum === 0;   
console.log(result ? "Yes" : "No");