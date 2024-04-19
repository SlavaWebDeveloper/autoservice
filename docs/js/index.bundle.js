/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _radioUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _data_formElements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);


const data = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)();






const currentMonth = new Intl.DateTimeFormat("ru-RU", { month: 'long' }).format(new Date(),);
let month = currentMonth;

let currentStep = 0;

const showResultData = () => {
  const currentYear = new Date().getFullYear();
  const monthIndex = _data_data__WEBPACK_IMPORTED_MODULE_1__.allMonths.findIndex(item => item === month);

  const dateString = `${currentYear}-${(monthIndex + 1).toString().padStart(2, "0")}-${_data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.day.toString().padStart(2, "0")}T${_data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.time}`;

  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  })

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formInfoType.textContent = _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.dataType.title;
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formInfoData.innerHTML = `
    <span class="form__info-data-day">${formattedDate}</span>
    <span class="form__info-data-time">${_data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.time}</span>
  `
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formInfoData.datatime = new Date(dateString).toISOString();
}

const updateFieldsetVisibility = (currentStep) => {
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formFieldsets.forEach((fieldset, index) => {
    if (index === currentStep) {
      fieldset.classList.add('form__fieldset-active');
      if (index === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formFieldsets.length - 1) {
        showResultData();
      }
    } else {
      fieldset.classList.remove('form__fieldset-active');
    }
  });

  const isPrevStep = currentStep > 0;
  const isLastStep = currentStep === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formFieldsets.length - 1;

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.prev.style.display = isPrevStep ? '' : 'none';
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.style.display = isLastStep ? 'none' : '';
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.submit.style.display = isLastStep ? '' : 'none';
};

const createFormDay = (date) => {
  const objectMonth = date.find(item => item.month === month);
  const days = Object.keys(objectMonth.day);
  const typeData = days.map(item => ({
    value: item,
    title: item,
  }));

  (0,_radioUtils__WEBPACK_IMPORTED_MODULE_2__.createRadioBtns)(_data_formElements__WEBPACK_IMPORTED_MODULE_3__.daysRadioWrapper, 'day', typeData);
}

const createFormMonth = (months) => {
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formMonthsWrapper.textContent = '';

  const buttonsMonth = months.map(item => {
    const btn = document.createElement('button');
    btn.className = 'form__btn-month';
    btn.type = 'button';
    btn.textContent = `${item[0].toUpperCase()}${item.substring(1).toLowerCase()}`;

    if (item === month) {
      btn.classList.add('form__btn-month_active')
    }
    return btn;
  })

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formMonthsWrapper.append(...buttonsMonth);

  buttonsMonth.forEach(btn => {
    btn.addEventListener('click', ({ target }) => {
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = true;

      if (target.classList.contains('form__btn-month_active')) {
        return;
      };

      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formTime.style.display = 'none';

      buttonsMonth.forEach(btn => {
        btn.classList.remove('form__btn-month_active');
      });

      target.classList.add('form__btn-month_active');

      month = target.textContent.toLowerCase();

      // Обновляем дни для нового месяца
      const date = data.find(item => item.type === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.dataType.type).date;
      createFormDay(date);
    })
  })
}

const createFormTime = (date, day) => {
  const objectMonth = date.find(item => item.month == month);
  const days = objectMonth.day;
  const daysData = days[day].map(item => ({
    value: `${item}:00`,
    title: `${item}:00`,
  }))

  ;(0,_radioUtils__WEBPACK_IMPORTED_MODULE_2__.createRadioBtns)(_data_formElements__WEBPACK_IMPORTED_MODULE_3__.timesRadioWrapper, 'time', daysData);
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formTime.style.display = 'block';
}

const handelInputForm = ({ currentTarget, target }) => {
  if (currentTarget.type.value && currentStep === 0) {
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = false;

    const typeObject = data.find(item => item.type === currentTarget.type.value)

    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.dataType.type = typeObject.type;
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.dataType.title = typeObject.title;

    const date = typeObject.date;
    const months = date.map(item => item.month);

    createFormMonth(months);
    createFormDay(date);
  }

  if (createFormTime) {
    if (currentTarget.day.value && target.name === "day") {
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.day = currentTarget.day.value;

      const date = data.find(item => item.type === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.dataType.type).date;
      createFormTime(date, _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.day);
    }

    if (
      currentTarget.day.value &&
      currentTarget.time.value &&
      target.name === "time"
    ) {
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.dataToWrite.time = currentTarget.time.value;
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = false;
    }
  }

  if (currentStep === 2) {
    const inputs = _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formFieldsetClient.querySelectorAll('.form__input');
    let allFilled = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    })
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.submit.disabled = !allFilled;
  }
}

const renderTypeFieldset = () => {
  const typeData = data.map(item => ({
    value: item.type,
    title: item.title,
  }));

  (0,_radioUtils__WEBPACK_IMPORTED_MODULE_2__.createRadioBtns)(_data_formElements__WEBPACK_IMPORTED_MODULE_3__.typesRadioWrapper, 'type', typeData)
}

const init = () => {
  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = true;

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.form.addEventListener('click', event => {
    if (event.target === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next && currentStep < _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formFieldsets.length - 1) {
      currentStep++;
      updateFieldsetVisibility(currentStep);
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = true;
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.submit.disabled = true;
    } else if (event.target === _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.prev && currentStep > 0) {
      currentStep--;
      updateFieldsetVisibility(currentStep);
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.next.disabled = false;
      _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formButtons.submit.disabled = false;
    }
  });

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.form.addEventListener('input', handelInputForm);

  updateFieldsetVisibility(currentStep);
  renderTypeFieldset();

  const resetForm = () => {
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formReset.classList.add('visually-hidden');
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formResetTitle.textContent = '';

    currentStep = 0;
    updateFieldsetVisibility(currentStep);
    _data_formElements__WEBPACK_IMPORTED_MODULE_3__.constant.form.reset();
  };

  _data_formElements__WEBPACK_IMPORTED_MODULE_3__.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(_data_formElements__WEBPACK_IMPORTED_MODULE_3__.form);

    const formDataObject = Object.fromEntries(formData);
    formDataObject.month = month;

    (0,_api__WEBPACK_IMPORTED_MODULE_0__.postData)(formDataObject)
      .then(() => {

        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formReset.classList.remove('visually-hidden');
        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formResetTitle.textContent = 'Данные отправлены!';
        console.log('Данные отправлены');

        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formBtnReset.addEventListener('click', resetForm);
      })
      .catch(error => {
        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formReset.classList.remove('visually-hidden');
        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formResetTitle.textContent = 'Данные не отправлены, попробуйте позже';
        console.error(`Ошибка при отправке данных: ${error}`);

        _data_formElements__WEBPACK_IMPORTED_MODULE_3__.formBtnReset.addEventListener('click', resetForm);
      });

  })
}

init();
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchData: function() { return /* binding */ fetchData; },
/* harmony export */   postData: function() { return /* binding */ postData; }
/* harmony export */ });
const BASE__URL = 'https://noble-deciduous-booth.glitch.me/';

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function fetchData() {
  return fetch(`${BASE__URL}/api`)
    .then(handleRequest)
}

function postData(data) {
  return fetch(`${BASE__URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleRequest)
}



/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allMonths: function() { return /* binding */ allMonths; }
/* harmony export */ });
const allMonths = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь"
];


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRadioBtns: function() { return /* binding */ createRadioBtns; },
/* harmony export */   createRadioInput: function() { return /* binding */ createRadioInput; },
/* harmony export */   createRadioLabel: function() { return /* binding */ createRadioLabel; }
/* harmony export */ });
function createRadioInput(name, value, id) {
  const radioInput = document.createElement('input');
  radioInput.className = 'radio__input';
  radioInput.type = 'radio';
  radioInput.name = name;
  radioInput.id = id;
  radioInput.value = value;
  return radioInput;
}

function createRadioLabel(id, title) {
  const radioLabel = document.createElement('label');
  radioLabel.className = 'radio__label';
  radioLabel.htmlFor = id;
  radioLabel.textContent = title;
  return radioLabel;
}

function createRadioBtns(wrapper, name, data) {
  wrapper.textContent = '';
  data.forEach(item => {
    const radioDiv = document.createElement('div');
    radioDiv.className = 'radio';

    const radioInput = createRadioInput(name, item.value, item.value);
    const radioLabel = createRadioLabel(item.value, item.title);

    radioDiv.append(radioInput, radioLabel);
    wrapper.append(radioDiv);
  })
}


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataToWrite: function() { return /* binding */ dataToWrite; },
/* harmony export */   daysRadioWrapper: function() { return /* binding */ daysRadioWrapper; },
/* harmony export */   form: function() { return /* binding */ form; },
/* harmony export */   formBtnReset: function() { return /* binding */ formBtnReset; },
/* harmony export */   formButtons: function() { return /* binding */ formButtons; },
/* harmony export */   formFieldsetClient: function() { return /* binding */ formFieldsetClient; },
/* harmony export */   formFieldsetDate: function() { return /* binding */ formFieldsetDate; },
/* harmony export */   formFieldsetType: function() { return /* binding */ formFieldsetType; },
/* harmony export */   formFieldsets: function() { return /* binding */ formFieldsets; },
/* harmony export */   formInfoData: function() { return /* binding */ formInfoData; },
/* harmony export */   formInfoType: function() { return /* binding */ formInfoType; },
/* harmony export */   formMonthsWrapper: function() { return /* binding */ formMonthsWrapper; },
/* harmony export */   formReset: function() { return /* binding */ formReset; },
/* harmony export */   formResetTitle: function() { return /* binding */ formResetTitle; },
/* harmony export */   formTime: function() { return /* binding */ formTime; },
/* harmony export */   timesRadioWrapper: function() { return /* binding */ timesRadioWrapper; },
/* harmony export */   typesRadioWrapper: function() { return /* binding */ typesRadioWrapper; }
/* harmony export */ });
const form = document.querySelector('.form');
const formFieldsetType = document.querySelector('.form__fieldset_type');
const formFieldsetDate = document.querySelector('.form__fieldset_date');
const formFieldsetClient = document.querySelector('.form__fieldset_client');
const formReset = form.querySelector('.form__reset');
const formResetTitle = formReset.querySelector('.form__reset-title');
const formBtnReset = formReset.querySelector('.form__reset-btn');

const formFieldsets = [formFieldsetType, formFieldsetDate, formFieldsetClient];

const formButtons = {
  prev: document.querySelector('.form__btn_prev'),
  next: document.querySelector('.form__btn_next'),
  submit: document.querySelector('.form__btn_submit')
};

const formTime = document.querySelector('.form__time');
const typesRadioWrapper = document.querySelector('.form__radio-wrapper_type');
const daysRadioWrapper = document.querySelector('.form__radio-wrapper_day');
const timesRadioWrapper = document.querySelector('.form__radio-wrapper_time');
const formMonthsWrapper = document.querySelector('.form__months');
const formInfoType = document.querySelector('.form__info_type');
const formInfoData = document.querySelector('.form__info_data');


const dataToWrite = {
  dataType: {},
  day: '',
  time: '',
}


/***/ })
/******/ 	]);
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
/******/ 	/* webpack/runtime/async module */
/******/ 	!function() {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = function(queue) {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach(function(fn) { fn.r--; });
/******/ 				queue.forEach(function(fn) { fn.r-- ? fn.r++ : fn(); });
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = function(deps) { return deps.map(function(dep) {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then(function(r) {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, function(e) {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = function(fn) { fn(queue); };
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = function() {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}); };
/******/ 		__webpack_require__.a = function(module, body, hasAwait) {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise(function(resolve, rej) {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = function(fn) { queue && fn(queue), depQueues.forEach(fn), promise["catch"](function() {}); };
/******/ 			module.exports = promise;
/******/ 			body(function(deps) {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = function() { return currentDeps.map(function(d) {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}); }
/******/ 				var promise = new Promise(function(resolve) {
/******/ 					fn = function() { resolve(getResult); };
/******/ 					fn.r = 0;
/******/ 					var fnQueue = function(q) { q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))); };
/******/ 					currentDeps.map(function(dep) { dep[webpackQueues](fnQueue); });
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, function(err) { (err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue); });
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;