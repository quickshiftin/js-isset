(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("js-isset", [], factory);
	else if(typeof exports === 'object')
		exports["js-isset"] = factory();
	else
		root["js-isset"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/resolve-path.js":
/*!*****************************!*\
  !*** ./src/resolve-path.js ***!
  \*****************************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var exists = function exists(o) {
  return typeof o !== 'undefined' && o !== null;
};
/**
 */


var resolvePath = function resolvePath(_ref) {
  var _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'return' : _ref$mode,
      object = _ref.object,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? null : _ref$path;

  //-------------------------------------
  // Check object proper
  //-------------------------------------
  if (path === null && mode === 'bool') {
    return exists(object);
  } //-------------------------------------
  // Validation
  //-------------------------------------


  if (['undefined', 'boolean', 'number', 'string', 'bigint', 'symbol'].includes(_typeof(object))) {
    throw new Error('object param must be of type object');
  } //-------------------------------------
  // Validation
  //-------------------------------------


  if (typeof path !== 'string' || path.length < 1 || path[0] != '.') {
    throw new Error('Invalid path ' + path + ' supplied');
  } //-------------------------------------
  // Default value configuration
  //-------------------------------------


  var dv = defaultValue;
  var k = path.slice(1).split('.');
  var o = object;

  if (typeof o === 'undefined' || o === null) {
    return dv;
  }
  /**
   * Return the current value when in 'return' mode,
   * otherwise return a boolean value.
   */


  var result = function result(success) {
    if (mode === 'return') {
      return success === true ? o : dv;
    }

    return success === true;
  }; //-------------------------------------
  // Go searching for the value at path
  //-------------------------------------


  try {
    var currentKey;

    while (k.length) {
      currentKey = k.shift(); //if (typeof o[currentKey] !== 'undefined' && o[currentKey] !== null) {

      if (exists(o[currentKey])) {
        o = o[currentKey];
        continue;
      }

      return result(false);
    }
  } catch (e) {
    return result(false);
  }

  return result(true);
};
/**
 * Determine if a path exists in the provided object.
 * Inspection of the object variable itself is supported.
 */


var isset = function isset(object) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return resolvePath({
    mode: 'bool',
    object: object,
    path: path
  });
};
/**
 * Return the value at a given path, if present,
 * otherwise return a default value. A path is required.
 */


var valAt = function valAt(object, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return resolvePath({
    defaultValue: defaultValue,
    object: object,
    path: path
  });
};

module.exports = {
  exists: exists,
  valAt: valAt,
  isset: isset
};

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isset": () => (/* reexport safe */ _resolve_path__WEBPACK_IMPORTED_MODULE_0__.isset),
/* harmony export */   "valAt": () => (/* reexport safe */ _resolve_path__WEBPACK_IMPORTED_MODULE_0__.valAt)
/* harmony export */ });
/* harmony import */ var _resolve_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve-path */ "./src/resolve-path.js");
/* harmony import */ var _resolve_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_resolve_path__WEBPACK_IMPORTED_MODULE_0__);


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=js-isset.js.map