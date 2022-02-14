const withImages = require("next-images");

module.exports = {
    i18n: {
        locales: ['en', 'zh'],
        defaultLocale: 'zh',
        domains: [
            {
                domain: 'zhuwenlong.com',
                defaultLocale: 'zh',
            },
            {
                domain: 'himofei.com',
                defaultLocale: 'en',
            },
        ],
        localeDetection: true,
    },
    ...withImages(),
    swcMinify: true,
    images: {
        disableStaticImages: true,
    },
    experimental: {
        outputStandalone: true,
    },
}