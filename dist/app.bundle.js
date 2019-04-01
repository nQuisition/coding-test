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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");



const appSelect = document.querySelector(".filter-select--app");
const platformSelect = document.querySelector(".filter-select--platform");
const adNetworkSelect = document.querySelector(".filter-select--ad-network");
const filterButton = document.querySelector(".filter-button");

const tableContainer = document.querySelector(".analytics-table-container");

const keysOrdering = [
  "Date",
  "Country",
  "App",
  "Platform",
  "Ad Network",
  "Daily Users"
];

const keysMap = {
  App: "app",
  Platform: "platform",
  Country: "country",
  Date: "date",
  "Ad Network": "adNetwork",
  "Daily Users": "dailyUsers"
};

const reverseKeysMap = Object.keys(keysMap).reduce((res, key) => {
  res[keysMap[key]] = key;
  return res;
}, {});

function constructTable() {
  const headerLabels = [...keysOrdering];
  const table = document.createElement("table");
  table.classList.add("analytics-table");
  const thead = document.createElement("thead");
  headerLabels.forEach(function(label) {
    const th = document.createElement("th");
    th.textContent = label;
    thead.appendChild(th);
  });

  const tbody = document.createElement("tbody");
  _state__WEBPACK_IMPORTED_MODULE_1__["get"]().dataPoints.forEach(function(dataPoint) {
    const tr = document.createElement("tr");
    keysOrdering.forEach(function(key) {
      const td = document.createElement("td");
      td.textContent = dataPoint[keysMap[key]];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tableContainer.innerHTML = "";
  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

filterButton.addEventListener("click", function(e) {
  e.preventDefault();
  const app = appSelect.value;
  const platform = platformSelect.value;
  const adNetwork = adNetworkSelect.value;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["default"])({ app, platform, adNetwork }).then(res => {
    _state__WEBPACK_IMPORTED_MODULE_1__["append"]({ dataPoints: res.data });
  });
});

_state__WEBPACK_IMPORTED_MODULE_1__["addListenerCallback"](constructTable);


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! exports provided: get, append, addListenerCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListenerCallback", function() { return addListenerCallback; });
let state = {};
const listenerCallbacks = [];

function get() {
  return state;
}

function append(newState) {
  state = { ...state, ...newState };
  // Notify of change
  listenerCallbacks.forEach(function(callback) {
    callback();
  });
}

function addListenerCallback(callback) {
  listenerCallbacks.push(callback);
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const apiUrl = "http://localhost:3000/data";

// Using fetch here, even though it lacks in support a little; I usually use axios
// but decided to keep dependencies to a minimum
function requestApi(query) {
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  }).then(function(res) {
    if (res.status !== 200) {
      // Error; handle!
      throw new Error("Error retrieving data");
    }
    return res.json();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (requestApi);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQWlDO0FBQ0E7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLElBQUk7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEVBQUUsMENBQVM7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNEQUFVLEVBQUUsMkJBQTJCO0FBQ3pDLElBQUksNkNBQVksRUFBRSx1QkFBdUI7QUFDekMsR0FBRztBQUNILENBQUM7O0FBRUQsMERBQXlCOzs7Ozs7Ozs7Ozs7O0FDdkV6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1AsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFBQTs7QUFFQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFZSx5RUFBVSxFQUFDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAuanNcIik7XG4iLCJpbXBvcnQgcmVxdWVzdEFwaSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0ICogYXMgc3RhdGUgZnJvbSBcIi4vc3RhdGVcIjtcblxuY29uc3QgYXBwU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VsZWN0LS1hcHBcIik7XG5jb25zdCBwbGF0Zm9ybVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlbGVjdC0tcGxhdGZvcm1cIik7XG5jb25zdCBhZE5ldHdvcmtTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1zZWxlY3QtLWFkLW5ldHdvcmtcIik7XG5jb25zdCBmaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1idXR0b25cIik7XG5cbmNvbnN0IHRhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbmFseXRpY3MtdGFibGUtY29udGFpbmVyXCIpO1xuXG5jb25zdCBrZXlzT3JkZXJpbmcgPSBbXG4gIFwiRGF0ZVwiLFxuICBcIkNvdW50cnlcIixcbiAgXCJBcHBcIixcbiAgXCJQbGF0Zm9ybVwiLFxuICBcIkFkIE5ldHdvcmtcIixcbiAgXCJEYWlseSBVc2Vyc1wiXG5dO1xuXG5jb25zdCBrZXlzTWFwID0ge1xuICBBcHA6IFwiYXBwXCIsXG4gIFBsYXRmb3JtOiBcInBsYXRmb3JtXCIsXG4gIENvdW50cnk6IFwiY291bnRyeVwiLFxuICBEYXRlOiBcImRhdGVcIixcbiAgXCJBZCBOZXR3b3JrXCI6IFwiYWROZXR3b3JrXCIsXG4gIFwiRGFpbHkgVXNlcnNcIjogXCJkYWlseVVzZXJzXCJcbn07XG5cbmNvbnN0IHJldmVyc2VLZXlzTWFwID0gT2JqZWN0LmtleXMoa2V5c01hcCkucmVkdWNlKChyZXMsIGtleSkgPT4ge1xuICByZXNba2V5c01hcFtrZXldXSA9IGtleTtcbiAgcmV0dXJuIHJlcztcbn0sIHt9KTtcblxuZnVuY3Rpb24gY29uc3RydWN0VGFibGUoKSB7XG4gIGNvbnN0IGhlYWRlckxhYmVscyA9IFsuLi5rZXlzT3JkZXJpbmddO1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgdGFibGUuY2xhc3NMaXN0LmFkZChcImFuYWx5dGljcy10YWJsZVwiKTtcbiAgY29uc3QgdGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gIGhlYWRlckxhYmVscy5mb3JFYWNoKGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdGgudGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICB0aGVhZC5hcHBlbmRDaGlsZCh0aCk7XG4gIH0pO1xuXG4gIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBzdGF0ZS5nZXQoKS5kYXRhUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oZGF0YVBvaW50KSB7XG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAga2V5c09yZGVyaW5nLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIHRkLnRleHRDb250ZW50ID0gZGF0YVBvaW50W2tleXNNYXBba2V5XV07XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfSk7XG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICB9KTtcblxuICB0YWJsZUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB0YWJsZS5hcHBlbmRDaGlsZCh0aGVhZCk7XG4gIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KTtcbiAgdGFibGVDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xufVxuXG5maWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBhcHAgPSBhcHBTZWxlY3QudmFsdWU7XG4gIGNvbnN0IHBsYXRmb3JtID0gcGxhdGZvcm1TZWxlY3QudmFsdWU7XG4gIGNvbnN0IGFkTmV0d29yayA9IGFkTmV0d29ya1NlbGVjdC52YWx1ZTtcbiAgcmVxdWVzdEFwaSh7IGFwcCwgcGxhdGZvcm0sIGFkTmV0d29yayB9KS50aGVuKHJlcyA9PiB7XG4gICAgc3RhdGUuYXBwZW5kKHsgZGF0YVBvaW50czogcmVzLmRhdGEgfSk7XG4gIH0pO1xufSk7XG5cbnN0YXRlLmFkZExpc3RlbmVyQ2FsbGJhY2soY29uc3RydWN0VGFibGUpO1xuIiwibGV0IHN0YXRlID0ge307XG5jb25zdCBsaXN0ZW5lckNhbGxiYWNrcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KCkge1xuICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQobmV3U3RhdGUpIHtcbiAgc3RhdGUgPSB7IC4uLnN0YXRlLCAuLi5uZXdTdGF0ZSB9O1xuICAvLyBOb3RpZnkgb2YgY2hhbmdlXG4gIGxpc3RlbmVyQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgbGlzdGVuZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59XG4iLCJjb25zdCBhcGlVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9kYXRhXCI7XG5cbi8vIFVzaW5nIGZldGNoIGhlcmUsIGV2ZW4gdGhvdWdoIGl0IGxhY2tzIGluIHN1cHBvcnQgYSBsaXR0bGU7IEkgdXN1YWxseSB1c2UgYXhpb3Ncbi8vIGJ1dCBkZWNpZGVkIHRvIGtlZXAgZGVwZW5kZW5jaWVzIHRvIGEgbWluaW11bVxuZnVuY3Rpb24gcmVxdWVzdEFwaShxdWVyeSkge1xuICByZXR1cm4gZmV0Y2goYXBpVXJsLCB7XG4gICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocXVlcnkpXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgLy8gRXJyb3I7IGhhbmRsZSFcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHJldHJpZXZpbmcgZGF0YVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXF1ZXN0QXBpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==