# ImageConverterApp

**ImageConverterApp** is a web application that allows users to easily upload, convert, and download images. The app supports drag-and-drop, direct paste, and converts images to WebP format for smaller file sizes without sacrificing quality.

## Key Features

- **Easy Image Upload**: Upload images via drag-and-drop, file selection, or direct paste from the clipboard.
- **Convert to WebP**: Convert images to WebP format with high quality and smaller file sizes.
- **Image Preview**: Preview images before uploading and converting.
- **Download Images**: Easily download the converted images.
- **Automatic Image Deletion**: Automatically delete the previous image when a new one is uploaded.

## Technologies Used

- **Backend**: Node.js, Express.js, Multer, Sharp
- **Frontend**: HTML, JavaScript, Tailwind CSS

## How to Use

1. **Clone the Repository**
    ```bash
    git clone https://github.com/username/ImageConverterApp.git
    cd ImageConverterApp
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Server**
    ```bash
    npm start
    ```

4. **Access the Application**
    Open your browser and go to `http://localhost:3000`.

## Project Structure

```plaintext
.
├── public
│   └── index.html
├── uploads
├── server.js
├── package.json
└── README.md
