const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
const segments = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
segments.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

const result = (function recursive(index) {
    if (index >= segments.length) {
        return 0;
    }

    const resultWhenSkipped = recursive(index + 1);
    const currentSegmentEnd = segments[index][1];

    let nextIndex = index + 1;
    while (nextIndex < segments.length && segments[nextIndex][0] <= currentSegmentEnd) {
        nextIndex++;
    }

    const resultWhenTaken = recursive(nextIndex) + 1;

    return Math.max(resultWhenSkipped, resultWhenTaken);
})(0);

console.log(result);