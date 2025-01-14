document.getElementById("generateBtn").addEventListener("click", async () => {
    const qrText = document.getElementById("qrText").value;
    const qrCodeDiv = document.getElementById("qrCode");

    if (!qrText.trim()) {
        alert("Please enter a valid URL or text!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: qrText }),
        });

        const result = await response.json();
        if (response.ok) {
            // Display the QR code
            qrCodeDiv.innerHTML = `<img src="${result.qrCode}" alt="Generated QR Code" />`;
        } else {
            alert("Failed to generate QR code.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred!");
    }
});

