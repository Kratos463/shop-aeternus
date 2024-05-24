"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hastscript";
exports.ids = ["vendor-chunks/hastscript"];
exports.modules = {

/***/ "(ssr)/./node_modules/hastscript/lib/create-h.js":
/*!*************************************************!*\
  !*** ./node_modules/hastscript/lib/create-h.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createH: () => (/* binding */ createH)\n/* harmony export */ });\n/* harmony import */ var comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! comma-separated-tokens */ \"(ssr)/./node_modules/comma-separated-tokens/index.js\");\n/* harmony import */ var hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-parse-selector */ \"(ssr)/./node_modules/hast-util-parse-selector/lib/index.js\");\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/find.js\");\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/lib/normalize.js\");\n/* harmony import */ var space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! space-separated-tokens */ \"(ssr)/./node_modules/space-separated-tokens/index.js\");\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').Nodes} Nodes\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').RootContent} RootContent\n *\n * @typedef {import('property-information').Info} Info\n * @typedef {import('property-information').Schema} Schema\n */\n\n/**\n * @typedef {Element | Root} Result\n *   Result from a `h` (or `s`) call.\n *\n * @typedef {number | string} StyleValue\n *   Value for a CSS style field.\n * @typedef {Record<string, StyleValue>} Style\n *   Supported value of a `style` prop.\n * @typedef {boolean | number | string | null | undefined} PrimitiveValue\n *   Primitive property value.\n * @typedef {Array<number | string>} ArrayValue\n *   List of property values for space- or comma separated values (such as `className`).\n * @typedef {ArrayValue | PrimitiveValue} PropertyValue\n *   Primitive value or list value.\n * @typedef {{[property: string]: PropertyValue | Style}} Properties\n *   Acceptable value for element properties.\n *\n * @typedef {number | string | null | undefined} PrimitiveChild\n *   Primitive children, either ignored (nullish), or turned into text nodes.\n * @typedef {Array<ArrayChildNested | Nodes | PrimitiveChild>} ArrayChild\n *   List of children.\n * @typedef {Array<Nodes | PrimitiveChild>} ArrayChildNested\n *   List of children (deep).\n * @typedef {ArrayChild | Nodes | PrimitiveChild} Child\n *   Acceptable child value.\n */\n\n\n\n\n\n\nconst buttonTypes = new Set(['button', 'menu', 'reset', 'submit'])\n\nconst own = {}.hasOwnProperty\n\n/**\n * @param {Schema} schema\n *   Schema to use.\n * @param {string} defaultTagName\n *   Default tag name.\n * @param {Array<string> | undefined} [caseSensitive]\n *   Case-sensitive tag names (default: `undefined`).\n * @returns\n *   `h`.\n */\nfunction createH(schema, defaultTagName, caseSensitive) {\n  const adjust = caseSensitive && createAdjustMap(caseSensitive)\n\n  /**\n   * Hyperscript compatible DSL for creating virtual hast trees.\n   *\n   * @overload\n   * @param {null | undefined} [selector]\n   * @param {...Child} children\n   * @returns {Root}\n   *\n   * @overload\n   * @param {string} selector\n   * @param {Properties} properties\n   * @param {...Child} children\n   * @returns {Element}\n   *\n   * @overload\n   * @param {string} selector\n   * @param {...Child} children\n   * @returns {Element}\n   *\n   * @param {string | null | undefined} [selector]\n   *   Selector.\n   * @param {Child | Properties | null | undefined} [properties]\n   *   Properties (or first child) (default: `undefined`).\n   * @param {...Child} children\n   *   Children.\n   * @returns {Result}\n   *   Result.\n   */\n  function h(selector, properties, ...children) {\n    let index = -1\n    /** @type {Result} */\n    let node\n\n    if (selector === undefined || selector === null) {\n      node = {type: 'root', children: []}\n      // Properties are not supported for roots.\n      const child = /** @type {Child} */ (properties)\n      children.unshift(child)\n    } else {\n      node = (0,hast_util_parse_selector__WEBPACK_IMPORTED_MODULE_0__.parseSelector)(selector, defaultTagName)\n      // Normalize the name.\n      node.tagName = node.tagName.toLowerCase()\n      if (adjust && own.call(adjust, node.tagName)) {\n        node.tagName = adjust[node.tagName]\n      }\n\n      // Handle props.\n      if (isProperties(properties, node.tagName)) {\n        /** @type {string} */\n        let key\n\n        for (key in properties) {\n          if (own.call(properties, key)) {\n            addProperty(schema, node.properties, key, properties[key])\n          }\n        }\n      } else {\n        children.unshift(properties)\n      }\n    }\n\n    // Handle children.\n    while (++index < children.length) {\n      addChild(node.children, children[index])\n    }\n\n    if (node.type === 'element' && node.tagName === 'template') {\n      node.content = {type: 'root', children: node.children}\n      node.children = []\n    }\n\n    return node\n  }\n\n  return h\n}\n\n/**\n * Check if something is properties or a child.\n *\n * @param {Child | Properties} value\n *   Value to check.\n * @param {string} name\n *   Tag name.\n * @returns {value is Properties}\n *   Whether `value` is a properties object.\n */\nfunction isProperties(value, name) {\n  if (\n    value === null ||\n    value === undefined ||\n    typeof value !== 'object' ||\n    Array.isArray(value)\n  ) {\n    return false\n  }\n\n  if (name === 'input' || !value.type || typeof value.type !== 'string') {\n    return true\n  }\n\n  if ('children' in value && Array.isArray(value.children)) {\n    return false\n  }\n\n  if (name === 'button') {\n    return buttonTypes.has(value.type.toLowerCase())\n  }\n\n  return !('value' in value)\n}\n\n/**\n * @param {Schema} schema\n *   Schema.\n * @param {Properties} properties\n *   Properties object.\n * @param {string} key\n *   Property name.\n * @param {PropertyValue | Style} value\n *   Property value.\n * @returns {undefined}\n *   Nothing.\n */\nfunction addProperty(schema, properties, key, value) {\n  const info = (0,property_information__WEBPACK_IMPORTED_MODULE_1__.find)(schema, key)\n  let index = -1\n  /** @type {PropertyValue} */\n  let result\n\n  // Ignore nullish and NaN values.\n  if (value === undefined || value === null) return\n\n  if (typeof value === 'number') {\n    // Ignore NaN.\n    if (Number.isNaN(value)) return\n\n    result = value\n  }\n  // Booleans.\n  else if (typeof value === 'boolean') {\n    result = value\n  }\n  // Handle list values.\n  else if (typeof value === 'string') {\n    if (info.spaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)(value)\n    } else if (info.commaSeparated) {\n      result = (0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value)\n    } else if (info.commaOrSpaceSeparated) {\n      result = (0,space_separated_tokens__WEBPACK_IMPORTED_MODULE_2__.parse)((0,comma_separated_tokens__WEBPACK_IMPORTED_MODULE_3__.parse)(value).join(' '))\n    } else {\n      result = parsePrimitive(info, info.property, value)\n    }\n  } else if (Array.isArray(value)) {\n    result = value.concat()\n  } else {\n    result = info.property === 'style' ? style(value) : String(value)\n  }\n\n  if (Array.isArray(result)) {\n    /** @type {Array<number | string>} */\n    const finalResult = []\n\n    while (++index < result.length) {\n      // Assume no booleans in array.\n      const value = /** @type {number | string} */ (\n        parsePrimitive(info, info.property, result[index])\n      )\n      finalResult[index] = value\n    }\n\n    result = finalResult\n  }\n\n  // Class names (which can be added both on the `selector` and here).\n  if (info.property === 'className' && Array.isArray(properties.className)) {\n    // Assume no booleans in `className`.\n    const value = /** @type {number | string} */ (result)\n    result = properties.className.concat(value)\n  }\n\n  properties[info.property] = result\n}\n\n/**\n * @param {Array<RootContent>} nodes\n *   Children.\n * @param {Child} value\n *   Child.\n * @returns {undefined}\n *   Nothing.\n */\nfunction addChild(nodes, value) {\n  let index = -1\n\n  if (value === undefined || value === null) {\n    // Empty.\n  } else if (typeof value === 'string' || typeof value === 'number') {\n    nodes.push({type: 'text', value: String(value)})\n  } else if (Array.isArray(value)) {\n    while (++index < value.length) {\n      addChild(nodes, value[index])\n    }\n  } else if (typeof value === 'object' && 'type' in value) {\n    if (value.type === 'root') {\n      addChild(nodes, value.children)\n    } else {\n      nodes.push(value)\n    }\n  } else {\n    throw new Error('Expected node, nodes, or string, got `' + value + '`')\n  }\n}\n\n/**\n * Parse a single primitives.\n *\n * @param {Info} info\n *   Property information.\n * @param {string} name\n *   Property name.\n * @param {PrimitiveValue} value\n *   Property value.\n * @returns {PrimitiveValue}\n *   Property value.\n */\nfunction parsePrimitive(info, name, value) {\n  if (typeof value === 'string') {\n    if (info.number && value && !Number.isNaN(Number(value))) {\n      return Number(value)\n    }\n\n    if (\n      (info.boolean || info.overloadedBoolean) &&\n      (value === '' || (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(value) === (0,property_information__WEBPACK_IMPORTED_MODULE_4__.normalize)(name))\n    ) {\n      return true\n    }\n  }\n\n  return value\n}\n\n/**\n * Serialize a `style` object as a string.\n *\n * @param {Style} value\n *   Style object.\n * @returns {string}\n *   CSS string.\n */\nfunction style(value) {\n  /** @type {Array<string>} */\n  const result = []\n  /** @type {string} */\n  let key\n\n  for (key in value) {\n    if (own.call(value, key)) {\n      result.push([key, value[key]].join(': '))\n    }\n  }\n\n  return result.join('; ')\n}\n\n/**\n * Create a map to adjust casing.\n *\n * @param {Array<string>} values\n *   List of properly cased keys.\n * @returns {Record<string, string>}\n *   Map of lowercase keys to uppercase keys.\n */\nfunction createAdjustMap(values) {\n  /** @type {Record<string, string>} */\n  const result = {}\n  let index = -1\n\n  while (++index < values.length) {\n    result[values[index].toLowerCase()] = values[index]\n  }\n\n  return result\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvY3JlYXRlLWguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHFCQUFxQjtBQUNsQyxhQUFhLDRCQUE0QjtBQUN6QztBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsdUNBQXVDO0FBQ3BEOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQSxhQUFhLDhDQUE4QztBQUMzRDtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0EsYUFBYSw2QkFBNkI7QUFDMUM7QUFDQSxjQUFjLDRDQUE0QztBQUMxRDtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQ7QUFDQSxhQUFhLGtEQUFrRDtBQUMvRDtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQ7QUFDQTs7QUFFc0Q7QUFDQTtBQUNGO0FBQ0U7O0FBRXREOztBQUVBLGNBQWM7O0FBRWQ7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLDJCQUEyQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQixhQUFhLFVBQVU7QUFDdkIsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxZQUFZO0FBQ3pCLGFBQWEsVUFBVTtBQUN2QixlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFVBQVU7QUFDdkIsZUFBZTtBQUNmO0FBQ0EsYUFBYSwyQkFBMkI7QUFDeEM7QUFDQSxhQUFhLHVDQUF1QztBQUNwRDtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0EsTUFBTTtBQUNOLGFBQWEsdUVBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyx1QkFBdUI7QUFDbEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZUFBZSwwREFBSTtBQUNuQjtBQUNBLGFBQWEsZUFBZTtBQUM1Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDZEQUFNO0FBQ3JCLE1BQU07QUFDTixlQUFlLDZEQUFNO0FBQ3JCLE1BQU07QUFDTixlQUFlLDZEQUFNLENBQUMsNkRBQU07QUFDNUIsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGdCQUFnQixtQ0FBbUM7QUFDbkQsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsK0RBQVMsWUFBWSwrREFBUztBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQSxhQUFhLFFBQVE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tdWx0aWthcnQtbmV4dC8uL25vZGVfbW9kdWxlcy9oYXN0c2NyaXB0L2xpYi9jcmVhdGUtaC5qcz82Yzg1Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkVsZW1lbnR9IEVsZW1lbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Ob2Rlc30gTm9kZXNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Sb290fSBSb290XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdENvbnRlbnR9IFJvb3RDb250ZW50XG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgncHJvcGVydHktaW5mb3JtYXRpb24nKS5JbmZvfSBJbmZvXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdwcm9wZXJ0eS1pbmZvcm1hdGlvbicpLlNjaGVtYX0gU2NoZW1hXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7RWxlbWVudCB8IFJvb3R9IFJlc3VsdFxuICogICBSZXN1bHQgZnJvbSBhIGBoYCAob3IgYHNgKSBjYWxsLlxuICpcbiAqIEB0eXBlZGVmIHtudW1iZXIgfCBzdHJpbmd9IFN0eWxlVmFsdWVcbiAqICAgVmFsdWUgZm9yIGEgQ1NTIHN0eWxlIGZpZWxkLlxuICogQHR5cGVkZWYge1JlY29yZDxzdHJpbmcsIFN0eWxlVmFsdWU+fSBTdHlsZVxuICogICBTdXBwb3J0ZWQgdmFsdWUgb2YgYSBgc3R5bGVgIHByb3AuXG4gKiBAdHlwZWRlZiB7Ym9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9IFByaW1pdGl2ZVZhbHVlXG4gKiAgIFByaW1pdGl2ZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEB0eXBlZGVmIHtBcnJheTxudW1iZXIgfCBzdHJpbmc+fSBBcnJheVZhbHVlXG4gKiAgIExpc3Qgb2YgcHJvcGVydHkgdmFsdWVzIGZvciBzcGFjZS0gb3IgY29tbWEgc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyBgY2xhc3NOYW1lYCkuXG4gKiBAdHlwZWRlZiB7QXJyYXlWYWx1ZSB8IFByaW1pdGl2ZVZhbHVlfSBQcm9wZXJ0eVZhbHVlXG4gKiAgIFByaW1pdGl2ZSB2YWx1ZSBvciBsaXN0IHZhbHVlLlxuICogQHR5cGVkZWYge3tbcHJvcGVydHk6IHN0cmluZ106IFByb3BlcnR5VmFsdWUgfCBTdHlsZX19IFByb3BlcnRpZXNcbiAqICAgQWNjZXB0YWJsZSB2YWx1ZSBmb3IgZWxlbWVudCBwcm9wZXJ0aWVzLlxuICpcbiAqIEB0eXBlZGVmIHtudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkfSBQcmltaXRpdmVDaGlsZFxuICogICBQcmltaXRpdmUgY2hpbGRyZW4sIGVpdGhlciBpZ25vcmVkIChudWxsaXNoKSwgb3IgdHVybmVkIGludG8gdGV4dCBub2Rlcy5cbiAqIEB0eXBlZGVmIHtBcnJheTxBcnJheUNoaWxkTmVzdGVkIHwgTm9kZXMgfCBQcmltaXRpdmVDaGlsZD59IEFycmF5Q2hpbGRcbiAqICAgTGlzdCBvZiBjaGlsZHJlbi5cbiAqIEB0eXBlZGVmIHtBcnJheTxOb2RlcyB8IFByaW1pdGl2ZUNoaWxkPn0gQXJyYXlDaGlsZE5lc3RlZFxuICogICBMaXN0IG9mIGNoaWxkcmVuIChkZWVwKS5cbiAqIEB0eXBlZGVmIHtBcnJheUNoaWxkIHwgTm9kZXMgfCBQcmltaXRpdmVDaGlsZH0gQ2hpbGRcbiAqICAgQWNjZXB0YWJsZSBjaGlsZCB2YWx1ZS5cbiAqL1xuXG5pbXBvcnQge3BhcnNlIGFzIGNvbW1hc30gZnJvbSAnY29tbWEtc2VwYXJhdGVkLXRva2VucydcbmltcG9ydCB7cGFyc2VTZWxlY3Rvcn0gZnJvbSAnaGFzdC11dGlsLXBhcnNlLXNlbGVjdG9yJ1xuaW1wb3J0IHtmaW5kLCBub3JtYWxpemV9IGZyb20gJ3Byb3BlcnR5LWluZm9ybWF0aW9uJ1xuaW1wb3J0IHtwYXJzZSBhcyBzcGFjZXN9IGZyb20gJ3NwYWNlLXNlcGFyYXRlZC10b2tlbnMnXG5cbmNvbnN0IGJ1dHRvblR5cGVzID0gbmV3IFNldChbJ2J1dHRvbicsICdtZW51JywgJ3Jlc2V0JywgJ3N1Ym1pdCddKVxuXG5jb25zdCBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG4vKipcbiAqIEBwYXJhbSB7U2NoZW1hfSBzY2hlbWFcbiAqICAgU2NoZW1hIHRvIHVzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0VGFnTmFtZVxuICogICBEZWZhdWx0IHRhZyBuYW1lLlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+IHwgdW5kZWZpbmVkfSBbY2FzZVNlbnNpdGl2ZV1cbiAqICAgQ2FzZS1zZW5zaXRpdmUgdGFnIG5hbWVzIChkZWZhdWx0OiBgdW5kZWZpbmVkYCkuXG4gKiBAcmV0dXJuc1xuICogICBgaGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIKHNjaGVtYSwgZGVmYXVsdFRhZ05hbWUsIGNhc2VTZW5zaXRpdmUpIHtcbiAgY29uc3QgYWRqdXN0ID0gY2FzZVNlbnNpdGl2ZSAmJiBjcmVhdGVBZGp1c3RNYXAoY2FzZVNlbnNpdGl2ZSlcblxuICAvKipcbiAgICogSHlwZXJzY3JpcHQgY29tcGF0aWJsZSBEU0wgZm9yIGNyZWF0aW5nIHZpcnR1YWwgaGFzdCB0cmVlcy5cbiAgICpcbiAgICogQG92ZXJsb2FkXG4gICAqIEBwYXJhbSB7bnVsbCB8IHVuZGVmaW5lZH0gW3NlbGVjdG9yXVxuICAgKiBAcGFyYW0gey4uLkNoaWxkfSBjaGlsZHJlblxuICAgKiBAcmV0dXJucyB7Um9vdH1cbiAgICpcbiAgICogQG92ZXJsb2FkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHsuLi5DaGlsZH0gY2hpbGRyZW5cbiAgICogQHJldHVybnMge0VsZW1lbnR9XG4gICAqXG4gICAqIEBvdmVybG9hZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtIHsuLi5DaGlsZH0gY2hpbGRyZW5cbiAgICogQHJldHVybnMge0VsZW1lbnR9XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gW3NlbGVjdG9yXVxuICAgKiAgIFNlbGVjdG9yLlxuICAgKiBAcGFyYW0ge0NoaWxkIHwgUHJvcGVydGllcyB8IG51bGwgfCB1bmRlZmluZWR9IFtwcm9wZXJ0aWVzXVxuICAgKiAgIFByb3BlcnRpZXMgKG9yIGZpcnN0IGNoaWxkKSAoZGVmYXVsdDogYHVuZGVmaW5lZGApLlxuICAgKiBAcGFyYW0gey4uLkNoaWxkfSBjaGlsZHJlblxuICAgKiAgIENoaWxkcmVuLlxuICAgKiBAcmV0dXJucyB7UmVzdWx0fVxuICAgKiAgIFJlc3VsdC5cbiAgICovXG4gIGZ1bmN0aW9uIGgoc2VsZWN0b3IsIHByb3BlcnRpZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgbGV0IGluZGV4ID0gLTFcbiAgICAvKiogQHR5cGUge1Jlc3VsdH0gKi9cbiAgICBsZXQgbm9kZVxuXG4gICAgaWYgKHNlbGVjdG9yID09PSB1bmRlZmluZWQgfHwgc2VsZWN0b3IgPT09IG51bGwpIHtcbiAgICAgIG5vZGUgPSB7dHlwZTogJ3Jvb3QnLCBjaGlsZHJlbjogW119XG4gICAgICAvLyBQcm9wZXJ0aWVzIGFyZSBub3Qgc3VwcG9ydGVkIGZvciByb290cy5cbiAgICAgIGNvbnN0IGNoaWxkID0gLyoqIEB0eXBlIHtDaGlsZH0gKi8gKHByb3BlcnRpZXMpXG4gICAgICBjaGlsZHJlbi51bnNoaWZ0KGNoaWxkKVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gcGFyc2VTZWxlY3RvcihzZWxlY3RvciwgZGVmYXVsdFRhZ05hbWUpXG4gICAgICAvLyBOb3JtYWxpemUgdGhlIG5hbWUuXG4gICAgICBub2RlLnRhZ05hbWUgPSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKGFkanVzdCAmJiBvd24uY2FsbChhZGp1c3QsIG5vZGUudGFnTmFtZSkpIHtcbiAgICAgICAgbm9kZS50YWdOYW1lID0gYWRqdXN0W25vZGUudGFnTmFtZV1cbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIHByb3BzLlxuICAgICAgaWYgKGlzUHJvcGVydGllcyhwcm9wZXJ0aWVzLCBub2RlLnRhZ05hbWUpKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICBsZXQga2V5XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIGlmIChvd24uY2FsbChwcm9wZXJ0aWVzLCBrZXkpKSB7XG4gICAgICAgICAgICBhZGRQcm9wZXJ0eShzY2hlbWEsIG5vZGUucHJvcGVydGllcywga2V5LCBwcm9wZXJ0aWVzW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZHJlbi51bnNoaWZ0KHByb3BlcnRpZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGNoaWxkcmVuLlxuICAgIHdoaWxlICgrK2luZGV4IDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBhZGRDaGlsZChub2RlLmNoaWxkcmVuLCBjaGlsZHJlbltpbmRleF0pXG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2VsZW1lbnQnICYmIG5vZGUudGFnTmFtZSA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgbm9kZS5jb250ZW50ID0ge3R5cGU6ICdyb290JywgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW59XG4gICAgICBub2RlLmNoaWxkcmVuID0gW11cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgcmV0dXJuIGhcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBzb21ldGhpbmcgaXMgcHJvcGVydGllcyBvciBhIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Q2hpbGQgfCBQcm9wZXJ0aWVzfSB2YWx1ZVxuICogICBWYWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiAgIFRhZyBuYW1lLlxuICogQHJldHVybnMge3ZhbHVlIGlzIFByb3BlcnRpZXN9XG4gKiAgIFdoZXRoZXIgYHZhbHVlYCBpcyBhIHByb3BlcnRpZXMgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc1Byb3BlcnRpZXModmFsdWUsIG5hbWUpIHtcbiAgaWYgKFxuICAgIHZhbHVlID09PSBudWxsIHx8XG4gICAgdmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHxcbiAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChuYW1lID09PSAnaW5wdXQnIHx8ICF2YWx1ZS50eXBlIHx8IHR5cGVvZiB2YWx1ZS50eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoJ2NoaWxkcmVuJyBpbiB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmNoaWxkcmVuKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdidXR0b24nKSB7XG4gICAgcmV0dXJuIGJ1dHRvblR5cGVzLmhhcyh2YWx1ZS50eXBlLnRvTG93ZXJDYXNlKCkpXG4gIH1cblxuICByZXR1cm4gISgndmFsdWUnIGluIHZhbHVlKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U2NoZW1hfSBzY2hlbWFcbiAqICAgU2NoZW1hLlxuICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzXG4gKiAgIFByb3BlcnRpZXMgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogICBQcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIHtQcm9wZXJ0eVZhbHVlIHwgU3R5bGV9IHZhbHVlXG4gKiAgIFByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqICAgTm90aGluZy5cbiAqL1xuZnVuY3Rpb24gYWRkUHJvcGVydHkoc2NoZW1hLCBwcm9wZXJ0aWVzLCBrZXksIHZhbHVlKSB7XG4gIGNvbnN0IGluZm8gPSBmaW5kKHNjaGVtYSwga2V5KVxuICBsZXQgaW5kZXggPSAtMVxuICAvKiogQHR5cGUge1Byb3BlcnR5VmFsdWV9ICovXG4gIGxldCByZXN1bHRcblxuICAvLyBJZ25vcmUgbnVsbGlzaCBhbmQgTmFOIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgLy8gSWdub3JlIE5hTi5cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkgcmV0dXJuXG5cbiAgICByZXN1bHQgPSB2YWx1ZVxuICB9XG4gIC8vIEJvb2xlYW5zLlxuICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJlc3VsdCA9IHZhbHVlXG4gIH1cbiAgLy8gSGFuZGxlIGxpc3QgdmFsdWVzLlxuICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGluZm8uc3BhY2VTZXBhcmF0ZWQpIHtcbiAgICAgIHJlc3VsdCA9IHNwYWNlcyh2YWx1ZSlcbiAgICB9IGVsc2UgaWYgKGluZm8uY29tbWFTZXBhcmF0ZWQpIHtcbiAgICAgIHJlc3VsdCA9IGNvbW1hcyh2YWx1ZSlcbiAgICB9IGVsc2UgaWYgKGluZm8uY29tbWFPclNwYWNlU2VwYXJhdGVkKSB7XG4gICAgICByZXN1bHQgPSBzcGFjZXMoY29tbWFzKHZhbHVlKS5qb2luKCcgJykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHBhcnNlUHJpbWl0aXZlKGluZm8sIGluZm8ucHJvcGVydHksIHZhbHVlKVxuICAgIH1cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJlc3VsdCA9IHZhbHVlLmNvbmNhdCgpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gaW5mby5wcm9wZXJ0eSA9PT0gJ3N0eWxlJyA/IHN0eWxlKHZhbHVlKSA6IFN0cmluZyh2YWx1ZSlcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAvKiogQHR5cGUge0FycmF5PG51bWJlciB8IHN0cmluZz59ICovXG4gICAgY29uc3QgZmluYWxSZXN1bHQgPSBbXVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAvLyBBc3N1bWUgbm8gYm9vbGVhbnMgaW4gYXJyYXkuXG4gICAgICBjb25zdCB2YWx1ZSA9IC8qKiBAdHlwZSB7bnVtYmVyIHwgc3RyaW5nfSAqLyAoXG4gICAgICAgIHBhcnNlUHJpbWl0aXZlKGluZm8sIGluZm8ucHJvcGVydHksIHJlc3VsdFtpbmRleF0pXG4gICAgICApXG4gICAgICBmaW5hbFJlc3VsdFtpbmRleF0gPSB2YWx1ZVxuICAgIH1cblxuICAgIHJlc3VsdCA9IGZpbmFsUmVzdWx0XG4gIH1cblxuICAvLyBDbGFzcyBuYW1lcyAod2hpY2ggY2FuIGJlIGFkZGVkIGJvdGggb24gdGhlIGBzZWxlY3RvcmAgYW5kIGhlcmUpLlxuICBpZiAoaW5mby5wcm9wZXJ0eSA9PT0gJ2NsYXNzTmFtZScgJiYgQXJyYXkuaXNBcnJheShwcm9wZXJ0aWVzLmNsYXNzTmFtZSkpIHtcbiAgICAvLyBBc3N1bWUgbm8gYm9vbGVhbnMgaW4gYGNsYXNzTmFtZWAuXG4gICAgY29uc3QgdmFsdWUgPSAvKiogQHR5cGUge251bWJlciB8IHN0cmluZ30gKi8gKHJlc3VsdClcbiAgICByZXN1bHQgPSBwcm9wZXJ0aWVzLmNsYXNzTmFtZS5jb25jYXQodmFsdWUpXG4gIH1cblxuICBwcm9wZXJ0aWVzW2luZm8ucHJvcGVydHldID0gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxSb290Q29udGVudD59IG5vZGVzXG4gKiAgIENoaWxkcmVuLlxuICogQHBhcmFtIHtDaGlsZH0gdmFsdWVcbiAqICAgQ2hpbGQuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogICBOb3RoaW5nLlxuICovXG5mdW5jdGlvbiBhZGRDaGlsZChub2RlcywgdmFsdWUpIHtcbiAgbGV0IGluZGV4ID0gLTFcblxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgIC8vIEVtcHR5LlxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIG5vZGVzLnB1c2goe3R5cGU6ICd0ZXh0JywgdmFsdWU6IFN0cmluZyh2YWx1ZSl9KVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgd2hpbGUgKCsraW5kZXggPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIGFkZENoaWxkKG5vZGVzLCB2YWx1ZVtpbmRleF0pXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgJ3R5cGUnIGluIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlLnR5cGUgPT09ICdyb290Jykge1xuICAgICAgYWRkQ2hpbGQobm9kZXMsIHZhbHVlLmNoaWxkcmVuKVxuICAgIH0gZWxzZSB7XG4gICAgICBub2Rlcy5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vZGUsIG5vZGVzLCBvciBzdHJpbmcsIGdvdCBgJyArIHZhbHVlICsgJ2AnKVxuICB9XG59XG5cbi8qKlxuICogUGFyc2UgYSBzaW5nbGUgcHJpbWl0aXZlcy5cbiAqXG4gKiBAcGFyYW0ge0luZm99IGluZm9cbiAqICAgUHJvcGVydHkgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogICBQcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIHtQcmltaXRpdmVWYWx1ZX0gdmFsdWVcbiAqICAgUHJvcGVydHkgdmFsdWUuXG4gKiBAcmV0dXJucyB7UHJpbWl0aXZlVmFsdWV9XG4gKiAgIFByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBwYXJzZVByaW1pdGl2ZShpbmZvLCBuYW1lLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChpbmZvLm51bWJlciAmJiB2YWx1ZSAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChpbmZvLmJvb2xlYW4gfHwgaW5mby5vdmVybG9hZGVkQm9vbGVhbikgJiZcbiAgICAgICh2YWx1ZSA9PT0gJycgfHwgbm9ybWFsaXplKHZhbHVlKSA9PT0gbm9ybWFsaXplKG5hbWUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYSBgc3R5bGVgIG9iamVjdCBhcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0eWxlfSB2YWx1ZVxuICogICBTdHlsZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBDU1Mgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBzdHlsZSh2YWx1ZSkge1xuICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBsZXQga2V5XG5cbiAgZm9yIChrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAob3duLmNhbGwodmFsdWUsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFtrZXksIHZhbHVlW2tleV1dLmpvaW4oJzogJykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCc7ICcpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbWFwIHRvIGFkanVzdCBjYXNpbmcuXG4gKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB2YWx1ZXNcbiAqICAgTGlzdCBvZiBwcm9wZXJseSBjYXNlZCBrZXlzLlxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIHN0cmluZz59XG4gKiAgIE1hcCBvZiBsb3dlcmNhc2Uga2V5cyB0byB1cHBlcmNhc2Uga2V5cy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQWRqdXN0TWFwKHZhbHVlcykge1xuICAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIHN0cmluZz59ICovXG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGxldCBpbmRleCA9IC0xXG5cbiAgd2hpbGUgKCsraW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgcmVzdWx0W3ZhbHVlc1tpbmRleF0udG9Mb3dlckNhc2UoKV0gPSB2YWx1ZXNbaW5kZXhdXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/create-h.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/hastscript/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   h: () => (/* binding */ h),\n/* harmony export */   s: () => (/* binding */ s)\n/* harmony export */ });\n/* harmony import */ var property_information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! property-information */ \"(ssr)/./node_modules/property-information/index.js\");\n/* harmony import */ var _create_h_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-h.js */ \"(ssr)/./node_modules/hastscript/lib/create-h.js\");\n/* harmony import */ var _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg-case-sensitive-tag-names.js */ \"(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\");\n/**\n * @typedef {import('./create-h.js').Child} Child\n *   Acceptable child value.\n * @typedef {import('./create-h.js').Properties} Properties\n *   Acceptable value for element properties.\n * @typedef {import('./create-h.js').Result} Result\n *   Result from a `h` (or `s`) call.\n */\n\n// Register the JSX namespace on `h`.\n/**\n * @typedef {import('./jsx-classic.js').Element} h.JSX.Element\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} h.JSX.ElementChildrenAttribute\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} h.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} h.JSX.IntrinsicElements\n */\n\n// Register the JSX namespace on `s`.\n/**\n * @typedef {import('./jsx-classic.js').Element} s.JSX.Element\n * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} s.JSX.ElementChildrenAttribute\n * @typedef {import('./jsx-classic.js').IntrinsicAttributes} s.JSX.IntrinsicAttributes\n * @typedef {import('./jsx-classic.js').IntrinsicElements} s.JSX.IntrinsicElements\n */\n\n\n\n\n\n// Note: this explicit type is needed, otherwise TS creates broken types.\n/** @type {ReturnType<createH>} */\nconst h = (0,_create_h_js__WEBPACK_IMPORTED_MODULE_0__.createH)(property_information__WEBPACK_IMPORTED_MODULE_1__.html, 'div')\n\n// Note: this explicit type is needed, otherwise TS creates broken types.\n/** @type {ReturnType<createH>} */\nconst s = (0,_create_h_js__WEBPACK_IMPORTED_MODULE_0__.createH)(property_information__WEBPACK_IMPORTED_MODULE_1__.svg, 'g', _svg_case_sensitive_tag_names_js__WEBPACK_IMPORTED_MODULE_2__.svgCaseSensitiveTagNames)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQ7QUFDQSxhQUFhLGdDQUFnQztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG9DQUFvQztBQUNqRCxhQUFhLHFEQUFxRDtBQUNsRSxhQUFhLGdEQUFnRDtBQUM3RCxhQUFhLDhDQUE4QztBQUMzRDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxvQ0FBb0M7QUFDakQsYUFBYSxxREFBcUQ7QUFDbEUsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSw4Q0FBOEM7QUFDM0Q7O0FBRThDO0FBQ1Q7QUFDcUM7O0FBRTFFO0FBQ0EsV0FBVyxxQkFBcUI7QUFDekIsVUFBVSxxREFBTyxDQUFDLHNEQUFJOztBQUU3QjtBQUNBLFdBQVcscUJBQXFCO0FBQ3pCLFVBQVUscURBQU8sQ0FBQyxxREFBRyxPQUFPLHNGQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL211bHRpa2FydC1uZXh0Ly4vbm9kZV9tb2R1bGVzL2hhc3RzY3JpcHQvbGliL2luZGV4LmpzP2YwYjYiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuQ2hpbGR9IENoaWxkXG4gKiAgIEFjY2VwdGFibGUgY2hpbGQgdmFsdWUuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuUHJvcGVydGllc30gUHJvcGVydGllc1xuICogICBBY2NlcHRhYmxlIHZhbHVlIGZvciBlbGVtZW50IHByb3BlcnRpZXMuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NyZWF0ZS1oLmpzJykuUmVzdWx0fSBSZXN1bHRcbiAqICAgUmVzdWx0IGZyb20gYSBgaGAgKG9yIGBzYCkgY2FsbC5cbiAqL1xuXG4vLyBSZWdpc3RlciB0aGUgSlNYIG5hbWVzcGFjZSBvbiBgaGAuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5FbGVtZW50fSBoLkpTWC5FbGVtZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuRWxlbWVudENoaWxkcmVuQXR0cmlidXRlfSBoLkpTWC5FbGVtZW50Q2hpbGRyZW5BdHRyaWJ1dGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanN4LWNsYXNzaWMuanMnKS5JbnRyaW5zaWNBdHRyaWJ1dGVzfSBoLkpTWC5JbnRyaW5zaWNBdHRyaWJ1dGVzXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuSW50cmluc2ljRWxlbWVudHN9IGguSlNYLkludHJpbnNpY0VsZW1lbnRzXG4gKi9cblxuLy8gUmVnaXN0ZXIgdGhlIEpTWCBuYW1lc3BhY2Ugb24gYHNgLlxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuRWxlbWVudH0gcy5KU1guRWxlbWVudFxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkVsZW1lbnRDaGlsZHJlbkF0dHJpYnV0ZX0gcy5KU1guRWxlbWVudENoaWxkcmVuQXR0cmlidXRlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2pzeC1jbGFzc2ljLmpzJykuSW50cmluc2ljQXR0cmlidXRlc30gcy5KU1guSW50cmluc2ljQXR0cmlidXRlc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9qc3gtY2xhc3NpYy5qcycpLkludHJpbnNpY0VsZW1lbnRzfSBzLkpTWC5JbnRyaW5zaWNFbGVtZW50c1xuICovXG5cbmltcG9ydCB7aHRtbCwgc3ZnfSBmcm9tICdwcm9wZXJ0eS1pbmZvcm1hdGlvbidcbmltcG9ydCB7Y3JlYXRlSH0gZnJvbSAnLi9jcmVhdGUtaC5qcydcbmltcG9ydCB7c3ZnQ2FzZVNlbnNpdGl2ZVRhZ05hbWVzfSBmcm9tICcuL3N2Zy1jYXNlLXNlbnNpdGl2ZS10YWctbmFtZXMuanMnXG5cbi8vIE5vdGU6IHRoaXMgZXhwbGljaXQgdHlwZSBpcyBuZWVkZWQsIG90aGVyd2lzZSBUUyBjcmVhdGVzIGJyb2tlbiB0eXBlcy5cbi8qKiBAdHlwZSB7UmV0dXJuVHlwZTxjcmVhdGVIPn0gKi9cbmV4cG9ydCBjb25zdCBoID0gY3JlYXRlSChodG1sLCAnZGl2JylcblxuLy8gTm90ZTogdGhpcyBleHBsaWNpdCB0eXBlIGlzIG5lZWRlZCwgb3RoZXJ3aXNlIFRTIGNyZWF0ZXMgYnJva2VuIHR5cGVzLlxuLyoqIEB0eXBlIHtSZXR1cm5UeXBlPGNyZWF0ZUg+fSAqL1xuZXhwb3J0IGNvbnN0IHMgPSBjcmVhdGVIKHN2ZywgJ2cnLCBzdmdDYXNlU2Vuc2l0aXZlVGFnTmFtZXMpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js":
/*!*********************************************************************!*\
  !*** ./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   svgCaseSensitiveTagNames: () => (/* binding */ svgCaseSensitiveTagNames)\n/* harmony export */ });\nconst svgCaseSensitiveTagNames = [\n  'altGlyph',\n  'altGlyphDef',\n  'altGlyphItem',\n  'animateColor',\n  'animateMotion',\n  'animateTransform',\n  'clipPath',\n  'feBlend',\n  'feColorMatrix',\n  'feComponentTransfer',\n  'feComposite',\n  'feConvolveMatrix',\n  'feDiffuseLighting',\n  'feDisplacementMap',\n  'feDistantLight',\n  'feDropShadow',\n  'feFlood',\n  'feFuncA',\n  'feFuncB',\n  'feFuncG',\n  'feFuncR',\n  'feGaussianBlur',\n  'feImage',\n  'feMerge',\n  'feMergeNode',\n  'feMorphology',\n  'feOffset',\n  'fePointLight',\n  'feSpecularLighting',\n  'feSpotLight',\n  'feTile',\n  'feTurbulence',\n  'foreignObject',\n  'glyphRef',\n  'linearGradient',\n  'radialGradient',\n  'solidColor',\n  'textArea',\n  'textPath'\n]\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdHNjcmlwdC9saWIvc3ZnLWNhc2Utc2Vuc2l0aXZlLXRhZy1uYW1lcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL211bHRpa2FydC1uZXh0Ly4vbm9kZV9tb2R1bGVzL2hhc3RzY3JpcHQvbGliL3N2Zy1jYXNlLXNlbnNpdGl2ZS10YWctbmFtZXMuanM/MDhmMSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc3ZnQ2FzZVNlbnNpdGl2ZVRhZ05hbWVzID0gW1xuICAnYWx0R2x5cGgnLFxuICAnYWx0R2x5cGhEZWYnLFxuICAnYWx0R2x5cGhJdGVtJyxcbiAgJ2FuaW1hdGVDb2xvcicsXG4gICdhbmltYXRlTW90aW9uJyxcbiAgJ2FuaW1hdGVUcmFuc2Zvcm0nLFxuICAnY2xpcFBhdGgnLFxuICAnZmVCbGVuZCcsXG4gICdmZUNvbG9yTWF0cml4JyxcbiAgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLFxuICAnZmVDb21wb3NpdGUnLFxuICAnZmVDb252b2x2ZU1hdHJpeCcsXG4gICdmZURpZmZ1c2VMaWdodGluZycsXG4gICdmZURpc3BsYWNlbWVudE1hcCcsXG4gICdmZURpc3RhbnRMaWdodCcsXG4gICdmZURyb3BTaGFkb3cnLFxuICAnZmVGbG9vZCcsXG4gICdmZUZ1bmNBJyxcbiAgJ2ZlRnVuY0InLFxuICAnZmVGdW5jRycsXG4gICdmZUZ1bmNSJyxcbiAgJ2ZlR2F1c3NpYW5CbHVyJyxcbiAgJ2ZlSW1hZ2UnLFxuICAnZmVNZXJnZScsXG4gICdmZU1lcmdlTm9kZScsXG4gICdmZU1vcnBob2xvZ3knLFxuICAnZmVPZmZzZXQnLFxuICAnZmVQb2ludExpZ2h0JyxcbiAgJ2ZlU3BlY3VsYXJMaWdodGluZycsXG4gICdmZVNwb3RMaWdodCcsXG4gICdmZVRpbGUnLFxuICAnZmVUdXJidWxlbmNlJyxcbiAgJ2ZvcmVpZ25PYmplY3QnLFxuICAnZ2x5cGhSZWYnLFxuICAnbGluZWFyR3JhZGllbnQnLFxuICAncmFkaWFsR3JhZGllbnQnLFxuICAnc29saWRDb2xvcicsXG4gICd0ZXh0QXJlYScsXG4gICd0ZXh0UGF0aCdcbl1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hastscript/lib/svg-case-sensitive-tag-names.js\n");

/***/ })

};
;