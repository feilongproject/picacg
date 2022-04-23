; (function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac"));
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));