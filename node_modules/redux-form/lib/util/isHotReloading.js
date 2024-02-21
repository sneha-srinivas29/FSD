"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var isHotReloading = function isHotReloading() {
  var castModule = typeof module !== 'undefined' && module;
  return !!(castModule && castModule.hot && typeof castModule.hot.status === 'function' && castModule.hot.status() === 'apply');
};

var _default = isHotReloading;
exports["default"] = _default;