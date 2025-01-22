const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Self-invoking async function
(async function () {
    // Configuration from environment variables
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Upload an image from a URL
    try {
        const uploadResult = await cloudinary.uploader.upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 
            { public_id: 'shoes' }
        );
        console.log(uploadResult);

        // Optimize delivery
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });
        console.log('Optimized URL:', optimizeUrl);

        // Auto crop
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        console.log('Auto Cropped URL:', autoCropUrl);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
})();
