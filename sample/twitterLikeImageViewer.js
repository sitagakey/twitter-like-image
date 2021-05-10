/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TwitterLikeImageViewer"] = factory();
	else
		root["TwitterLikeImageViewer"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/style.ts":
/*!*************************!*\
  !*** ./src/ts/style.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.style = void 0;\nexports.style = {\n    '.twitter-like-image-viewer': {\n        width: '100%',\n        borderRadius: '20px',\n        position: 'relative',\n        overflow: 'hidden',\n    },\n    '.twitter-like-image-viewer.is-transitionend .backdrop-content': {\n        transition: '0.4s cubic-bezier(0.33, 0.98, 0.77, 0.98)',\n    },\n    '.twitter-like-image-viewer::before': {\n        content: '',\n        display: 'block',\n        width: '100%',\n        paddingTop: '50%',\n    },\n    '.content': {\n        display: 'grid',\n        gridTemplateColumns: '1fr 1fr',\n        gridTemplateRows: '1fr 1fr',\n        position: 'absolute',\n        width: '100%',\n        height: '100%',\n        left: '0',\n        top: '0',\n        gridGap: '4px',\n        listStyle: 'none',\n        margin: '0',\n        padding: '0',\n    },\n    '.item': {\n        width: '100%',\n        height: '100%',\n        overflow: 'hidden',\n    },\n    '.item:nth-last-child(1)': {\n        gridColumn: '1/3',\n        gridRow: '1/3',\n    },\n    '.item:nth-last-child(2)': {\n        gridColumn: '1',\n        gridRow: '1/3',\n    },\n    '.item:nth-last-child(2) + .item': {\n        gridColumn: '2',\n        gridRow: '1/3',\n    },\n    '.item:nth-last-child(3)': {\n        gridColumn: '1',\n        gridRow: '1',\n    },\n    '.item:nth-last-child(3) + .item': {\n        gridColumn: '1',\n        gridRow: '2',\n    },\n    '.item:nth-last-child(3) + .item + .item': {\n        gridColumn: '2',\n        gridRow: '1/3',\n    },\n    '.item:nth-last-child(4)': {\n        gridColumn: '1/2',\n        gridRow: '1/2',\n    },\n    '.item:nth-last-child(4) + .item': {\n        gridColumn: '2/3',\n        gridRow: '1/2',\n    },\n    '.item:nth-last-child(4) + .item + .item': {\n        gridColumn: '1/2',\n        gridRow: '2/3',\n    },\n    '.item:nth-last-child(4) + .item + .item + .item': {\n        gridColumn: '2/3',\n        gridRow: '2/3',\n    },\n    '.item img': {\n        width: '100%',\n        height: '100%',\n        display: 'block',\n        objectFit: 'cover',\n    },\n    '.backdrop': {\n        width: '100%',\n        height: '100%',\n        overflow: 'hidden',\n        background: 'rgba(0, 0, 0, 0.7)',\n        /* opacity: '0',\n        visibility: 'hidden', */\n        transition: 'opacity 0.2s, visibility 0.2s',\n        position: 'fixed',\n        top: '0',\n        left: '0',\n        zIndex: 100,\n    },\n    '.backdrop-content': {\n        display: 'flex',\n        alignItems: 'center',\n        height: '100%',\n        width: '100%',\n        listStyle: 'none',\n        margin: '0',\n        padding: '0',\n    },\n    '.backdrop-item': {\n        display: 'flex',\n        height: '100%',\n        minWidth: '100%',\n        alignItems: 'center',\n        justifyContent: 'center',\n        overflow: 'hidden',\n    },\n    '.backdrop-item img': {\n        width: '100%',\n        height: '100%',\n        objectFit: 'contain',\n    },\n    '.backdrop-caption': {\n        minHeight: '80px',\n        width: '100%',\n        background: 'rgba(0, 0, 0, 0.5)',\n        position: 'absolute',\n        bottom: '0',\n        left: '0',\n        padding: '10px 15px',\n        color: 'white',\n        boxSizing: 'border-box',\n        margin: '0',\n    },\n    '.backdrop-next,.backdrop-prev': {\n        display: 'flex',\n        alignItems: 'center',\n        height: '100%',\n        paddingLeft: '10px',\n        paddingRight: '10px',\n        position: 'absolute',\n        top: '0',\n        border: '0',\n        background: 'transparent',\n        overflow: 'hidden',\n    },\n    '.backdrop-next.is-hide,.backdrop-prev.is-hide': {\n        display: 'block',\n    },\n    '.backdrop-next:focus,.backdrop-prev:focus': {\n        outline: 'none',\n    },\n    '.backdrop-next:focus::before,.backdrop-prev:focus::before': {\n        border: '2px solid rgba(255, 255, 255, 0.4)',\n    },\n    '.backdrop-next:hover::before,.backdrop-prev:hover::before': {\n        background: 'rgba(255, 255, 255, 0.1)',\n    },\n    '.backdrop-next::before,.backdrop-prev::before': {\n        content: '',\n        display: 'block',\n        width: '38px',\n        height: '38px',\n        borderRadius: '50%',\n        background: 'rgba(0, 0, 0, 0.1)',\n        transition: '0.3s',\n        border: '2px solid transparent',\n    },\n    '.backdrop-next::after,.backdrop-prev::after': {\n        content: '',\n        display: 'block',\n        width: '8px',\n        height: '8px',\n        position: 'absolute',\n        top: 'calc(50% - 5px)',\n    },\n    '.backdrop-prev': {\n        left: '0',\n    },\n    '.backdrop-prev::after': {\n        borderLeft: '2px solid rgba(255, 255, 255, 0.6)',\n        borderTop: '2px solid rgba(255, 255, 255, 0.6)',\n        transform: 'rotate(-45deg)',\n        right: 'calc(50% - 6px)',\n    },\n    '.backdrop-next': {\n        right: '0',\n    },\n    '.backdrop-next::after': {\n        borderTop: '2px solid rgba(255, 255, 255, 0.6)',\n        borderRight: '2px solid rgba(255, 255, 255, 0.6)',\n        transform: 'rotate(45deg)',\n        left: 'calc(50% - 6px)',\n    },\n    '.backdrop-close': {\n        display: 'block',\n        width: '38px',\n        height: '38px',\n        borderRadius: '50%',\n        background: 'rgba(0, 0, 0, 0.1)',\n        position: 'absolute',\n        overflow: 'hidden',\n        top: '20px',\n        left: '10px',\n        transition: '0.3s',\n        border: '2px solid transparent',\n    },\n    '.backdrop-close:hover': {\n        background: 'rgba(255, 255, 255, 0.1)',\n    },\n    '.backdrop-close:focus': {\n        outline: 'none',\n        border: '2px solid rgba(255, 255, 255, 0.4)',\n    },\n    '.backdrop-close::before,.backdrop-close::after': {\n        content: '',\n        display: 'block',\n        width: '16px',\n        height: '2px',\n        background: 'rgba(255, 255, 255, 0.6)',\n        position: 'absolute',\n        top: 'calc(50% - 1px)',\n        left: 'calc(50% - 8px)',\n    },\n    '.backdrop-close::before': {\n        transform: 'rotate(45deg)',\n    },\n    '.backdrop-close::after': {\n        transform: 'rotate(-45deg)',\n    },\n};\n\n\n//# sourceURL=webpack://TwitterLikeImageViewer/./src/ts/style.ts?");

/***/ }),

/***/ "./src/ts/twitterLikeImageViewer.ts":
/*!******************************************!*\
  !*** ./src/ts/twitterLikeImageViewer.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar style_1 = __webpack_require__(/*! ./style */ \"./src/ts/style.ts\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/ts/utils.ts\");\nvar styleElement = utils_1.styleStringToStyleElement(utils_1.styleObjectToStyleString(style_1.style));\nvar TwitterLikeImageViewer = /** @class */ (function (_super) {\n    __extends(TwitterLikeImageViewer, _super);\n    function TwitterLikeImageViewer() {\n        var _this = _super.call(this) || this;\n        _this.attachShadow({ mode: 'open' });\n        return _this;\n    }\n    return TwitterLikeImageViewer;\n}(HTMLDivElement));\ncustomElements.define('tliv', TwitterLikeImageViewer);\n\n\n//# sourceURL=webpack://TwitterLikeImageViewer/./src/ts/twitterLikeImageViewer.ts?");

/***/ }),

/***/ "./src/ts/utils.ts":
/*!*************************!*\
  !*** ./src/ts/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.lowerCamelCaseToKebabCase = exports.styleStringToStyleElement = exports.styleObjectToStyleString = void 0;\n/**\n * styleObjectを元に、styleStringを生成する\n * @param styleObject\n */\nvar styleObjectToStyleString = function (styleObject) {\n    var styleString = '';\n    for (var _i = 0, _a = Object.entries(styleObject); _i < _a.length; _i++) {\n        var _b = _a[_i], selector = _b[0], valueObject = _b[1];\n        styleString += selector + \" {\";\n        for (var _c = 0, _d = Object.entries(valueObject); _c < _d.length; _c++) {\n            var _e = _d[_c], property = _e[0], value = _e[1];\n            styleString += exports.lowerCamelCaseToKebabCase(property) + \": \" + value + \";\";\n        }\n        styleString += \"}\";\n    }\n    return styleString;\n};\nexports.styleObjectToStyleString = styleObjectToStyleString;\n/**\n * styleStringを元に、styleElementを生成する\n * @param styleString\n */\nvar styleStringToStyleElement = function (styleString) {\n    var styleElement = document.createElement('style');\n    styleElement.insertAdjacentText('beforeend', styleString);\n    return styleElement;\n};\nexports.styleStringToStyleElement = styleStringToStyleElement;\n/**\n * 文字列をローワーキャメルケースからケバブケースに変換する\n * @param string 変換したい文字列\n */\nvar lowerCamelCaseToKebabCase = function (string) {\n    return string.replace(/(?!=[A-Z]|^.)([A-Z])/g, function (targetString) {\n        return \"-\" + targetString.charAt(0).toLowerCase();\n    });\n};\nexports.lowerCamelCaseToKebabCase = lowerCamelCaseToKebabCase;\n\n\n//# sourceURL=webpack://TwitterLikeImageViewer/./src/ts/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/twitterLikeImageViewer.ts");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});