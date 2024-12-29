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
  