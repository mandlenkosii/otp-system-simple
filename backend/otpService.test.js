const {
  sendOtp,
  resendOtp,
  verifyOtp
} = require("./otpService");

describe("OTP System", () => {

  // Test that an OTP can be sent
  test("should send an OTP", () => {
    const result = sendOtp("test@example.com");

    expect(result.success).toBe(true);
  });

  // Test that the wrong OTP is rejected
  test("should reject an incorrect OTP", () => {
    const result = verifyOtp("test@example.com", "123456");

    expect(result.valid).toBe(false);
  });

  // Test that the existing OTP can be resent
  test("should resend the OTP", () => {
    const result = resendOtp("test@example.com");

    expect(result.success).toBe(true);
  });

});