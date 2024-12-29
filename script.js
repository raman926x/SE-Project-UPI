// Autofill UPI ID and Amount from URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        upiId: params.get('upiId'),
        amount: params.get('amount')
    };
}

window.onload = () => {
    const { upiId, amount } = getQueryParams();

    if (upiId) {
        document.getElementById('upiId').value = upiId;
    }

    if (amount) {
        document.getElementById('amount').value = amount;
    }

    // Automatically generate QR if both fields are prefilled
    if (upiId && amount) {
        generateQRCode(); // Call the QR generation function
    }
};
