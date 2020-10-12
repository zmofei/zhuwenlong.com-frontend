// next.config.js
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages({
	poweredByHeader: false // This doesn't really matter
});