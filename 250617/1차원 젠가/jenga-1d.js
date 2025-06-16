const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);
const blocks = input.slice(1, n + 1).map(Number);
const [s1, e1] = input[n + 1].split(' ').map(Number);
const [s2, e2] = input[n + 2].split(' ').map(Number);

// Please write your code here.
function solve(blocks, tasks) {
    const remainingBlocks = [...blocks];
    for (const [s, e] of tasks) {
        const start = s - 1;
        const deleteCount = e - start;

        remainingBlocks.splice(start, deleteCount);
    }
    return remainingBlocks;
}

const remainingBlocks = solve(blocks, [[s1, e1], [s2, e2]]);

console.log(remainingBlocks.length);
console.log(remainingBlocks.join("\n"));
