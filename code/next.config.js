const withImages = require("next-images");

module.exports = {
    ...withImages(),
    swcMinify: true,
    images: {
        disableStaticImages: true,
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        outputStandalone: true,
    }
}