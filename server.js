const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const clearUploadsFolder = () => {
  const directory = path.join(__dirname, "uploads");

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

app.post("/upload", upload.single("image"), async (req, res) => {
  const inputBuffer = req.file.buffer;
  const outputPath = path.join(__dirname, "uploads", `${Date.now()}.webp`);

  try {
    if (!fs.existsSync(path.join(__dirname, "uploads"))) {
      fs.mkdirSync(path.join(__dirname, "uploads"));
    } else {
      clearUploadsFolder();
    }

    const sizeBeforeConvertBytes = inputBuffer.length;
    const sizeBeforeConvertKB = (sizeBeforeConvertBytes / 1024).toFixed(2);

    await sharp(inputBuffer).webp({ quality: 90 }).toFile(outputPath);

    const sizeAfterConvertBytes = fs.statSync(outputPath).size;
    const sizeAfterConvertKB = (sizeAfterConvertBytes / 1024).toFixed(2);

    res.json({
      message: "Gambar berhasil diunggah dan dikonversi",
      beforeSize: `${sizeBeforeConvertKB} KB`,
      afterSize: `${sizeAfterConvertKB} KB`,
      downloadUrl: `/uploads/${path.basename(outputPath)}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengonversi gambar: " + error.message,
    });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
