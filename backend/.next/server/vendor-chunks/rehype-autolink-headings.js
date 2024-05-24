"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-autolink-headings";
exports.ids = ["vendor-chunks/rehype-autolink-headings"];
exports.modules = {

/***/ "(ssr)/./node_modules/rehype-autolink-headings/lib/index.js":
/*!************************************************************!*\
  !*** ./node_modules/rehype-autolink-headings/lib/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeAutolinkHeadings)\n/* harmony export */ });\n/* harmony import */ var _ungap_structured_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ungap/structured-clone */ \"(ssr)/./node_modules/@ungap/structured-clone/esm/index.js\");\n/* harmony import */ var hast_util_heading_rank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hast-util-heading-rank */ \"(ssr)/./node_modules/hast-util-heading-rank/lib/index.js\");\n/* harmony import */ var hast_util_is_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hast-util-is-element */ \"(ssr)/./node_modules/hast-util-is-element/lib/index.js\");\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit/lib/index.js\");\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit-parents/lib/index.js\");\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').ElementContent} ElementContent\n * @typedef {import('hast').Properties} Properties\n * @typedef {import('hast').Root} Root\n *\n * @typedef {import('hast-util-is-element').Test} Test\n */\n\n/**\n * @typedef {'after' | 'append' | 'before' | 'prepend' | 'wrap'} Behavior\n *   Behavior.\n *\n * @callback Build\n *   Generate content.\n * @param {Readonly<Element>} element\n *   Current heading.\n * @returns {Array<ElementContent> | ElementContent}\n *   Content.\n *\n * @callback BuildProperties\n *   Generate properties.\n * @param {Readonly<Element>} element\n *   Current heading.\n * @returns {Properties}\n *   Properties.\n *\n * @typedef Options\n *   Configuration.\n * @property {Behavior | null | undefined} [behavior='prepend']\n *   How to create links (default: `'prepend'`).\n * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [content]\n *   Content to insert in the link (default: if `'wrap'` then `undefined`,\n *   otherwise `<span class=\"icon icon-link\"></span>`);\n *   if `behavior` is `'wrap'` and `Build` is passed, its result replaces the\n *   existing content, otherwise the content is added after existing content.\n * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [group]\n *   Content to wrap the heading and link with, if `behavior` is `'after'` or\n *   `'before'` (optional).\n * @property {Readonly<Properties> | BuildProperties | null | undefined} [headingProperties]\n *   Extra properties to set on the heading (optional).\n * @property {Readonly<Properties> | BuildProperties | null | undefined} [properties]\n *   Extra properties to set on the link when injecting (default:\n *   `{ariaHidden: true, tabIndex: -1}` if `'append'` or `'prepend'`, otherwise\n *   `undefined`).\n * @property {Test | null | undefined} [test]\n *   Extra test for which headings are linked (optional).\n */\n\n/**\n * @template T\n *   Kind.\n * @typedef {(\n *   T extends Record<any, any>\n *     ? {-readonly [k in keyof T]: Cloneable<T[k]>}\n *     : T\n * )} Cloneable\n *   Deep clone.\n *\n *   See: <https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1237#issuecomment-1345515448>\n */\n\n\n\n\n\n\n/** @type {Element} */\nconst contentDefaults = {\n  type: 'element',\n  tagName: 'span',\n  properties: {className: ['icon', 'icon-link']},\n  children: []\n}\n\n/** @type {Options} */\nconst emptyOptions = {}\n\n/**\n * Add links from headings back to themselves.\n *\n * ###### Notes\n *\n * This plugin only applies to headings with `id`s.\n * Use `rehype-slug` to generate `id`s for headings that don’t have them.\n *\n * Several behaviors are supported:\n *\n * *   `'prepend'` (default) — inject link before the heading text\n * *   `'append'` — inject link after the heading text\n * *   `'wrap'` — wrap the whole heading text with the link\n * *   `'before'` — insert link before the heading\n * *   `'after'` — insert link after the heading\n *\n * @param {Readonly<Options> | null | undefined} [options]\n *   Configuration (optional).\n * @returns\n *   Transform.\n */\nfunction rehypeAutolinkHeadings(options) {\n  const settings = options || emptyOptions\n  let properties = settings.properties\n  const headingOroperties = settings.headingProperties\n  const behavior = settings.behavior || 'prepend'\n  const content = settings.content\n  const group = settings.group\n  const is = (0,hast_util_is_element__WEBPACK_IMPORTED_MODULE_1__.convertElement)(settings.test)\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  let method\n\n  if (behavior === 'after' || behavior === 'before') {\n    method = around\n  } else if (behavior === 'wrap') {\n    method = wrap\n  } else {\n    method = inject\n\n    if (!properties) {\n      properties = {ariaHidden: 'true', tabIndex: -1}\n    }\n  }\n\n  /**\n   * Transform.\n   *\n   * @param {Root} tree\n   *   Tree.\n   * @returns {undefined}\n   *   Nothing.\n   */\n  return function (tree) {\n    (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_2__.visit)(tree, 'element', function (node, index, parent) {\n      if ((0,hast_util_heading_rank__WEBPACK_IMPORTED_MODULE_3__.headingRank)(node) && node.properties.id && is(node, index, parent)) {\n        Object.assign(node.properties, toProperties(headingOroperties, node))\n        return method(node, index, parent)\n      }\n    })\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function inject(node) {\n    const children = toChildren(content || contentDefaults, node)\n    node.children[behavior === 'prepend' ? 'unshift' : 'push'](\n      create(node, toProperties(properties, node), children)\n    )\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP]\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function around(node, index, parent) {\n    /* c8 ignore next -- uncommon */\n    if (typeof index !== 'number' || !parent) return\n\n    const children = toChildren(content || contentDefaults, node)\n    const link = create(node, toProperties(properties, node), children)\n    let nodes = behavior === 'before' ? [link, node] : [node, link]\n\n    if (group) {\n      const grouping = toNode(group, node)\n\n      if (grouping && !Array.isArray(grouping) && grouping.type === 'element') {\n        grouping.children = nodes\n        nodes = [grouping]\n      }\n    }\n\n    parent.children.splice(index, 1, ...nodes)\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP, index + nodes.length]\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function wrap(node) {\n    /** @type {Array<ElementContent>} */\n    let before = node.children\n    /** @type {Array<ElementContent> | ElementContent} */\n    let after = []\n\n    if (typeof content === 'function') {\n      before = []\n      after = content(node)\n    } else if (content) {\n      after = clone(content)\n    }\n\n    node.children = [\n      create(\n        node,\n        toProperties(properties, node),\n        Array.isArray(after) ? [...before, ...after] : [...before, after]\n      )\n    ]\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP]\n  }\n}\n\n/**\n * Deep clone.\n *\n * @template T\n *   Kind.\n * @param {T} thing\n *   Thing to clone.\n * @returns {Cloneable<T>}\n *   Cloned thing.\n */\nfunction clone(thing) {\n  // Cast because it’s mutable now.\n  return /** @type {Cloneable<T>} */ ((0,_ungap_structured_clone__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(thing))\n}\n\n/**\n * Create an `a`.\n *\n * @param {Readonly<Element>} node\n *   Related heading.\n * @param {Properties | undefined} properties\n *   Properties to set on the link.\n * @param {Array<ElementContent>} children\n *   Content.\n * @returns {Element}\n *   Link.\n */\nfunction create(node, properties, children) {\n  return {\n    type: 'element',\n    tagName: 'a',\n    properties: {...properties, href: '#' + node.properties.id},\n    children\n  }\n}\n\n/**\n * Turn into children.\n *\n * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value\n *   Content.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Array<ElementContent>}\n *   Children.\n */\nfunction toChildren(value, node) {\n  const result = toNode(value, node)\n  return Array.isArray(result) ? result : [result]\n}\n\n/**\n * Turn into a node.\n *\n * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value\n *   Content.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Array<ElementContent> | ElementContent}\n *   Node.\n */\nfunction toNode(value, node) {\n  if (typeof value === 'function') return value(node)\n  return clone(value)\n}\n\n/**\n * Turn into properties.\n *\n * @param {Readonly<Properties> | BuildProperties | null | undefined} value\n *   Properties.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Properties}\n *   Properties.\n */\nfunction toProperties(value, node) {\n  if (typeof value === 'function') return value(node)\n  return value ? clone(value) : {}\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVoeXBlLWF1dG9saW5rLWhlYWRpbmdzL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsK0JBQStCO0FBQzVDLGFBQWEsMkJBQTJCO0FBQ3hDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQ7O0FBRUE7QUFDQSxhQUFhLG9EQUFvRDtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QjtBQUMzQztBQUNBLGNBQWMscUZBQXFGO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxRkFBcUY7QUFDbkc7QUFDQTtBQUNBLGNBQWMsMkRBQTJEO0FBQ3pFO0FBQ0EsY0FBYywyREFBMkQ7QUFDekU7QUFDQSxPQUFPLCtCQUErQjtBQUN0QztBQUNBLGNBQWMseUJBQXlCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVxRDtBQUNIO0FBQ0M7QUFDUDs7QUFFNUMsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUNBQWlDO0FBQ2hEO0FBQ0E7O0FBRUEsV0FBVyxTQUFTO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzQ0FBc0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0VBQWM7O0FBRTNCLGFBQWEsNkNBQTZDO0FBQzFEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBSztBQUNULFVBQVUsbUVBQVc7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGFBQWEsNkNBQTZDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxrREFBSTtBQUNoQjs7QUFFQSxhQUFhLDZDQUE2QztBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxZQUFZLGtEQUFJO0FBQ2hCOztBQUVBLGFBQWEsNkNBQTZDO0FBQzFEO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEM7QUFDQSxlQUFlLHdDQUF3QztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGtEQUFJO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWMsSUFBSSxtRUFBZTtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0EsV0FBVyx1QkFBdUI7QUFDbEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhDQUE4QztBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywyREFBMkQ7QUFDdEU7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tdWx0aWthcnQtbmV4dC8uL25vZGVfbW9kdWxlcy9yZWh5cGUtYXV0b2xpbmstaGVhZGluZ3MvbGliL2luZGV4LmpzPzZhNTkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuRWxlbWVudH0gRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkVsZW1lbnRDb250ZW50fSBFbGVtZW50Q29udGVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlByb3BlcnRpZXN9IFByb3BlcnRpZXNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Sb290fSBSb290XG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdC11dGlsLWlzLWVsZW1lbnQnKS5UZXN0fSBUZXN0XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7J2FmdGVyJyB8ICdhcHBlbmQnIHwgJ2JlZm9yZScgfCAncHJlcGVuZCcgfCAnd3JhcCd9IEJlaGF2aW9yXG4gKiAgIEJlaGF2aW9yLlxuICpcbiAqIEBjYWxsYmFjayBCdWlsZFxuICogICBHZW5lcmF0ZSBjb250ZW50LlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gZWxlbWVudFxuICogICBDdXJyZW50IGhlYWRpbmcuXG4gKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgRWxlbWVudENvbnRlbnR9XG4gKiAgIENvbnRlbnQuXG4gKlxuICogQGNhbGxiYWNrIEJ1aWxkUHJvcGVydGllc1xuICogICBHZW5lcmF0ZSBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gZWxlbWVudFxuICogICBDdXJyZW50IGhlYWRpbmcuXG4gKiBAcmV0dXJucyB7UHJvcGVydGllc31cbiAqICAgUHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcHJvcGVydHkge0JlaGF2aW9yIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2JlaGF2aW9yPSdwcmVwZW5kJ11cbiAqICAgSG93IHRvIGNyZWF0ZSBsaW5rcyAoZGVmYXVsdDogYCdwcmVwZW5kJ2ApLlxuICogQHByb3BlcnR5IHtSZWFkb25seTxFbGVtZW50Q29udGVudD4gfCBSZWFkb25seUFycmF5PEVsZW1lbnRDb250ZW50PiB8IEJ1aWxkIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2NvbnRlbnRdXG4gKiAgIENvbnRlbnQgdG8gaW5zZXJ0IGluIHRoZSBsaW5rIChkZWZhdWx0OiBpZiBgJ3dyYXAnYCB0aGVuIGB1bmRlZmluZWRgLFxuICogICBvdGhlcndpc2UgYDxzcGFuIGNsYXNzPVwiaWNvbiBpY29uLWxpbmtcIj48L3NwYW4+YCk7XG4gKiAgIGlmIGBiZWhhdmlvcmAgaXMgYCd3cmFwJ2AgYW5kIGBCdWlsZGAgaXMgcGFzc2VkLCBpdHMgcmVzdWx0IHJlcGxhY2VzIHRoZVxuICogICBleGlzdGluZyBjb250ZW50LCBvdGhlcndpc2UgdGhlIGNvbnRlbnQgaXMgYWRkZWQgYWZ0ZXIgZXhpc3RpbmcgY29udGVudC5cbiAqIEBwcm9wZXJ0eSB7UmVhZG9ubHk8RWxlbWVudENvbnRlbnQ+IHwgUmVhZG9ubHlBcnJheTxFbGVtZW50Q29udGVudD4gfCBCdWlsZCB8IG51bGwgfCB1bmRlZmluZWR9IFtncm91cF1cbiAqICAgQ29udGVudCB0byB3cmFwIHRoZSBoZWFkaW5nIGFuZCBsaW5rIHdpdGgsIGlmIGBiZWhhdmlvcmAgaXMgYCdhZnRlcidgIG9yXG4gKiAgIGAnYmVmb3JlJ2AgKG9wdGlvbmFsKS5cbiAqIEBwcm9wZXJ0eSB7UmVhZG9ubHk8UHJvcGVydGllcz4gfCBCdWlsZFByb3BlcnRpZXMgfCBudWxsIHwgdW5kZWZpbmVkfSBbaGVhZGluZ1Byb3BlcnRpZXNdXG4gKiAgIEV4dHJhIHByb3BlcnRpZXMgdG8gc2V0IG9uIHRoZSBoZWFkaW5nIChvcHRpb25hbCkuXG4gKiBAcHJvcGVydHkge1JlYWRvbmx5PFByb3BlcnRpZXM+IHwgQnVpbGRQcm9wZXJ0aWVzIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3Byb3BlcnRpZXNdXG4gKiAgIEV4dHJhIHByb3BlcnRpZXMgdG8gc2V0IG9uIHRoZSBsaW5rIHdoZW4gaW5qZWN0aW5nIChkZWZhdWx0OlxuICogICBge2FyaWFIaWRkZW46IHRydWUsIHRhYkluZGV4OiAtMX1gIGlmIGAnYXBwZW5kJ2Agb3IgYCdwcmVwZW5kJ2AsIG90aGVyd2lzZVxuICogICBgdW5kZWZpbmVkYCkuXG4gKiBAcHJvcGVydHkge1Rlc3QgfCBudWxsIHwgdW5kZWZpbmVkfSBbdGVzdF1cbiAqICAgRXh0cmEgdGVzdCBmb3Igd2hpY2ggaGVhZGluZ3MgYXJlIGxpbmtlZCAob3B0aW9uYWwpLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqICAgS2luZC5cbiAqIEB0eXBlZGVmIHsoXG4gKiAgIFQgZXh0ZW5kcyBSZWNvcmQ8YW55LCBhbnk+XG4gKiAgICAgPyB7LXJlYWRvbmx5IFtrIGluIGtleW9mIFRdOiBDbG9uZWFibGU8VFtrXT59XG4gKiAgICAgOiBUXG4gKiApfSBDbG9uZWFibGVcbiAqICAgRGVlcCBjbG9uZS5cbiAqXG4gKiAgIFNlZTogPGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC1ET00tbGliLWdlbmVyYXRvci9pc3N1ZXMvMTIzNyNpc3N1ZWNvbW1lbnQtMTM0NTUxNTQ0OD5cbiAqL1xuXG5pbXBvcnQgc3RydWN0dXJlZENsb25lIGZyb20gJ0B1bmdhcC9zdHJ1Y3R1cmVkLWNsb25lJ1xuaW1wb3J0IHtoZWFkaW5nUmFua30gZnJvbSAnaGFzdC11dGlsLWhlYWRpbmctcmFuaydcbmltcG9ydCB7Y29udmVydEVsZW1lbnR9IGZyb20gJ2hhc3QtdXRpbC1pcy1lbGVtZW50J1xuaW1wb3J0IHtTS0lQLCB2aXNpdH0gZnJvbSAndW5pc3QtdXRpbC12aXNpdCdcblxuLyoqIEB0eXBlIHtFbGVtZW50fSAqL1xuY29uc3QgY29udGVudERlZmF1bHRzID0ge1xuICB0eXBlOiAnZWxlbWVudCcsXG4gIHRhZ05hbWU6ICdzcGFuJyxcbiAgcHJvcGVydGllczoge2NsYXNzTmFtZTogWydpY29uJywgJ2ljb24tbGluayddfSxcbiAgY2hpbGRyZW46IFtdXG59XG5cbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cbmNvbnN0IGVtcHR5T3B0aW9ucyA9IHt9XG5cbi8qKlxuICogQWRkIGxpbmtzIGZyb20gaGVhZGluZ3MgYmFjayB0byB0aGVtc2VsdmVzLlxuICpcbiAqICMjIyMjIyBOb3Rlc1xuICpcbiAqIFRoaXMgcGx1Z2luIG9ubHkgYXBwbGllcyB0byBoZWFkaW5ncyB3aXRoIGBpZGBzLlxuICogVXNlIGByZWh5cGUtc2x1Z2AgdG8gZ2VuZXJhdGUgYGlkYHMgZm9yIGhlYWRpbmdzIHRoYXQgZG9u4oCZdCBoYXZlIHRoZW0uXG4gKlxuICogU2V2ZXJhbCBiZWhhdmlvcnMgYXJlIHN1cHBvcnRlZDpcbiAqXG4gKiAqICAgYCdwcmVwZW5kJ2AgKGRlZmF1bHQpIOKAlCBpbmplY3QgbGluayBiZWZvcmUgdGhlIGhlYWRpbmcgdGV4dFxuICogKiAgIGAnYXBwZW5kJ2Ag4oCUIGluamVjdCBsaW5rIGFmdGVyIHRoZSBoZWFkaW5nIHRleHRcbiAqICogICBgJ3dyYXAnYCDigJQgd3JhcCB0aGUgd2hvbGUgaGVhZGluZyB0ZXh0IHdpdGggdGhlIGxpbmtcbiAqICogICBgJ2JlZm9yZSdgIOKAlCBpbnNlcnQgbGluayBiZWZvcmUgdGhlIGhlYWRpbmdcbiAqICogICBgJ2FmdGVyJ2Ag4oCUIGluc2VydCBsaW5rIGFmdGVyIHRoZSBoZWFkaW5nXG4gKlxuICogQHBhcmFtIHtSZWFkb25seTxPcHRpb25zPiB8IG51bGwgfCB1bmRlZmluZWR9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uIChvcHRpb25hbCkuXG4gKiBAcmV0dXJuc1xuICogICBUcmFuc2Zvcm0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlaHlwZUF1dG9saW5rSGVhZGluZ3Mob3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9IG9wdGlvbnMgfHwgZW1wdHlPcHRpb25zXG4gIGxldCBwcm9wZXJ0aWVzID0gc2V0dGluZ3MucHJvcGVydGllc1xuICBjb25zdCBoZWFkaW5nT3JvcGVydGllcyA9IHNldHRpbmdzLmhlYWRpbmdQcm9wZXJ0aWVzXG4gIGNvbnN0IGJlaGF2aW9yID0gc2V0dGluZ3MuYmVoYXZpb3IgfHwgJ3ByZXBlbmQnXG4gIGNvbnN0IGNvbnRlbnQgPSBzZXR0aW5ncy5jb250ZW50XG4gIGNvbnN0IGdyb3VwID0gc2V0dGluZ3MuZ3JvdXBcbiAgY29uc3QgaXMgPSBjb252ZXJ0RWxlbWVudChzZXR0aW5ncy50ZXN0KVxuXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlzdC11dGlsLXZpc2l0JykuVmlzaXRvcjxFbGVtZW50Pn0gKi9cbiAgbGV0IG1ldGhvZFxuXG4gIGlmIChiZWhhdmlvciA9PT0gJ2FmdGVyJyB8fCBiZWhhdmlvciA9PT0gJ2JlZm9yZScpIHtcbiAgICBtZXRob2QgPSBhcm91bmRcbiAgfSBlbHNlIGlmIChiZWhhdmlvciA9PT0gJ3dyYXAnKSB7XG4gICAgbWV0aG9kID0gd3JhcFxuICB9IGVsc2Uge1xuICAgIG1ldGhvZCA9IGluamVjdFxuXG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XG4gICAgICBwcm9wZXJ0aWVzID0ge2FyaWFIaWRkZW46ICd0cnVlJywgdGFiSW5kZXg6IC0xfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB7Um9vdH0gdHJlZVxuICAgKiAgIFRyZWUuXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqICAgTm90aGluZy5cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiAodHJlZSkge1xuICAgIHZpc2l0KHRyZWUsICdlbGVtZW50JywgZnVuY3Rpb24gKG5vZGUsIGluZGV4LCBwYXJlbnQpIHtcbiAgICAgIGlmIChoZWFkaW5nUmFuayhub2RlKSAmJiBub2RlLnByb3BlcnRpZXMuaWQgJiYgaXMobm9kZSwgaW5kZXgsIHBhcmVudCkpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihub2RlLnByb3BlcnRpZXMsIHRvUHJvcGVydGllcyhoZWFkaW5nT3JvcGVydGllcywgbm9kZSkpXG4gICAgICAgIHJldHVybiBtZXRob2Qobm9kZSwgaW5kZXgsIHBhcmVudClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ3VuaXN0LXV0aWwtdmlzaXQnKS5WaXNpdG9yPEVsZW1lbnQ+fSAqL1xuICBmdW5jdGlvbiBpbmplY3Qobm9kZSkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdG9DaGlsZHJlbihjb250ZW50IHx8IGNvbnRlbnREZWZhdWx0cywgbm9kZSlcbiAgICBub2RlLmNoaWxkcmVuW2JlaGF2aW9yID09PSAncHJlcGVuZCcgPyAndW5zaGlmdCcgOiAncHVzaCddKFxuICAgICAgY3JlYXRlKG5vZGUsIHRvUHJvcGVydGllcyhwcm9wZXJ0aWVzLCBub2RlKSwgY2hpbGRyZW4pXG4gICAgKVxuXG4gICAgcmV0dXJuIFtTS0lQXVxuICB9XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ3VuaXN0LXV0aWwtdmlzaXQnKS5WaXNpdG9yPEVsZW1lbnQ+fSAqL1xuICBmdW5jdGlvbiBhcm91bmQobm9kZSwgaW5kZXgsIHBhcmVudCkge1xuICAgIC8qIGM4IGlnbm9yZSBuZXh0IC0tIHVuY29tbW9uICovXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicgfHwgIXBhcmVudCkgcmV0dXJuXG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRvQ2hpbGRyZW4oY29udGVudCB8fCBjb250ZW50RGVmYXVsdHMsIG5vZGUpXG4gICAgY29uc3QgbGluayA9IGNyZWF0ZShub2RlLCB0b1Byb3BlcnRpZXMocHJvcGVydGllcywgbm9kZSksIGNoaWxkcmVuKVxuICAgIGxldCBub2RlcyA9IGJlaGF2aW9yID09PSAnYmVmb3JlJyA/IFtsaW5rLCBub2RlXSA6IFtub2RlLCBsaW5rXVxuXG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBjb25zdCBncm91cGluZyA9IHRvTm9kZShncm91cCwgbm9kZSlcblxuICAgICAgaWYgKGdyb3VwaW5nICYmICFBcnJheS5pc0FycmF5KGdyb3VwaW5nKSAmJiBncm91cGluZy50eXBlID09PSAnZWxlbWVudCcpIHtcbiAgICAgICAgZ3JvdXBpbmcuY2hpbGRyZW4gPSBub2Rlc1xuICAgICAgICBub2RlcyA9IFtncm91cGluZ11cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxLCAuLi5ub2RlcylcblxuICAgIHJldHVybiBbU0tJUCwgaW5kZXggKyBub2Rlcy5sZW5ndGhdXG4gIH1cblxuICAvKiogQHR5cGUge2ltcG9ydCgndW5pc3QtdXRpbC12aXNpdCcpLlZpc2l0b3I8RWxlbWVudD59ICovXG4gIGZ1bmN0aW9uIHdyYXAobm9kZSkge1xuICAgIC8qKiBAdHlwZSB7QXJyYXk8RWxlbWVudENvbnRlbnQ+fSAqL1xuICAgIGxldCBiZWZvcmUgPSBub2RlLmNoaWxkcmVuXG4gICAgLyoqIEB0eXBlIHtBcnJheTxFbGVtZW50Q29udGVudD4gfCBFbGVtZW50Q29udGVudH0gKi9cbiAgICBsZXQgYWZ0ZXIgPSBbXVxuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBiZWZvcmUgPSBbXVxuICAgICAgYWZ0ZXIgPSBjb250ZW50KG5vZGUpXG4gICAgfSBlbHNlIGlmIChjb250ZW50KSB7XG4gICAgICBhZnRlciA9IGNsb25lKGNvbnRlbnQpXG4gICAgfVxuXG4gICAgbm9kZS5jaGlsZHJlbiA9IFtcbiAgICAgIGNyZWF0ZShcbiAgICAgICAgbm9kZSxcbiAgICAgICAgdG9Qcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG5vZGUpLFxuICAgICAgICBBcnJheS5pc0FycmF5KGFmdGVyKSA/IFsuLi5iZWZvcmUsIC4uLmFmdGVyXSA6IFsuLi5iZWZvcmUsIGFmdGVyXVxuICAgICAgKVxuICAgIF1cblxuICAgIHJldHVybiBbU0tJUF1cbiAgfVxufVxuXG4vKipcbiAqIERlZXAgY2xvbmUuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqICAgS2luZC5cbiAqIEBwYXJhbSB7VH0gdGhpbmdcbiAqICAgVGhpbmcgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7Q2xvbmVhYmxlPFQ+fVxuICogICBDbG9uZWQgdGhpbmcuXG4gKi9cbmZ1bmN0aW9uIGNsb25lKHRoaW5nKSB7XG4gIC8vIENhc3QgYmVjYXVzZSBpdOKAmXMgbXV0YWJsZSBub3cuXG4gIHJldHVybiAvKiogQHR5cGUge0Nsb25lYWJsZTxUPn0gKi8gKHN0cnVjdHVyZWRDbG9uZSh0aGluZykpXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGBhYC5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnQ+fSBub2RlXG4gKiAgIFJlbGF0ZWQgaGVhZGluZy5cbiAqIEBwYXJhbSB7UHJvcGVydGllcyB8IHVuZGVmaW5lZH0gcHJvcGVydGllc1xuICogICBQcm9wZXJ0aWVzIHRvIHNldCBvbiB0aGUgbGluay5cbiAqIEBwYXJhbSB7QXJyYXk8RWxlbWVudENvbnRlbnQ+fSBjaGlsZHJlblxuICogICBDb250ZW50LlxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKiAgIExpbmsuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZShub2RlLCBwcm9wZXJ0aWVzLCBjaGlsZHJlbikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdlbGVtZW50JyxcbiAgICB0YWdOYW1lOiAnYScsXG4gICAgcHJvcGVydGllczogey4uLnByb3BlcnRpZXMsIGhyZWY6ICcjJyArIG5vZGUucHJvcGVydGllcy5pZH0sXG4gICAgY2hpbGRyZW5cbiAgfVxufVxuXG4vKipcbiAqIFR1cm4gaW50byBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnRDb250ZW50PiB8IFJlYWRvbmx5QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgQnVpbGR9IHZhbHVlXG4gKiAgIENvbnRlbnQuXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnQ+fSBub2RlXG4gKiAgIFJlbGF0ZWQgaGVhZGluZy5cbiAqIEByZXR1cm5zIHtBcnJheTxFbGVtZW50Q29udGVudD59XG4gKiAgIENoaWxkcmVuLlxuICovXG5mdW5jdGlvbiB0b0NoaWxkcmVuKHZhbHVlLCBub2RlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHRvTm9kZSh2YWx1ZSwgbm9kZSlcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmVzdWx0KSA/IHJlc3VsdCA6IFtyZXN1bHRdXG59XG5cbi8qKlxuICogVHVybiBpbnRvIGEgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnRDb250ZW50PiB8IFJlYWRvbmx5QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgQnVpbGR9IHZhbHVlXG4gKiAgIENvbnRlbnQuXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnQ+fSBub2RlXG4gKiAgIFJlbGF0ZWQgaGVhZGluZy5cbiAqIEByZXR1cm5zIHtBcnJheTxFbGVtZW50Q29udGVudD4gfCBFbGVtZW50Q29udGVudH1cbiAqICAgTm9kZS5cbiAqL1xuZnVuY3Rpb24gdG9Ob2RlKHZhbHVlLCBub2RlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZShub2RlKVxuICByZXR1cm4gY2xvbmUodmFsdWUpXG59XG5cbi8qKlxuICogVHVybiBpbnRvIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtSZWFkb25seTxQcm9wZXJ0aWVzPiB8IEJ1aWxkUHJvcGVydGllcyB8IG51bGwgfCB1bmRlZmluZWR9IHZhbHVlXG4gKiAgIFByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge1JlYWRvbmx5PEVsZW1lbnQ+fSBub2RlXG4gKiAgIFJlbGF0ZWQgaGVhZGluZy5cbiAqIEByZXR1cm5zIHtQcm9wZXJ0aWVzfVxuICogICBQcm9wZXJ0aWVzLlxuICovXG5mdW5jdGlvbiB0b1Byb3BlcnRpZXModmFsdWUsIG5vZGUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlKG5vZGUpXG4gIHJldHVybiB2YWx1ZSA/IGNsb25lKHZhbHVlKSA6IHt9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rehype-autolink-headings/lib/index.js\n");

/***/ })

};
;