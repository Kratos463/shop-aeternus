"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/bcp-47-match";
exports.ids = ["vendor-chunks/bcp-47-match"];
exports.modules = {

/***/ "(ssr)/./node_modules/bcp-47-match/index.js":
/*!********************************************!*\
  !*** ./node_modules/bcp-47-match/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   basicFilter: () => (/* binding */ basicFilter),\n/* harmony export */   extendedFilter: () => (/* binding */ extendedFilter),\n/* harmony export */   lookup: () => (/* binding */ lookup)\n/* harmony export */ });\n/**\n * See <https://tools.ietf.org/html/rfc4647#section-3.1>\n * for more info on the algorithms.\n */\n\n/**\n * @typedef {string} Tag\n *   BCP-47 tag.\n * @typedef {Array<Tag>} Tags\n *   List of BCP-47 tags.\n * @typedef {string} Range\n *   RFC 4647 range.\n * @typedef {Array<Range>} Ranges\n *   List of RFC 4647 range.\n *\n * @callback Check\n *   An internal check.\n * @param {Tag} tag\n *   BCP-47 tag.\n * @param {Range} range\n *   RFC 4647 range.\n * @returns {boolean}\n *   Whether the range matches the tag.\n *\n * @typedef {FilterOrLookup<true>} Filter\n *   Filter: yields all tags that match a range.\n * @typedef {FilterOrLookup<false>} Lookup\n *   Lookup: yields the best tag that matches a range.\n */\n\n/**\n * @template {boolean} IsFilter\n *   Whether to filter or perform a lookup.\n * @callback FilterOrLookup\n *   A check.\n * @param {Tag|Tags} tags\n *   One or more BCP-47 tags.\n * @param {Range|Ranges|undefined} [ranges='*']\n *   One or more RFC 4647 ranges.\n * @returns {IsFilter extends true ? Tags : Tag|undefined}\n *   Result.\n */\n\n/**\n * Factory to perform a filter or a lookup.\n *\n * This factory creates a function that accepts a list of tags and a list of\n * ranges, and contains logic to exit early for lookups.\n * `check` just has to deal with one tag and one range.\n * This match function iterates over ranges, and for each range,\n * iterates over tags.\n * That way, earlier ranges matching any tag have precedence over later ranges.\n *\n * @template {boolean} IsFilter\n * @param {Check} check\n *   A check.\n * @param {IsFilter} filter\n *   Whether to filter or perform a lookup.\n * @returns {FilterOrLookup<IsFilter>}\n *   Filter or lookup.\n */\nfunction factory(check, filter) {\n  /**\n   * @param {Tag|Tags} tags\n   *   One or more BCP-47 tags.\n   * @param {Range|Ranges|undefined} [ranges='*']\n   *   One or more RFC 4647 ranges.\n   * @returns {IsFilter extends true ? Tags : Tag|undefined}\n   *   Result.\n   */\n  return function (tags, ranges) {\n    let left = cast(tags, 'tag')\n    const right = cast(\n      ranges === null || ranges === undefined ? '*' : ranges,\n      'range'\n    )\n    /** @type {Tags} */\n    const matches = []\n    let rightIndex = -1\n\n    while (++rightIndex < right.length) {\n      const range = right[rightIndex].toLowerCase()\n\n      // Ignore wildcards in lookup mode.\n      if (!filter && range === '*') continue\n\n      let leftIndex = -1\n      /** @type {Tags} */\n      const next = []\n\n      while (++leftIndex < left.length) {\n        if (check(left[leftIndex].toLowerCase(), range)) {\n          // Exit if this is a lookup and we have a match.\n          if (!filter) {\n            return /** @type {IsFilter extends true ? Tags : Tag|undefined} */ (\n              left[leftIndex]\n            )\n          }\n\n          matches.push(left[leftIndex])\n        } else {\n          next.push(left[leftIndex])\n        }\n      }\n\n      left = next\n    }\n\n    // If this is a filter, return the list.  If it’s a lookup, we didn’t find\n    // a match, so return `undefined`.\n    return /** @type {IsFilter extends true ? Tags : Tag|undefined} */ (\n      filter ? matches : undefined\n    )\n  }\n}\n\n/**\n * Basic Filtering (Section 3.3.1) matches a language priority list consisting\n * of basic language ranges (Section 2.1) to sets of language tags.\n *\n * @param {Tag|Tags} tags\n *   One or more BCP-47 tags.\n * @param {Range|Ranges|undefined} [ranges='*']\n *   One or more RFC 4647 ranges.\n * @returns {Tags}\n *   List of BCP-47 tags.\n */\nconst basicFilter = factory(function (tag, range) {\n  return range === '*' || tag === range || tag.includes(range + '-')\n}, true)\n\n/**\n * Extended Filtering (Section 3.3.2) matches a language priority list\n * consisting of extended language ranges (Section 2.2) to sets of language\n * tags.\n *\n * @param {Tag|Tags} tags\n *   One or more BCP-47 tags.\n * @param {Range|Ranges|undefined} [ranges='*']\n *   One or more RFC 4647 ranges.\n * @returns {Tags}\n *   List of BCP-47 tags.\n */\nconst extendedFilter = factory(function (tag, range) {\n  // 3.3.2.1\n  const left = tag.split('-')\n  const right = range.split('-')\n  let leftIndex = 0\n  let rightIndex = 0\n\n  // 3.3.2.2\n  if (right[rightIndex] !== '*' && left[leftIndex] !== right[rightIndex]) {\n    return false\n  }\n\n  leftIndex++\n  rightIndex++\n\n  // 3.3.2.3\n  while (rightIndex < right.length) {\n    // 3.3.2.3.A\n    if (right[rightIndex] === '*') {\n      rightIndex++\n      continue\n    }\n\n    // 3.3.2.3.B\n    if (!left[leftIndex]) return false\n\n    // 3.3.2.3.C\n    if (left[leftIndex] === right[rightIndex]) {\n      leftIndex++\n      rightIndex++\n      continue\n    }\n\n    // 3.3.2.3.D\n    if (left[leftIndex].length === 1) return false\n\n    // 3.3.2.3.E\n    leftIndex++\n  }\n\n  // 3.3.2.4\n  return true\n}, true)\n\n/**\n * Lookup (Section 3.4) matches a language priority list consisting of basic\n * language ranges to sets of language tags to find the one exact language tag\n * that best matches the range.\n *\n * @param {Tag|Tags} tags\n *   One or more BCP-47 tags.\n * @param {Range|Ranges|undefined} [ranges='*']\n *   One or more RFC 4647 ranges.\n * @returns {Tag|undefined}\n *   BCP-47 tag.\n */\nconst lookup = factory(function (tag, range) {\n  let right = range\n\n  /* eslint-disable-next-line no-constant-condition */\n  while (true) {\n    if (right === '*' || tag === right) return true\n\n    let index = right.lastIndexOf('-')\n\n    if (index < 0) return false\n\n    if (right.charAt(index - 2) === '-') index -= 2\n\n    right = right.slice(0, index)\n  }\n}, false)\n\n/**\n * Validate tags or ranges, and cast them to arrays.\n *\n * @param {string|Array<string>} values\n * @param {string} name\n * @returns {Array<string>}\n */\nfunction cast(values, name) {\n  const value = values && typeof values === 'string' ? [values] : values\n\n  if (!value || typeof value !== 'object' || !('length' in value)) {\n    throw new Error(\n      'Invalid ' + name + ' `' + value + '`, expected non-empty string'\n    )\n  }\n\n  return value\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYmNwLTQ3LW1hdGNoL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxZQUFZO0FBQ3pCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsV0FBVyx3QkFBd0I7QUFDbkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QixXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsOENBQThDO0FBQzVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDhDQUE4QztBQUNwRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsV0FBVyx3QkFBd0I7QUFDbkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxXQUFXLHdCQUF3QjtBQUNuQztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzQkFBc0I7QUFDakMsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXVsdGlrYXJ0LW5leHQvLi9ub2RlX21vZHVsZXMvYmNwLTQ3LW1hdGNoL2luZGV4LmpzP2I1MTciXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTZWUgPGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ3I3NlY3Rpb24tMy4xPlxuICogZm9yIG1vcmUgaW5mbyBvbiB0aGUgYWxnb3JpdGhtcy5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtzdHJpbmd9IFRhZ1xuICogICBCQ1AtNDcgdGFnLlxuICogQHR5cGVkZWYge0FycmF5PFRhZz59IFRhZ3NcbiAqICAgTGlzdCBvZiBCQ1AtNDcgdGFncy5cbiAqIEB0eXBlZGVmIHtzdHJpbmd9IFJhbmdlXG4gKiAgIFJGQyA0NjQ3IHJhbmdlLlxuICogQHR5cGVkZWYge0FycmF5PFJhbmdlPn0gUmFuZ2VzXG4gKiAgIExpc3Qgb2YgUkZDIDQ2NDcgcmFuZ2UuXG4gKlxuICogQGNhbGxiYWNrIENoZWNrXG4gKiAgIEFuIGludGVybmFsIGNoZWNrLlxuICogQHBhcmFtIHtUYWd9IHRhZ1xuICogICBCQ1AtNDcgdGFnLlxuICogQHBhcmFtIHtSYW5nZX0gcmFuZ2VcbiAqICAgUkZDIDQ2NDcgcmFuZ2UuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqICAgV2hldGhlciB0aGUgcmFuZ2UgbWF0Y2hlcyB0aGUgdGFnLlxuICpcbiAqIEB0eXBlZGVmIHtGaWx0ZXJPckxvb2t1cDx0cnVlPn0gRmlsdGVyXG4gKiAgIEZpbHRlcjogeWllbGRzIGFsbCB0YWdzIHRoYXQgbWF0Y2ggYSByYW5nZS5cbiAqIEB0eXBlZGVmIHtGaWx0ZXJPckxvb2t1cDxmYWxzZT59IExvb2t1cFxuICogICBMb29rdXA6IHlpZWxkcyB0aGUgYmVzdCB0YWcgdGhhdCBtYXRjaGVzIGEgcmFuZ2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUge2Jvb2xlYW59IElzRmlsdGVyXG4gKiAgIFdoZXRoZXIgdG8gZmlsdGVyIG9yIHBlcmZvcm0gYSBsb29rdXAuXG4gKiBAY2FsbGJhY2sgRmlsdGVyT3JMb29rdXBcbiAqICAgQSBjaGVjay5cbiAqIEBwYXJhbSB7VGFnfFRhZ3N9IHRhZ3NcbiAqICAgT25lIG9yIG1vcmUgQkNQLTQ3IHRhZ3MuXG4gKiBAcGFyYW0ge1JhbmdlfFJhbmdlc3x1bmRlZmluZWR9IFtyYW5nZXM9JyonXVxuICogICBPbmUgb3IgbW9yZSBSRkMgNDY0NyByYW5nZXMuXG4gKiBAcmV0dXJucyB7SXNGaWx0ZXIgZXh0ZW5kcyB0cnVlID8gVGFncyA6IFRhZ3x1bmRlZmluZWR9XG4gKiAgIFJlc3VsdC5cbiAqL1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gcGVyZm9ybSBhIGZpbHRlciBvciBhIGxvb2t1cC5cbiAqXG4gKiBUaGlzIGZhY3RvcnkgY3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIGxpc3Qgb2YgdGFncyBhbmQgYSBsaXN0IG9mXG4gKiByYW5nZXMsIGFuZCBjb250YWlucyBsb2dpYyB0byBleGl0IGVhcmx5IGZvciBsb29rdXBzLlxuICogYGNoZWNrYCBqdXN0IGhhcyB0byBkZWFsIHdpdGggb25lIHRhZyBhbmQgb25lIHJhbmdlLlxuICogVGhpcyBtYXRjaCBmdW5jdGlvbiBpdGVyYXRlcyBvdmVyIHJhbmdlcywgYW5kIGZvciBlYWNoIHJhbmdlLFxuICogaXRlcmF0ZXMgb3ZlciB0YWdzLlxuICogVGhhdCB3YXksIGVhcmxpZXIgcmFuZ2VzIG1hdGNoaW5nIGFueSB0YWcgaGF2ZSBwcmVjZWRlbmNlIG92ZXIgbGF0ZXIgcmFuZ2VzLlxuICpcbiAqIEB0ZW1wbGF0ZSB7Ym9vbGVhbn0gSXNGaWx0ZXJcbiAqIEBwYXJhbSB7Q2hlY2t9IGNoZWNrXG4gKiAgIEEgY2hlY2suXG4gKiBAcGFyYW0ge0lzRmlsdGVyfSBmaWx0ZXJcbiAqICAgV2hldGhlciB0byBmaWx0ZXIgb3IgcGVyZm9ybSBhIGxvb2t1cC5cbiAqIEByZXR1cm5zIHtGaWx0ZXJPckxvb2t1cDxJc0ZpbHRlcj59XG4gKiAgIEZpbHRlciBvciBsb29rdXAuXG4gKi9cbmZ1bmN0aW9uIGZhY3RvcnkoY2hlY2ssIGZpbHRlcikge1xuICAvKipcbiAgICogQHBhcmFtIHtUYWd8VGFnc30gdGFnc1xuICAgKiAgIE9uZSBvciBtb3JlIEJDUC00NyB0YWdzLlxuICAgKiBAcGFyYW0ge1JhbmdlfFJhbmdlc3x1bmRlZmluZWR9IFtyYW5nZXM9JyonXVxuICAgKiAgIE9uZSBvciBtb3JlIFJGQyA0NjQ3IHJhbmdlcy5cbiAgICogQHJldHVybnMge0lzRmlsdGVyIGV4dGVuZHMgdHJ1ZSA/IFRhZ3MgOiBUYWd8dW5kZWZpbmVkfVxuICAgKiAgIFJlc3VsdC5cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiAodGFncywgcmFuZ2VzKSB7XG4gICAgbGV0IGxlZnQgPSBjYXN0KHRhZ3MsICd0YWcnKVxuICAgIGNvbnN0IHJpZ2h0ID0gY2FzdChcbiAgICAgIHJhbmdlcyA9PT0gbnVsbCB8fCByYW5nZXMgPT09IHVuZGVmaW5lZCA/ICcqJyA6IHJhbmdlcyxcbiAgICAgICdyYW5nZSdcbiAgICApXG4gICAgLyoqIEB0eXBlIHtUYWdzfSAqL1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbXVxuICAgIGxldCByaWdodEluZGV4ID0gLTFcblxuICAgIHdoaWxlICgrK3JpZ2h0SW5kZXggPCByaWdodC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gcmlnaHRbcmlnaHRJbmRleF0udG9Mb3dlckNhc2UoKVxuXG4gICAgICAvLyBJZ25vcmUgd2lsZGNhcmRzIGluIGxvb2t1cCBtb2RlLlxuICAgICAgaWYgKCFmaWx0ZXIgJiYgcmFuZ2UgPT09ICcqJykgY29udGludWVcblxuICAgICAgbGV0IGxlZnRJbmRleCA9IC0xXG4gICAgICAvKiogQHR5cGUge1RhZ3N9ICovXG4gICAgICBjb25zdCBuZXh0ID0gW11cblxuICAgICAgd2hpbGUgKCsrbGVmdEluZGV4IDwgbGVmdC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGNoZWNrKGxlZnRbbGVmdEluZGV4XS50b0xvd2VyQ2FzZSgpLCByYW5nZSkpIHtcbiAgICAgICAgICAvLyBFeGl0IGlmIHRoaXMgaXMgYSBsb29rdXAgYW5kIHdlIGhhdmUgYSBtYXRjaC5cbiAgICAgICAgICBpZiAoIWZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAdHlwZSB7SXNGaWx0ZXIgZXh0ZW5kcyB0cnVlID8gVGFncyA6IFRhZ3x1bmRlZmluZWR9ICovIChcbiAgICAgICAgICAgICAgbGVmdFtsZWZ0SW5kZXhdXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF0Y2hlcy5wdXNoKGxlZnRbbGVmdEluZGV4XSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0LnB1c2gobGVmdFtsZWZ0SW5kZXhdKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxlZnQgPSBuZXh0XG4gICAgfVxuXG4gICAgLy8gSWYgdGhpcyBpcyBhIGZpbHRlciwgcmV0dXJuIHRoZSBsaXN0LiAgSWYgaXTigJlzIGEgbG9va3VwLCB3ZSBkaWRu4oCZdCBmaW5kXG4gICAgLy8gYSBtYXRjaCwgc28gcmV0dXJuIGB1bmRlZmluZWRgLlxuICAgIHJldHVybiAvKiogQHR5cGUge0lzRmlsdGVyIGV4dGVuZHMgdHJ1ZSA/IFRhZ3MgOiBUYWd8dW5kZWZpbmVkfSAqLyAoXG4gICAgICBmaWx0ZXIgPyBtYXRjaGVzIDogdW5kZWZpbmVkXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogQmFzaWMgRmlsdGVyaW5nIChTZWN0aW9uIDMuMy4xKSBtYXRjaGVzIGEgbGFuZ3VhZ2UgcHJpb3JpdHkgbGlzdCBjb25zaXN0aW5nXG4gKiBvZiBiYXNpYyBsYW5ndWFnZSByYW5nZXMgKFNlY3Rpb24gMi4xKSB0byBzZXRzIG9mIGxhbmd1YWdlIHRhZ3MuXG4gKlxuICogQHBhcmFtIHtUYWd8VGFnc30gdGFnc1xuICogICBPbmUgb3IgbW9yZSBCQ1AtNDcgdGFncy5cbiAqIEBwYXJhbSB7UmFuZ2V8UmFuZ2VzfHVuZGVmaW5lZH0gW3Jhbmdlcz0nKiddXG4gKiAgIE9uZSBvciBtb3JlIFJGQyA0NjQ3IHJhbmdlcy5cbiAqIEByZXR1cm5zIHtUYWdzfVxuICogICBMaXN0IG9mIEJDUC00NyB0YWdzLlxuICovXG5leHBvcnQgY29uc3QgYmFzaWNGaWx0ZXIgPSBmYWN0b3J5KGZ1bmN0aW9uICh0YWcsIHJhbmdlKSB7XG4gIHJldHVybiByYW5nZSA9PT0gJyonIHx8IHRhZyA9PT0gcmFuZ2UgfHwgdGFnLmluY2x1ZGVzKHJhbmdlICsgJy0nKVxufSwgdHJ1ZSlcblxuLyoqXG4gKiBFeHRlbmRlZCBGaWx0ZXJpbmcgKFNlY3Rpb24gMy4zLjIpIG1hdGNoZXMgYSBsYW5ndWFnZSBwcmlvcml0eSBsaXN0XG4gKiBjb25zaXN0aW5nIG9mIGV4dGVuZGVkIGxhbmd1YWdlIHJhbmdlcyAoU2VjdGlvbiAyLjIpIHRvIHNldHMgb2YgbGFuZ3VhZ2VcbiAqIHRhZ3MuXG4gKlxuICogQHBhcmFtIHtUYWd8VGFnc30gdGFnc1xuICogICBPbmUgb3IgbW9yZSBCQ1AtNDcgdGFncy5cbiAqIEBwYXJhbSB7UmFuZ2V8UmFuZ2VzfHVuZGVmaW5lZH0gW3Jhbmdlcz0nKiddXG4gKiAgIE9uZSBvciBtb3JlIFJGQyA0NjQ3IHJhbmdlcy5cbiAqIEByZXR1cm5zIHtUYWdzfVxuICogICBMaXN0IG9mIEJDUC00NyB0YWdzLlxuICovXG5leHBvcnQgY29uc3QgZXh0ZW5kZWRGaWx0ZXIgPSBmYWN0b3J5KGZ1bmN0aW9uICh0YWcsIHJhbmdlKSB7XG4gIC8vIDMuMy4yLjFcbiAgY29uc3QgbGVmdCA9IHRhZy5zcGxpdCgnLScpXG4gIGNvbnN0IHJpZ2h0ID0gcmFuZ2Uuc3BsaXQoJy0nKVxuICBsZXQgbGVmdEluZGV4ID0gMFxuICBsZXQgcmlnaHRJbmRleCA9IDBcblxuICAvLyAzLjMuMi4yXG4gIGlmIChyaWdodFtyaWdodEluZGV4XSAhPT0gJyonICYmIGxlZnRbbGVmdEluZGV4XSAhPT0gcmlnaHRbcmlnaHRJbmRleF0pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGxlZnRJbmRleCsrXG4gIHJpZ2h0SW5kZXgrK1xuXG4gIC8vIDMuMy4yLjNcbiAgd2hpbGUgKHJpZ2h0SW5kZXggPCByaWdodC5sZW5ndGgpIHtcbiAgICAvLyAzLjMuMi4zLkFcbiAgICBpZiAocmlnaHRbcmlnaHRJbmRleF0gPT09ICcqJykge1xuICAgICAgcmlnaHRJbmRleCsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIC8vIDMuMy4yLjMuQlxuICAgIGlmICghbGVmdFtsZWZ0SW5kZXhdKSByZXR1cm4gZmFsc2VcblxuICAgIC8vIDMuMy4yLjMuQ1xuICAgIGlmIChsZWZ0W2xlZnRJbmRleF0gPT09IHJpZ2h0W3JpZ2h0SW5kZXhdKSB7XG4gICAgICBsZWZ0SW5kZXgrK1xuICAgICAgcmlnaHRJbmRleCsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIC8vIDMuMy4yLjMuRFxuICAgIGlmIChsZWZ0W2xlZnRJbmRleF0ubGVuZ3RoID09PSAxKSByZXR1cm4gZmFsc2VcblxuICAgIC8vIDMuMy4yLjMuRVxuICAgIGxlZnRJbmRleCsrXG4gIH1cblxuICAvLyAzLjMuMi40XG4gIHJldHVybiB0cnVlXG59LCB0cnVlKVxuXG4vKipcbiAqIExvb2t1cCAoU2VjdGlvbiAzLjQpIG1hdGNoZXMgYSBsYW5ndWFnZSBwcmlvcml0eSBsaXN0IGNvbnNpc3Rpbmcgb2YgYmFzaWNcbiAqIGxhbmd1YWdlIHJhbmdlcyB0byBzZXRzIG9mIGxhbmd1YWdlIHRhZ3MgdG8gZmluZCB0aGUgb25lIGV4YWN0IGxhbmd1YWdlIHRhZ1xuICogdGhhdCBiZXN0IG1hdGNoZXMgdGhlIHJhbmdlLlxuICpcbiAqIEBwYXJhbSB7VGFnfFRhZ3N9IHRhZ3NcbiAqICAgT25lIG9yIG1vcmUgQkNQLTQ3IHRhZ3MuXG4gKiBAcGFyYW0ge1JhbmdlfFJhbmdlc3x1bmRlZmluZWR9IFtyYW5nZXM9JyonXVxuICogICBPbmUgb3IgbW9yZSBSRkMgNDY0NyByYW5nZXMuXG4gKiBAcmV0dXJucyB7VGFnfHVuZGVmaW5lZH1cbiAqICAgQkNQLTQ3IHRhZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvb2t1cCA9IGZhY3RvcnkoZnVuY3Rpb24gKHRhZywgcmFuZ2UpIHtcbiAgbGV0IHJpZ2h0ID0gcmFuZ2VcblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uICovXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKHJpZ2h0ID09PSAnKicgfHwgdGFnID09PSByaWdodCkgcmV0dXJuIHRydWVcblxuICAgIGxldCBpbmRleCA9IHJpZ2h0Lmxhc3RJbmRleE9mKCctJylcblxuICAgIGlmIChpbmRleCA8IDApIHJldHVybiBmYWxzZVxuXG4gICAgaWYgKHJpZ2h0LmNoYXJBdChpbmRleCAtIDIpID09PSAnLScpIGluZGV4IC09IDJcblxuICAgIHJpZ2h0ID0gcmlnaHQuc2xpY2UoMCwgaW5kZXgpXG4gIH1cbn0sIGZhbHNlKVxuXG4vKipcbiAqIFZhbGlkYXRlIHRhZ3Mgb3IgcmFuZ2VzLCBhbmQgY2FzdCB0aGVtIHRvIGFycmF5cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSB2YWx1ZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gY2FzdCh2YWx1ZXMsIG5hbWUpIHtcbiAgY29uc3QgdmFsdWUgPSB2YWx1ZXMgJiYgdHlwZW9mIHZhbHVlcyA9PT0gJ3N0cmluZycgPyBbdmFsdWVzXSA6IHZhbHVlc1xuXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyB8fCAhKCdsZW5ndGgnIGluIHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdJbnZhbGlkICcgKyBuYW1lICsgJyBgJyArIHZhbHVlICsgJ2AsIGV4cGVjdGVkIG5vbi1lbXB0eSBzdHJpbmcnXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/bcp-47-match/index.js\n");

/***/ })

};
;