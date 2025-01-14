import express from "express";
import cors from "cors";
import qr from "qr-image";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send("URL is required!");
    }

    try {
        // Generate QR code as a Base64 string
        const qrCodeBuffer = qr.imageSync(url, { type: "png" });
        const qrCodeBase64 = `data:image/png;base64,${qrCodeBuffer.toString("base64")}`;

        res.json({ message: "QR code generated successfully!", qrCode: qrCodeBase64 });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating QR code!");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

