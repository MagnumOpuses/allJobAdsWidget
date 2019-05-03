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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/event-handler/index.js":
/*!*********************************************!*\
  !*** ./node_modules/event-handler/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var eventHandler = function(){\n    var events = {};\n    var suspendedEvents = {};\n\n    /**\n     * @param {string|array} eventName\n     * @param {function} callback\n     */\n    this.on = function(eventName, callback){\n        if(typeof(callback) != 'function'){\n            throw new Error('Callback must be function.');\n        }\n\n        if(!Array.isArray(eventName)){\n            eventName = [eventName];\n        }\n\n        for(var i = 0; i < eventName.length; i++){\n\n            var name = eventName[i];\n\n            if(this.isSuspended(name)){\n                suspendedEvents[name].push(callback);\n                continue;\n            }\n\n            if(!this.isActive(name)){\n                events[name] = [];\n            }\n\n            events[name].push(callback);\n            return this;\n        }\n    };\n\n    /**\n     * @param  {string} eventName\n     * @returns {boolean}\n     */\n    this.isRegistered = function(eventName){\n        return this.isActive(eventName) || this.isSuspended(eventName);\n    };\n\n    /**\n     * @param {string} eventName\n     * @returns {boolean}\n     */\n    this.isSuspended = function(eventName){\n        return typeof(suspendedEvents[eventName]) != 'undefined';\n    };\n\n    /**\n     * @param {string} eventName\n     * @returns {boolean}\n     */\n    this.isActive = function(eventName){\n        return typeof(events[eventName]) != 'undefined';\n    };\n\n    /**\n     * @param {string} eventName\n     * @returns {boolean}\n     */\n    this.remove = function(eventName){\n        if(this.isSuspended(eventName)){\n            delete suspendedEvents[eventName];\n            return true;\n        }\n\n        if(this.isActive(eventName)){\n            delete events[eventName];\n            return true;\n        }\n\n        return false;\n    };\n\n    /**\n     * @param {string} eventName\n     * @returns {boolean}\n     */\n    this.suspend = function (eventName){\n        if(this.isActive(eventName)){\n            suspendedEvents[eventName] = events[eventName];\n            delete events[eventName];\n\n            return true;\n        }\n        return false;\n    };\n\n    /**\n     * @param {string} eventName\n     * @returns {boolean}\n     */\n    this.unsuspend = function (eventName){\n        if(this.isSuspended(eventName)){\n            events[eventName] = suspendedEvents[eventName];\n            delete suspendedEvents[eventName];\n\n            return true;\n        }\n        return false;\n    };\n\n    /**\n     * @param {string|array} eventName\n     * @param {object|array|string|int|float} data\n     */\n    this.fire = function(eventName, data){\n        if(!Array.isArray(data)){\n            data = [data];\n        }\n\n        if(!Array.isArray(eventName)){\n            eventName = [eventName];\n        }\n\n        for(var j = 0; j < eventName.length; j++){\n\n            var name = eventName[j];\n\n            if(!this.isActive(name)){\n                continue;\n            }\n\n            for(var i = 0; i < events[name].length; i++){\n                var callback = events[name][i];\n                callback.apply(null, data);\n            }\n        }\n        return this;\n    }\n};\n\n\nmodule.exports = eventHandler;\n\n//# sourceURL=webpack:///./node_modules/event-handler/index.js?");

/***/ }),

/***/ "./node_modules/pagination/index.js":
/*!******************************************!*\
  !*** ./node_modules/pagination/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar eventHandler = __webpack_require__(/*! event-handler */ \"./node_modules/event-handler/index.js\");\n\nvar pagination = function (paginationWrapper, data) {\n    var events = new eventHandler();\n\n    var currentPage = data.currentPage || 1;\n    var itemsPerPage = data.itemsPerPage || 30;\n    var step = data.step || 3;\n    var size = Math.ceil(data.totalItems / itemsPerPage);\n\n    if(typeof(data.onInit) == 'function'){\n        events.on('init', data.onInit);\n    }\n    if(typeof(data.onPageChanged) == 'function'){\n        events.on('pageChanged', data.onPageChanged);\n    }\n\n    var navArrows;\n    var numPages = size;\n    var firstLoad = true;\n\n    /**\n     * @param {function} callback\n     * @returns {pagination}\n     */\n    this.onPageChanged = function (callback) {\n        events.on('pageChanged', callback);\n        return this;\n    };\n\n    /**\n     * @returns {number}\n     */\n    this.getCurrentPage = function () {\n        return currentPage;\n    };\n\n\n    this.getPrevPage = function () {\n        if (currentPage > 1) {\n            return currentPage--;\n        }\n\n        return false;\n    };\n\n    this.getNextPage = function () {\n        if (currentPage < numPages) {\n            return currentPage++\n        }\n\n        return false;\n    };\n\n    var paginationContainer = function (paginationWrapper) {\n        var template = [\n            '<a class=\"arrowLeft\">&#9668;</a>',     // previous\n            '<span></span>',                        // pagination container\n            '<a class=\"arrowRight\">&#9658;</a>'     // next\n        ];\n        paginationWrapper.innerHTML = template.join('');\n    };\n\n    var arrows = function (paginationWrapper) {\n        navArrows = paginationWrapper.getElementsByTagName('a');\n        navArrows[0].addEventListener('click', function () {\n            prevPage(paginationWrapper);\n        }, false);\n        navArrows[1].addEventListener('click', function () {\n            nextPage(paginationWrapper);\n        }, false);\n    };\n\n    var prevPage = function (paginationWrapper) {\n        if (currentPage > 1) {\n            currentPage--;\n            changeContent(paginationWrapper);\n        }\n    };\n\n    var nextPage = function (paginationWrapper) {\n        if (currentPage < numPages) {\n            currentPage++;\n            changeContent(paginationWrapper);\n        }\n    };\n\n    var changeContent = function (paginationWrapper) {\n\n        if(firstLoad == false){\n            events.fire('pageChanged', [currentPage]);\n        }\n\n        if(firstLoad == true){\n            firstLoad = false;\n        }\n\n        var pageNumbersWrapper = paginationWrapper.getElementsByTagName('span')[0];\n        pageNumbersWrapper.innerHTML = paginationTemplate();\n        attachPageEvents(paginationWrapper, pageNumbersWrapper.getElementsByTagName('a'));\n    };\n\n    var attachPageEvents = function (paginationWrapper, pageLinks) {\n        for(var i = 0; i < pageLinks.length; i++){\n            pageLinks[i].addEventListener('click', function(){\n                currentPage = this.innerText;\n                changeContent(paginationWrapper);\n            }, false);\n        }\n    };\n\n    var paginationTemplate = function () {\n        var template = '';\n        var elementsToShow = step * 2;\n\n        var add = {\n            pageNum : function(start, end){\n                for(var i = start; i <= end; ++i){\n                    if(i == currentPage){\n                        template += '<a class=\"current pagNumber\">' + i + '</a>';\n                    }else{\n                        template += '<a class=\"pagNumber\">' + i + '</a>';\n                    }\n                }\n            },\n            startDots: function () {\n                // add first currentPage with separator\n                template += '<a class=\"pagNumber\">1</a><i class=\"pagDots\">...</i>';\n            },\n\n            endDots: function () {\n                template += '<i class=\"pagDots\">...</i><a class=\"pagNumber\">' + numPages + '</a>';\n            }\n        };\n\n        if(elementsToShow >= numPages){\n            add.pageNum(1, numPages);\n        }else {\n            if(currentPage < elementsToShow){\n                add.pageNum(1, elementsToShow);\n                add.endDots();\n            }else if(currentPage > numPages - elementsToShow){\n                add.startDots();\n                add.pageNum(numPages - elementsToShow, numPages);\n            }else{\n                add.startDots();\n                add.pageNum(currentPage - step, parseInt(currentPage) + parseInt(step));\n                add.endDots();\n            }\n        }\n        return template;\n    };\n\n    var createPagination = function (paginationWrapper) {\n        paginationContainer(paginationWrapper);\n        arrows(paginationWrapper);\n        changeContent(paginationWrapper);\n    };\n\n    createPagination(paginationWrapper);\n    events.fire('init', currentPage);\n};\n\nmodule.exports = pagination;\n\n\n//# sourceURL=webpack:///./node_modules/pagination/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pagination = __webpack_require__(/*! pagination */ \"./node_modules/pagination/index.js\");\n\n(function(window, document) {\n\n  // ---------------------------- Changeable variables start ---------------------------- //\n\n  let logging = false;\n  const scriptDomain = getScriptURL().split('script/AfPbWidget.js')[0];\n  const scriptsUrl = scriptDomain + \"/script/\";\n  const cssUrl = scriptDomain + \"/css/\";\n  const lang = 'sv'  // en or sv\n\n  // ---------------------------- Changable variables end ---------------------------- //\n\n  let afw, pag1;\n  const ApiLimit = 2000;\n  const allJobsApiUrl = \"https://jobtechjobs-api.dev.services.jtech.se/market/\" \n  const afJobsApiUrl =\"https://open-api.dev.services.jtech.se/\";\n\n\n\n  // ---------------------------- Helper functions start ---------------------------- //\n\n  /**\n   * Will console log a array of function trace and value of passed variable \"log\"\n   * @param {*} log - can be string, array or object\n   */\n  function l(log) \n  {\n    if(logging)\n    {\n      var stack;\n  \n      try \n      {\n        throw new Error('');\n      }\n      catch (error) \n      {\n        stack = error.stack || '';\n      }\n    \n      stack = stack.split('\\n').map(function (line) { return line.trim(); });\n      stack.push(numOfChar('-',log.length));\n      stack.push(log);\n      stack.reverse();\n      console.log(stack.slice(0, -2));\n    }\n  }\n  \n  function numOfChar(char,count) \n  {\n    var str='';\n    var i = 0;\n    do {\n      i++;\n      str += char;\n    } while (i < count);\n    return str;\n  }\n\n  function getScriptURL() \n  {\n    // IE don't support currentScript, solution = querySelector\n    var script =  document.currentScript || document.querySelector('script[src*=\"AfPbWidget.js\"]')\n    l('loaded script:' + script.src );\n    return script.src\n  }\n\n  function getStylesheet(url) \n  {\n    var linkElement = document.createElement(\"link\");\n    linkElement.href = url;\n    linkElement.rel = \"stylesheet\";\n    var head = document.getElementsByTagName(\"head\")[0],\n      done = false;\n    // Attach handlers for all browsers\n    linkElement.onload = linkElement.onreadystatechange = function() \n    {\n      if (\n        !done &&\n        (!this.readyState ||\n          this.readyState == \"loaded\" ||\n          this.readyState == \"complete\")\n      ) {\n        done = true;\n        //success();\n        l('loaded css:' + url);\n        linkElement.onload = linkElement.onreadystatechange = null;\n        // head.removeChild(linkElement);\n      }\n    };\n    head.appendChild(linkElement);\n  }\n\n  function getScript(url, success) \n  {\n    var script = document.createElement(\"script\");\n    script.src = url;\n    var head = document.getElementsByTagName(\"head\")[0],\n      done = false;\n    // Attach handlers for all browsers\n    script.onload = script.onreadystatechange = function() \n    {\n      if (\n        !done &&\n        (!this.readyState ||\n          this.readyState == \"loaded\" ||\n          this.readyState == \"complete\")\n      ) {\n        done = true;\n        success();\n        l('Loaded script:' + url);\n        script.onload = script.onreadystatechange = null;\n        head.removeChild(script);\n      }\n    };\n    head.appendChild(script);\n  }\n\n  function delay() \n  {\n    return new Promise(resolve => setTimeout(resolve, 1300));\n  }\n\n  function ajax_get(url, callback) \n  {\n    var request = new XMLHttpRequest();\n    request.open(\"GET\", url, true);\n    request.onreadystatechange = function() \n    {\n      if (request.readyState == 4 && request.status == 200) \n      {\n        try \n        {\n          var data = JSON.parse(request.responseText);\n        } \n        catch(err) \n        {\n          console.log(err.message + \" in \" + request.responseText);\n          return;\n        }\n        callback(data);\n      }\n    };\n \n    request.open(\"GET\", url, true);\n    if(url.search('open-api.dev') > 1 || url.search('/vf/') > 1) \n    {\n      l('AfJobs headers set for:' + url);\n      request.setRequestHeader(\"api-key\", \"apa\");\n    } \n    else \n    {\n      l('AllJobs headers set for: ' + url );\n      request.setRequestHeader(\"api-key\", \"am9ic2Nhbm5lckBqdGVjaC5zZQo\");\n    }\n    request.send();\n  }\n\n  function checkImageExists(imageUrl, callBack) \n  {\n    var imageData = new Image();\n    imageData.onload = function() \n    {\n      callBack(true);\n    };\n    imageData.onerror = function() \n    {\n      callBack(false);\n    };\n    imageData.src = imageUrl;\n  }\n\n  function i18n(template) \n  {\n    for (var\n      info = i18n.db[i18n.locale][template.join('\\x01')],\n      out = [info.t[0]],\n      i = 1, length = info.t.length; i < length; i++\n    ) out[i] = arguments[1 + info.v[i - 1]] + info.t[i];\n    return out.join('');\n  }\n  i18n.locale = lang;\n  i18n.db = {};\n  \n  i18n.set = locale => (tCurrent, ...rCurrent) => {\n    const key = tCurrent.join('\\x01');\n    let db = i18n.db[locale] || (i18n.db[locale] = {});\n    db[key] = {\n      t: tCurrent.slice(),\n      v: rCurrent.map((value, i) => i)\n    };\n    const config = {\n      for: other => (tOther, ...rOther) => {\n        db = i18n.db[other] || (i18n.db[other] = {});\n        db[key] = {\n          t: tOther.slice(),\n          v: rOther.map((value, i) => rCurrent.indexOf(value))\n        };\n        return config;\n      }\n    };\n    return config;\n  };\n  \n  // .for('sv')`Hallo ${'name'}`; example with variable\n  i18n.set('en')`Apply`\n      .for('sv')`Ansök`;\n\n  function createE(e, c = '', i = '') \n  {\n    var r = document.createElement(e);\n    r.className = c;\n    r.innerHTML = i;\n    return r;\n  }\n\n  async function ApiUrl(cont, page, callback)\n  {\n      // defaults \n      var limit = 5;\n      var offset = 0;\n      var showexpired = false;\n      var q = '';\n      var places = '';\n      var httpRequestString = allJobsApiUrl;\n      if(cont.dataset.source != \"all\") {\n        var httpRequestString = afJobsApiUrl;\n      }\n\n      if(page > 1 ) {\n        offset = (page * limit) - limit;\n      }\n\n      // fetch from container\n      if(cont.dataset.limit) { limit = cont.dataset.limit; }\n      if(cont.dataset.showexpired) { showexpired = cont.dataset.showexpired; }\n      if(cont.dataset.q) { q = cont.dataset.q; }\n      if(cont.dataset.source != \"all\")\n      {\n        if(cont.dataset.places) \n        { \n          var search = cont.dataset.places.split(',');\n          const response = search.map(fetchLocationId);\n      \n          Promise.all(response).then(places => {\n            places = places.join('&municipality='); \n            httpRequestString += \"search?q=\" + q +\n            \"&municipality=\" + places +\n            \"&offset=\" + offset +\n            \"&limit=\" + limit;\n            callback(httpRequestString);\n\n          });      \n        }\n      } else {\n        if(cont.dataset.places) \n        { \n          places = cont.dataset.places.split(',').join('&place=');\n          httpRequestString += \"search?show-expired=\" + showexpired +\n          \"&q=\" + q +\n          \"&place=\" + places +\n          \"&offset=\" + offset +\n          \"&limit=\" + limit;\n          callback(httpRequestString);\n\n        }\n      }\n  }\n\n  function toHttps(url) \n  {\n    return url.replace('http:', 'https:');\n  }\n\n  function addAdListener(query, call) \n  {\n    [].forEach.call( document.querySelectorAll( query ), function ( e ) \n    {\n      e.addEventListener( 'click', function (event) \n      {\n        event.preventDefault();\n        fnCall(call, e);\n      }, false );\n    });\n  }\n\n  function fnCall(fn, ...args)\n  {\n    let func = (typeof fn ==\"string\")?window[fn]:fn;\n    if (typeof func == \"function\") func(...args)\n    else console.error(`${fn} is Not a function!`);\n  }\n\n  function addClass(e, c) \n  {\n    if (e.classList) \n    { \n      e.classList.add(c);\n    } \n    else \n    {\n      arr = e.className.split(\" \");\n      if (arr.indexOf(c) == -1) \n      {\n        e.className += \" \" + c;\n      }\n    }    \n  }\n\n  function removeClass(e,c) \n  {\n    if (e.classList) \n    { \n      e.classList.remove(c);\n    } \n    else \n    {\n      e.className = e.className.replace(/\\b\"+ c +\"\\b/g, \"\");\n    }\n  }\n\n  function fetchLocationId(s) \n  {\n    url = 'https://jobs.dev.services.jtech.se/vf/search?offset=0&limit=10&type=municipality&show-count=false&q=' + s;\n    return new Promise(resolve => ajax_get(url, function(response)\n    {\n      var places = [];\n      municipalies = response.result;\n      municipalies.forEach(function(municipality)\n      {\n        places.push(municipality.id);\n      })\n      resolve(places);\n    }));\n  }\n\n\t// ---------------------------- Helper functions end ---------------------------- //\n\n  document.addEventListener(\"DOMContentLoaded\", function(event) { \n    \n    // don't add widget if it exists\n    var widget =  document.getElementById(\"afModalWrapper\");\n    if (widget != undefined) {\n      return false;\n    }\n    \n    l('document loaded');\n    afw = document.getElementById(\"afWidgetContainer\");\n    if(afw == undefined) {\n      throw new Error(\"can't find container for widget\");\n    }\n\n    getStylesheet(cssUrl + \"AfPbWidget.css\");\n    getStylesheet(\"https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,800\");\n\n    var afJobCount = document.getElementById(\"afJobCount\");\n    if (afJobCount != undefined) {\n\n      // counter could be empty or have own values\n      var cont = afJobCount;\n      if(\n        afJobCount.dataset.q == undefined && \n        afJobCount.dataset.showexpired == undefined && \n        afJobCount.dataset.places == undefined\n        ) {\n        cont = afw;          \n      }\n      ApiUrl(cont, 0, function(url) {\n        ajax_get(url, function(annonsdata) {\n          var total = parseTotal(annonsdata).toString().split('');\n          afJobCount.innerHTML = '';\n          total.forEach(function(num) {\n            var el = createE(\"span\", \"letter\", num);\n            afJobCount.appendChild(el);\n  \n          });\n        })\n        /*\n        .fail(function() {\n          $afJobCount.html(\"Missing data\");\n          console.log(\"Couldn't get job ad from remote service\");\n        });\n        */  \n\n      });     \n\n    }\n\n    var wrapper = createE(\"div\");\n    wrapper.id = \"afModalWrapper\";\n    wrapper.innerHTML = `<div id='afModal' class='afmodal' style='display: none'>\n        <a href=\"#close-modal\" class=\"close-modal \">Close</a>\n        <div id=\"afmodalContent\">\n          <div class='afmodal-header afRow'>\n              <h2>Här har du jobben</h2>\n          </div>\n          <div class='afRow' >\n              <div id='afListContent' class=\"afListContent\">\n                  <div class=\"afTable\">\n                      <div id=\"afAnnonsTableBody\" >\n                          <!-- generated rows will go here-->\n                      </div>\n                  </div>\n              </div>\n              <div class=\"afPaginationWrapper\">\n                  <div class=\"afPagination\"></div>\n              </div>\n          </div>\n        </div>\n      </div>`;\n    document.body.appendChild(wrapper);\n\n    // build header \n    var t = document.querySelector(\"#afmodalContent h2\");\n    t.innerText = 'Jobbannonser ';\n    if(afw.dataset.q) {\n      var q = document.createElement('span');\n      q.className = 'afSelected';\n      q.innerText = afw.dataset.q;\n      t.innerHTML = 'Annonser för ';\n      t.appendChild(q);\n    }\n\n    if(afw.dataset.places) {\n      var p = document.createElement('span');\n      p.className = 'afSelected';\n      p.innerText = afw.dataset.places;\n      t.innerHTML += ' att söka i ';\n      t.appendChild(p);\n\n    }\n\n    afw.onclick = function() \n    {\n      addClass(wrapper,\"blocker\");\n      wrapper.firstChild.setAttribute(\"style\", \"display: inline-block\");\n      getAds(1);\n    };\n\n    // close modal. \n    addAdListener(\".close-modal\", function(e) \n    {\n      removeClass(wrapper, \"blocker\");\n      wrapper.firstChild.setAttribute(\"style\", \"display: none\");\n    });\n\n  });\n\n  function parseTotal(adData) {\n    l(adData);\n    if(adData.total.value != undefined) \n    {\n      // af\n      return adData.total.value;\n    } \n    else \n    {\n      // all\n      return adData.total;\n    }\n  }\n\n  var addAdRow = function(ad) \n  {\n    // move af data to be work as alljobs\n    if(afw.dataset.source != \"all\") {\n        ad.header = ad.headline;\n        ad.location = '';\n        if(ad.workplace_address.postcode) {\n          ad.location += ad.workplace_address.postcode;\n        }\n        if(\n          ad.workplace_address.municipality && \n          ad.location.search(ad.workplace_address.municipality) < 1\n          ) {\n          if(ad.location.length > 0) {\n            ad.location += ', ';\n          }\n          ad.location += ad.workplace_address.municipality;\n        }\n        ad.application = {};\n        if(ad.application_details.email) {\n          ad.application.url = 'mailto:' + ad.application_details.email;\n        }\n        if(ad.application_details.url) {\n          ad.application.url = ad.application_details.url;\n        }\n        if(ad.application_deadline) {\n          ad.application.deadline = ad.application_deadline;\n        }\n\n        ad.markup = ad.description.text;\n    }\n\n    l(ad);\n    \n    // wrapper\n    var newRow = createE(\"div\", \"afTableRow\");\n    newRow.id = ad.id;    \n\n    var cell = createE(\"div\", \"afTableCell\");\n    var row = createE(\"div\", \"afRow\");\n\n    // header\n    var adheadElement = createE(\"h3\",'',ad.header);\n    var jobplaceElement = createE(\"div\", \"afJobplace\");\n    // below header\n    if (ad.employer.name != undefined) \n    {\n        jobplaceElement.innerHTML = ad.employer.name + \", \";\n    }\n    jobplaceElement.innerHTML += ad.location;\n    row.appendChild(adheadElement);\n\n    if (ad.application.deadline != undefined) \n    {\n        var date = new Date(ad.application.deadline).toLocaleDateString(undefined, {\n            day: '2-digit',\n            month: '2-digit',\n            year: 'numeric'\n        })\n        var deadline = createE(\"span\", \"afDeadline\", \"Sista ansökningsdagen: \" + date);\n        row.appendChild(deadline);\n    }\n    row.appendChild(jobplaceElement);\n\n    if (ad.employer.logoUrl) \n    {\n      var logoUrl = toHttps(ad.employer.logoUrl);\n      checkImageExists(logoUrl, function(existsImage) \n      {\n        if(existsImage == true) \n        {\n          var logoElement = createE(\"img\", \"afListlogo\");\n          logoElement.src = logoUrl;\n          row.prepend(logoElement);\n        }\n        else \n        {\n          // image not exist\n        }\n      });\n    }\n    // more info\n    var readMore = createE(\"div\", \"afReadMore\");\n    var close = createE(\"a\",\"afAdClose\",\"Stäng\");\n    close.title = \"Stäng\";\n    readMore.appendChild(close);\n    var content = createE(\"article\", \"afAdText\", ad.markup);\n    readMore.appendChild(content);\n\n    var url = '';\n    if(ad.application.url) \n    {\n      url = ad.application.url;\n    } \n    else if(ad.sources != undefined && ad.sources[0].url) \n    {\n      url = ad.sources[0].url;\n    }\n    \n    if(url.length > 1) \n    {\n      var applyLink = createE(\"a\", \"afApply\");\n      applyLink.href = url;\n      applyLink.text = i18n`Apply`;\n      // target blank for link but not email\n      if(url.search('mailto') < 0) {\n        applyLink.target = '_blank';\n      }\n      readMore.appendChild(applyLink);\n    }\n    if(ad.sista_ansokningsdag) \n    {\n      left.appendChild(dateElement);\n    }\n    cell.appendChild(row);\n    cell.appendChild(readMore);\n    newRow.appendChild(cell);\n    return newRow;\n\n  }\n\n  async function getAds(page) \n  {\n    //TODO: Show waiting gif while fetching data\n    ApiUrl(afw, page, function(url) \n    {\n      ajax_get(url, function(annonsdata) \n      {\n        var total = parseTotal(annonsdata);\n        if(total > ApiLimit)\n        {\n          total = ApiLimit;\n        }\n\n        if(pag1 == undefined)\n        {\n          l('pagination inizialised');\n          pag1 = new pagination(document.getElementsByClassName('afPagination')[0],\n            {\n              currentPage: 1,\t                  \t// number\n              totalItems: total,                  // number\n              itemsPerPage: afw.dataset.limit,    // number\n              step: 2,\t\t\t                      // number\n              onInit: getAds\t                    // function\n            }\n          );\n          pag1.onPageChanged(getAds);\n        }\n\n        var annonsTableBody = document.getElementById(\"afAnnonsTableBody\");\n        annonsTableBody.innerHTML= '';\n\n        var annonser = {};\n        if(annonsdata.hits)\n        {\n          annonser = annonsdata.hits;\n        }\n        else \n        {\n          annonser = annonsdata.platsannonser;\n        }\n        annonser.forEach(function(annons) \n        {\n          annonsTableBody.appendChild(addAdRow(annons));\n        });\n\n        // ad opener\n        addAdListener(\".afTableRow h3\", function(e) \n        {\n          document.querySelectorAll(\".afTableCell\").forEach(function (e) \n          {\n            removeClass(e, \"opened\");\n          });\n          e.parentNode.parentNode.className += \" opened\";   \n        });\n\n        // ad closer\n        addAdListener(\".afAdClose\", function() \n        {\n          document.querySelectorAll(\".afTableCell\").forEach(function (e) \n          {\n            removeClass(e, \"opened\");\n          });\n        });\n        \n      })\n      /*\n      .fail(function() {\n        console.log(\"Couldn't get job ad from remote service\");\n      });\n      */\n    });\n  }\n})(window, document);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });