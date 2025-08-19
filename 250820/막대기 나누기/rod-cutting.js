const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const N = Number(input[0]);
const profit = input[1].split(" ").map(Number);

// Please Write your code here.
const dp = new Array(N + 1).fill(0);

// 바깥 루프: 목표로 하는 막대의 길이 (1부터 N까지)
for (let i = 1; i <= N; i++) {

    // 안쪽 루프: 첫 번째로 자를 조각의 길이 (1부터 현재 막대 길이까지)
    for (let j = 1; j <= i; j++) {
        // 점화식: 
        // 현재 최대 가치 vs (첫 조각의 가치 + 나머지 부분의 최대 가치)
        dp[i] = Math.max(profit[j - 1] + dp[i - j], dp[i]);
    }
}

const result = dp[N];
console.log(result);