const crypto = require("crypto");

//  OTP information in memory
const users = new Map();

// Function to generate a random 6-digit OTP
function generateOtp() {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

// Function to send a new OTP
function sendOtp(email) {
  // Get the user or create a new user
  let user = users.get(email);

  if (!user) {
    user = {
      requests: [],  
      oldOtps: []    // Stores previously generated OTPs to avoid duplicates
    };

    users.set(email, user);
  }

  // Remove requests older than 1 hour
  user.requests = user.requests.filter(
    time => Date.now() - time < 3600000
  );

  // Allow only 3 OTP requests per hour
  if (user.requests.length >= 3) {
    return {
      success: false,
      message: "Maximum OTP requests reached."
    };
  }

  // Generate a new OTP
  let otp = generateOtp();

  // Make sure the same OTP is not generated again
  while (user.oldOtps.includes(otp)) {
    otp = generateOtp();
  }

  // Save the OTP information
  user.otp = otp;
  user.createdAt = Date.now();
  user.expiresAt = Date.now() + 30000; // OTP expires in 30 seconds
  user.used = false;
  user.resends = 0;

  // Save the request and OTP
  user.requests.push(Date.now());
  user.oldOtps.push(otp);

  // Mock email service - show OTP in the terminal
  console.log(`OTP for ${email}: ${otp}`);

  return {
    success: true,
    message: "OTP sent successfully."
  };
}

// Function to resend the same OTP
function resendOtp(email) {
  const user = users.get(email);

  // Check if the user has requested an OTP
  if (!user || !user.otp) {
    return {
      success: false,
      message: "No OTP has been requested."
    };
  }

  // Resending is only allowed within 5 minutes
  if (Date.now() - user.createdAt > 300000) {
    return {
      success: false,
      message: "The resend window has expired."
    };
  }

  // Allow a maximum of 3 resends
  if (user.resends >= 3) {
    return {
      success: false,
      message: "Maximum OTP resends reached."
    };
  }

  // Increase the resend count
  user.resends++;

  // Give the same OTP another 30 seconds
  user.expiresAt = Date.now() + 30000;

  // Mock email service
  console.log(`OTP for ${email}: ${user.otp}`);

  return {
    success: true,
    message: "OTP resent successfully."
  };
}

// Function to verify the OTP
function verifyOtp(email, otp) {
  const user = users.get(email);

  // Check if an OTP exists
  if (!user || !user.otp) {
    return {
      success: false,
      valid: false,
      message: "No OTP has been requested."
    };
  }

  // Check if the OTP was already used
  if (user.used) {
    return {
      success: false,
      valid: false,
      message: "OTP has already been used."
    };
  }

  // Check if the OTP has expired
  if (Date.now() > user.expiresAt) {
    return {
      success: false,
      valid: false,
      message: "OTP has expired."
    };
  }

  // Check if the entered OTP is correct
  if (otp !== user.otp) {
    return {
      success: false,
      valid: false,
      message: "Invalid OTP."
    };
  }

  // Mark the OTP as used
  user.used = true;

  return {
    success: true,
    valid: true,
    message: "OTP verified successfully."
  };
}

// Make these functions available to server.js
module.exports = {
  sendOtp,
  resendOtp,
  verifyOtp
};