const cryto = require('crypto');

// Store OTPs in memory (for demonstration purposes)
const users = new Map();

// Function to generate a random OTP
function generateOTP() {
    return cryto.randomInt(0, 999999).toString().padStart(6, '0');
}