/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/app.ts":
/*!**************************!*\
  !*** ./public/js/app.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ "./public/sass/style.scss");
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_chevronAccordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/chevronAccordion */ "./public/js/modules/chevronAccordion.ts");
/* harmony import */ var _modules_contentHeight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/contentHeight */ "./public/js/modules/contentHeight.ts");

//  ****************  MODULE IMPORTS **************


//  ****************  DOM ELEMENTS **************
var chevrons = document.querySelectorAll('.chevron');
// *****************  DOM MANIPULATION *************
// content height dynamic based on nav heights
var contentListeners = ['DOMContentLoaded', 'resize'];
contentListeners.forEach(function (listener) {
    return window.addEventListener(listener, _modules_contentHeight__WEBPACK_IMPORTED_MODULE_2__["default"]);
});
// itinerary timeline description show and hide
chevrons.forEach(function (chevron) {
    chevron.addEventListener('click', _modules_chevronAccordion__WEBPACK_IMPORTED_MODULE_1__["default"]);
});


/***/ }),

/***/ "./public/js/modules/chevronAccordion.ts":
/*!***********************************************!*\
  !*** ./public/js/modules/chevronAccordion.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return chevronAccordion; });
function chevronAccordion() {
    if (!this.classList.contains('chevron'))
        return;
    if (this.classList.contains('chevron--event')) {
        // get description node to toggle its active class
        var description = this.nextSibling.nextSibling;
        if (!description)
            return;
        description.classList.toggle('itinerary__description--active');
    }
    else if (this.classList.contains('chevron--todo')) {
        // get todolist node to toggle its active class
        var todoList = this.parentElement.parentElement.lastChild;
        if (!todoList)
            return;
        todoList.classList.toggle('todo__list--active');
    }
    // toggle active classes for chevron itself
    this.classList.toggle('chevron--active');
}


/***/ }),

/***/ "./public/js/modules/contentHeight.ts":
/*!********************************************!*\
  !*** ./public/js/modules/contentHeight.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return contentHeight; });
function contentHeight() {
    var navTop = document.querySelector('.nav--top');
    var navBottom = document.querySelector('.nav--bottom');
    if (navTop) {
        var navTopHeight = navTop.getBoundingClientRect().height;
        var navBottomHeight = navBottom
            ? navBottom.getBoundingClientRect().height
            : 0;
        var innerHeight_1 = window.innerHeight;
        document.documentElement.style.setProperty('--content', innerHeight_1 - navTopHeight - navBottomHeight + "px");
    }
}


/***/ }),

/***/ "./public/sass/style.scss":
/*!********************************!*\
  !*** ./public/sass/style.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.js.map