//! No use regular expresion`s sumbols as aliase {$, +, ., *}

const COMPONENTS_ALIAS = '@com';
const UTILS_ALIAS = '@util';
const NODE_ALIAS = '@node';
const IMAGES_ALIAS = '@img';
const AUDIO_ALIAS = '@audio';
const VIDEO_ALIAS = '@video';
const FONTS_ALIAS = '@fonts';
const BASE_ALIAS = '@base';
const EXT_ALIAS = '@';

module.exports = {
	html: {
		images: IMAGES_ALIAS,
		audios: AUDIO_ALIAS,
		videos: VIDEO_ALIAS,
	},
	pug: {
		components: COMPONENTS_ALIAS,
		utils: UTILS_ALIAS,
		images: IMAGES_ALIAS,
		audios: AUDIO_ALIAS,
		videos: VIDEO_ALIAS,
		pug: EXT_ALIAS
	},
	scss: {
		components: COMPONENTS_ALIAS,
		utils: UTILS_ALIAS,
		images: IMAGES_ALIAS,
		node: NODE_ALIAS,
		fonts: FONTS_ALIAS,
		base: BASE_ALIAS,
		scss: EXT_ALIAS
	},
	js: {
		components: COMPONENTS_ALIAS,
		utils: UTILS_ALIAS,
		node: NODE_ALIAS,
		js: EXT_ALIAS
	}
}
