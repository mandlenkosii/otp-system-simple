const API = "http://localhost:3000";


// Send OTP
async function sendOtp() {
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (!email.checkValidity()) {
    message.textContent = "Please enter a valid email.";
    return;
  }

  const response = await fetch(`${API}/api/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email.value })
  });

  const data = await response.json();

  message.textContent = data.message;

  if (data.success) {
    document.getElementById("sendScreen").classList.add("hidden");
    document.getElementById("verifyScreen").classList.remove("hidden");

    document.getElementById("verifyEmail").value = email.value;
  }
}


// Verify OTP
async function verifyOtp() {
  const email = document.getElementById("verifyEmail").value;
  const otp = document.getElementById("otp").value;
  const message = document.getElementById("message");

  const response = await fetch(`${API}/api/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      otp: otp
    })
  });

  const data = await response.json();

  message.textContent = data.message;
}


// Resend OTP
async function resendOtp() {
  const email = document.getElementById("verifyEmail").value;
  const message = document.getElementById("message");

  const response = await fetch(`${API}/api/otp/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await response.json();

  message.textContent = data.message;
}


// Go back to the email screen
function goBack() {
  document.getElementById("verifyScreen").classList.add("hidden");
  document.getElementById("sendScreen").classList.remove("hidden");

  document.getElementById("message").textContent = "";
}