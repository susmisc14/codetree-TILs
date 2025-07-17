const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const points = input.slice(1, Number(N) + 1).map(line => line.split(' ').map(Number));

// Please Write your code here.
function solve() {
    const result = (function recursive(index, coords) {
        if (coords.length === M) {
            let maxDistance = 0;

            for (let i = 0; i < M; i++) {
                for (let j = i + 1; j < M; j++) {
                    maxDistance = Math.max(getSquaredEuclideanDistance(coords[i], coords[j]), maxDistance);
                }
            }

            return maxDistance;
        }

        if (index === N) {
            return Infinity;
        }

        const resultWhenSkipped = recursive(index + 1, coords);
        const resultWhenKept = recursive(index + 1, [...coords, points[index]]);

        return Math.min(resultWhenSkipped, resultWhenKept);
    })(0, []);

    return result;
}

console.log(solve());

// helpers
function getSquaredEuclideanDistance(p1, p2) {
    const dr = p1[0] - p2[0];
    const dc = p1[1] - p2[1];
    return dr * dr + dc * dc;
}