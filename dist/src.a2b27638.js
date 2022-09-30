// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
var URL = "https://script.google.com/macros/s/AKfycbzpnjGlXSJheKpWsN9C-YqD5npxEF07yIiz3WTDAh3xFFmjDFHovVY7uSVDBmh4xjMu/exec"; // login function

var showEle = function showEle(element) {
  element.classList.remove("hidden");
};

var hiddenEle = function hiddenEle(element) {
  element.classList.add("hidden");
};

var modalEle = document.querySelector(".modal");

var handleLogin = function handleLogin() {
  var userName = document.querySelector("#userName").value;
  var passWord = document.querySelector("#passWord").value;
  var cautionEle = document.querySelector(".login-form .caution");

  if (userName === "" || passWord === "") {
    cautionEle.innerHTML = "Nhập đủ thông tin";
    showEle(cautionEle);
    return;
  }

  showEle(modalEle);
  var submitData = {
    type: "login",
    data: {
      user: userName,
      password: passWord
    }
  };
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    hiddenEle(modalEle);

    if (data.status) {
      showEle(document.querySelector(".nav"));
      showEle(document.querySelector("#searchStore"));
      hiddenEle(document.querySelector(".login-form"));
      return;
    }

    if (!data.status) {
      cautionEle.innerHTML = "thông tin đăng nhập sai";
      hiddenEle(modalEle);
    }
  }).catch(function (error) {
    console.error("Error:", error);
    alert("Đăng nhập không thành công, hãy thử lại");
    hiddenEle(modalEle);
  });
};

var userNameInput = document.querySelector("#userName");
var passWordInput = document.querySelector("#passWord");
var loginBtn = document.querySelector("#loginBtn");
var cautionEle = document.querySelector(".login-form .caution");
loginBtn.addEventListener("click", handleLogin);
userNameInput.addEventListener("input", function () {
  hiddenEle(cautionEle);
});
passWordInput.addEventListener("input", function () {
  hiddenEle(cautionEle);
}); // nav function

var navEmp = document.querySelector("#navEmp");
var navStore = document.querySelector("#navStore");
navEmp.addEventListener("click", function () {
  hiddenEle(document.querySelector("#searchStore"));
  showEle(document.querySelector("#searchEmp"));
  navEmp.classList.add("nav-active");
  navStore.classList.remove("nav-active");
});
navStore.addEventListener("click", function () {
  showEle(document.querySelector("#searchStore"));
  hiddenEle(document.querySelector("#searchEmp"));
  navStore.classList.add("nav-active");
  navEmp.classList.remove("nav-active");
}); // search infor function

var searchSiteInput = document.querySelector("#searchSite");
var searchNameInput = document.querySelector("#searchName");
var searchAddInput = document.querySelector("#searchAdd");
var searchBtn = document.querySelector("#searchBtn");
var cautionSearchEle = document.querySelector("#searchStore .caution");

var renderSearchStoreData = function renderSearchStoreData(data) {
  var searchResultEle = document.querySelector(".search-result");
  data.result.forEach(function (item) {
    searchResultEle.innerHTML = searchResultEle.innerHTML + "\n    <div class=\"search-result-item\">\n        <div class=\"infor-group\">\n          <div class=\"infor\">\n            <span class=\"infor-title\">Site</span>\n            <p class=\"infor-detail\">".concat(item.site, "</p>\n          </div>\n          <div class=\"infor\">\n            <span class=\"infor-title\">T\xEAn CH</span>\n            <p class=\"infor-detail\">").concat(item.siteName, "</p>\n          </div>\n          <div class=\"infor\">\n            <span class=\"infor-title\">KSTT</span>\n            <p class=\"infor-detail\">").concat(item.KSTT, "</p>\n          </div>\n          <div class=\"infor\">\n            <span class=\"infor-title\">\u0110\u1ECBa ch\u1EC9</span>\n            <p class=\"infor-detail\">\n                <a href=\"https://maps.google.com/?q=").concat(item.lat, ",").concat(item.long, "\"><i class=\"fas fa-map-marker-alt\"></i></a>\n                ").concat(item.address, "\n            </p>\n          </div>  \n        </div>\n          <i class=\"fas fa-angle-down\"></i>\n        \n        <div class=\"search-result--accordian\">\n          <div class=\"infor-group\">\n            <div class=\"infor\">\n              <span class=\"infor-title\">CHT</span>\n              <p class=\"infor-detail\">").concat(item.CHT, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">SDT</span>\n              <p class=\"infor-detail\">").concat(item.CHTPhone, "</p>\n            </div>\n          </div>\n          <div class=\"infor-group\">\n            <div class=\"infor\">\n              <span class=\"infor-title\">QLKV</span>\n              <p class=\"infor-detail\">").concat(item.QLKV, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">GDV</span>\n              <p class=\"infor-detail\">").concat(item.GDV, "</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    ");
  });
  addArrowFunction();
};

var addArrowFunction = function addArrowFunction() {
  var searchItemEleList = document.querySelectorAll(".search-result-item");
  searchItemEleList.forEach(function (item) {
    var arrowEle = item.querySelector(".fa-angle-down");
    arrowEle.addEventListener("click", function () {
      item.classList.toggle("active");
    });
  });
};

var handleSearchStore = function handleSearchStore() {
  if (searchNameInput.value === "" && searchSiteInput.value === "" && searchAddInput.value === "") {
    cautionSearchEle.innerHTML = "Nhập thông tin để tìm kiếm";
    showEle(cautionSearchEle);
    return;
  }

  showEle(modalEle);
  var submitData = {
    type: "searchStore",
    data: {
      site: searchSiteInput.value,
      siteName: searchNameInput.value,
      siteAdd: searchAddInput.value
    }
  };
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    hiddenEle(modalEle);
    renderSearchStoreData(data);
  }).catch(function (error) {
    console.error("Error:", error);
    alert("Có lỗi xảy ra, hãy thử lại");
    hiddenEle(modalEle);
  });
};

searchSiteInput.addEventListener("input", function () {
  hiddenEle(cautionSearchEle);
});
searchNameInput.addEventListener("input", function () {
  hiddenEle(cautionSearchEle);
});
searchAddInput.addEventListener("input", function () {
  hiddenEle(cautionSearchEle);
});
searchBtn.addEventListener("click", handleSearchStore); // handleSearchEmployee function

var searchDept = document.querySelector("#searchDept");
var searchPart = document.querySelector("#searchPart");
var searchPosition = document.querySelector("#searchPosition");
var searchEmpName = document.querySelector("#searchEmpName");
var searchEmpBtn = document.querySelector("#searchEmpBtn");
var cautionSearchEle2 = document.querySelector("#searchEmp .caution");

var renderSearchEmpData = function renderSearchEmpData(data) {
  var searchResultEle = document.querySelector("#searchEmp .search-result");
  data.result.forEach(function (emp) {
    searchResultEle.innerHTML = searchResultEle.innerHTML + "\n       <div class=\"search-result-item\">\n        <div class=\"infor-group\">\n          <div class=\"infor\">\n            <span class=\"infor-title\">Ph\xF2ng ban</span>\n            <p class=\"infor-detail\">".concat(emp.empDept, "</p>\n          </div>\n          <div class=\"infor\">\n            <span class=\"infor-title\">B\u1ED9 ph\u1EADn</span>\n            <p class=\"infor-detail\">").concat(emp.empPart, "</p>\n          </div>\n          <div class=\"infor\">\n            <span class=\"infor-title\">H\u1ECD t\xEAn</span>\n            <p class=\"infor-detail\">").concat(emp.empName, "</p>\n          </div>\n          \n          <div class=\"infor\">\n            <span class=\"infor-title\">C\u1EA5p b\u1EADc ch\u1EE9c danh</span>\n            <p class=\"infor-detail\">").concat(emp.empLevel + " " + emp.empPosition, "</p>\n          </div>\n          \n          <i class=\"fas fa-angle-down\"></i>\n        </div>\n        <div class=\"search-result--accordian\">\n          <div class=\"infor-group\">\n            <div class=\"infor\">\n                <span class=\"infor-title\">M\xE3 NV</span>\n                <p class=\"infor-detail\">").concat(emp.empID, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">Ng\xE0y sinh</span>\n              <p class=\"infor-detail\">").concat(emp.empBD, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">N\u01A1i \u1EDF</span>\n              <p class=\"infor-detail\">").concat(emp.empAd, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">\u0110i\u1EC7n tho\u1EA1i</span>\n              <p class=\"infor-detail\">").concat(emp.empPhone, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">CMT</span>\n              <p class=\"infor-detail\">").concat(emp.empUID, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">Qu\u1EA3n l\xFD</span>\n              <p class=\"infor-detail\">").concat(emp.empManager, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">Ng\xE0y v\xE0o</span>\n              <p class=\"infor-detail\">").concat(emp.empInDate, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">N\u01A1i l\xE0m vi\u1EC7c</span>\n              <p class=\"infor-detail\">").concat(emp.empWorkPlace, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">B\u1EB1ng c\u1EA5p</span>\n              <p class=\"infor-detail\">").concat(emp.empDegree + emp.empSchool, "</p>\n            </div>\n            <div class=\"infor\">\n              <span class=\"infor-title\">\u0110\u1ECBa ch\u1EC9</span>\n              <p class=\"infor-detail\">").concat(emp.empAddress, "</p>\n            </div>\n          </div>\n        </div>\n    ");
  });
  addArrowFunction();
};

var handleSearchEmp = function handleSearchEmp() {
  if (searchDept.value === "" && searchPart.value === "" && searchEmpName.value === "" && searchPosition.value === "") {
    cautionSearchEle2.innerHTML = "Nhập thông tin để tìm kiếm";
    showEle(cautionSearchEle2);
    return;
  }

  showEle(modalEle);
  var submitData = {
    type: "searchEmp",
    data: {
      empDept: searchDept.value,
      empPart: searchPart.value,
      empName: searchEmpName.value,
      empPosition: searchPosition.value
    }
  };
  console.log(submitData);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    hiddenEle(modalEle);
    renderSearchEmpData(data);
  }).catch(function (error) {
    console.error("Error:", error);
    alert("Có lỗi xảy ra, hãy thử lại");
    hiddenEle(modalEle);
  });
};

searchEmpBtn.addEventListener("click", handleSearchEmp);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42415" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map