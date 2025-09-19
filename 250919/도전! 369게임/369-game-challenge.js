const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split("\n");

const n = input[0].trim();

// Please Write your code here.

const MOD = BigInt(10 ** 9 + 7);

const pt = Array(n + 1).fill(1n);
for (let i = 1; i <= n; i++) {
    pt[i] = pt[i - 1] * 10n % MOD;
}

const dp = Array.from({ length: 100005 }, () => Array(5).fill(0n));
let result = 0n;
let success = false;
let sm = 0;

for (let i = 0; i < n.length; i++) {
    const number = Number(n[i]);
    for (let j = 0; j < 10; j++) {
        if (j === 3 || j === 6 || j === 9) {
            result += (dp[i][0] + dp[i][1] + dp[i][2]) * pt[n.length - i - 1] % MOD;
            result %= MOD;
            continue;
        }

        for (let k = 0; k < 3; k++) {
            dp[i + 1][(j + k) % 3] += dp[i][k];
            dp[i + 1][(j + k) % 3] %= MOD;
        }
    }

    for (let j = 0; j < number; j++) {
        if (success || j === 3 || j === 6 || j === 9) {
            result += pt[n.length - i - 1];
            result %= MOD;
        } else {
            dp[i + 1][(j + sm) % 3] += 1n;
            dp[i + 1][(j + sm) % 3] %= MOD;
        }
    }

    if (number === 3 || number === 6 || number === 9) {
        success = true;
    } else {
        sm += number;
    }
}

if (success) {
    result += 1n;
    result %= MOD;
} else {
    dp[n][sm % 3] += 1n;
    dp[n][sm % 3] %= MOD;
}

result += dp[n.length][0];
result += (MOD - 1n);
result %= MOD;

const answer = result.toString();
console.log(answer);