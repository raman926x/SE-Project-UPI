// Extract URL parameters and decode them
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const upiId = params.get('upiId') ? decodeURIComponent(params.get('upiId')) : '';
    const amount = params.get('amount') ? decodeURIComponent(params.get('amount')) : '';
    return { upiId, amount };
}

// Generate the QR Code
function generateQRCode() {
    const upiId = document.getElementById('upiId').value.trim();
    const amount = document.getElementById('amount').value.trim();

    if (!upiId || !amount) {
        alert("Please provide both UPI ID and amount to generate the QR code.");
        return;
    }

    const upiURL = `upi://pay?pa=${upiId}&am=${amount}`;
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; // Clear any existing QR code

    // Generate QR Code
    new QRCode(qrCodeContainer, {
        text: upiURL,
        width: 256,
        height: 256,
    });

    console.log("Generated QR Code for:", upiURL);
}

// Populate fields and generate QR on page load if parameters exist
window.onload = () => {
    const { upiId, amount } = getQueryParams();

    // Populate form fields if values are present
    if (upiId) {
        document.getElementById('upiId').value = upiId;
    }
    if (amount) {
        document.getElementById('amount').value = amount;
    }

    // Automatically generate QR Code if both fields are filled
    if (upiId && amount) {
        generateQRCode();
    }
};

// Add click event listener to the "Generate QR Code" button
document.getElementById('generateQR').addEventListener('click', generateQRCode);
