// next.config.js

module.exports = {
	httpAgentOptions: {
		keepAlive: true,
	},
	swcMinify: true,
	images: {
		disableStaticImages: true,
	},
}