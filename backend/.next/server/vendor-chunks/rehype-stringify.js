"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-stringify";
exports.ids = ["vendor-chunks/rehype-stringify"];
exports.modules = {

/***/ "(ssr)/./node_modules/rehype-stringify/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rehype-stringify/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeStringify)\n/* harmony export */ });\n/* harmony import */ var hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-to-html */ \"(ssr)/./node_modules/hast-util-to-html/lib/index.js\");\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast-util-to-html').Options} Options\n * @typedef {import('unified').Compiler<Root, string>} Compiler\n */\n\n\n\n/**\n * Plugin to add support for serializing as HTML.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction rehypeStringify(options) {\n  /** @type {import('unified').Processor<undefined, undefined, undefined, Root, string>} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n  const settings = {...self.data('settings'), ...options}\n\n  self.compiler = compiler\n\n  /**\n   * @type {Compiler}\n   */\n  function compiler(tree) {\n    return (0,hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__.toHtml)(tree, settings)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsMENBQTBDO0FBQ3ZEOztBQUV3Qzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNlO0FBQ2YsYUFBYSw0RUFBNEU7QUFDekY7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFdBQVcseURBQU07QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL211bHRpa2FydC1uZXh0Ly4vbm9kZV9tb2R1bGVzL3JlaHlwZS1zdHJpbmdpZnkvbGliL2luZGV4LmpzPzVjZDIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdC11dGlsLXRvLWh0bWwnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCd1bmlmaWVkJykuQ29tcGlsZXI8Um9vdCwgc3RyaW5nPn0gQ29tcGlsZXJcbiAqL1xuXG5pbXBvcnQge3RvSHRtbH0gZnJvbSAnaGFzdC11dGlsLXRvLWh0bWwnXG5cbi8qKlxuICogUGx1Z2luIHRvIGFkZCBzdXBwb3J0IGZvciBzZXJpYWxpemluZyBhcyBIVE1MLlxuICpcbiAqIEBwYXJhbSB7T3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWR9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogICBOb3RoaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWh5cGVTdHJpbmdpZnkob3B0aW9ucykge1xuICAvKiogQHR5cGUge2ltcG9ydCgndW5pZmllZCcpLlByb2Nlc3Nvcjx1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBSb290LCBzdHJpbmc+fSAqL1xuICAvLyBAdHMtZXhwZWN0LWVycm9yOiBUUyBpbiBKU0RvYyBnZW5lcmF0ZXMgd3JvbmcgdHlwZXMgaWYgYHRoaXNgIGlzIHR5cGVkIHJlZ3VsYXJseS5cbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgY29uc3Qgc2V0dGluZ3MgPSB7Li4uc2VsZi5kYXRhKCdzZXR0aW5ncycpLCAuLi5vcHRpb25zfVxuXG4gIHNlbGYuY29tcGlsZXIgPSBjb21waWxlclxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Q29tcGlsZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjb21waWxlcih0cmVlKSB7XG4gICAgcmV0dXJuIHRvSHRtbCh0cmVlLCBzZXR0aW5ncylcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rehype-stringify/lib/index.js\n");

/***/ })

};
;