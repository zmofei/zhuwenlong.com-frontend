// next.config.js
const withImages = require('next-images');

// module.exports = withImages({
// 	poweredByHeader: false // This doesn't really matter
// });

module.exports = {
	...withImages(),
	images: {
		disableStaticImages: true
	}
}