const express = require("express");
const cors = require("cors");

const { sendOtp, resendOtp, verifyOtp} = require("./otpService");

const app = express();

app.use(cors());
app.use(express.json());

// Test the API
app.get("/", (req, res) => {
  res.json({
    message: "OTP API is running"
  });
});

// Send OTP
app.post("/api/otp/send", (req, res) => {
  const result = sendOtp(req.body.email);

  res.json(result);
});

// Resend OTP
app.post("/api/otp/resend", (req, res) => {
  const result = resendOtp(req.body.email);

  res.json(result);
});

// Verify OTP
app.post("/api/otp/verify", (req, res) => {
  const result = verifyOtp(
    req.body.email,
    req.body.otp
  );

  res.json(result);
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});