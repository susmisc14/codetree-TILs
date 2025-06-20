const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');
const n = Number(input[0]);
const segments = input.slice(1, 1 + n).map(line => line.trim().split(' ').map(Number));

// Please Write your code here.
segments.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

const result = (function recursive(segments) {
    if (segments.length === 0) {
        return 0;
    }

    let count = 0;
    for (let i = 0; i < segments.length; i++) {
        const remainingSegments = [];
        for (let j = 0; j < segments.length; j++) {
            if (i === j) continue;

            const [s1, e1] = segments[i];
            const [s2, e2] = segments[j];

            if (!(s1 < e2 && s2 < e1)) {
                remainingSegments.push(segments[j]);
            }
        }

        count = Math.max(recursive(remainingSegments) + 1, count);
    }

    return count;
})(segments);

console.log(result);