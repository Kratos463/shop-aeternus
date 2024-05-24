"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-parse";
exports.ids = ["vendor-chunks/remark-parse"];
exports.modules = {

/***/ "(ssr)/./node_modules/remark-parse/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/remark-parse/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkParse)\n/* harmony export */ });\n/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdast-util-from-markdown */ \"(ssr)/./node_modules/mdast-util-from-markdown/dev/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast-util-from-markdown').Options} FromMarkdownOptions\n * @typedef {import('unified').Parser<Root>} Parser\n * @typedef {import('unified').Processor<Root>} Processor\n */\n\n/**\n * @typedef {Omit<FromMarkdownOptions, 'extensions' | 'mdastExtensions'>} Options\n */\n\n\n\n/**\n * Aadd support for parsing from markdown.\n *\n * @param {Readonly<Options> | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction remarkParse(options) {\n  /** @type {Processor} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n\n  self.parser = parser\n\n  /**\n   * @type {Parser}\n   */\n  function parser(doc) {\n    return (0,mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_0__.fromMarkdown)(doc, {\n      ...self.data('settings'),\n      ...options,\n      // Note: these options are not in the readme.\n      // The goal is for them to be set by plugins on `data` instead of being\n      // passed by users.\n      extensions: self.data('micromarkExtensions') || [],\n      mdastExtensions: self.data('fromMarkdownExtensions') || []\n    })\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLXBhcnNlL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkMsYUFBYSw0Q0FBNEM7QUFDekQsYUFBYSxnQ0FBZ0M7QUFDN0MsYUFBYSxtQ0FBbUM7QUFDaEQ7O0FBRUE7QUFDQSxhQUFhLDZEQUE2RDtBQUMxRTs7QUFFcUQ7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsc0NBQXNDO0FBQ2pEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDZTtBQUNmLGFBQWEsV0FBVztBQUN4QjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxXQUFXLHNFQUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tdWx0aWthcnQtbmV4dC8uL25vZGVfbW9kdWxlcy9yZW1hcmstcGFyc2UvbGliL2luZGV4LmpzPzk1ZjYiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLk9wdGlvbnN9IEZyb21NYXJrZG93bk9wdGlvbnNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaWZpZWQnKS5QYXJzZXI8Um9vdD59IFBhcnNlclxuICogQHR5cGVkZWYge2ltcG9ydCgndW5pZmllZCcpLlByb2Nlc3NvcjxSb290Pn0gUHJvY2Vzc29yXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T21pdDxGcm9tTWFya2Rvd25PcHRpb25zLCAnZXh0ZW5zaW9ucycgfCAnbWRhc3RFeHRlbnNpb25zJz59IE9wdGlvbnNcbiAqL1xuXG5pbXBvcnQge2Zyb21NYXJrZG93bn0gZnJvbSAnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJ1xuXG4vKipcbiAqIEFhZGQgc3VwcG9ydCBmb3IgcGFyc2luZyBmcm9tIG1hcmtkb3duLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHk8T3B0aW9ucz4gfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtYXJrUGFyc2Uob3B0aW9ucykge1xuICAvKiogQHR5cGUge1Byb2Nlc3Nvcn0gKi9cbiAgLy8gQHRzLWV4cGVjdC1lcnJvcjogVFMgaW4gSlNEb2MgZ2VuZXJhdGVzIHdyb25nIHR5cGVzIGlmIGB0aGlzYCBpcyB0eXBlZCByZWd1bGFybHkuXG4gIGNvbnN0IHNlbGYgPSB0aGlzXG5cbiAgc2VsZi5wYXJzZXIgPSBwYXJzZXJcblxuICAvKipcbiAgICogQHR5cGUge1BhcnNlcn1cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlcihkb2MpIHtcbiAgICByZXR1cm4gZnJvbU1hcmtkb3duKGRvYywge1xuICAgICAgLi4uc2VsZi5kYXRhKCdzZXR0aW5ncycpLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIC8vIE5vdGU6IHRoZXNlIG9wdGlvbnMgYXJlIG5vdCBpbiB0aGUgcmVhZG1lLlxuICAgICAgLy8gVGhlIGdvYWwgaXMgZm9yIHRoZW0gdG8gYmUgc2V0IGJ5IHBsdWdpbnMgb24gYGRhdGFgIGluc3RlYWQgb2YgYmVpbmdcbiAgICAgIC8vIHBhc3NlZCBieSB1c2Vycy5cbiAgICAgIGV4dGVuc2lvbnM6IHNlbGYuZGF0YSgnbWljcm9tYXJrRXh0ZW5zaW9ucycpIHx8IFtdLFxuICAgICAgbWRhc3RFeHRlbnNpb25zOiBzZWxmLmRhdGEoJ2Zyb21NYXJrZG93bkV4dGVuc2lvbnMnKSB8fCBbXVxuICAgIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-parse/lib/index.js\n");

/***/ })

};
;