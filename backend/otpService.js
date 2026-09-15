const cryto = require('crypto');

// Store OTPs in memory (for demonstration purposes)
const users = new Map();

// Function to generate a random OTP
function generateOTP() {
    return cryto.randomInt(0, 999999).toString().padStart(6, '0');
}

// Function to send a new OTP to a user
function sendOTP(email) {
    let user = users.get(email);
    if (!user) {
        user = { 
            requests: [], 
            oldOTPs: [] 
        };
        
        users.set(email, user);
    }
}


