// On page load, extract URL parameters, populate fields, and auto-generate QR if applicable
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const upiID = urlParams.get("upiId");
  const amount = urlParams.get("amount");
  const note = urlParams.get("note");

  if (upiID) {
    document.getElementById("upiID").value = upiID;
  }

  if (amount) {
    document.getElementById("amount").value = amount;
  }

  if (note) {
    document.getElementById("note").value = decodeURIComponent(note);
  }

  // Automatically generate the QR code if fields are pre-filled
  if (upiID && amount) {
    generateQRCode();
  }
};

// Function to generate QR code
function generateQRCode() {
  const upiID = document.getElementById("upiID").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const note = document.getElementById("note").value.trim();
  const qrCodeDiv = document.getElementById("qrCode");

  // Clear any existing QR code
  qrCodeDiv.innerHTML = "";

  if (!upiID || !amount) {
    alert("Please enter both UPI ID and amount.");
    return;
  }

  // Create the UPI payment string
  let upiString = `upi://pay?pa=${upiID}&am=${amount}`;
  if (note) {
    upiString += `&tn=${encodeURIComponent(note)}`;
  }
  

  // Generate the QR code
  QRCode.toCanvas(upiString, { width: 200 }, function (error, canvas) {
    if (error) {
      console.error(error);
      alert("Failed to generate QR Code.");
      return;
    }
    qrCodeDiv.appendChild(canvas);
  });
}

// Add click event listener for manual QR generation
document.getElementById("generateQR").addEventListener("click", generateQRCode);
