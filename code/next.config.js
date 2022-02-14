const withImages = require("next-images");

module.exports = {
    ...withImages(),
    swcMinify: true,
    images: {
        disableStaticImages: true,
    },
    experimental: {
        outputStandalone: true,
    },
}