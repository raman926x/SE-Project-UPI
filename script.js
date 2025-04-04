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
   const logoUrl = "images/bcgicon.png";
 
   // Clear any existing QR code
   qrCodeDiv.innerHTML = "";
 @@ -38,8 +37,6 @@
     alert("Please enter both UPI ID and amount.");
     return;
   }
 
 
   // Create the UPI payment string
   let upiString = `upi://pay?pa=${upiID}&am=${amount}`;
   if (note) {
 @@ -49,7 +46,6 @@
 
    // QR configuration
    const qrSize = 300;
    const logoSize = qrSize * 0.3; // 20% of QR size
 
    // Generate QR code with error correction
    QRCode.toCanvas(upiString, {
 @@ -61,47 +57,8 @@
        alert("Failed to generate QR Code.");
        return;
      }
  
      // Add logo overlay
      try {
        await addLogo(canvas, logoUrl, logoSize);
        qrCodeDiv.appendChild(canvas);
      } catch (logoError) {
        console.warn("Logo loading failed, using plain QR code");
        qrCodeDiv.appendChild(canvas);
      }
    });
  }
  
  // Logo overlay function with error handling
  function addLogo(canvas, logoUrl, logoSize) {
    return new Promise((resolve, reject) => {
      const ctx = canvas.getContext('2d');
      const logo = new Image();
  
      logo.onload = () => {
        try {
          // Calculate centered position
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;
  
          // Optional: Add white background
         //  ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y, logoSize, logoSize);
  
          // Draw logo
          ctx.drawImage(logo, x, y, logoSize, logoSize);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
  
      logo.onerror = () => reject(new Error('Logo loading failed'));
      logo.crossOrigin = "anonymous";
      logo.src = logoUrl;
    });
  }
 
  // Event listener for manual generation
  document.getElementById("generateQR").addEventListener("click", generateQRCode);
