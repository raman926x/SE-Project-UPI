// On page load, extract URL parameters and populate the fields
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const upiID = urlParams.get("upiId");
    const amount = urlParams.get("amount");
  
    if (upiID) {
      document.getElementById("upiID").value = upiID;
    }
  
    if (amount) {
      document.getElementById("amount").value = amount;
    }
  };
  
  // Generate the QR code when the button is clicked
  document.getElementById("generateQR").addEventListener("click", function () {
    const upiID = document.getElementById("upiID").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const qrCodeDiv = document.getElementById("qrCode");
  
    // Clear any existing QR code
    qrCodeDiv.innerHTML = "";
  
    if (!upiID || !amount) {
      alert("Please enter both UPI ID and amount.");
      return;
    }
  
    // Create the UPI payment string
    const upiString = `upi://pay?pa=${upiID}&am=${amount}`;
  
    // Generate the QR code
    QRCode.toCanvas(upiString, { width: 200 }, function (error, canvas) {
      if (error) {
        console.error(error);
        alert("Failed to generate QR Code.");
        return;
      }
      qrCodeDiv.appendChild(canvas);
    });
  });
  
