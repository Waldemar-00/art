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
})({"../node_modules/core-js/internals/global.js":[function(require,module,exports) {
var global = arguments[3];
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

},{}],"../node_modules/core-js/internals/fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"../node_modules/core-js/internals/descriptors.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/object-property-is-enumerable.js":[function(require,module,exports) {
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],"../node_modules/core-js/internals/create-property-descriptor.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/internals/classof-raw.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/internals/indexed-object.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/internals/require-object-coercible.js":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"../node_modules/core-js/internals/to-indexed-object.js":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/internals/to-primitive.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/internals/document-create-element.js":[function(require,module,exports) {

var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/ie8-dom-define.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/document-create-element":"../node_modules/core-js/internals/document-create-element.js"}],"../node_modules/core-js/internals/object-get-own-property-descriptor.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/ie8-dom-define":"../node_modules/core-js/internals/ie8-dom-define.js"}],"../node_modules/core-js/internals/an-object.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/object-define-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/ie8-dom-define":"../node_modules/core-js/internals/ie8-dom-define.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js"}],"../node_modules/core-js/internals/create-non-enumerable-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js"}],"../node_modules/core-js/internals/set-global.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/core-js/internals/is-pure.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/internals/shared-store.js":[function(require,module,exports) {

var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js"}],"../node_modules/core-js/internals/shared.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.4.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/shared-store":"../node_modules/core-js/internals/shared-store.js"}],"../node_modules/core-js/internals/inspect-source.js":[function(require,module,exports) {
var shared = require('../internals/shared');

var functionToString = Function.toString;

module.exports = shared('inspectSource', function (it) {
  return functionToString.call(it);
});

},{"../internals/shared":"../node_modules/core-js/internals/shared.js"}],"../node_modules/core-js/internals/native-weak-map.js":[function(require,module,exports) {

var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/inspect-source":"../node_modules/core-js/internals/inspect-source.js"}],"../node_modules/core-js/internals/uid.js":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"../node_modules/core-js/internals/shared-key.js":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"../node_modules/core-js/internals/shared.js","../internals/uid":"../node_modules/core-js/internals/uid.js"}],"../node_modules/core-js/internals/hidden-keys.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/internals/internal-state.js":[function(require,module,exports) {

var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/native-weak-map":"../node_modules/core-js/internals/native-weak-map.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js"}],"../node_modules/core-js/internals/redefine.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js","../internals/inspect-source":"../node_modules/core-js/internals/inspect-source.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/internals/path.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global;

},{"../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/get-built-in.js":[function(require,module,exports) {

var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/path":"../node_modules/core-js/internals/path.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/to-integer.js":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"../node_modules/core-js/internals/to-length.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js"}],"../node_modules/core-js/internals/to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js"}],"../node_modules/core-js/internals/array-includes.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js"}],"../node_modules/core-js/internals/object-keys-internal.js":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js"}],"../node_modules/core-js/internals/enum-bug-keys.js":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"../node_modules/core-js/internals/object-get-own-property-names.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js"}],"../node_modules/core-js/internals/object-get-own-property-symbols.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/internals/own-keys.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-symbols":"../node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/copy-constructor-properties.js":[function(require,module,exports) {
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/own-keys":"../node_modules/core-js/internals/own-keys.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/internals/is-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/export.js":[function(require,module,exports) {

var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js","../internals/copy-constructor-properties":"../node_modules/core-js/internals/copy-constructor-properties.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js"}],"../node_modules/core-js/internals/native-symbol.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/use-symbol-as-uid.js":[function(require,module,exports) {
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol() == 'symbol';

},{"../internals/native-symbol":"../node_modules/core-js/internals/native-symbol.js"}],"../node_modules/core-js/internals/is-array.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/internals/to-object.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/object-keys.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js"}],"../node_modules/core-js/internals/object-define-properties.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js"}],"../node_modules/core-js/internals/html.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/internals/object-create.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-define-properties":"../node_modules/core-js/internals/object-define-properties.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js","../internals/html":"../node_modules/core-js/internals/html.js","../internals/document-create-element":"../node_modules/core-js/internals/document-create-element.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js"}],"../node_modules/core-js/internals/object-get-own-property-names-external.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js"}],"../node_modules/core-js/internals/well-known-symbol.js":[function(require,module,exports) {

var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/shared":"../node_modules/core-js/internals/shared.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/uid":"../node_modules/core-js/internals/uid.js","../internals/native-symbol":"../node_modules/core-js/internals/native-symbol.js","../internals/use-symbol-as-uid":"../node_modules/core-js/internals/use-symbol-as-uid.js"}],"../node_modules/core-js/internals/wrapped-well-known-symbol.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/define-well-known-symbol.js":[function(require,module,exports) {
var path = require('../internals/path');
var has = require('../internals/has');
var wrappedWellKnownSymbolModule = require('../internals/wrapped-well-known-symbol');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/path":"../node_modules/core-js/internals/path.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/wrapped-well-known-symbol":"../node_modules/core-js/internals/wrapped-well-known-symbol.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/internals/set-to-string-tag.js":[function(require,module,exports) {
var defineProperty = require('../internals/object-define-property').f;
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"../node_modules/core-js/internals/bind-context.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/internals/array-species-create.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/array-iteration.js":[function(require,module,exports) {
var bind = require('../internals/bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js"}],"../node_modules/core-js/modules/es.symbol.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var fails = require('../internals/fails');
var has = require('../internals/has');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/wrapped-well-known-symbol');
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

if (!USE_SYMBOL_AS_UID) {
  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/native-symbol":"../node_modules/core-js/internals/native-symbol.js","../internals/use-symbol-as-uid":"../node_modules/core-js/internals/use-symbol-as-uid.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-names-external":"../node_modules/core-js/internals/object-get-own-property-names-external.js","../internals/object-get-own-property-symbols":"../node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/shared":"../node_modules/core-js/internals/shared.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js","../internals/uid":"../node_modules/core-js/internals/uid.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/wrapped-well-known-symbol":"../node_modules/core-js/internals/wrapped-well-known-symbol.js","../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.symbol.async-iterator.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.description.js":[function(require,module,exports) {

// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var has = require('../internals/has');
var isObject = require('../internals/is-object');
var defineProperty = require('../internals/object-define-property').f;
var copyConstructorProperties = require('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/copy-constructor-properties":"../node_modules/core-js/internals/copy-constructor-properties.js"}],"../node_modules/core-js/modules/es.symbol.has-instance.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.is-concat-spreadable.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.iterator.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.match.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.match-all.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.replace.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.search.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.species.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.split.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.to-primitive.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.to-string-tag.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/es.symbol.unscopables.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/internals/object-assign.js":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js","../internals/object-get-own-property-symbols":"../node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js"}],"../node_modules/core-js/modules/es.object.assign.js":[function(require,module,exports) {
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-assign":"../node_modules/core-js/internals/object-assign.js"}],"../node_modules/core-js/modules/es.object.create.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js"}],"../node_modules/core-js/modules/es.object.define-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/modules/es.object.define-properties.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperties = require('../internals/object-define-properties');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-properties":"../node_modules/core-js/internals/object-define-properties.js"}],"../node_modules/core-js/internals/object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js"}],"../node_modules/core-js/modules/es.object.entries.js":[function(require,module,exports) {
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-to-array":"../node_modules/core-js/internals/object-to-array.js"}],"../node_modules/core-js/internals/freezing.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/internal-metadata.js":[function(require,module,exports) {
var hiddenKeys = require('../internals/hidden-keys');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var defineProperty = require('../internals/object-define-property').f;
var uid = require('../internals/uid');
var FREEZING = require('../internals/freezing');

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

},{"../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/uid":"../node_modules/core-js/internals/uid.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js"}],"../node_modules/core-js/modules/es.object.freeze.js":[function(require,module,exports) {
var $ = require('../internals/export');
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;

var nativeFreeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js"}],"../node_modules/core-js/internals/iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/internals/is-array-iterator-method.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js"}],"../node_modules/core-js/internals/to-string-tag-support.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/classof.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/get-iterator-method.js":[function(require,module,exports) {
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":"../node_modules/core-js/internals/classof.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/call-with-safe-iteration-closing.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/iterate.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var bind = require('../internals/bind-context');
var getIteratorMethod = require('../internals/get-iterator-method');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-array-iterator-method":"../node_modules/core-js/internals/is-array-iterator-method.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js/internals/call-with-safe-iteration-closing.js"}],"../node_modules/core-js/internals/create-property.js":[function(require,module,exports) {
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js"}],"../node_modules/core-js/modules/es.object.from-entries.js":[function(require,module,exports) {
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var createProperty = require('../internals/create-property');

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, undefined, true);
    return obj;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js"}],"../node_modules/core-js/modules/es.object.get-own-property-descriptor.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js"}],"../node_modules/core-js/modules/es.object.get-own-property-descriptors.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var ownKeys = require('../internals/own-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var createProperty = require('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/own-keys":"../node_modules/core-js/internals/own-keys.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js"}],"../node_modules/core-js/modules/es.object.get-own-property-names.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names-external').f;

var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-get-own-property-names-external":"../node_modules/core-js/internals/object-get-own-property-names-external.js"}],"../node_modules/core-js/internals/correct-prototype-getter.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/object-get-prototype-of.js":[function(require,module,exports) {
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js","../internals/correct-prototype-getter":"../node_modules/core-js/internals/correct-prototype-getter.js"}],"../node_modules/core-js/modules/es.object.get-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var nativeGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/correct-prototype-getter":"../node_modules/core-js/internals/correct-prototype-getter.js"}],"../node_modules/core-js/internals/same-value.js":[function(require,module,exports) {
// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"../node_modules/core-js/modules/es.object.is.js":[function(require,module,exports) {
var $ = require('../internals/export');
var is = require('../internals/same-value');

// `Object.is` method
// https://tc39.github.io/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/same-value":"../node_modules/core-js/internals/same-value.js"}],"../node_modules/core-js/modules/es.object.is-extensible.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsExtensible(1); });

// `Object.isExtensible` method
// https://tc39.github.io/ecma262/#sec-object.isextensible
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isExtensible: function isExtensible(it) {
    return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/es.object.is-frozen.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsFrozen(1); });

// `Object.isFrozen` method
// https://tc39.github.io/ecma262/#sec-object.isfrozen
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isFrozen: function isFrozen(it) {
    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/es.object.is-sealed.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');

var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () { nativeIsSealed(1); });

// `Object.isSealed` method
// https://tc39.github.io/ecma262/#sec-object.issealed
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isSealed: function isSealed(it) {
    return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/es.object.keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.object.prevent-extensions.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

var nativePreventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () { nativePreventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-object.preventextensions
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.object.seal.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { nativeSeal(1); });

// `Object.seal` method
// https://tc39.github.io/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/a-possible-prototype.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/object-set-prototype-of.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-possible-prototype":"../node_modules/core-js/internals/a-possible-prototype.js"}],"../node_modules/core-js/modules/es.object.set-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js"}],"../node_modules/core-js/modules/es.object.values.js":[function(require,module,exports) {
var $ = require('../internals/export');
var $values = require('../internals/object-to-array').values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-to-array":"../node_modules/core-js/internals/object-to-array.js"}],"../node_modules/core-js/internals/object-to-string.js":[function(require,module,exports) {
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/classof":"../node_modules/core-js/internals/classof.js"}],"../node_modules/core-js/modules/es.object.to-string.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine = require('../internals/redefine');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/object-to-string":"../node_modules/core-js/internals/object-to-string.js"}],"../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js":[function(require,module,exports) {

'use strict';
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var fails = require('../internals/fails');

// Forced replacement object prototype accessors methods
module.exports = IS_PURE || !fails(function () {
  var key = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete global[key];
});

},{"../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/forced-object-prototype-accessors-methods');
var toObject = require('../internals/to-object');
var aFunction = require('../internals/a-function');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/forced-object-prototype-accessors-methods":"../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/modules/es.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/forced-object-prototype-accessors-methods');
var toObject = require('../internals/to-object');
var aFunction = require('../internals/a-function');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/forced-object-prototype-accessors-methods":"../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/modules/es.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/forced-object-prototype-accessors-methods');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/forced-object-prototype-accessors-methods":"../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"../node_modules/core-js/modules/es.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/forced-object-prototype-accessors-methods');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/forced-object-prototype-accessors-methods":"../node_modules/core-js/internals/forced-object-prototype-accessors-methods.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"../node_modules/core-js/internals/function-bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('../internals/a-function');
var isObject = require('../internals/is-object');

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/es.function.bind.js":[function(require,module,exports) {
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/function-bind":"../node_modules/core-js/internals/function-bind.js"}],"../node_modules/core-js/modules/es.function.name.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/modules/es.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('../internals/is-object');
var definePropertyModule = require('../internals/object-define-property');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.github.io/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
    return false;
  } });
}

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.global-this.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');

// `globalThis` object
// https://github.com/tc39/proposal-global
$({ global: true }, {
  globalThis: global
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/array-from.js":[function(require,module,exports) {
'use strict';
var bind = require('../internals/bind-context');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var getIteratorMethod = require('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator, next;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js/internals/call-with-safe-iteration-closing.js","../internals/is-array-iterator-method":"../node_modules/core-js/internals/is-array-iterator-method.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js"}],"../node_modules/core-js/internals/check-correctness-of-iteration.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.array.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-from":"../node_modules/core-js/internals/array-from.js","../internals/check-correctness-of-iteration":"../node_modules/core-js/internals/check-correctness-of-iteration.js"}],"../node_modules/core-js/modules/es.array.is-array.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js"}],"../node_modules/core-js/modules/es.array.of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var createProperty = require('../internals/create-property');

var ISNT_GENERIC = fails(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.github.io/ecma262/#sec-array.of
// WebKit Array.of isn't generic
$({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(argumentsLength);
    while (argumentsLength > index) createProperty(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js"}],"../node_modules/core-js/internals/user-agent.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/internals/v8-version.js":[function(require,module,exports) {


var global = require('../internals/global');
var userAgent = require('../internals/user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/user-agent":"../node_modules/core-js/internals/user-agent.js"}],"../node_modules/core-js/internals/array-method-has-species-support.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/v8-version":"../node_modules/core-js/internals/v8-version.js"}],"../node_modules/core-js/modules/es.array.concat.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/v8-version":"../node_modules/core-js/internals/v8-version.js"}],"../node_modules/core-js/internals/array-copy-within.js":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/internals/add-to-unscopables.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/core-js/modules/es.array.copy-within.js":[function(require,module,exports) {
var $ = require('../internals/export');
var copyWithin = require('../internals/array-copy-within');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-copy-within":"../node_modules/core-js/internals/array-copy-within.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/internals/sloppy-array-method.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.array.every.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $every = require('../internals/array-iteration').every;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('every') }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/internals/array-fill.js":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/modules/es.array.fill.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fill = require('../internals/array-fill');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-fill":"../node_modules/core-js/internals/array-fill.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/modules/es.array.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var fails = require('../internals/fails');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
});

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js"}],"../node_modules/core-js/modules/es.array.find.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $find = require('../internals/array-iteration').find;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/modules/es.array.find-index.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $findIndex = require('../internals/array-iteration').findIndex;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/internals/flatten-into-array.js":[function(require,module,exports) {
'use strict';
var isArray = require('../internals/is-array');
var toLength = require('../internals/to-length');
var bind = require('../internals/bind-context');

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;

},{"../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js"}],"../node_modules/core-js/modules/es.array.flat.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/flatten-into-array":"../node_modules/core-js/internals/flatten-into-array.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js"}],"../node_modules/core-js/modules/es.array.flat-map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var aFunction = require('../internals/a-function');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/flatten-into-array":"../node_modules/core-js/internals/flatten-into-array.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js"}],"../node_modules/core-js/internals/array-for-each.js":[function(require,module,exports) {
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.for-each.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-for-each":"../node_modules/core-js/internals/array-for-each.js"}],"../node_modules/core-js/modules/es.array.includes.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/modules/es.array.index-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $indexOf = require('../internals/array-includes').indexOf;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.join.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var sloppyArrayMethod = require('../internals/sloppy-array-method');

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/internals/array-last-index-of.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var sloppyArrayMethod = require('../internals/sloppy-array-method');

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf');

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.last-index-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var lastIndexOf = require('../internals/array-last-index-of');

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-last-index-of":"../node_modules/core-js/internals/array-last-index-of.js"}],"../node_modules/core-js/modules/es.array.map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var fails = require('../internals/fails');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].map.call({ length: -1, 0: 1 }, function (it) { throw it; });
});

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js"}],"../node_modules/core-js/internals/array-reduce.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/modules/es.array.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduce') }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-reduce":"../node_modules/core-js/internals/array-reduce.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.reduce-right.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduceRight = require('../internals/array-reduce').right;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

// `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduceRight') }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-reduce":"../node_modules/core-js/internals/array-reduce.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.reverse.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js"}],"../node_modules/core-js/modules/es.array.slice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.array.some.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $some = require('../internals/array-iteration').some;
var sloppyArrayMethod = require('../internals/sloppy-array-method');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('some') }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.sort.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');
var sloppyArrayMethod = require('../internals/sloppy-array-method');

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = sloppyArrayMethod('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/sloppy-array-method":"../node_modules/core-js/internals/sloppy-array-method.js"}],"../node_modules/core-js/modules/es.array.splice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toObject = require('../internals/to-object');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js","../internals/create-property":"../node_modules/core-js/internals/create-property.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js"}],"../node_modules/core-js/internals/set-species.js":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js"}],"../node_modules/core-js/modules/es.array.species.js":[function(require,module,exports) {
var setSpecies = require('../internals/set-species');

// `Array[@@species]` getter
// https://tc39.github.io/ecma262/#sec-get-array-@@species
setSpecies('Array');

},{"../internals/set-species":"../node_modules/core-js/internals/set-species.js"}],"../node_modules/core-js/modules/es.array.unscopables.flat.js":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

addToUnscopables('flat');

},{"../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/modules/es.array.unscopables.flat-map.js":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

addToUnscopables('flatMap');

},{"../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js"}],"../node_modules/core-js/internals/iterators-core.js":[function(require,module,exports) {
'use strict';
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/create-iterator-constructor.js":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/iterators-core":"../node_modules/core-js/internals/iterators-core.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js"}],"../node_modules/core-js/internals/define-iterator.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/iterators-core":"../node_modules/core-js/internals/iterators-core.js"}],"../node_modules/core-js/modules/es.array.iterator.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js/internals/define-iterator.js"}],"../node_modules/core-js/modules/es.string.from-code-point.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toAbsoluteIndex = require('../internals/to-absolute-index');

var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;

// `String.fromCodePoint` method
// https://tc39.github.io/ecma262/#sec-string.fromcodepoint
$({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
      );
    } return elements.join('');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js"}],"../node_modules/core-js/modules/es.string.raw.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');

// `String.raw` method
// https://tc39.github.io/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(template.raw);
    var literalSegments = toLength(rawTemplate.length);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      elements.push(String(rawTemplate[i++]));
      if (i < argumentsLength) elements.push(String(arguments[i]));
    } return elements.join('');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/internals/string-multibyte.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/modules/es.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var codeAt = require('../internals/string-multibyte').codeAt;

// `String.prototype.codePointAt` method
// https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
$({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js"}],"../node_modules/core-js/internals/is-regexp.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/not-a-regexp.js":[function(require,module,exports) {
var isRegExp = require('../internals/is-regexp');

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":"../node_modules/core-js/internals/is-regexp.js"}],"../node_modules/core-js/internals/correct-is-regexp-logic.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.string.ends-with.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var nativeEndsWith = ''.endsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/not-a-regexp":"../node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"../node_modules/core-js/internals/correct-is-regexp-logic.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/modules/es.string.includes.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/not-a-regexp":"../node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"../node_modules/core-js/internals/correct-is-regexp-logic.js"}],"../node_modules/core-js/internals/regexp-flags.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/regexp-exec.js":[function(require,module,exports) {
'use strict';
var regexpFlags = require('./regexp-flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./regexp-flags":"../node_modules/core-js/internals/regexp-flags.js"}],"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":[function(require,module,exports) {
'use strict';
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var regexpExec = require('../internals/regexp-exec');

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

},{"../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/regexp-exec":"../node_modules/core-js/internals/regexp-exec.js"}],"../node_modules/core-js/internals/advance-string-index.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js"}],"../node_modules/core-js/internals/regexp-exec-abstract.js":[function(require,module,exports) {
var classof = require('./classof-raw');
var regexpExec = require('./regexp-exec');

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};


},{"./classof-raw":"../node_modules/core-js/internals/classof-raw.js","./regexp-exec":"../node_modules/core-js/internals/regexp-exec.js"}],"../node_modules/core-js/modules/es.string.match.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js"}],"../node_modules/core-js/internals/species-constructor.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.string.match-all.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toLength = require('../internals/to-length');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var classof = require('../internals/classof-raw');
var isRegExp = require('../internals/is-regexp');
var getRegExpFlags = require('../internals/regexp-flags');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var InternalStateModule = require('../internals/internal-state');
var IS_PURE = require('../internals/is-pure');

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var regExpBuiltinExec = RegExpPrototype.exec;
var nativeMatchAll = ''.matchAll;

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
  'a'.matchAll(/./);
});

var regExpExec = function (R, S) {
  var exec = R.exec;
  var result;
  if (typeof exec == 'function') {
    result = exec.call(R, S);
    if (typeof result != 'object') throw TypeError('Incorrect exec result');
    return result;
  } return regExpBuiltinExec.call(R, S);
};

// eslint-disable-next-line max-len
var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return { value: undefined, done: true };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) return { value: undefined, done: state.done = true };
  if (state.global) {
    if (String(match[0]) == '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return { value: match, done: false };
  }
  state.done = true;
  return { value: match, done: false };
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = String(string);
  var C, flagsValue, flags, matcher, global, fullUnicode;
  C = speciesConstructor(R, RegExp);
  flagsValue = R.flags;
  if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)) {
    flagsValue = getRegExpFlags.call(R);
  }
  flags = flagsValue === undefined ? '' : String(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  global = !!~flags.indexOf('g');
  fullUnicode = !!~flags.indexOf('u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://github.com/tc39/proposal-string-matchall
$({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;
    if (regexp != null) {
      if (isRegExp(regexp)) {
        flags = String(requireObjectCoercible('flags' in RegExpPrototype
          ? regexp.flags
          : getRegExpFlags.call(regexp)
        ));
        if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
      matcher = regexp[MATCH_ALL];
      if (matcher === undefined && IS_PURE && classof(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher != null) return aFunction(matcher).call(regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
    S = String(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? $matchAll.call(rx, S) : rx[MATCH_ALL](S);
  }
});

IS_PURE || MATCH_ALL in RegExpPrototype || createNonEnumerableProperty(RegExpPrototype, MATCH_ALL, $matchAll);

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/is-regexp":"../node_modules/core-js/internals/is-regexp.js","../internals/regexp-flags":"../node_modules/core-js/internals/regexp-flags.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('../internals/to-length');
var repeat = require('../internals/string-repeat');
var requireObjectCoercible = require('../internals/require-object-coercible');

var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

},{"../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/string-repeat":"../node_modules/core-js/internals/string-repeat.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/webkit-string-pad-bug.js":[function(require,module,exports) {
// https://github.com/zloirock/core-js/issues/280
var userAgent = require('../internals/user-agent');

// eslint-disable-next-line unicorn/no-unsafe-regex
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

},{"../internals/user-agent":"../node_modules/core-js/internals/user-agent.js"}],"../node_modules/core-js/modules/es.string.pad-end.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padEnd = require('../internals/string-pad').end;
var WEBKIT_BUG = require('../internals/webkit-string-pad-bug');

// `String.prototype.padEnd` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padend
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-pad":"../node_modules/core-js/internals/string-pad.js","../internals/webkit-string-pad-bug":"../node_modules/core-js/internals/webkit-string-pad-bug.js"}],"../node_modules/core-js/modules/es.string.pad-start.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padStart = require('../internals/string-pad').start;
var WEBKIT_BUG = require('../internals/webkit-string-pad-bug');

// `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-pad":"../node_modules/core-js/internals/string-pad.js","../internals/webkit-string-pad-bug":"../node_modules/core-js/internals/webkit-string-pad-bug.js"}],"../node_modules/core-js/modules/es.string.repeat.js":[function(require,module,exports) {
var $ = require('../internals/export');
var repeat = require('../internals/string-repeat');

// `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-repeat":"../node_modules/core-js/internals/string-repeat.js"}],"../node_modules/core-js/modules/es.string.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js"}],"../node_modules/core-js/modules/es.string.search.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var sameValue = require('../internals/same-value');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/same-value":"../node_modules/core-js/internals/same-value.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js"}],"../node_modules/core-js/modules/es.string.split.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/is-regexp":"../node_modules/core-js/internals/is-regexp.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js","../internals/regexp-exec":"../node_modules/core-js/internals/regexp-exec.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.string.starts-with.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var nativeStartsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/not-a-regexp":"../node_modules/core-js/internals/not-a-regexp.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/correct-is-regexp-logic":"../node_modules/core-js/internals/correct-is-regexp-logic.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/whitespaces.js":[function(require,module,exports) {
// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/internals/string-trim.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');
var whitespaces = require('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/internals/forced-string-trim-method.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/modules/es.string.trim.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/forced-string-trim-method');

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/forced-string-trim-method":"../node_modules/core-js/internals/forced-string-trim-method.js"}],"../node_modules/core-js/modules/es.string.trim-start.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimStart = require('../internals/string-trim').start;
var forcedStringTrimMethod = require('../internals/forced-string-trim-method');

var FORCED = forcedStringTrimMethod('trimStart');

var trimStart = FORCED ? function trimStart() {
  return $trimStart(this);
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/forced-string-trim-method":"../node_modules/core-js/internals/forced-string-trim-method.js"}],"../node_modules/core-js/modules/es.string.trim-end.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimEnd = require('../internals/string-trim').end;
var forcedStringTrimMethod = require('../internals/forced-string-trim-method');

var FORCED = forcedStringTrimMethod('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return $trimEnd(this);
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
$({ target: 'String', proto: true, forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/forced-string-trim-method":"../node_modules/core-js/internals/forced-string-trim-method.js"}],"../node_modules/core-js/modules/es.string.iterator.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js/internals/define-iterator.js"}],"../node_modules/core-js/internals/create-html.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

},{"../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/forced-string-html-method.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.string.anchor.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.anchor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.big.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.big` method
// https://tc39.github.io/ecma262/#sec-string.prototype.big
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.blink.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.blink` method
// https://tc39.github.io/ecma262/#sec-string.prototype.blink
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.bold.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.bold` method
// https://tc39.github.io/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.fixed.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.fixed` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.fontcolor.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.fontcolor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontcolor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.fontsize.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.fontsize` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontsize
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.italics.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.italics` method
// https://tc39.github.io/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.link.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.link` method
// https://tc39.github.io/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.small.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.small` method
// https://tc39.github.io/ecma262/#sec-string.prototype.small
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.strike.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.strike` method
// https://tc39.github.io/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.sub.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/modules/es.string.sup.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/forced-string-html-method');

// `String.prototype.sup` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sup
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-html":"../node_modules/core-js/internals/create-html.js","../internals/forced-string-html-method":"../node_modules/core-js/internals/forced-string-html-method.js"}],"../node_modules/core-js/internals/inherit-if-required.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js"}],"../node_modules/core-js/modules/es.regexp.constructor.js":[function(require,module,exports) {

var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var inheritIfRequired = require('../internals/inherit-if-required');
var defineProperty = require('../internals/object-define-property').f;
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var isRegExp = require('../internals/is-regexp');
var getFlags = require('../internals/regexp-flags');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var setSpecies = require('../internals/set-species');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js","../internals/inherit-if-required":"../node_modules/core-js/internals/inherit-if-required.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/is-regexp":"../node_modules/core-js/internals/is-regexp.js","../internals/regexp-flags":"../node_modules/core-js/internals/regexp-flags.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.regexp.exec.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/regexp-exec":"../node_modules/core-js/internals/regexp-exec.js"}],"../node_modules/core-js/modules/es.regexp.flags.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModule = require('../internals/object-define-property');
var regExpFlags = require('../internals/regexp-flags');

// `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
if (DESCRIPTORS && /./g.flags != 'g') {
  objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/regexp-flags":"../node_modules/core-js/internals/regexp-flags.js"}],"../node_modules/core-js/modules/es.regexp.to-string.js":[function(require,module,exports) {
'use strict';
var redefine = require('../internals/redefine');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');
var flags = require('../internals/regexp-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

},{"../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/regexp-flags":"../node_modules/core-js/internals/regexp-flags.js"}],"../node_modules/core-js/internals/parse-int.js":[function(require,module,exports) {

var global = require('../internals/global');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var nativeParseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : nativeParseInt;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/modules/es.parse-int.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseIntImplementation = require('../internals/parse-int');

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/parse-int":"../node_modules/core-js/internals/parse-int.js"}],"../node_modules/core-js/internals/parse-float.js":[function(require,module,exports) {

var global = require('../internals/global');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var nativeParseFloat = global.parseFloat;
var FORCED = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = nativeParseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/modules/es.parse-float.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseFloatImplementation = require('../internals/parse-float');

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/parse-float":"../node_modules/core-js/internals/parse-float.js"}],"../node_modules/core-js/modules/es.number.constructor.js":[function(require,module,exports) {

'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var redefine = require('../internals/redefine');
var has = require('../internals/has');
var classof = require('../internals/classof-raw');
var inheritIfRequired = require('../internals/inherit-if-required');
var toPrimitive = require('../internals/to-primitive');
var fails = require('../internals/fails');
var create = require('../internals/object-create');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var defineProperty = require('../internals/object-define-property').f;
var trim = require('../internals/string-trim').trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/inherit-if-required":"../node_modules/core-js/internals/inherit-if-required.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js"}],"../node_modules/core-js/modules/es.number.epsilon.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.EPSILON` constant
// https://tc39.github.io/ecma262/#sec-number.epsilon
$({ target: 'Number', stat: true }, {
  EPSILON: Math.pow(2, -52)
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/internals/number-is-finite.js":[function(require,module,exports) {

var global = require('../internals/global');

var globalIsFinite = global.isFinite;

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};

},{"../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/modules/es.number.is-finite.js":[function(require,module,exports) {
var $ = require('../internals/export');
var numberIsFinite = require('../internals/number-is-finite');

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/number-is-finite":"../node_modules/core-js/internals/number-is-finite.js"}],"../node_modules/core-js/internals/is-integer.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/es.number.is-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isInteger = require('../internals/is-integer');

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-integer":"../node_modules/core-js/internals/is-integer.js"}],"../node_modules/core-js/modules/es.number.is-nan.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.isNaN` method
// https://tc39.github.io/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.number.is-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isInteger = require('../internals/is-integer');

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.github.io/ecma262/#sec-number.issafeinteger
$({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-integer":"../node_modules/core-js/internals/is-integer.js"}],"../node_modules/core-js/modules/es.number.max-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.max_safe_integer
$({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.number.min-safe-integer.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.min_safe_integer
$({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.number.parse-float.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseFloat = require('../internals/parse-float');

// `Number.parseFloat` method
// https://tc39.github.io/ecma262/#sec-number.parseFloat
$({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat }, {
  parseFloat: parseFloat
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/parse-float":"../node_modules/core-js/internals/parse-float.js"}],"../node_modules/core-js/modules/es.number.parse-int.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseInt = require('../internals/parse-int');

// `Number.parseInt` method
// https://tc39.github.io/ecma262/#sec-number.parseint
$({ target: 'Number', stat: true, forced: Number.parseInt != parseInt }, {
  parseInt: parseInt
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/parse-int":"../node_modules/core-js/internals/parse-int.js"}],"../node_modules/core-js/internals/this-number-value.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

},{"../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/modules/es.number.to-fixed.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toInteger = require('../internals/to-integer');
var thisNumberValue = require('../internals/this-number-value');
var repeat = require('../internals/string-repeat');
var fails = require('../internals/fails');

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/this-number-value":"../node_modules/core-js/internals/this-number-value.js","../internals/string-repeat":"../node_modules/core-js/internals/string-repeat.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.number.to-precision.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var thisNumberValue = require('../internals/this-number-value');

var nativeToPrecision = 1.0.toPrecision;

var FORCED = fails(function () {
  // IE7-
  return nativeToPrecision.call(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToPrecision.call({});
});

// `Number.prototype.toPrecision` method
// https://tc39.github.io/ecma262/#sec-number.prototype.toprecision
$({ target: 'Number', proto: true, forced: FORCED }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? nativeToPrecision.call(thisNumberValue(this))
      : nativeToPrecision.call(thisNumberValue(this), precision);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/this-number-value":"../node_modules/core-js/internals/this-number-value.js"}],"../node_modules/core-js/internals/math-log1p.js":[function(require,module,exports) {
var log = Math.log;

// `Math.log1p` method implementation
// https://tc39.github.io/ecma262/#sec-math.log1p
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
};

},{}],"../node_modules/core-js/modules/es.math.acosh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

var nativeAcosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !nativeAcosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || nativeAcosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.github.io/ecma262/#sec-math.acosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log(x) + LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-log1p":"../node_modules/core-js/internals/math-log1p.js"}],"../node_modules/core-js/modules/es.math.asinh.js":[function(require,module,exports) {
var $ = require('../internals/export');

var nativeAsinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}

// `Math.asinh` method
// https://tc39.github.io/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$({ target: 'Math', stat: true, forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0) }, {
  asinh: asinh
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.math.atanh.js":[function(require,module,exports) {
var $ = require('../internals/export');

var nativeAtanh = Math.atanh;
var log = Math.log;

// `Math.atanh` method
// https://tc39.github.io/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$({ target: 'Math', stat: true, forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/internals/math-sign.js":[function(require,module,exports) {
// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"../node_modules/core-js/modules/es.math.cbrt.js":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.github.io/ecma262/#sec-math.cbrt
$({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign(x = +x) * pow(abs(x), 1 / 3);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-sign":"../node_modules/core-js/internals/math-sign.js"}],"../node_modules/core-js/modules/es.math.clz32.js":[function(require,module,exports) {
var $ = require('../internals/export');

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.github.io/ecma262/#sec-math.clz32
$({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/internals/math-expm1.js":[function(require,module,exports) {
var nativeExpm1 = Math.expm1;
var exp = Math.exp;

// `Math.expm1` method implementation
// https://tc39.github.io/ecma262/#sec-math.expm1
module.exports = (!nativeExpm1
  // Old FF bug
  || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || nativeExpm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
} : nativeExpm1;

},{}],"../node_modules/core-js/modules/es.math.cosh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var nativeCosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

// `Math.cosh` method
// https://tc39.github.io/ecma262/#sec-math.cosh
$({ target: 'Math', stat: true, forced: !nativeCosh || nativeCosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-expm1":"../node_modules/core-js/internals/math-expm1.js"}],"../node_modules/core-js/modules/es.math.expm1.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// `Math.expm1` method
// https://tc39.github.io/ecma262/#sec-math.expm1
$({ target: 'Math', stat: true, forced: expm1 != Math.expm1 }, { expm1: expm1 });

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-expm1":"../node_modules/core-js/internals/math-expm1.js"}],"../node_modules/core-js/internals/math-fround.js":[function(require,module,exports) {
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.github.io/ecma262/#sec-math.fround
module.exports = Math.fround || function fround(x) {
  var $abs = abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"../internals/math-sign":"../node_modules/core-js/internals/math-sign.js"}],"../node_modules/core-js/modules/es.math.fround.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fround = require('../internals/math-fround');

// `Math.fround` method
// https://tc39.github.io/ecma262/#sec-math.fround
$({ target: 'Math', stat: true }, { fround: fround });

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-fround":"../node_modules/core-js/internals/math-fround.js"}],"../node_modules/core-js/modules/es.math.hypot.js":[function(require,module,exports) {
var $ = require('../internals/export');

var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, forced: BUGGY }, {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.math.imul.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');

var nativeImul = Math.imul;

var FORCED = fails(function () {
  return nativeImul(0xFFFFFFFF, 5) != -5 || nativeImul.length != 2;
});

// `Math.imul` method
// https://tc39.github.io/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.math.log10.js":[function(require,module,exports) {
var $ = require('../internals/export');

var log = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.github.io/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log(x) * LOG10E;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.math.log1p.js":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// `Math.log1p` method
// https://tc39.github.io/ecma262/#sec-math.log1p
$({ target: 'Math', stat: true }, { log1p: log1p });

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-log1p":"../node_modules/core-js/internals/math-log1p.js"}],"../node_modules/core-js/modules/es.math.log2.js":[function(require,module,exports) {
var $ = require('../internals/export');

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.github.io/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.math.sign.js":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

// `Math.sign` method
// https://tc39.github.io/ecma262/#sec-math.sign
$({ target: 'Math', stat: true }, {
  sign: sign
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-sign":"../node_modules/core-js/internals/math-sign.js"}],"../node_modules/core-js/modules/es.math.sinh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var expm1 = require('../internals/math-expm1');

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = fails(function () {
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.github.io/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/math-expm1":"../node_modules/core-js/internals/math-expm1.js"}],"../node_modules/core-js/modules/es.math.tanh.js":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.github.io/ecma262/#sec-math.tanh
$({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-expm1":"../node_modules/core-js/internals/math-expm1.js"}],"../node_modules/core-js/modules/es.math.to-string-tag.js":[function(require,module,exports) {
var setToStringTag = require('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js"}],"../node_modules/core-js/modules/es.math.trunc.js":[function(require,module,exports) {
var $ = require('../internals/export');

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.github.io/ecma262/#sec-math.trunc
$({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor : ceil)(it);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.date.now.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.date.to-json.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js"}],"../node_modules/core-js/internals/date-to-iso-string.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var padStart = require('../internals/string-pad').start;

var abs = Math.abs;
var DatePrototype = Date.prototype;
var getTime = DatePrototype.getTime;
var nativeDateToISOString = DatePrototype.toISOString;

// `Date.prototype.toISOString` method implementation
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  nativeDateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = date.getUTCFullYear();
  var milliseconds = date.getUTCMilliseconds();
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(date.getUTCMonth() + 1, 2, 0) +
    '-' + padStart(date.getUTCDate(), 2, 0) +
    'T' + padStart(date.getUTCHours(), 2, 0) +
    ':' + padStart(date.getUTCMinutes(), 2, 0) +
    ':' + padStart(date.getUTCSeconds(), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : nativeDateToISOString;

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/string-pad":"../node_modules/core-js/internals/string-pad.js"}],"../node_modules/core-js/modules/es.date.to-iso-string.js":[function(require,module,exports) {
var $ = require('../internals/export');
var toISOString = require('../internals/date-to-iso-string');

// `Date.prototype.toISOString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/date-to-iso-string":"../node_modules/core-js/internals/date-to-iso-string.js"}],"../node_modules/core-js/modules/es.date.to-string.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

},{"../internals/redefine":"../node_modules/core-js/internals/redefine.js"}],"../node_modules/core-js/internals/date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

module.exports = function (hint) {
  if (hint !== 'string' && hint !== 'number' && hint !== 'default') {
    throw TypeError('Incorrect hint');
  } return toPrimitive(anObject(this), hint !== 'number');
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js"}],"../node_modules/core-js/modules/es.date.to-primitive.js":[function(require,module,exports) {
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var dateToPrimitive = require('../internals/date-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-date.prototype-@@toprimitive
if (!(TO_PRIMITIVE in DatePrototype)) {
  createNonEnumerableProperty(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}

},{"../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/date-to-primitive":"../node_modules/core-js/internals/date-to-primitive.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.json.stringify.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var fails = require('../internals/fails');

var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.json.to-string-tag.js":[function(require,module,exports) {

var global = require('../internals/global');
var setToStringTag = require('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js"}],"../node_modules/core-js/internals/native-promise-constructor.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global.Promise;

},{"../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/redefine-all.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

},{"../internals/redefine":"../node_modules/core-js/internals/redefine.js"}],"../node_modules/core-js/internals/an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],"../node_modules/core-js/internals/is-ios.js":[function(require,module,exports) {
var userAgent = require('../internals/user-agent');

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/user-agent":"../node_modules/core-js/internals/user-agent.js"}],"../node_modules/core-js/internals/task.js":[function(require,module,exports) {


var global = require('../internals/global');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');
var bind = require('../internals/bind-context');
var html = require('../internals/html');
var createElement = require('../internals/document-create-element');
var IS_IOS = require('../internals/is-ios');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/html":"../node_modules/core-js/internals/html.js","../internals/document-create-element":"../node_modules/core-js/internals/document-create-element.js","../internals/is-ios":"../node_modules/core-js/internals/is-ios.js"}],"../node_modules/core-js/internals/microtask.js":[function(require,module,exports) {


var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var classof = require('../internals/classof-raw');
var macrotask = require('../internals/task').set;
var IS_IOS = require('../internals/is-ios');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/task":"../node_modules/core-js/internals/task.js","../internals/is-ios":"../node_modules/core-js/internals/is-ios.js"}],"../node_modules/core-js/internals/new-promise-capability.js":[function(require,module,exports) {
'use strict';
var aFunction = require('../internals/a-function');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/internals/promise-resolve.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/new-promise-capability":"../node_modules/core-js/internals/new-promise-capability.js"}],"../node_modules/core-js/internals/host-report-errors.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

},{"../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],"../node_modules/core-js/modules/es.promise.js":[function(require,module,exports) {


'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var isObject = require('../internals/is-object');
var aFunction = require('../internals/a-function');
var anInstance = require('../internals/an-instance');
var classof = require('../internals/classof-raw');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var InternalStateModule = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/native-promise-constructor":"../node_modules/core-js/internals/native-promise-constructor.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/inspect-source":"../node_modules/core-js/internals/inspect-source.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/check-correctness-of-iteration":"../node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/task":"../node_modules/core-js/internals/task.js","../internals/microtask":"../node_modules/core-js/internals/microtask.js","../internals/promise-resolve":"../node_modules/core-js/internals/promise-resolve.js","../internals/host-report-errors":"../node_modules/core-js/internals/host-report-errors.js","../internals/new-promise-capability":"../node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js/internals/perform.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/v8-version":"../node_modules/core-js/internals/v8-version.js"}],"../node_modules/core-js/modules/es.promise.all-settled.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/new-promise-capability":"../node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js/internals/perform.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/es.promise.finally.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromise = require('../internals/native-promise-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var redefine = require('../internals/redefine');

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/native-promise-constructor":"../node_modules/core-js/internals/native-promise-constructor.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/promise-resolve":"../node_modules/core-js/internals/promise-resolve.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js"}],"../node_modules/core-js/internals/collection.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var redefine = require('../internals/redefine');
var InternalMetadataModule = require('../internals/internal-metadata');
var iterate = require('../internals/iterate');
var anInstance = require('../internals/an-instance');
var isObject = require('../internals/is-object');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var setToStringTag = require('../internals/set-to-string-tag');
var inheritIfRequired = require('../internals/inherit-if-required');

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/check-correctness-of-iteration":"../node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/inherit-if-required":"../node_modules/core-js/internals/inherit-if-required.js"}],"../node_modules/core-js/internals/collection-strong.js":[function(require,module,exports) {
var define;
'use strict';
var defineProperty = require('../internals/object-define-property').f;
var create = require('../internals/object-create');
var redefineAll = require('../internals/redefine-all');
var bind = require('../internals/bind-context');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var defineIterator = require('../internals/define-iterator');
var setSpecies = require('../internals/set-species');
var DESCRIPTORS = require('../internals/descriptors');
var fastKey = require('../internals/internal-metadata').fastKey;
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

},{"../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/define-iterator":"../node_modules/core-js/internals/define-iterator.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/es.map.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"../node_modules/core-js/internals/collection.js","../internals/collection-strong":"../node_modules/core-js/internals/collection-strong.js"}],"../node_modules/core-js/modules/es.set.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"../node_modules/core-js/internals/collection.js","../internals/collection-strong":"../node_modules/core-js/internals/collection-strong.js"}],"../node_modules/core-js/internals/collection-weak.js":[function(require,module,exports) {
var define;
'use strict';
var redefineAll = require('../internals/redefine-all');
var getWeakData = require('../internals/internal-metadata').getWeakData;
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var ArrayIterationModule = require('../internals/array-iteration');
var $has = require('../internals/has');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

},{"../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/es.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var redefineAll = require('../internals/redefine-all');
var InternalMetadataModule = require('../internals/internal-metadata');
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');
var isObject = require('../internals/is-object');
var enforceIternalState = require('../internals/internal-state').enforce;
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/collection":"../node_modules/core-js/internals/collection.js","../internals/collection-weak":"../node_modules/core-js/internals/collection-weak.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/native-weak-map":"../node_modules/core-js/internals/native-weak-map.js"}],"../node_modules/core-js/modules/es.weak-set.js":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');

// `WeakSet` constructor
// https://tc39.github.io/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);

},{"../internals/collection":"../node_modules/core-js/internals/collection.js","../internals/collection-weak":"../node_modules/core-js/internals/collection-weak.js"}],"../node_modules/core-js/internals/array-buffer-view-core.js":[function(require,module,exports) {

'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var defineProperty = require('../internals/object-define-property').f;
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');
var uid = require('../internals/uid');

var DataView = global.DataView;
var DataViewPrototype = DataView && DataView.prototype;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var NATIVE_ARRAY_BUFFER = !!(global.ArrayBuffer && DataView);
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

// WebKit bug - the same parent prototype for typed arrays and data view
if (NATIVE_ARRAY_BUFFER && setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
  setPrototypeOf(DataViewPrototype, ObjectPrototype);
}

module.exports = {
  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/classof":"../node_modules/core-js/internals/classof.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/uid":"../node_modules/core-js/internals/uid.js"}],"../node_modules/core-js/internals/to-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/internals/ieee754.js":[function(require,module,exports) {
// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};

},{}],"../node_modules/core-js/internals/array-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var fails = require('../internals/fails');
var anInstance = require('../internals/an-instance');
var toInteger = require('../internals/to-integer');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var IEEE754 = require('../internals/ieee754');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var defineProperty = require('../internals/object-define-property').f;
var arrayFill = require('../internals/array-fill');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataView[PROTOTYPE].setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-index":"../node_modules/core-js/internals/to-index.js","../internals/ieee754":"../node_modules/core-js/internals/ieee754.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/array-fill":"../node_modules/core-js/internals/array-fill.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/es.array-buffer.constructor.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var arrayBufferModule = require('../internals/array-buffer');
var setSpecies = require('../internals/set-species');

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/array-buffer":"../node_modules/core-js/internals/array-buffer.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js"}],"../node_modules/core-js/modules/es.array-buffer.is-view.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.isview
$({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/modules/es.array-buffer.slice.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var ArrayBufferModule = require('../internals/array-buffer');
var anObject = require('../internals/an-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var speciesConstructor = require('../internals/species-constructor');

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/array-buffer":"../node_modules/core-js/internals/array-buffer.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js"}],"../node_modules/core-js/modules/es.data-view.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferModule = require('../internals/array-buffer');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER;

// `DataView` constructor
// https://tc39.github.io/ecma262/#sec-dataview-constructor
$({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule.DataView
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-buffer":"../node_modules/core-js/internals/array-buffer.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js":[function(require,module,exports) {

/* eslint-disable no-new */
var global = require('../internals/global');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var NATIVE_ARRAY_BUFFER_VIEWS = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/check-correctness-of-iteration":"../node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/internals/to-positive-integer.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js"}],"../node_modules/core-js/internals/to-offset.js":[function(require,module,exports) {
var toPositiveInteger = require('../internals/to-positive-integer');

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

},{"../internals/to-positive-integer":"../node_modules/core-js/internals/to-positive-integer.js"}],"../node_modules/core-js/internals/typed-array-from.js":[function(require,module,exports) {
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var getIteratorMethod = require('../internals/get-iterator-method');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var bind = require('../internals/bind-context');
var aTypedArrayConstructor = require('../internals/array-buffer-view-core').aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

},{"../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/is-array-iterator-method":"../node_modules/core-js/internals/is-array-iterator-method.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/internals/typed-array-constructor.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var DESCRIPTORS = require('../internals/descriptors');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-arrays-constructors-requires-wrappers');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayBufferModule = require('../internals/array-buffer');
var anInstance = require('../internals/an-instance');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var toLength = require('../internals/to-length');
var toIndex = require('../internals/to-index');
var toOffset = require('../internals/to-offset');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var classof = require('../internals/classof');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var typedArrayFrom = require('../internals/typed-array-from');
var forEach = require('../internals/array-iteration').forEach;
var setSpecies = require('../internals/set-species');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var InternalStateModule = require('../internals/internal-state');
var inheritIfRequired = require('../internals/inherit-if-required');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/typed-arrays-constructors-requires-wrappers":"../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-buffer":"../node_modules/core-js/internals/array-buffer.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-index":"../node_modules/core-js/internals/to-index.js","../internals/to-offset":"../node_modules/core-js/internals/to-offset.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/classof":"../node_modules/core-js/internals/classof.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/typed-array-from":"../node_modules/core-js/internals/typed-array-from.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/inherit-if-required":"../node_modules/core-js/internals/inherit-if-required.js"}],"../node_modules/core-js/modules/es.typed-array.int8-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.uint8-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8ClampedArray` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.int16-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.uint16-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.int32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.uint32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.float32-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.float64-array.js":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float64Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"../node_modules/core-js/internals/typed-array-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.from.js":[function(require,module,exports) {
'use strict';
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-arrays-constructors-requires-wrappers');
var exportTypedArrayStaticMethod = require('../internals/array-buffer-view-core').exportTypedArrayStaticMethod;
var typedArrayFrom = require('../internals/typed-array-from');

// `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/typed-arrays-constructors-requires-wrappers":"../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/typed-array-from":"../node_modules/core-js/internals/typed-array-from.js"}],"../node_modules/core-js/modules/es.typed-array.of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-arrays-constructors-requires-wrappers');

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/typed-arrays-constructors-requires-wrappers":"../node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js"}],"../node_modules/core-js/modules/es.typed-array.copy-within.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $copyWithin = require('../internals/array-copy-within');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-copy-within":"../node_modules/core-js/internals/array-copy-within.js"}],"../node_modules/core-js/modules/es.typed-array.every.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $every = require('../internals/array-iteration').every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.typed-array.fill.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $fill = require('../internals/array-fill');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-fill":"../node_modules/core-js/internals/array-fill.js"}],"../node_modules/core-js/modules/es.typed-array.filter.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filter = require('../internals/array-iteration').filter;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.find.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $find = require('../internals/array-iteration').find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.typed-array.find-index.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findIndex = require('../internals/array-iteration').findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.typed-array.for-each.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $forEach = require('../internals/array-iteration').forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.typed-array.includes.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $includes = require('../internals/array-includes').includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js"}],"../node_modules/core-js/modules/es.typed-array.index-of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $indexOf = require('../internals/array-includes').indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js"}],"../node_modules/core-js/modules/es.typed-array.iterator.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var ArrayIterators = require('../modules/es.array.iterator');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/es.typed-array.join.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/modules/es.typed-array.last-index-of.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $lastIndexOf = require('../internals/array-last-index-of');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-last-index-of":"../node_modules/core-js/internals/array-last-index-of.js"}],"../node_modules/core-js/modules/es.typed-array.map.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $map = require('../internals/array-iteration').map;
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.reduce.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduce = require('../internals/array-reduce').left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-reduce":"../node_modules/core-js/internals/array-reduce.js"}],"../node_modules/core-js/modules/es.typed-array.reduce-right.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduceRight = require('../internals/array-reduce').right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-reduce":"../node_modules/core-js/internals/array-reduce.js"}],"../node_modules/core-js/modules/es.typed-array.reverse.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/modules/es.typed-array.set.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toOffset = require('../internals/to-offset');
var toObject = require('../internals/to-object');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-offset":"../node_modules/core-js/internals/to-offset.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.typed-array.slice.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var speciesConstructor = require('../internals/species-constructor');
var fails = require('../internals/fails');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.typed-array.some.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $some = require('../internals/array-iteration').some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js"}],"../node_modules/core-js/modules/es.typed-array.sort.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js"}],"../node_modules/core-js/modules/es.typed-array.subarray.js":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var speciesConstructor = require('../internals/species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js"}],"../node_modules/core-js/modules/es.typed-array.to-locale-string.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var fails = require('../internals/fails');

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.typed-array.to-string.js":[function(require,module,exports) {

'use strict';
var exportTypedArrayMethod = require('../internals/array-buffer-view-core').exportTypedArrayMethod;
var fails = require('../internals/fails');
var global = require('../internals/global');

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

},{"../internals/array-buffer-view-core":"../node_modules/core-js/internals/array-buffer-view-core.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/modules/es.reflect.apply.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');

var nativeApply = getBuiltIn('Reflect', 'apply');
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply
$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction(target);
    anObject(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.reflect.construct.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var bind = require('../internals/function-bind');
var fails = require('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/function-bind":"../node_modules/core-js/internals/function-bind.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.reflect.define-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var fails = require('../internals/fails');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.defineproperty
$({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    var key = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      definePropertyModule.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/modules/es.reflect.delete-property.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Reflect.deleteProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.deleteproperty
$({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"../node_modules/core-js/modules/es.reflect.get.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var has = require('../internals/has');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js"}],"../node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
$({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js"}],"../node_modules/core-js/modules/es.reflect.get-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var objectGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

// `Reflect.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
$({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/correct-prototype-getter":"../node_modules/core-js/internals/correct-prototype-getter.js"}],"../node_modules/core-js/modules/es.reflect.has.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Reflect.has` method
// https://tc39.github.io/ecma262/#sec-reflect.has
$({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/es.reflect.is-extensible.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');

var objectIsExtensible = Object.isExtensible;

// `Reflect.isExtensible` method
// https://tc39.github.io/ecma262/#sec-reflect.isextensible
$({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return objectIsExtensible ? objectIsExtensible(target) : true;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/es.reflect.own-keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ownKeys = require('../internals/own-keys');

// `Reflect.ownKeys` method
// https://tc39.github.io/ecma262/#sec-reflect.ownkeys
$({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/own-keys":"../node_modules/core-js/internals/own-keys.js"}],"../node_modules/core-js/modules/es.reflect.prevent-extensions.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var FREEZING = require('../internals/freezing');

// `Reflect.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-reflect.preventextensions
$({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js"}],"../node_modules/core-js/modules/es.reflect.set.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var fails = require('../internals/fails');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

// `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails(function () {
  var object = definePropertyModule.f({}, 'a', { configurable: true });
  // eslint-disable-next-line no-undef
  return Reflect.set(getPrototypeOf(object), 'a', 1, object) !== false;
});

$({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js"}],"../node_modules/core-js/modules/es.reflect.set-prototype-of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');
var objectSetPrototypeOf = require('../internals/object-set-prototype-of');

// `Reflect.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-possible-prototype":"../node_modules/core-js/internals/a-possible-prototype.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js"}],"../node_modules/core-js/es/index.js":[function(require,module,exports) {
require('../modules/es.symbol');
require('../modules/es.symbol.async-iterator');
require('../modules/es.symbol.description');
require('../modules/es.symbol.has-instance');
require('../modules/es.symbol.is-concat-spreadable');
require('../modules/es.symbol.iterator');
require('../modules/es.symbol.match');
require('../modules/es.symbol.match-all');
require('../modules/es.symbol.replace');
require('../modules/es.symbol.search');
require('../modules/es.symbol.species');
require('../modules/es.symbol.split');
require('../modules/es.symbol.to-primitive');
require('../modules/es.symbol.to-string-tag');
require('../modules/es.symbol.unscopables');
require('../modules/es.object.assign');
require('../modules/es.object.create');
require('../modules/es.object.define-property');
require('../modules/es.object.define-properties');
require('../modules/es.object.entries');
require('../modules/es.object.freeze');
require('../modules/es.object.from-entries');
require('../modules/es.object.get-own-property-descriptor');
require('../modules/es.object.get-own-property-descriptors');
require('../modules/es.object.get-own-property-names');
require('../modules/es.object.get-prototype-of');
require('../modules/es.object.is');
require('../modules/es.object.is-extensible');
require('../modules/es.object.is-frozen');
require('../modules/es.object.is-sealed');
require('../modules/es.object.keys');
require('../modules/es.object.prevent-extensions');
require('../modules/es.object.seal');
require('../modules/es.object.set-prototype-of');
require('../modules/es.object.values');
require('../modules/es.object.to-string');
require('../modules/es.object.define-getter');
require('../modules/es.object.define-setter');
require('../modules/es.object.lookup-getter');
require('../modules/es.object.lookup-setter');
require('../modules/es.function.bind');
require('../modules/es.function.name');
require('../modules/es.function.has-instance');
require('../modules/es.global-this');
require('../modules/es.array.from');
require('../modules/es.array.is-array');
require('../modules/es.array.of');
require('../modules/es.array.concat');
require('../modules/es.array.copy-within');
require('../modules/es.array.every');
require('../modules/es.array.fill');
require('../modules/es.array.filter');
require('../modules/es.array.find');
require('../modules/es.array.find-index');
require('../modules/es.array.flat');
require('../modules/es.array.flat-map');
require('../modules/es.array.for-each');
require('../modules/es.array.includes');
require('../modules/es.array.index-of');
require('../modules/es.array.join');
require('../modules/es.array.last-index-of');
require('../modules/es.array.map');
require('../modules/es.array.reduce');
require('../modules/es.array.reduce-right');
require('../modules/es.array.reverse');
require('../modules/es.array.slice');
require('../modules/es.array.some');
require('../modules/es.array.sort');
require('../modules/es.array.splice');
require('../modules/es.array.species');
require('../modules/es.array.unscopables.flat');
require('../modules/es.array.unscopables.flat-map');
require('../modules/es.array.iterator');
require('../modules/es.string.from-code-point');
require('../modules/es.string.raw');
require('../modules/es.string.code-point-at');
require('../modules/es.string.ends-with');
require('../modules/es.string.includes');
require('../modules/es.string.match');
require('../modules/es.string.match-all');
require('../modules/es.string.pad-end');
require('../modules/es.string.pad-start');
require('../modules/es.string.repeat');
require('../modules/es.string.replace');
require('../modules/es.string.search');
require('../modules/es.string.split');
require('../modules/es.string.starts-with');
require('../modules/es.string.trim');
require('../modules/es.string.trim-start');
require('../modules/es.string.trim-end');
require('../modules/es.string.iterator');
require('../modules/es.string.anchor');
require('../modules/es.string.big');
require('../modules/es.string.blink');
require('../modules/es.string.bold');
require('../modules/es.string.fixed');
require('../modules/es.string.fontcolor');
require('../modules/es.string.fontsize');
require('../modules/es.string.italics');
require('../modules/es.string.link');
require('../modules/es.string.small');
require('../modules/es.string.strike');
require('../modules/es.string.sub');
require('../modules/es.string.sup');
require('../modules/es.regexp.constructor');
require('../modules/es.regexp.exec');
require('../modules/es.regexp.flags');
require('../modules/es.regexp.to-string');
require('../modules/es.parse-int');
require('../modules/es.parse-float');
require('../modules/es.number.constructor');
require('../modules/es.number.epsilon');
require('../modules/es.number.is-finite');
require('../modules/es.number.is-integer');
require('../modules/es.number.is-nan');
require('../modules/es.number.is-safe-integer');
require('../modules/es.number.max-safe-integer');
require('../modules/es.number.min-safe-integer');
require('../modules/es.number.parse-float');
require('../modules/es.number.parse-int');
require('../modules/es.number.to-fixed');
require('../modules/es.number.to-precision');
require('../modules/es.math.acosh');
require('../modules/es.math.asinh');
require('../modules/es.math.atanh');
require('../modules/es.math.cbrt');
require('../modules/es.math.clz32');
require('../modules/es.math.cosh');
require('../modules/es.math.expm1');
require('../modules/es.math.fround');
require('../modules/es.math.hypot');
require('../modules/es.math.imul');
require('../modules/es.math.log10');
require('../modules/es.math.log1p');
require('../modules/es.math.log2');
require('../modules/es.math.sign');
require('../modules/es.math.sinh');
require('../modules/es.math.tanh');
require('../modules/es.math.to-string-tag');
require('../modules/es.math.trunc');
require('../modules/es.date.now');
require('../modules/es.date.to-json');
require('../modules/es.date.to-iso-string');
require('../modules/es.date.to-string');
require('../modules/es.date.to-primitive');
require('../modules/es.json.stringify');
require('../modules/es.json.to-string-tag');
require('../modules/es.promise');
require('../modules/es.promise.all-settled');
require('../modules/es.promise.finally');
require('../modules/es.map');
require('../modules/es.set');
require('../modules/es.weak-map');
require('../modules/es.weak-set');
require('../modules/es.array-buffer.constructor');
require('../modules/es.array-buffer.is-view');
require('../modules/es.array-buffer.slice');
require('../modules/es.data-view');
require('../modules/es.typed-array.int8-array');
require('../modules/es.typed-array.uint8-array');
require('../modules/es.typed-array.uint8-clamped-array');
require('../modules/es.typed-array.int16-array');
require('../modules/es.typed-array.uint16-array');
require('../modules/es.typed-array.int32-array');
require('../modules/es.typed-array.uint32-array');
require('../modules/es.typed-array.float32-array');
require('../modules/es.typed-array.float64-array');
require('../modules/es.typed-array.from');
require('../modules/es.typed-array.of');
require('../modules/es.typed-array.copy-within');
require('../modules/es.typed-array.every');
require('../modules/es.typed-array.fill');
require('../modules/es.typed-array.filter');
require('../modules/es.typed-array.find');
require('../modules/es.typed-array.find-index');
require('../modules/es.typed-array.for-each');
require('../modules/es.typed-array.includes');
require('../modules/es.typed-array.index-of');
require('../modules/es.typed-array.iterator');
require('../modules/es.typed-array.join');
require('../modules/es.typed-array.last-index-of');
require('../modules/es.typed-array.map');
require('../modules/es.typed-array.reduce');
require('../modules/es.typed-array.reduce-right');
require('../modules/es.typed-array.reverse');
require('../modules/es.typed-array.set');
require('../modules/es.typed-array.slice');
require('../modules/es.typed-array.some');
require('../modules/es.typed-array.sort');
require('../modules/es.typed-array.subarray');
require('../modules/es.typed-array.to-locale-string');
require('../modules/es.typed-array.to-string');
require('../modules/es.reflect.apply');
require('../modules/es.reflect.construct');
require('../modules/es.reflect.define-property');
require('../modules/es.reflect.delete-property');
require('../modules/es.reflect.get');
require('../modules/es.reflect.get-own-property-descriptor');
require('../modules/es.reflect.get-prototype-of');
require('../modules/es.reflect.has');
require('../modules/es.reflect.is-extensible');
require('../modules/es.reflect.own-keys');
require('../modules/es.reflect.prevent-extensions');
require('../modules/es.reflect.set');
require('../modules/es.reflect.set-prototype-of');
var path = require('../internals/path');

module.exports = path;

},{"../modules/es.symbol":"../node_modules/core-js/modules/es.symbol.js","../modules/es.symbol.async-iterator":"../node_modules/core-js/modules/es.symbol.async-iterator.js","../modules/es.symbol.description":"../node_modules/core-js/modules/es.symbol.description.js","../modules/es.symbol.has-instance":"../node_modules/core-js/modules/es.symbol.has-instance.js","../modules/es.symbol.is-concat-spreadable":"../node_modules/core-js/modules/es.symbol.is-concat-spreadable.js","../modules/es.symbol.iterator":"../node_modules/core-js/modules/es.symbol.iterator.js","../modules/es.symbol.match":"../node_modules/core-js/modules/es.symbol.match.js","../modules/es.symbol.match-all":"../node_modules/core-js/modules/es.symbol.match-all.js","../modules/es.symbol.replace":"../node_modules/core-js/modules/es.symbol.replace.js","../modules/es.symbol.search":"../node_modules/core-js/modules/es.symbol.search.js","../modules/es.symbol.species":"../node_modules/core-js/modules/es.symbol.species.js","../modules/es.symbol.split":"../node_modules/core-js/modules/es.symbol.split.js","../modules/es.symbol.to-primitive":"../node_modules/core-js/modules/es.symbol.to-primitive.js","../modules/es.symbol.to-string-tag":"../node_modules/core-js/modules/es.symbol.to-string-tag.js","../modules/es.symbol.unscopables":"../node_modules/core-js/modules/es.symbol.unscopables.js","../modules/es.object.assign":"../node_modules/core-js/modules/es.object.assign.js","../modules/es.object.create":"../node_modules/core-js/modules/es.object.create.js","../modules/es.object.define-property":"../node_modules/core-js/modules/es.object.define-property.js","../modules/es.object.define-properties":"../node_modules/core-js/modules/es.object.define-properties.js","../modules/es.object.entries":"../node_modules/core-js/modules/es.object.entries.js","../modules/es.object.freeze":"../node_modules/core-js/modules/es.object.freeze.js","../modules/es.object.from-entries":"../node_modules/core-js/modules/es.object.from-entries.js","../modules/es.object.get-own-property-descriptor":"../node_modules/core-js/modules/es.object.get-own-property-descriptor.js","../modules/es.object.get-own-property-descriptors":"../node_modules/core-js/modules/es.object.get-own-property-descriptors.js","../modules/es.object.get-own-property-names":"../node_modules/core-js/modules/es.object.get-own-property-names.js","../modules/es.object.get-prototype-of":"../node_modules/core-js/modules/es.object.get-prototype-of.js","../modules/es.object.is":"../node_modules/core-js/modules/es.object.is.js","../modules/es.object.is-extensible":"../node_modules/core-js/modules/es.object.is-extensible.js","../modules/es.object.is-frozen":"../node_modules/core-js/modules/es.object.is-frozen.js","../modules/es.object.is-sealed":"../node_modules/core-js/modules/es.object.is-sealed.js","../modules/es.object.keys":"../node_modules/core-js/modules/es.object.keys.js","../modules/es.object.prevent-extensions":"../node_modules/core-js/modules/es.object.prevent-extensions.js","../modules/es.object.seal":"../node_modules/core-js/modules/es.object.seal.js","../modules/es.object.set-prototype-of":"../node_modules/core-js/modules/es.object.set-prototype-of.js","../modules/es.object.values":"../node_modules/core-js/modules/es.object.values.js","../modules/es.object.to-string":"../node_modules/core-js/modules/es.object.to-string.js","../modules/es.object.define-getter":"../node_modules/core-js/modules/es.object.define-getter.js","../modules/es.object.define-setter":"../node_modules/core-js/modules/es.object.define-setter.js","../modules/es.object.lookup-getter":"../node_modules/core-js/modules/es.object.lookup-getter.js","../modules/es.object.lookup-setter":"../node_modules/core-js/modules/es.object.lookup-setter.js","../modules/es.function.bind":"../node_modules/core-js/modules/es.function.bind.js","../modules/es.function.name":"../node_modules/core-js/modules/es.function.name.js","../modules/es.function.has-instance":"../node_modules/core-js/modules/es.function.has-instance.js","../modules/es.global-this":"../node_modules/core-js/modules/es.global-this.js","../modules/es.array.from":"../node_modules/core-js/modules/es.array.from.js","../modules/es.array.is-array":"../node_modules/core-js/modules/es.array.is-array.js","../modules/es.array.of":"../node_modules/core-js/modules/es.array.of.js","../modules/es.array.concat":"../node_modules/core-js/modules/es.array.concat.js","../modules/es.array.copy-within":"../node_modules/core-js/modules/es.array.copy-within.js","../modules/es.array.every":"../node_modules/core-js/modules/es.array.every.js","../modules/es.array.fill":"../node_modules/core-js/modules/es.array.fill.js","../modules/es.array.filter":"../node_modules/core-js/modules/es.array.filter.js","../modules/es.array.find":"../node_modules/core-js/modules/es.array.find.js","../modules/es.array.find-index":"../node_modules/core-js/modules/es.array.find-index.js","../modules/es.array.flat":"../node_modules/core-js/modules/es.array.flat.js","../modules/es.array.flat-map":"../node_modules/core-js/modules/es.array.flat-map.js","../modules/es.array.for-each":"../node_modules/core-js/modules/es.array.for-each.js","../modules/es.array.includes":"../node_modules/core-js/modules/es.array.includes.js","../modules/es.array.index-of":"../node_modules/core-js/modules/es.array.index-of.js","../modules/es.array.join":"../node_modules/core-js/modules/es.array.join.js","../modules/es.array.last-index-of":"../node_modules/core-js/modules/es.array.last-index-of.js","../modules/es.array.map":"../node_modules/core-js/modules/es.array.map.js","../modules/es.array.reduce":"../node_modules/core-js/modules/es.array.reduce.js","../modules/es.array.reduce-right":"../node_modules/core-js/modules/es.array.reduce-right.js","../modules/es.array.reverse":"../node_modules/core-js/modules/es.array.reverse.js","../modules/es.array.slice":"../node_modules/core-js/modules/es.array.slice.js","../modules/es.array.some":"../node_modules/core-js/modules/es.array.some.js","../modules/es.array.sort":"../node_modules/core-js/modules/es.array.sort.js","../modules/es.array.splice":"../node_modules/core-js/modules/es.array.splice.js","../modules/es.array.species":"../node_modules/core-js/modules/es.array.species.js","../modules/es.array.unscopables.flat":"../node_modules/core-js/modules/es.array.unscopables.flat.js","../modules/es.array.unscopables.flat-map":"../node_modules/core-js/modules/es.array.unscopables.flat-map.js","../modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","../modules/es.string.from-code-point":"../node_modules/core-js/modules/es.string.from-code-point.js","../modules/es.string.raw":"../node_modules/core-js/modules/es.string.raw.js","../modules/es.string.code-point-at":"../node_modules/core-js/modules/es.string.code-point-at.js","../modules/es.string.ends-with":"../node_modules/core-js/modules/es.string.ends-with.js","../modules/es.string.includes":"../node_modules/core-js/modules/es.string.includes.js","../modules/es.string.match":"../node_modules/core-js/modules/es.string.match.js","../modules/es.string.match-all":"../node_modules/core-js/modules/es.string.match-all.js","../modules/es.string.pad-end":"../node_modules/core-js/modules/es.string.pad-end.js","../modules/es.string.pad-start":"../node_modules/core-js/modules/es.string.pad-start.js","../modules/es.string.repeat":"../node_modules/core-js/modules/es.string.repeat.js","../modules/es.string.replace":"../node_modules/core-js/modules/es.string.replace.js","../modules/es.string.search":"../node_modules/core-js/modules/es.string.search.js","../modules/es.string.split":"../node_modules/core-js/modules/es.string.split.js","../modules/es.string.starts-with":"../node_modules/core-js/modules/es.string.starts-with.js","../modules/es.string.trim":"../node_modules/core-js/modules/es.string.trim.js","../modules/es.string.trim-start":"../node_modules/core-js/modules/es.string.trim-start.js","../modules/es.string.trim-end":"../node_modules/core-js/modules/es.string.trim-end.js","../modules/es.string.iterator":"../node_modules/core-js/modules/es.string.iterator.js","../modules/es.string.anchor":"../node_modules/core-js/modules/es.string.anchor.js","../modules/es.string.big":"../node_modules/core-js/modules/es.string.big.js","../modules/es.string.blink":"../node_modules/core-js/modules/es.string.blink.js","../modules/es.string.bold":"../node_modules/core-js/modules/es.string.bold.js","../modules/es.string.fixed":"../node_modules/core-js/modules/es.string.fixed.js","../modules/es.string.fontcolor":"../node_modules/core-js/modules/es.string.fontcolor.js","../modules/es.string.fontsize":"../node_modules/core-js/modules/es.string.fontsize.js","../modules/es.string.italics":"../node_modules/core-js/modules/es.string.italics.js","../modules/es.string.link":"../node_modules/core-js/modules/es.string.link.js","../modules/es.string.small":"../node_modules/core-js/modules/es.string.small.js","../modules/es.string.strike":"../node_modules/core-js/modules/es.string.strike.js","../modules/es.string.sub":"../node_modules/core-js/modules/es.string.sub.js","../modules/es.string.sup":"../node_modules/core-js/modules/es.string.sup.js","../modules/es.regexp.constructor":"../node_modules/core-js/modules/es.regexp.constructor.js","../modules/es.regexp.exec":"../node_modules/core-js/modules/es.regexp.exec.js","../modules/es.regexp.flags":"../node_modules/core-js/modules/es.regexp.flags.js","../modules/es.regexp.to-string":"../node_modules/core-js/modules/es.regexp.to-string.js","../modules/es.parse-int":"../node_modules/core-js/modules/es.parse-int.js","../modules/es.parse-float":"../node_modules/core-js/modules/es.parse-float.js","../modules/es.number.constructor":"../node_modules/core-js/modules/es.number.constructor.js","../modules/es.number.epsilon":"../node_modules/core-js/modules/es.number.epsilon.js","../modules/es.number.is-finite":"../node_modules/core-js/modules/es.number.is-finite.js","../modules/es.number.is-integer":"../node_modules/core-js/modules/es.number.is-integer.js","../modules/es.number.is-nan":"../node_modules/core-js/modules/es.number.is-nan.js","../modules/es.number.is-safe-integer":"../node_modules/core-js/modules/es.number.is-safe-integer.js","../modules/es.number.max-safe-integer":"../node_modules/core-js/modules/es.number.max-safe-integer.js","../modules/es.number.min-safe-integer":"../node_modules/core-js/modules/es.number.min-safe-integer.js","../modules/es.number.parse-float":"../node_modules/core-js/modules/es.number.parse-float.js","../modules/es.number.parse-int":"../node_modules/core-js/modules/es.number.parse-int.js","../modules/es.number.to-fixed":"../node_modules/core-js/modules/es.number.to-fixed.js","../modules/es.number.to-precision":"../node_modules/core-js/modules/es.number.to-precision.js","../modules/es.math.acosh":"../node_modules/core-js/modules/es.math.acosh.js","../modules/es.math.asinh":"../node_modules/core-js/modules/es.math.asinh.js","../modules/es.math.atanh":"../node_modules/core-js/modules/es.math.atanh.js","../modules/es.math.cbrt":"../node_modules/core-js/modules/es.math.cbrt.js","../modules/es.math.clz32":"../node_modules/core-js/modules/es.math.clz32.js","../modules/es.math.cosh":"../node_modules/core-js/modules/es.math.cosh.js","../modules/es.math.expm1":"../node_modules/core-js/modules/es.math.expm1.js","../modules/es.math.fround":"../node_modules/core-js/modules/es.math.fround.js","../modules/es.math.hypot":"../node_modules/core-js/modules/es.math.hypot.js","../modules/es.math.imul":"../node_modules/core-js/modules/es.math.imul.js","../modules/es.math.log10":"../node_modules/core-js/modules/es.math.log10.js","../modules/es.math.log1p":"../node_modules/core-js/modules/es.math.log1p.js","../modules/es.math.log2":"../node_modules/core-js/modules/es.math.log2.js","../modules/es.math.sign":"../node_modules/core-js/modules/es.math.sign.js","../modules/es.math.sinh":"../node_modules/core-js/modules/es.math.sinh.js","../modules/es.math.tanh":"../node_modules/core-js/modules/es.math.tanh.js","../modules/es.math.to-string-tag":"../node_modules/core-js/modules/es.math.to-string-tag.js","../modules/es.math.trunc":"../node_modules/core-js/modules/es.math.trunc.js","../modules/es.date.now":"../node_modules/core-js/modules/es.date.now.js","../modules/es.date.to-json":"../node_modules/core-js/modules/es.date.to-json.js","../modules/es.date.to-iso-string":"../node_modules/core-js/modules/es.date.to-iso-string.js","../modules/es.date.to-string":"../node_modules/core-js/modules/es.date.to-string.js","../modules/es.date.to-primitive":"../node_modules/core-js/modules/es.date.to-primitive.js","../modules/es.json.stringify":"../node_modules/core-js/modules/es.json.stringify.js","../modules/es.json.to-string-tag":"../node_modules/core-js/modules/es.json.to-string-tag.js","../modules/es.promise":"../node_modules/core-js/modules/es.promise.js","../modules/es.promise.all-settled":"../node_modules/core-js/modules/es.promise.all-settled.js","../modules/es.promise.finally":"../node_modules/core-js/modules/es.promise.finally.js","../modules/es.map":"../node_modules/core-js/modules/es.map.js","../modules/es.set":"../node_modules/core-js/modules/es.set.js","../modules/es.weak-map":"../node_modules/core-js/modules/es.weak-map.js","../modules/es.weak-set":"../node_modules/core-js/modules/es.weak-set.js","../modules/es.array-buffer.constructor":"../node_modules/core-js/modules/es.array-buffer.constructor.js","../modules/es.array-buffer.is-view":"../node_modules/core-js/modules/es.array-buffer.is-view.js","../modules/es.array-buffer.slice":"../node_modules/core-js/modules/es.array-buffer.slice.js","../modules/es.data-view":"../node_modules/core-js/modules/es.data-view.js","../modules/es.typed-array.int8-array":"../node_modules/core-js/modules/es.typed-array.int8-array.js","../modules/es.typed-array.uint8-array":"../node_modules/core-js/modules/es.typed-array.uint8-array.js","../modules/es.typed-array.uint8-clamped-array":"../node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js","../modules/es.typed-array.int16-array":"../node_modules/core-js/modules/es.typed-array.int16-array.js","../modules/es.typed-array.uint16-array":"../node_modules/core-js/modules/es.typed-array.uint16-array.js","../modules/es.typed-array.int32-array":"../node_modules/core-js/modules/es.typed-array.int32-array.js","../modules/es.typed-array.uint32-array":"../node_modules/core-js/modules/es.typed-array.uint32-array.js","../modules/es.typed-array.float32-array":"../node_modules/core-js/modules/es.typed-array.float32-array.js","../modules/es.typed-array.float64-array":"../node_modules/core-js/modules/es.typed-array.float64-array.js","../modules/es.typed-array.from":"../node_modules/core-js/modules/es.typed-array.from.js","../modules/es.typed-array.of":"../node_modules/core-js/modules/es.typed-array.of.js","../modules/es.typed-array.copy-within":"../node_modules/core-js/modules/es.typed-array.copy-within.js","../modules/es.typed-array.every":"../node_modules/core-js/modules/es.typed-array.every.js","../modules/es.typed-array.fill":"../node_modules/core-js/modules/es.typed-array.fill.js","../modules/es.typed-array.filter":"../node_modules/core-js/modules/es.typed-array.filter.js","../modules/es.typed-array.find":"../node_modules/core-js/modules/es.typed-array.find.js","../modules/es.typed-array.find-index":"../node_modules/core-js/modules/es.typed-array.find-index.js","../modules/es.typed-array.for-each":"../node_modules/core-js/modules/es.typed-array.for-each.js","../modules/es.typed-array.includes":"../node_modules/core-js/modules/es.typed-array.includes.js","../modules/es.typed-array.index-of":"../node_modules/core-js/modules/es.typed-array.index-of.js","../modules/es.typed-array.iterator":"../node_modules/core-js/modules/es.typed-array.iterator.js","../modules/es.typed-array.join":"../node_modules/core-js/modules/es.typed-array.join.js","../modules/es.typed-array.last-index-of":"../node_modules/core-js/modules/es.typed-array.last-index-of.js","../modules/es.typed-array.map":"../node_modules/core-js/modules/es.typed-array.map.js","../modules/es.typed-array.reduce":"../node_modules/core-js/modules/es.typed-array.reduce.js","../modules/es.typed-array.reduce-right":"../node_modules/core-js/modules/es.typed-array.reduce-right.js","../modules/es.typed-array.reverse":"../node_modules/core-js/modules/es.typed-array.reverse.js","../modules/es.typed-array.set":"../node_modules/core-js/modules/es.typed-array.set.js","../modules/es.typed-array.slice":"../node_modules/core-js/modules/es.typed-array.slice.js","../modules/es.typed-array.some":"../node_modules/core-js/modules/es.typed-array.some.js","../modules/es.typed-array.sort":"../node_modules/core-js/modules/es.typed-array.sort.js","../modules/es.typed-array.subarray":"../node_modules/core-js/modules/es.typed-array.subarray.js","../modules/es.typed-array.to-locale-string":"../node_modules/core-js/modules/es.typed-array.to-locale-string.js","../modules/es.typed-array.to-string":"../node_modules/core-js/modules/es.typed-array.to-string.js","../modules/es.reflect.apply":"../node_modules/core-js/modules/es.reflect.apply.js","../modules/es.reflect.construct":"../node_modules/core-js/modules/es.reflect.construct.js","../modules/es.reflect.define-property":"../node_modules/core-js/modules/es.reflect.define-property.js","../modules/es.reflect.delete-property":"../node_modules/core-js/modules/es.reflect.delete-property.js","../modules/es.reflect.get":"../node_modules/core-js/modules/es.reflect.get.js","../modules/es.reflect.get-own-property-descriptor":"../node_modules/core-js/modules/es.reflect.get-own-property-descriptor.js","../modules/es.reflect.get-prototype-of":"../node_modules/core-js/modules/es.reflect.get-prototype-of.js","../modules/es.reflect.has":"../node_modules/core-js/modules/es.reflect.has.js","../modules/es.reflect.is-extensible":"../node_modules/core-js/modules/es.reflect.is-extensible.js","../modules/es.reflect.own-keys":"../node_modules/core-js/modules/es.reflect.own-keys.js","../modules/es.reflect.prevent-extensions":"../node_modules/core-js/modules/es.reflect.prevent-extensions.js","../modules/es.reflect.set":"../node_modules/core-js/modules/es.reflect.set.js","../modules/es.reflect.set-prototype-of":"../node_modules/core-js/modules/es.reflect.set-prototype-of.js","../internals/path":"../node_modules/core-js/internals/path.js"}],"../node_modules/core-js/internals/reflect-metadata.js":[function(require,module,exports) {
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
var Map = require('../modules/es.map');
var WeakMap = require('../modules/es.weak-map');
var shared = require('../internals/shared');

var metadata = shared('metadata');
var store = metadata.store || (metadata.store = new WeakMap());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};

var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};

var toMetadataKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

module.exports = {
  store: store,
  getMap: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  toKey: toMetadataKey
};

},{"../modules/es.map":"../node_modules/core-js/modules/es.map.js","../modules/es.weak-map":"../node_modules/core-js/modules/es.weak-map.js","../internals/shared":"../node_modules/core-js/internals/shared.js"}],"../node_modules/core-js/modules/esnext.reflect.define-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
    var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.reflect.delete-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
var store = ReflectMetadataModule.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.reflect.get-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js"}],"../node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
var Set = require('../modules/es.set');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var iterate = require('../internals/iterate');

var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

var from = function (iter) {
  var result = [];
  iterate(iter, result.push, result);
  return result;
};

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryMetadataKeys(anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../modules/es.set":"../node_modules/core-js/modules/es.set.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.reflect.get-own-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryOwnMetadataKeys(anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.reflect.has-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js"}],"../node_modules/core-js/modules/esnext.reflect.has-own-metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.reflect.metadata.js":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, key) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
    };
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/reflect-metadata":"../node_modules/core-js/internals/reflect-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/proposals/reflect-metadata.js":[function(require,module,exports) {
require('../modules/esnext.reflect.define-metadata');
require('../modules/esnext.reflect.delete-metadata');
require('../modules/esnext.reflect.get-metadata');
require('../modules/esnext.reflect.get-metadata-keys');
require('../modules/esnext.reflect.get-own-metadata');
require('../modules/esnext.reflect.get-own-metadata-keys');
require('../modules/esnext.reflect.has-metadata');
require('../modules/esnext.reflect.has-own-metadata');
require('../modules/esnext.reflect.metadata');

},{"../modules/esnext.reflect.define-metadata":"../node_modules/core-js/modules/esnext.reflect.define-metadata.js","../modules/esnext.reflect.delete-metadata":"../node_modules/core-js/modules/esnext.reflect.delete-metadata.js","../modules/esnext.reflect.get-metadata":"../node_modules/core-js/modules/esnext.reflect.get-metadata.js","../modules/esnext.reflect.get-metadata-keys":"../node_modules/core-js/modules/esnext.reflect.get-metadata-keys.js","../modules/esnext.reflect.get-own-metadata":"../node_modules/core-js/modules/esnext.reflect.get-own-metadata.js","../modules/esnext.reflect.get-own-metadata-keys":"../node_modules/core-js/modules/esnext.reflect.get-own-metadata-keys.js","../modules/esnext.reflect.has-metadata":"../node_modules/core-js/modules/esnext.reflect.has-metadata.js","../modules/esnext.reflect.has-own-metadata":"../node_modules/core-js/modules/esnext.reflect.has-own-metadata.js","../modules/esnext.reflect.metadata":"../node_modules/core-js/modules/esnext.reflect.metadata.js"}],"../node_modules/core-js/modules/esnext.math.iaddh.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.iaddh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.isubh.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.isubh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.imulh.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.imulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  imulh: function imulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.umulh.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.umulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  umulh: function umulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/proposals/efficient-64-bit-arithmetic.js":[function(require,module,exports) {
require('../modules/esnext.math.iaddh');
require('../modules/esnext.math.isubh');
require('../modules/esnext.math.imulh');
require('../modules/esnext.math.umulh');

},{"../modules/esnext.math.iaddh":"../node_modules/core-js/modules/esnext.math.iaddh.js","../modules/esnext.math.isubh":"../node_modules/core-js/modules/esnext.math.isubh.js","../modules/esnext.math.imulh":"../node_modules/core-js/modules/esnext.math.imulh.js","../modules/esnext.math.umulh":"../node_modules/core-js/modules/esnext.math.umulh.js"}],"../node_modules/core-js/modules/esnext.string.at.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var charAt = require('../internals/string-multibyte').charAt;

// `String.prototype.at` method
// https://github.com/mathiasbynens/String.prototype.at
$({ target: 'String', proto: true }, {
  at: function at(pos) {
    return charAt(this, pos);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js"}],"../node_modules/core-js/proposals/string-at.js":[function(require,module,exports) {
require('../modules/esnext.string.at');

},{"../modules/esnext.string.at":"../node_modules/core-js/modules/esnext.string.at.js"}],"../node_modules/core-js/internals/native-url.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/punycode-to-ascii.js":[function(require,module,exports) {
'use strict';
// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};

},{}],"../node_modules/core-js/internals/get-iterator.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js"}],"../node_modules/core-js/modules/web.url-search-params.js":[function(require,module,exports) {
'use strict';
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.array.iterator');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var USE_NATIVE_URL = require('../internals/native-url');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setToStringTag = require('../internals/set-to-string-tag');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var InternalStateModule = require('../internals/internal-state');
var anInstance = require('../internals/an-instance');
var hasOwn = require('../internals/has');
var bind = require('../internals/bind-context');
var classof = require('../internals/classof');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

},{"../modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","../internals/export":"../node_modules/core-js/internals/export.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/native-url":"../node_modules/core-js/internals/native-url.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/classof":"../node_modules/core-js/internals/classof.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/get-iterator":"../node_modules/core-js/internals/get-iterator.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/web.url.js":[function(require,module,exports) {

'use strict';
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.string.iterator');
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var USE_NATIVE_URL = require('../internals/native-url');
var global = require('../internals/global');
var defineProperties = require('../internals/object-define-properties');
var redefine = require('../internals/redefine');
var anInstance = require('../internals/an-instance');
var has = require('../internals/has');
var assign = require('../internals/object-assign');
var arrayFrom = require('../internals/array-from');
var codeAt = require('../internals/string-multibyte').codeAt;
var toASCII = require('../internals/punycode-to-ascii');
var setToStringTag = require('../internals/set-to-string-tag');
var URLSearchParamsModule = require('../modules/web.url-search-params');
var InternalStateModule = require('../internals/internal-state');

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

},{"../modules/es.string.iterator":"../node_modules/core-js/modules/es.string.iterator.js","../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/native-url":"../node_modules/core-js/internals/native-url.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/object-define-properties":"../node_modules/core-js/internals/object-define-properties.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/object-assign":"../node_modules/core-js/internals/object-assign.js","../internals/array-from":"../node_modules/core-js/internals/array-from.js","../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js","../internals/punycode-to-ascii":"../node_modules/core-js/internals/punycode-to-ascii.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../modules/web.url-search-params":"../node_modules/core-js/modules/web.url-search-params.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/web.url.to-json.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/proposals/url.js":[function(require,module,exports) {
require('../modules/web.url');
require('../modules/web.url.to-json');
require('../modules/web.url-search-params');

},{"../modules/web.url":"../node_modules/core-js/modules/web.url.js","../modules/web.url.to-json":"../node_modules/core-js/modules/web.url.to-json.js","../modules/web.url-search-params":"../node_modules/core-js/modules/web.url-search-params.js"}],"../node_modules/core-js/modules/esnext.array.last-index.js":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var addToUnscopables = require('../internals/add-to-unscopables');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var defineProperty = require('../internals/object-define-property').f;

// `Array.prototype.lastIndex` getter
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS && !('lastIndex' in [])) {
  defineProperty(Array.prototype, 'lastIndex', {
    configurable: true,
    get: function lastIndex() {
      var O = toObject(this);
      var len = toLength(O.length);
      return len == 0 ? 0 : len - 1;
    }
  });

  addToUnscopables('lastIndex');
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/modules/esnext.array.last-item.js":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var addToUnscopables = require('../internals/add-to-unscopables');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var defineProperty = require('../internals/object-define-property').f;

// `Array.prototype.lastIndex` accessor
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS && !('lastItem' in [])) {
  defineProperty(Array.prototype, 'lastItem', {
    configurable: true,
    get: function lastItem() {
      var O = toObject(this);
      var len = toLength(O.length);
      return len == 0 ? undefined : O[len - 1];
    },
    set: function lastItem(value) {
      var O = toObject(this);
      var len = toLength(O.length);
      return O[len == 0 ? 0 : len - 1] = value;
    }
  });

  addToUnscopables('lastItem');
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/proposals/array-last.js":[function(require,module,exports) {
require('../modules/esnext.array.last-index');
require('../modules/esnext.array.last-item');

},{"../modules/esnext.array.last-index":"../node_modules/core-js/modules/esnext.array.last-index.js","../modules/esnext.array.last-item":"../node_modules/core-js/modules/esnext.array.last-item.js"}],"../node_modules/core-js/modules/esnext.map.group-by.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');

// `Map.groupBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  groupBy: function groupBy(iterable, keyDerivative) {
    var newMap = new this();
    aFunction(keyDerivative);
    var has = aFunction(newMap.has);
    var get = aFunction(newMap.get);
    var set = aFunction(newMap.set);
    iterate(iterable, function (element) {
      var derivedKey = keyDerivative(element);
      if (!has.call(newMap, derivedKey)) set.call(newMap, derivedKey, [element]);
      else get.call(newMap, derivedKey).push(element);
    });
    return newMap;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/modules/esnext.map.key-by.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');

// `Map.keyBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  keyBy: function keyBy(iterable, keyDerivative) {
    var newMap = new this();
    aFunction(keyDerivative);
    var setter = aFunction(newMap.set);
    iterate(iterable, function (element) {
      setter.call(newMap, keyDerivative(element), element);
    });
    return newMap;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/internals/collection-delete-all.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');

// https://github.com/tc39/collection-methods
module.exports = function (/* ...elements */) {
  var collection = anObject(this);
  var remover = aFunction(collection['delete']);
  var allDeleted = true;
  var wasDeleted;
  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = remover.call(collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }
  return !!allDeleted;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/modules/esnext.map.delete-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionDeleteAll = require('../internals/collection-delete-all');

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-delete-all":"../node_modules/core-js/internals/collection-delete-all.js"}],"../node_modules/core-js/internals/get-map-iterator.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var getIterator = require('../internals/get-iterator');

module.exports = IS_PURE ? getIterator : function (it) {
  // eslint-disable-next-line no-undef
  return Map.prototype.entries.call(it);
};

},{"../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-iterator":"../node_modules/core-js/internals/get-iterator.js"}],"../node_modules/core-js/modules/esnext.map.every.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate(iterator, function (key, value) {
      if (!boundFunction(value, key, map)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) setter.call(newMap, key, value);
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.find.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop(value);
    }, undefined, true, true).result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.find-key.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop(key);
    }, undefined, true, true).result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/internals/same-value-zero.js":[function(require,module,exports) {
// `SameValueZero` abstract operation
// https://tc39.github.io/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y || x != x && y != y;
};

},{}],"../node_modules/core-js/modules/esnext.map.includes.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var getMapIterator = require('../internals/get-map-iterator');
var sameValueZero = require('../internals/same-value-zero');
var iterate = require('../internals/iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  includes: function includes(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value) {
      if (sameValueZero(value, searchElement)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/same-value-zero":"../node_modules/core-js/internals/same-value-zero.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.key-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  keyOf: function keyOf(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value) {
      if (value === searchElement) return iterate.stop(key);
    }, undefined, true, true).result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.map-keys.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      setter.call(newMap, boundFunction(value, key, map), value);
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.map-values.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aFunction(newMap.set);
    iterate(iterator, function (key, value) {
      setter.call(newMap, key, boundFunction(value, key, map));
    }, undefined, true, true);
    return newMap;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.merge.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var iterate = require('../internals/iterate');

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  // eslint-disable-next-line no-unused-vars
  merge: function merge(iterable /* ...iterbles */) {
    var map = anObject(this);
    var setter = aFunction(map.set);
    var i = 0;
    while (i < arguments.length) {
      iterate(arguments[i++], setter, map, true);
    }
    return map;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction(callbackfn);
    iterate(iterator, function (key, value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    }, undefined, true, true);
    if (noInitial) throw TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.some.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) return iterate.stop();
    }, undefined, true, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-map-iterator":"../node_modules/core-js/internals/get-map-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.update.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');

// `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  update: function update(key, callback /* , thunk */) {
    var map = anObject(this);
    var length = arguments.length;
    aFunction(callback);
    var isPresentInMap = map.has(key);
    if (!isPresentInMap && length < 3) {
      throw TypeError('Updating absent value');
    }
    var value = isPresentInMap ? map.get(key) : aFunction(length > 2 ? arguments[2] : undefined)(key, map);
    map.set(key, callback(value, key, map));
    return map;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/internals/collection-add-all.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');

// https://github.com/tc39/collection-methods
module.exports = function (/* ...elements */) {
  var set = anObject(this);
  var adder = aFunction(set.add);
  for (var k = 0, len = arguments.length; k < len; k++) {
    adder.call(set, arguments[k]);
  }
  return set;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/modules/esnext.set.add-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionAddAll = require('../internals/collection-add-all');

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  addAll: function addAll(/* ...elements */) {
    return collectionAddAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-add-all":"../node_modules/core-js/internals/collection-add-all.js"}],"../node_modules/core-js/modules/esnext.set.delete-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionDeleteAll = require('../internals/collection-delete-all');

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-delete-all":"../node_modules/core-js/internals/collection-delete-all.js"}],"../node_modules/core-js/internals/get-set-iterator.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var getIterator = require('../internals/get-iterator');

module.exports = IS_PURE ? getIterator : function (it) {
  // eslint-disable-next-line no-undef
  return Set.prototype.values.call(it);
};

},{"../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-iterator":"../node_modules/core-js/internals/get-iterator.js"}],"../node_modules/core-js/modules/esnext.set.every.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return !iterate(iterator, function (value) {
      if (!boundFunction(value, value, set)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) adder.call(newSet, value);
    }, undefined, false, true);
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.find.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) return iterate.stop(value);
    }, undefined, false, true).result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.join.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  join: function join(separator) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var sep = separator === undefined ? ',' : String(separator);
    var result = [];
    iterate(iterator, result.push, result, false, true);
    return result.join(sep);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.map.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aFunction(newSet.add);
    iterate(iterator, function (value) {
      adder.call(newSet, boundFunction(value, value, set));
    }, undefined, false, true);
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction(callbackfn);
    iterate(iterator, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    }, undefined, false, true);
    if (noInitial) throw TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.some.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
    return iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/get-set-iterator":"../node_modules/core-js/internals/get-set-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.weak-map.delete-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionDeleteAll = require('../internals/collection-delete-all');

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-delete-all":"../node_modules/core-js/internals/collection-delete-all.js"}],"../node_modules/core-js/modules/esnext.weak-set.add-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionAddAll = require('../internals/collection-add-all');

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
  addAll: function addAll(/* ...elements */) {
    return collectionAddAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-add-all":"../node_modules/core-js/internals/collection-add-all.js"}],"../node_modules/core-js/modules/esnext.weak-set.delete-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var collectionDeleteAll = require('../internals/collection-delete-all');

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: function deleteAll(/* ...elements */) {
    return collectionDeleteAll.apply(this, arguments);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/collection-delete-all":"../node_modules/core-js/internals/collection-delete-all.js"}],"../node_modules/core-js/proposals/collection-methods.js":[function(require,module,exports) {
require('../modules/esnext.map.group-by');
require('../modules/esnext.map.key-by');
require('../modules/esnext.map.delete-all');
require('../modules/esnext.map.every');
require('../modules/esnext.map.filter');
require('../modules/esnext.map.find');
require('../modules/esnext.map.find-key');
require('../modules/esnext.map.includes');
require('../modules/esnext.map.key-of');
require('../modules/esnext.map.map-keys');
require('../modules/esnext.map.map-values');
require('../modules/esnext.map.merge');
require('../modules/esnext.map.reduce');
require('../modules/esnext.map.some');
require('../modules/esnext.map.update');
require('../modules/esnext.set.add-all');
require('../modules/esnext.set.delete-all');
require('../modules/esnext.set.every');
require('../modules/esnext.set.filter');
require('../modules/esnext.set.find');
require('../modules/esnext.set.join');
require('../modules/esnext.set.map');
require('../modules/esnext.set.reduce');
require('../modules/esnext.set.some');
require('../modules/esnext.weak-map.delete-all');
require('../modules/esnext.weak-set.add-all');
require('../modules/esnext.weak-set.delete-all');

},{"../modules/esnext.map.group-by":"../node_modules/core-js/modules/esnext.map.group-by.js","../modules/esnext.map.key-by":"../node_modules/core-js/modules/esnext.map.key-by.js","../modules/esnext.map.delete-all":"../node_modules/core-js/modules/esnext.map.delete-all.js","../modules/esnext.map.every":"../node_modules/core-js/modules/esnext.map.every.js","../modules/esnext.map.filter":"../node_modules/core-js/modules/esnext.map.filter.js","../modules/esnext.map.find":"../node_modules/core-js/modules/esnext.map.find.js","../modules/esnext.map.find-key":"../node_modules/core-js/modules/esnext.map.find-key.js","../modules/esnext.map.includes":"../node_modules/core-js/modules/esnext.map.includes.js","../modules/esnext.map.key-of":"../node_modules/core-js/modules/esnext.map.key-of.js","../modules/esnext.map.map-keys":"../node_modules/core-js/modules/esnext.map.map-keys.js","../modules/esnext.map.map-values":"../node_modules/core-js/modules/esnext.map.map-values.js","../modules/esnext.map.merge":"../node_modules/core-js/modules/esnext.map.merge.js","../modules/esnext.map.reduce":"../node_modules/core-js/modules/esnext.map.reduce.js","../modules/esnext.map.some":"../node_modules/core-js/modules/esnext.map.some.js","../modules/esnext.map.update":"../node_modules/core-js/modules/esnext.map.update.js","../modules/esnext.set.add-all":"../node_modules/core-js/modules/esnext.set.add-all.js","../modules/esnext.set.delete-all":"../node_modules/core-js/modules/esnext.set.delete-all.js","../modules/esnext.set.every":"../node_modules/core-js/modules/esnext.set.every.js","../modules/esnext.set.filter":"../node_modules/core-js/modules/esnext.set.filter.js","../modules/esnext.set.find":"../node_modules/core-js/modules/esnext.set.find.js","../modules/esnext.set.join":"../node_modules/core-js/modules/esnext.set.join.js","../modules/esnext.set.map":"../node_modules/core-js/modules/esnext.set.map.js","../modules/esnext.set.reduce":"../node_modules/core-js/modules/esnext.set.reduce.js","../modules/esnext.set.some":"../node_modules/core-js/modules/esnext.set.some.js","../modules/esnext.weak-map.delete-all":"../node_modules/core-js/modules/esnext.weak-map.delete-all.js","../modules/esnext.weak-set.add-all":"../node_modules/core-js/modules/esnext.weak-set.add-all.js","../modules/esnext.weak-set.delete-all":"../node_modules/core-js/modules/esnext.weak-set.delete-all.js"}],"../node_modules/core-js/internals/collection-from.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var aFunction = require('../internals/a-function');
var bind = require('../internals/bind-context');
var iterate = require('../internals/iterate');

module.exports = function from(source /* , mapFn, thisArg */) {
  var length = arguments.length;
  var mapFn = length > 1 ? arguments[1] : undefined;
  var mapping, A, n, boundFunction;
  aFunction(this);
  mapping = mapFn !== undefined;
  if (mapping) aFunction(mapFn);
  if (source == undefined) return new this();
  A = [];
  if (mapping) {
    n = 0;
    boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined, 2);
    iterate(source, function (nextItem) {
      A.push(boundFunction(nextItem, n++));
    });
  } else {
    iterate(source, A.push, A);
  }
  return new this(A);
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/bind-context":"../node_modules/core-js/internals/bind-context.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.map.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `Map.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
$({ target: 'Map', stat: true }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-from":"../node_modules/core-js/internals/collection-from.js"}],"../node_modules/core-js/internals/collection-of.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function of() {
  var length = arguments.length;
  var A = new Array(length);
  while (length--) A[length] = arguments[length];
  return new this(A);
};

},{}],"../node_modules/core-js/modules/esnext.map.of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true }, {
  of: of
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-of":"../node_modules/core-js/internals/collection-of.js"}],"../node_modules/core-js/modules/esnext.set.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `Set.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
$({ target: 'Set', stat: true }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-from":"../node_modules/core-js/internals/collection-from.js"}],"../node_modules/core-js/modules/esnext.set.of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `Set.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
$({ target: 'Set', stat: true }, {
  of: of
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-of":"../node_modules/core-js/internals/collection-of.js"}],"../node_modules/core-js/modules/esnext.weak-map.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `WeakMap.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
$({ target: 'WeakMap', stat: true }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-from":"../node_modules/core-js/internals/collection-from.js"}],"../node_modules/core-js/modules/esnext.weak-map.of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `WeakMap.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
$({ target: 'WeakMap', stat: true }, {
  of: of
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-of":"../node_modules/core-js/internals/collection-of.js"}],"../node_modules/core-js/modules/esnext.weak-set.from.js":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `WeakSet.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
$({ target: 'WeakSet', stat: true }, {
  from: from
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-from":"../node_modules/core-js/internals/collection-from.js"}],"../node_modules/core-js/modules/esnext.weak-set.of.js":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `WeakSet.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
$({ target: 'WeakSet', stat: true }, {
  of: of
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/collection-of":"../node_modules/core-js/internals/collection-of.js"}],"../node_modules/core-js/proposals/collection-of-from.js":[function(require,module,exports) {
require('../modules/esnext.map.from');
require('../modules/esnext.map.of');
require('../modules/esnext.set.from');
require('../modules/esnext.set.of');
require('../modules/esnext.weak-map.from');
require('../modules/esnext.weak-map.of');
require('../modules/esnext.weak-set.from');
require('../modules/esnext.weak-set.of');

},{"../modules/esnext.map.from":"../node_modules/core-js/modules/esnext.map.from.js","../modules/esnext.map.of":"../node_modules/core-js/modules/esnext.map.of.js","../modules/esnext.set.from":"../node_modules/core-js/modules/esnext.set.from.js","../modules/esnext.set.of":"../node_modules/core-js/modules/esnext.set.of.js","../modules/esnext.weak-map.from":"../node_modules/core-js/modules/esnext.weak-map.from.js","../modules/esnext.weak-map.of":"../node_modules/core-js/modules/esnext.weak-map.of.js","../modules/esnext.weak-set.from":"../node_modules/core-js/modules/esnext.weak-set.from.js","../modules/esnext.weak-set.of":"../node_modules/core-js/modules/esnext.weak-set.of.js"}],"../node_modules/core-js/internals/composite-key.js":[function(require,module,exports) {
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
var Map = require('../modules/es.map');
var WeakMap = require('../modules/es.weak-map');
var create = require('../internals/object-create');
var isObject = require('../internals/is-object');

var Node = function () {
  // keys
  this.object = null;
  this.symbol = null;
  // child nodes
  this.primitives = null;
  this.objectsByIndex = create(null);
};

Node.prototype.get = function (key, initializer) {
  return this[key] || (this[key] = initializer());
};

Node.prototype.next = function (i, it, IS_OBJECT) {
  var store = IS_OBJECT
    ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap())
    : this.primitives || (this.primitives = new Map());
  var entry = store.get(it);
  if (!entry) store.set(it, entry = new Node());
  return entry;
};

var root = new Node();

module.exports = function () {
  var active = root;
  var length = arguments.length;
  var i, it;
  // for prevent leaking, start from objects
  for (i = 0; i < length; i++) {
    if (isObject(it = arguments[i])) active = active.next(i, it, true);
  }
  if (this === Object && active === root) throw TypeError('Composite keys must contain a non-primitive component');
  for (i = 0; i < length; i++) {
    if (!isObject(it = arguments[i])) active = active.next(i, it, false);
  } return active;
};

},{"../modules/es.map":"../node_modules/core-js/modules/es.map.js","../modules/es.weak-map":"../node_modules/core-js/modules/es.weak-map.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/modules/esnext.composite-key.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getCompositeKeyNode = require('../internals/composite-key');
var getBuiltIn = require('../internals/get-built-in');
var create = require('../internals/object-create');

var initializer = function () {
  var freeze = getBuiltIn('Object', 'freeze');
  return freeze ? freeze(create(null)) : create(null);
};

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true }, {
  compositeKey: function compositeKey() {
    return getCompositeKeyNode.apply(Object, arguments).get('object', initializer);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/composite-key":"../node_modules/core-js/internals/composite-key.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js"}],"../node_modules/core-js/modules/esnext.composite-symbol.js":[function(require,module,exports) {
var $ = require('../internals/export');
var getCompositeKeyNode = require('../internals/composite-key');
var getBuiltIn = require('../internals/get-built-in');

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true }, {
  compositeSymbol: function compositeSymbol() {
    if (arguments.length === 1 && typeof arguments[0] === 'string') return getBuiltIn('Symbol')['for'](arguments[0]);
    return getCompositeKeyNode.apply(null, arguments).get('symbol', getBuiltIn('Symbol'));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/composite-key":"../node_modules/core-js/internals/composite-key.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/proposals/keys-composition.js":[function(require,module,exports) {
require('../modules/esnext.composite-key');
require('../modules/esnext.composite-symbol');

},{"../modules/esnext.composite-key":"../node_modules/core-js/modules/esnext.composite-key.js","../modules/esnext.composite-symbol":"../node_modules/core-js/modules/esnext.composite-symbol.js"}],"../node_modules/core-js/modules/esnext.math.clamp.js":[function(require,module,exports) {
var $ = require('../internals/export');

var min = Math.min;
var max = Math.max;

// `Math.clamp` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  clamp: function clamp(x, lower, upper) {
    return min(upper, max(lower, x));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.deg-per-rad.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.DEG_PER_RAD` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  DEG_PER_RAD: Math.PI / 180
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.degrees.js":[function(require,module,exports) {
var $ = require('../internals/export');

var RAD_PER_DEG = 180 / Math.PI;

// `Math.degrees` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/internals/math-scale.js":[function(require,module,exports) {
// `Math.scale` method implementation
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      /* eslint-disable no-self-compare */
      || x != x
      || inLow != inLow
      || inHigh != inHigh
      || outLow != outLow
      || outHigh != outHigh
      /* eslint-enable no-self-compare */
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],"../node_modules/core-js/modules/esnext.math.fscale.js":[function(require,module,exports) {
var $ = require('../internals/export');

var scale = require('../internals/math-scale');
var fround = require('../internals/math-fround');

// `Math.fscale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-scale":"../node_modules/core-js/internals/math-scale.js","../internals/math-fround":"../node_modules/core-js/internals/math-fround.js"}],"../node_modules/core-js/modules/esnext.math.rad-per-deg.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.RAD_PER_DEG` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  RAD_PER_DEG: 180 / Math.PI
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.radians.js":[function(require,module,exports) {
var $ = require('../internals/export');

var DEG_PER_RAD = Math.PI / 180;

// `Math.radians` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/modules/esnext.math.scale.js":[function(require,module,exports) {
var $ = require('../internals/export');
var scale = require('../internals/math-scale');

// `Math.scale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  scale: scale
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/math-scale":"../node_modules/core-js/internals/math-scale.js"}],"../node_modules/core-js/proposals/math-extensions.js":[function(require,module,exports) {
require('../modules/esnext.math.clamp');
require('../modules/esnext.math.deg-per-rad');
require('../modules/esnext.math.degrees');
require('../modules/esnext.math.fscale');
require('../modules/esnext.math.rad-per-deg');
require('../modules/esnext.math.radians');
require('../modules/esnext.math.scale');

},{"../modules/esnext.math.clamp":"../node_modules/core-js/modules/esnext.math.clamp.js","../modules/esnext.math.deg-per-rad":"../node_modules/core-js/modules/esnext.math.deg-per-rad.js","../modules/esnext.math.degrees":"../node_modules/core-js/modules/esnext.math.degrees.js","../modules/esnext.math.fscale":"../node_modules/core-js/modules/esnext.math.fscale.js","../modules/esnext.math.rad-per-deg":"../node_modules/core-js/modules/esnext.math.rad-per-deg.js","../modules/esnext.math.radians":"../node_modules/core-js/modules/esnext.math.radians.js","../modules/esnext.math.scale":"../node_modules/core-js/modules/esnext.math.scale.js"}],"../node_modules/core-js/modules/esnext.math.signbit.js":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.signbit` method
// https://github.com/tc39/proposal-Math.signbit
$({ target: 'Math', stat: true }, {
  signbit: function signbit(x) {
    return (x = +x) == x && x == 0 ? 1 / x == -Infinity : x < 0;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js"}],"../node_modules/core-js/proposals/math-signbit.js":[function(require,module,exports) {
require('../modules/esnext.math.signbit');

},{"../modules/esnext.math.signbit":"../node_modules/core-js/modules/esnext.math.signbit.js"}],"../node_modules/core-js/modules/esnext.number.from-string.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toInteger = require('../internals/to-integer');
var parseInt = require('../internals/parse-int');

var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
var INVALID_RADIX = 'Invalid radix';
var valid = /^[\da-z]+$/;

// `Number.fromString` method
// https://github.com/tc39/proposal-number-fromstring
$({ target: 'Number', stat: true }, {
  fromString: function fromString(string, radix) {
    var sign = 1;
    var R, mathNum;
    if (typeof string != 'string') throw TypeError(INVALID_NUMBER_REPRESENTATION);
    if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
    if (string.charAt(0) == '-') {
      sign = -1;
      string = string.slice(1);
      if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }
    R = radix === undefined ? 10 : toInteger(radix);
    if (R < 2 || R > 36) throw RangeError(INVALID_RADIX);
    if (!valid.test(string) || (mathNum = parseInt(string, R)).toString(R) !== string) {
      throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }
    return sign * mathNum;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/parse-int":"../node_modules/core-js/internals/parse-int.js"}],"../node_modules/core-js/proposals/number-from-string.js":[function(require,module,exports) {
require('../modules/esnext.number.from-string');

},{"../modules/esnext.number.from-string":"../node_modules/core-js/modules/esnext.number.from-string.js"}],"../node_modules/core-js/modules/esnext.observable.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-observable
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var setSpecies = require('../internals/set-species');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var defineProperty = require('../internals/object-define-property').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var getIterator = require('../internals/get-iterator');
var iterate = require('../internals/iterate');
var hostReportErrors = require('../internals/host-report-errors');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');

var OBSERVABLE = wellKnownSymbol('observable');
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscriptionState) {
  var cleanup = subscriptionState.cleanup;
  if (cleanup) {
    subscriptionState.cleanup = undefined;
    try {
      cleanup();
    } catch (error) {
      hostReportErrors(error);
    }
  }
};

var subscriptionClosed = function (subscriptionState) {
  return subscriptionState.observer === undefined;
};

var close = function (subscription, subscriptionState) {
  if (!DESCRIPTORS) {
    subscription.closed = true;
    var subscriptionObserver = subscriptionState.subscriptionObserver;
    if (subscriptionObserver) subscriptionObserver.closed = true;
  } subscriptionState.observer = undefined;
};

var Subscription = function (observer, subscriber) {
  var subscriptionState = setInternalState(this, {
    cleanup: undefined,
    observer: anObject(observer),
    subscriptionObserver: undefined
  });
  var start;
  if (!DESCRIPTORS) this.closed = false;
  try {
    if (start = getMethod(observer.start)) start.call(observer, this);
  } catch (error) {
    hostReportErrors(error);
  }
  if (subscriptionClosed(subscriptionState)) return;
  var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(subscriptionObserver);
    var subscription = cleanup;
    if (cleanup != null) subscriptionState.cleanup = typeof cleanup.unsubscribe === 'function'
      ? function () { subscription.unsubscribe(); }
      : aFunction(cleanup);
  } catch (error) {
    subscriptionObserver.error(error);
    return;
  } if (subscriptionClosed(subscriptionState)) cleanupSubscription(subscriptionState);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    var subscriptionState = getInternalState(this);
    if (!subscriptionClosed(subscriptionState)) {
      close(this, subscriptionState);
      cleanupSubscription(subscriptionState);
    }
  }
});

if (DESCRIPTORS) defineProperty(Subscription.prototype, 'closed', {
  configurable: true,
  get: function () {
    return subscriptionClosed(getInternalState(this));
  }
});

var SubscriptionObserver = function (subscription) {
  setInternalState(this, { subscription: subscription });
  if (!DESCRIPTORS) this.closed = false;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscriptionState = getInternalState(getInternalState(this).subscription);
    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;
      try {
        var nextMethod = getMethod(observer.next);
        if (nextMethod) nextMethod.call(observer, value);
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  error: function error(value) {
    var subscription = getInternalState(this).subscription;
    var subscriptionState = getInternalState(subscription);
    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;
      close(subscription, subscriptionState);
      try {
        var errorMethod = getMethod(observer.error);
        if (errorMethod) errorMethod.call(observer, value);
        else hostReportErrors(value);
      } catch (err) {
        hostReportErrors(err);
      } cleanupSubscription(subscriptionState);
    }
  },
  complete: function complete() {
    var subscription = getInternalState(this).subscription;
    var subscriptionState = getInternalState(subscription);
    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;
      close(subscription, subscriptionState);
      try {
        var completeMethod = getMethod(observer.complete);
        if (completeMethod) completeMethod.call(observer);
      } catch (error) {
        hostReportErrors(error);
      } cleanupSubscription(subscriptionState);
    }
  }
});

if (DESCRIPTORS) defineProperty(SubscriptionObserver.prototype, 'closed', {
  configurable: true,
  get: function () {
    return subscriptionClosed(getInternalState(getInternalState(this).subscription));
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable');
  setInternalState(this, { subscriber: aFunction(subscriber) });
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    var length = arguments.length;
    return new Subscription(typeof observer === 'function' ? {
      next: observer,
      error: length > 1 ? arguments[1] : undefined,
      complete: length > 2 ? arguments[2] : undefined
    } : isObject(observer) ? observer : {}, getInternalState(this).subscriber);
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var observableMethod = getMethod(anObject(x)[OBSERVABLE]);
    if (observableMethod) {
      var observable = anObject(observableMethod.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    var iterator = getIterator(x);
    return new C(function (observer) {
      iterate(iterator, function (it) {
        observer.next(it);
        if (observer.closed) return iterate.stop();
      }, undefined, false, true);
      observer.complete();
    });
  },
  of: function of() {
    var C = typeof this === 'function' ? this : $Observable;
    var length = arguments.length;
    var items = new Array(length);
    var index = 0;
    while (index < length) items[index] = arguments[index++];
    return new C(function (observer) {
      for (var i = 0; i < length; i++) {
        observer.next(items[i]);
        if (observer.closed) return;
      } observer.complete();
    });
  }
});

createNonEnumerableProperty($Observable.prototype, OBSERVABLE, function () { return this; });

$({ global: true }, {
  Observable: $Observable
});

setSpecies('Observable');

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/set-species":"../node_modules/core-js/internals/set-species.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/get-iterator":"../node_modules/core-js/internals/get-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/host-report-errors":"../node_modules/core-js/internals/host-report-errors.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/esnext.symbol.observable.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/proposals/observable.js":[function(require,module,exports) {
require('../modules/esnext.observable');
require('../modules/esnext.symbol.observable');

},{"../modules/esnext.observable":"../node_modules/core-js/modules/esnext.observable.js","../modules/esnext.symbol.observable":"../node_modules/core-js/modules/esnext.symbol.observable.js"}],"../node_modules/core-js/modules/esnext.symbol.pattern-match.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/proposals/pattern-matching.js":[function(require,module,exports) {
require('../modules/esnext.symbol.pattern-match');

},{"../modules/esnext.symbol.pattern-match":"../node_modules/core-js/modules/esnext.symbol.pattern-match.js"}],"../node_modules/core-js/modules/esnext.promise.try.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/new-promise-capability":"../node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js/internals/perform.js"}],"../node_modules/core-js/proposals/promise-try.js":[function(require,module,exports) {
require('../modules/esnext.promise.try');

},{"../modules/esnext.promise.try":"../node_modules/core-js/modules/esnext.promise.try.js"}],"../node_modules/core-js/modules/esnext.math.seeded-prng.js":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var numberIsFinite = require('../internals/number-is-finite');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var InternalStateModule = require('../internals/internal-state');

var SEEDED_RANDOM = 'Seeded Random';
var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SEEDED_RANDOM_GENERATOR);
var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';

var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
  setInternalState(this, {
    type: SEEDED_RANDOM_GENERATOR,
    seed: seed % 2147483647
  });
}, SEEDED_RANDOM, function next() {
  var state = getInternalState(this);
  var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
  return { value: (seed & 1073741823) / 1073741823, done: false };
});

// `Math.seededPRNG` method
// https://github.com/tc39/proposal-seeded-random
// based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html
$({ target: 'Math', stat: true, forced: true }, {
  seededPRNG: function seededPRNG(it) {
    var seed = anObject(it).seed;
    if (!numberIsFinite(seed)) throw TypeError(SEED_TYPE_ERROR);
    return new $SeededRandomGenerator(seed);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/number-is-finite":"../node_modules/core-js/internals/number-is-finite.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/proposals/seeded-random.js":[function(require,module,exports) {
require('../modules/esnext.math.seeded-prng');

},{"../modules/esnext.math.seeded-prng":"../node_modules/core-js/modules/esnext.math.seeded-prng.js"}],"../node_modules/core-js/modules/esnext.string.code-points.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var requireObjectCoercible = require('../internals/require-object-coercible');
var InternalStateModule = require('../internals/internal-state');
var StringMultibyteModule = require('../internals/string-multibyte');

var codeAt = StringMultibyteModule.codeAt;
var charAt = StringMultibyteModule.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// TODO: unify with String#@@iterator
var $StringIterator = createIteratorConstructor(function StringIterator(string) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: string,
    index: 0
  });
}, 'String', function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: { codePoint: codeAt(point, 0), position: index }, done: false };
});

// `String.prototype.codePoints` method
// https://github.com/tc39/proposal-string-prototype-codepoints
$({ target: 'String', proto: true }, {
  codePoints: function codePoints() {
    return new $StringIterator(String(requireObjectCoercible(this)));
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js"}],"../node_modules/core-js/proposals/string-code-points.js":[function(require,module,exports) {
require('../modules/esnext.string.code-points');

},{"../modules/esnext.string.code-points":"../node_modules/core-js/modules/esnext.string.code-points.js"}],"../node_modules/core-js/modules/esnext.array.is-template-object.js":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

var isFrozen = Object.isFrozen;

var isFrozenStringArray = function (array, allowUndefined) {
  if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
  var index = 0;
  var length = array.length;
  var element;
  while (index < length) {
    element = array[index++];
    if (!(typeof element === 'string' || (allowUndefined && typeof element === 'undefined'))) {
      return false;
    }
  } return length !== 0;
};

// `Array.isTemplateObject` method
// https://github.com/tc39/proposal-array-is-template-object
$({ target: 'Array', stat: true }, {
  isTemplateObject: function isTemplateObject(value) {
    if (!isFrozenStringArray(value, true)) return false;
    var raw = value.raw;
    if (raw.length !== value.length || !isFrozenStringArray(raw, false)) return false;
    return true;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js"}],"../node_modules/core-js/proposals/array-is-template-object.js":[function(require,module,exports) {
require('../modules/esnext.array.is-template-object');

},{"../modules/esnext.array.is-template-object":"../node_modules/core-js/modules/esnext.array.is-template-object.js"}],"../node_modules/core-js/internals/async-iterator-prototype.js":[function(require,module,exports) {

var global = require('../internals/global');
var shared = require('../internals/shared-store');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var has = require('../internals/has');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = global.AsyncIterator;
var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
var AsyncIteratorPrototype, prototype;

if (!IS_PURE) {
  if (PassedAsyncIteratorPrototype) {
    AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
  } else if (typeof AsyncIterator == 'function') {
    AsyncIteratorPrototype = AsyncIterator.prototype;
  } else if (shared[USE_FUNCTION_CONSTRUCTOR] || global[USE_FUNCTION_CONSTRUCTOR]) {
    try {
      // eslint-disable-next-line no-new-func
      prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
      if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
    } catch (error) { /* empty */ }
  }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};

if (!has(AsyncIteratorPrototype, ASYNC_ITERATOR)) {
  createNonEnumerableProperty(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/shared-store":"../node_modules/core-js/internals/shared-store.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/modules/esnext.async-iterator.constructor.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anInstance = require('../internals/an-instance');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var IS_PURE = require('../internals/is-pure');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var AsyncIteratorConstructor = function AsyncIterator() {
  anInstance(this, AsyncIteratorConstructor);
};

AsyncIteratorConstructor.prototype = AsyncIteratorPrototype;

if (!has(AsyncIteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(AsyncIteratorPrototype, TO_STRING_TAG, 'AsyncIterator');
}

if (!has(AsyncIteratorPrototype, 'constructor') || AsyncIteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(AsyncIteratorPrototype, 'constructor', AsyncIteratorConstructor);
}

$({ global: true, forced: IS_PURE }, {
  AsyncIterator: AsyncIteratorConstructor
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/async-iterator-prototype":"../node_modules/core-js/internals/async-iterator-prototype.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/create-async-iterator-proxy.js":[function(require,module,exports) {
'use strict';
var path = require('../internals/path');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getBuiltIn = require('../internals/get-built-in');

var Promise = getBuiltIn('Promise');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.get;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $return = function (value) {
  var iterator = getInternalState(this).iterator;
  var $$return = iterator['return'];
  return $$return === undefined
    ? Promise.resolve({ done: true, value: value })
    : anObject($$return.call(iterator, value));
};

var $throw = function (value) {
  var iterator = getInternalState(this).iterator;
  var $$throw = iterator['throw'];
  return $$throw === undefined
    ? Promise.reject(value)
    : $$throw.call(iterator, value);
};

module.exports = function (nextHandler, IS_ITERATOR) {
  var AsyncIteratorProxy = function AsyncIterator(state) {
    state.next = aFunction(state.iterator.next);
    state.done = false;
    setInternalState(this, state);
  };

  AsyncIteratorProxy.prototype = redefineAll(create(path.AsyncIterator.prototype), {
    next: function next(arg) {
      var state = getInternalState(this);
      if (state.done) return Promise.resolve({ done: true, value: undefined });
      try {
        return Promise.resolve(anObject(nextHandler.call(state, arg, Promise)));
      } catch (error) {
        return Promise.reject(error);
      }
    },
    'return': $return,
    'throw': $throw
  });

  if (!IS_ITERATOR) {
    createNonEnumerableProperty(AsyncIteratorProxy.prototype, TO_STRING_TAG, 'Generator');
  }

  return AsyncIteratorProxy;
};

},{"../internals/path":"../node_modules/core-js/internals/path.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/modules/esnext.async-iterator.as-indexed-pairs.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg, Promise) {
  var state = this;
  var iterator = state.iterator;

  return Promise.resolve(anObject(state.next.call(iterator, arg))).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return { done: true, value: undefined };
    }
    return { done: false, value: [state.index++, step.value] };
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  asIndexedPairs: function asIndexedPairs() {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      index: 0
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.async-iterator.drop.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg, Promise) {
  var state = this;

  return new Promise(function (resolve, reject) {
    var loop = function () {
      try {
        Promise.resolve(
          anObject(state.next.call(state.iterator, state.remaining ? undefined : arg))
        ).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else if (state.remaining) {
              state.remaining--;
              loop();
            } else resolve({ done: false, value: step.value });
          } catch (err) { reject(err); }
        }, reject);
      } catch (error) { reject(error); }
    };

    loop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  drop: function drop(limit) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-positive-integer":"../node_modules/core-js/internals/to-positive-integer.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js"}],"../node_modules/core-js/internals/async-iterator-iteration.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var getBuiltIn = require('../internals/get-built-in');

var Promise = getBuiltIn('Promise');
var push = [].push;

var createMethod = function (TYPE) {
  var IS_TO_ARRAY = TYPE == 0;
  var IS_FOR_EACH = TYPE == 1;
  var IS_EVERY = TYPE == 2;
  var IS_SOME = TYPE == 3;
  return function (iterator, fn) {
    anObject(iterator);
    var next = aFunction(iterator.next);
    var array = IS_TO_ARRAY ? [] : undefined;
    if (!IS_TO_ARRAY) aFunction(fn);

    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject(next.call(iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                resolve(IS_TO_ARRAY ? array : IS_SOME ? false : IS_EVERY || undefined);
              } else {
                var value = step.value;
                if (IS_TO_ARRAY) {
                  push.call(array, value);
                  loop();
                } else {
                  Promise.resolve(fn(value)).then(function (result) {
                    if (IS_FOR_EACH) {
                      loop();
                    } else if (IS_EVERY) {
                      result ? loop() : resolve(false);
                    } else {
                      result ? resolve(IS_SOME || value) : loop();
                    }
                  }, reject);
                }
              }
            } catch (err) { reject(err); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  };
};

module.exports = {
  toArray: createMethod(0),
  forEach: createMethod(1),
  every: createMethod(2),
  some: createMethod(3),
  find: createMethod(4)
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/modules/esnext.async-iterator.every.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $every = require('../internals/async-iterator-iteration').every;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  every: function every(fn) {
    return $every(this, fn);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/async-iterator-iteration":"../node_modules/core-js/internals/async-iterator-iteration.js"}],"../node_modules/core-js/modules/esnext.async-iterator.filter.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg, Promise) {
  var state = this;
  var filterer = state.filterer;

  return new Promise(function (resolve, reject) {
    var loop = function () {
      try {
        Promise.resolve(anObject(state.next.call(state.iterator, arg))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else {
              var value = step.value;
              Promise.resolve(filterer(value)).then(function (selected) {
                selected ? resolve({ done: false, value: value }) : loop();
              }, reject);
            }
          } catch (err) { reject(err); }
        }, reject);
      } catch (error) { reject(error); }
    };

    loop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      filterer: aFunction(filterer)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.async-iterator.find.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $find = require('../internals/async-iterator-iteration').find;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  find: function find(fn) {
    return $find(this, fn);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/async-iterator-iteration":"../node_modules/core-js/internals/async-iterator-iteration.js"}],"../node_modules/core-js/internals/get-async-iterator-method.js":[function(require,module,exports) {
var getIteratorMethod = require('../internals/get-iterator-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (it) {
  var method = it[ASYNC_ITERATOR];
  return method === undefined ? getIteratorMethod(it) : method;
};

},{"../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/esnext.async-iterator.flat-map.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');
var getAsyncIteratorMethod = require('../internals/get-async-iterator-method');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg, Promise) {
  var state = this;
  var mapper = state.mapper;
  var innerIterator, iteratorMethod;

  return new Promise(function (resolve, reject) {
    var outerLoop = function () {
      try {
        Promise.resolve(anObject(state.next.call(state.iterator, arg))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else {
              Promise.resolve(mapper(step.value)).then(function (mapped) {
                try {
                  iteratorMethod = getAsyncIteratorMethod(mapped);
                  if (iteratorMethod !== undefined) {
                    state.innerIterator = innerIterator = anObject(iteratorMethod.call(mapped));
                    state.innerNext = aFunction(innerIterator.next);
                    return innerLoop();
                  } reject(TypeError('.flatMap callback should return an iterable object'));
                } catch (error2) { reject(error2); }
              }, reject);
            }
          } catch (error1) { reject(error1); }
        }, reject);
      } catch (error) { reject(error); }
    };

    var innerLoop = function () {
      if (innerIterator = state.innerIterator) {
        try {
          Promise.resolve(anObject(state.innerNext.call(innerIterator))).then(function (result) {
            try {
              if (anObject(result).done) {
                state.innerIterator = state.innerNext = null;
                outerLoop();
              } else resolve({ done: false, value: result.value });
            } catch (error1) { reject(error1); }
          }, reject);
        } catch (error) { reject(error); }
      } else outerLoop();
    };

    innerLoop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  flatMap: function flatMap(mapper) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper),
      innerIterator: null,
      innerNext: null
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js","../internals/get-async-iterator-method":"../node_modules/core-js/internals/get-async-iterator-method.js"}],"../node_modules/core-js/modules/esnext.async-iterator.for-each.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $forEach = require('../internals/async-iterator-iteration').forEach;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    return $forEach(this, fn);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/async-iterator-iteration":"../node_modules/core-js/internals/async-iterator-iteration.js"}],"../node_modules/core-js/modules/esnext.async-iterator.from.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var path = require('../internals/path');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');
var getAsyncIteratorMethod = require('../internals/get-async-iterator-method');

var AsyncIterator = path.AsyncIterator;

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg) {
  return anObject(this.next.call(this.iterator, arg));
}, true);

$({ target: 'AsyncIterator', stat: true }, {
  from: function from(O) {
    var object = toObject(O);
    var usingIterator = getAsyncIteratorMethod(object);
    var iterator;
    if (usingIterator != null) {
      iterator = aFunction(usingIterator).call(object);
      if (iterator instanceof AsyncIterator) return iterator;
    } else {
      iterator = object;
    } return new AsyncIteratorProxy({
      iterator: iterator
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/path":"../node_modules/core-js/internals/path.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js","../internals/get-async-iterator-method":"../node_modules/core-js/internals/get-async-iterator-method.js"}],"../node_modules/core-js/modules/esnext.async-iterator.map.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg, Promise) {
  var state = this;
  var mapper = state.mapper;

  return Promise.resolve(anObject(state.next.call(state.iterator, arg))).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return { done: true, value: undefined };
    }
    return Promise.resolve(mapper(step.value)).then(function (value) {
      return { done: false, value: value };
    });
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.async-iterator.reduce.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var getBuiltIn = require('../internals/get-built-in');

var Promise = getBuiltIn('Promise');

$({ target: 'AsyncIterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    var iterator = anObject(this);
    var next = aFunction(iterator.next);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aFunction(reducer);

    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject(next.call(iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                noInitial ? reject(TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
              } else {
                var value = step.value;
                if (noInitial) {
                  noInitial = false;
                  accumulator = value;
                  loop();
                } else {
                  Promise.resolve(reducer(accumulator, value)).then(function (result) {
                    accumulator = result;
                    loop();
                  }, reject);
                }
              }
            } catch (err) { reject(err); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/modules/esnext.async-iterator.some.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $some = require('../internals/async-iterator-iteration').some;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  some: function some(fn) {
    return $some(this, fn);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/async-iterator-iteration":"../node_modules/core-js/internals/async-iterator-iteration.js"}],"../node_modules/core-js/modules/esnext.async-iterator.take.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/create-async-iterator-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (arg) {
  if (!this.remaining--) {
    this.done = true;
    return { done: true, value: undefined };
  } return this.next.call(this.iterator, arg);
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  take: function take(limit) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-positive-integer":"../node_modules/core-js/internals/to-positive-integer.js","../internals/create-async-iterator-proxy":"../node_modules/core-js/internals/create-async-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.async-iterator.to-array.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $toArray = require('../internals/async-iterator-iteration').toArray;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  toArray: function toArray() {
    return $toArray(this);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/async-iterator-iteration":"../node_modules/core-js/internals/async-iterator-iteration.js"}],"../node_modules/core-js/modules/esnext.iterator.constructor.js":[function(require,module,exports) {

'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var global = require('../internals/global');
var anInstance = require('../internals/an-instance');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var fails = require('../internals/fails');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var NativeIterator = global.Iterator;

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || typeof NativeIterator != 'function'
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorConstructor);
};

if (IS_PURE) {
  IteratorPrototype = {};
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

if (!has(IteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(IteratorPrototype, TO_STRING_TAG, 'Iterator');
}

if (FORCED || !has(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(IteratorPrototype, 'constructor', IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

$({ global: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/iterators-core":"../node_modules/core-js/internals/iterators-core.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/create-iterator-proxy.js":[function(require,module,exports) {
'use strict';
var path = require('../internals/path');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.get;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $return = function (value) {
  var iterator = getInternalState(this).iterator;
  var $$return = iterator['return'];
  return $$return === undefined ? { done: true, value: value } : anObject($$return.call(iterator, value));
};

var $throw = function (value) {
  var iterator = getInternalState(this).iterator;
  var $$throw = iterator['throw'];
  if ($$throw === undefined) throw value;
  return $$throw.call(iterator, value);
};

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(state) {
    state.next = aFunction(state.iterator.next);
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = redefineAll(create(path.Iterator.prototype), {
    next: function next() {
      var state = getInternalState(this);
      var result = state.done ? undefined : nextHandler.apply(state, arguments);
      return { done: state.done, value: result };
    },
    'return': $return,
    'throw': $throw
  });

  if (!IS_ITERATOR) {
    createNonEnumerableProperty(IteratorProxy.prototype, TO_STRING_TAG, 'Generator');
  }

  return IteratorProxy;
};

},{"../internals/path":"../node_modules/core-js/internals/path.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/esnext.iterator.as-indexed-pairs.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');

var IteratorProxy = createIteratorProxy(function (arg) {
  var result = anObject(this.next.call(this.iterator, arg));
  var done = this.done = !!result.done;
  if (!done) return [this.index++, result.value];
});

$({ target: 'Iterator', proto: true, real: true }, {
  asIndexedPairs: function asIndexedPairs() {
    return new IteratorProxy({
      iterator: anObject(this),
      index: 0
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.iterator.drop.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createIteratorProxy = require('../internals/create-iterator-proxy');

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var next = this.next;
  var result, done;
  while (this.remaining) {
    this.remaining--;
    result = anObject(next.call(iterator));
    done = this.done = !!result.done;
    if (done) return;
  }
  result = anObject(next.call(iterator, arg));
  done = this.done = !!result.done;
  if (!done) return result.value;
});

$({ target: 'Iterator', proto: true, real: true }, {
  drop: function drop(limit) {
    return new IteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-positive-integer":"../node_modules/core-js/internals/to-positive-integer.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.iterator.every.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  every: function every(fn) {
    anObject(this);
    aFunction(fn);
    return !iterate(this, function (value) {
      if (!fn(value)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.iterator.filter.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var filterer = this.filterer;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(next.call(iterator, arg));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, filterer, value)) return value;
  }
});

$({ target: 'Iterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new IteratorProxy({
      iterator: anObject(this),
      filterer: aFunction(filterer)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js/internals/call-with-safe-iteration-closing.js"}],"../node_modules/core-js/modules/esnext.iterator.find.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(fn) {
    anObject(this);
    aFunction(fn);
    return iterate(this, function (value) {
      if (fn(value)) return iterate.stop(value);
    }, undefined, false, true).result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.iterator.flat-map.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');
var createIteratorProxy = require('../internals/create-iterator-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var result, mapped, iteratorMethod, innerIterator;

  while (true) {
    if (innerIterator = this.innerIterator) {
      result = anObject(this.innerNext.call(innerIterator));
      if (!result.done) return result.value;
      this.innerIterator = this.innerNext = null;
    }

    result = anObject(this.next.call(iterator, arg));

    if (this.done = !!result.done) return;

    mapped = callWithSafeIterationClosing(iterator, this.mapper, result.value);
    iteratorMethod = getIteratorMethod(mapped);

    if (iteratorMethod === undefined) {
      throw TypeError('.flatMap callback should return an iterable object');
    }

    this.innerIterator = innerIterator = anObject(iteratorMethod.call(mapped));
    this.innerNext = aFunction(innerIterator.next);
  }
});

$({ target: 'Iterator', proto: true, real: true }, {
  flatMap: function flatMap(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper),
      innerIterator: null,
      innerNext: null
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js/internals/call-with-safe-iteration-closing.js"}],"../node_modules/core-js/modules/esnext.iterator.for-each.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    iterate(anObject(this), fn, undefined, false, true);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.iterator.from.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var path = require('../internals/path');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');
var getIteratorMethod = require('../internals/get-iterator-method');

var Iterator = path.Iterator;

var IteratorProxy = createIteratorProxy(function (arg) {
  var result = anObject(this.next.call(this.iterator, arg));
  var done = this.done = !!result.done;
  if (!done) return result.value;
}, true);

$({ target: 'Iterator', stat: true }, {
  from: function from(O) {
    var object = toObject(O);
    var usingIterator = getIteratorMethod(object);
    var iterator;
    if (usingIterator != null) {
      iterator = aFunction(usingIterator).call(object);
      if (iterator instanceof Iterator) return iterator;
    } else {
      iterator = object;
    } return new IteratorProxy({
      iterator: iterator
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/path":"../node_modules/core-js/internals/path.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js"}],"../node_modules/core-js/modules/esnext.iterator.map.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/create-iterator-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var result = anObject(this.next.call(iterator, arg));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
});

$({ target: 'Iterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js","../internals/call-with-safe-iteration-closing":"../node_modules/core-js/internals/call-with-safe-iteration-closing.js"}],"../node_modules/core-js/modules/esnext.iterator.reduce.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aFunction(reducer);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    iterate(this, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value);
      }
    }, undefined, false, true);
    if (noInitial) throw TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.iterator.some.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aFunction = require('../internals/a-function');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  some: function some(fn) {
    anObject(this);
    aFunction(fn);
    return iterate(this, function (value) {
      if (fn(value)) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.iterator.take.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createIteratorProxy = require('../internals/create-iterator-proxy');

var IteratorProxy = createIteratorProxy(function (arg) {
  if (!this.remaining--) {
    this.done = true;
    return;
  }
  var result = anObject(this.next.call(this.iterator, arg));
  var done = this.done = !!result.done;
  if (!done) return result.value;
});

$({ target: 'Iterator', proto: true, real: true }, {
  take: function take(limit) {
    return new IteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-positive-integer":"../node_modules/core-js/internals/to-positive-integer.js","../internals/create-iterator-proxy":"../node_modules/core-js/internals/create-iterator-proxy.js"}],"../node_modules/core-js/modules/esnext.iterator.to-array.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var anObject = require('../internals/an-object');

var push = [].push;

$({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    iterate(anObject(this), push, result, false, true);
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/proposals/iterator-helpers.js":[function(require,module,exports) {
require('../modules/esnext.async-iterator.constructor');
require('../modules/esnext.async-iterator.as-indexed-pairs');
require('../modules/esnext.async-iterator.drop');
require('../modules/esnext.async-iterator.every');
require('../modules/esnext.async-iterator.filter');
require('../modules/esnext.async-iterator.find');
require('../modules/esnext.async-iterator.flat-map');
require('../modules/esnext.async-iterator.for-each');
require('../modules/esnext.async-iterator.from');
require('../modules/esnext.async-iterator.map');
require('../modules/esnext.async-iterator.reduce');
require('../modules/esnext.async-iterator.some');
require('../modules/esnext.async-iterator.take');
require('../modules/esnext.async-iterator.to-array');
require('../modules/esnext.iterator.constructor');
require('../modules/esnext.iterator.as-indexed-pairs');
require('../modules/esnext.iterator.drop');
require('../modules/esnext.iterator.every');
require('../modules/esnext.iterator.filter');
require('../modules/esnext.iterator.find');
require('../modules/esnext.iterator.flat-map');
require('../modules/esnext.iterator.for-each');
require('../modules/esnext.iterator.from');
require('../modules/esnext.iterator.map');
require('../modules/esnext.iterator.reduce');
require('../modules/esnext.iterator.some');
require('../modules/esnext.iterator.take');
require('../modules/esnext.iterator.to-array');

},{"../modules/esnext.async-iterator.constructor":"../node_modules/core-js/modules/esnext.async-iterator.constructor.js","../modules/esnext.async-iterator.as-indexed-pairs":"../node_modules/core-js/modules/esnext.async-iterator.as-indexed-pairs.js","../modules/esnext.async-iterator.drop":"../node_modules/core-js/modules/esnext.async-iterator.drop.js","../modules/esnext.async-iterator.every":"../node_modules/core-js/modules/esnext.async-iterator.every.js","../modules/esnext.async-iterator.filter":"../node_modules/core-js/modules/esnext.async-iterator.filter.js","../modules/esnext.async-iterator.find":"../node_modules/core-js/modules/esnext.async-iterator.find.js","../modules/esnext.async-iterator.flat-map":"../node_modules/core-js/modules/esnext.async-iterator.flat-map.js","../modules/esnext.async-iterator.for-each":"../node_modules/core-js/modules/esnext.async-iterator.for-each.js","../modules/esnext.async-iterator.from":"../node_modules/core-js/modules/esnext.async-iterator.from.js","../modules/esnext.async-iterator.map":"../node_modules/core-js/modules/esnext.async-iterator.map.js","../modules/esnext.async-iterator.reduce":"../node_modules/core-js/modules/esnext.async-iterator.reduce.js","../modules/esnext.async-iterator.some":"../node_modules/core-js/modules/esnext.async-iterator.some.js","../modules/esnext.async-iterator.take":"../node_modules/core-js/modules/esnext.async-iterator.take.js","../modules/esnext.async-iterator.to-array":"../node_modules/core-js/modules/esnext.async-iterator.to-array.js","../modules/esnext.iterator.constructor":"../node_modules/core-js/modules/esnext.iterator.constructor.js","../modules/esnext.iterator.as-indexed-pairs":"../node_modules/core-js/modules/esnext.iterator.as-indexed-pairs.js","../modules/esnext.iterator.drop":"../node_modules/core-js/modules/esnext.iterator.drop.js","../modules/esnext.iterator.every":"../node_modules/core-js/modules/esnext.iterator.every.js","../modules/esnext.iterator.filter":"../node_modules/core-js/modules/esnext.iterator.filter.js","../modules/esnext.iterator.find":"../node_modules/core-js/modules/esnext.iterator.find.js","../modules/esnext.iterator.flat-map":"../node_modules/core-js/modules/esnext.iterator.flat-map.js","../modules/esnext.iterator.for-each":"../node_modules/core-js/modules/esnext.iterator.for-each.js","../modules/esnext.iterator.from":"../node_modules/core-js/modules/esnext.iterator.from.js","../modules/esnext.iterator.map":"../node_modules/core-js/modules/esnext.iterator.map.js","../modules/esnext.iterator.reduce":"../node_modules/core-js/modules/esnext.iterator.reduce.js","../modules/esnext.iterator.some":"../node_modules/core-js/modules/esnext.iterator.some.js","../modules/esnext.iterator.take":"../node_modules/core-js/modules/esnext.iterator.take.js","../modules/esnext.iterator.to-array":"../node_modules/core-js/modules/esnext.iterator.to-array.js"}],"../node_modules/core-js/internals/map-upsert.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');

// `Map.prototype.upsert` method
// https://github.com/thumbsupep/proposal-upsert
module.exports = function upsert(key, updateFn /* , insertFn */) {
  var map = anObject(this);
  var insertFn = arguments.length > 2 ? arguments[2] : undefined;
  var value;
  if (typeof updateFn != 'function' && typeof insertFn != 'function') {
    throw TypeError('At least one callback required');
  }
  if (map.has(key)) {
    value = map.get(key);
    if (typeof updateFn == 'function') {
      value = updateFn(value);
      map.set(key, value);
    }
  } else if (typeof insertFn == 'function') {
    value = insertFn();
    map.set(key, value);
  } return value;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/modules/esnext.map.update-or-insert.js":[function(require,module,exports) {
'use strict';
// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var $upsert = require('../internals/map-upsert');

// `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.upsert`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  updateOrInsert: $upsert
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/map-upsert":"../node_modules/core-js/internals/map-upsert.js"}],"../node_modules/core-js/modules/esnext.map.upsert.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var $upsert = require('../internals/map-upsert');

// `Map.prototype.upsert` method
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  upsert: $upsert
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/map-upsert":"../node_modules/core-js/internals/map-upsert.js"}],"../node_modules/core-js/modules/esnext.weak-map.upsert.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var $upsert = require('../internals/map-upsert');

// `WeakMap.prototype.upsert` method
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  upsert: $upsert
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/map-upsert":"../node_modules/core-js/internals/map-upsert.js"}],"../node_modules/core-js/proposals/map-upsert.js":[function(require,module,exports) {
// https://github.com/thumbsupep/proposal-upsert
// TODO: remove from `core-js@4`
require('../modules/esnext.map.update-or-insert');
require('../modules/esnext.map.upsert');
require('../modules/esnext.weak-map.upsert');

},{"../modules/esnext.map.update-or-insert":"../node_modules/core-js/modules/esnext.map.update-or-insert.js","../modules/esnext.map.upsert":"../node_modules/core-js/modules/esnext.map.upsert.js","../modules/esnext.weak-map.upsert":"../node_modules/core-js/modules/esnext.weak-map.upsert.js"}],"../node_modules/core-js/modules/esnext.set.difference.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  difference: function difference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    iterate(iterable, function (value) {
      remover.call(newSet, value);
    });
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.intersection.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  intersection: function intersection(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var hasCheck = aFunction(set.has);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      if (hasCheck.call(set, value)) adder.call(newSet, value);
    });
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.is-disjoint-from.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var iterate = require('../internals/iterate');

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value) {
      if (hasCheck.call(set, value) === true) return iterate.stop();
    }).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.is-subset-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var getIterator = require('../internals/get-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject(iterable);
    var hasCheck = otherSet.has;
    if (typeof hasCheck != 'function') {
      otherSet = new (getBuiltIn('Set'))(iterable);
      hasCheck = aFunction(otherSet.has);
    }
    return !iterate(iterator, function (value) {
      if (hasCheck.call(otherSet, value) === false) return iterate.stop();
    }, undefined, false, true).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/get-iterator":"../node_modules/core-js/internals/get-iterator.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.is-superset-of.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var iterate = require('../internals/iterate');

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject(this);
    var hasCheck = aFunction(set.has);
    return !iterate(iterable, function (value) {
      if (hasCheck.call(set, value) === false) return iterate.stop();
    }).stopped;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.union.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    iterate(iterable, aFunction(newSet.add), newSet);
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/modules/esnext.set.symmetric-difference.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var aFunction = require('../internals/a-function');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aFunction(newSet['delete']);
    var adder = aFunction(newSet.add);
    iterate(iterable, function (value) {
      remover.call(newSet, value) || adder.call(newSet, value);
    });
    return newSet;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/species-constructor":"../node_modules/core-js/internals/species-constructor.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/proposals/set-methods.js":[function(require,module,exports) {
require('../modules/esnext.set.difference');
require('../modules/esnext.set.intersection');
require('../modules/esnext.set.is-disjoint-from');
require('../modules/esnext.set.is-subset-of');
require('../modules/esnext.set.is-superset-of');
require('../modules/esnext.set.union');
require('../modules/esnext.set.symmetric-difference');

},{"../modules/esnext.set.difference":"../node_modules/core-js/modules/esnext.set.difference.js","../modules/esnext.set.intersection":"../node_modules/core-js/modules/esnext.set.intersection.js","../modules/esnext.set.is-disjoint-from":"../node_modules/core-js/modules/esnext.set.is-disjoint-from.js","../modules/esnext.set.is-subset-of":"../node_modules/core-js/modules/esnext.set.is-subset-of.js","../modules/esnext.set.is-superset-of":"../node_modules/core-js/modules/esnext.set.is-superset-of.js","../modules/esnext.set.union":"../node_modules/core-js/modules/esnext.set.union.js","../modules/esnext.set.symmetric-difference":"../node_modules/core-js/modules/esnext.set.symmetric-difference.js"}],"../node_modules/core-js/modules/esnext.symbol.async-dispose.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('asyncDispose');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/modules/esnext.symbol.dispose.js":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('dispose');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/proposals/using-statement.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-using-statement
require('../modules/esnext.symbol.async-dispose');
require('../modules/esnext.symbol.dispose');

},{"../modules/esnext.symbol.async-dispose":"../node_modules/core-js/modules/esnext.symbol.async-dispose.js","../modules/esnext.symbol.dispose":"../node_modules/core-js/modules/esnext.symbol.dispose.js"}],"../node_modules/core-js/modules/esnext.aggregate-error.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var create = require('../internals/object-create');
var defineProperty = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var iterate = require('../internals/iterate');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var getInternalAggregateErrorState = InternalStateModule.getterFor('AggregateError');

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(message), getPrototypeOf(that));
  }
  var errorsArray = [];
  iterate(errors, errorsArray.push, errorsArray);
  if (DESCRIPTORS) setInternalState(that, { errors: errorsArray, type: 'AggregateError' });
  else that.errors = errorsArray;
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

if (DESCRIPTORS) defineProperty.f($AggregateError.prototype, 'errors', {
  get: function () {
    return getInternalAggregateErrorState(this).errors;
  },
  configurable: true
});

$({ global: true }, {
  AggregateError: $AggregateError
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/esnext.promise.any.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aFunction = require('../internals/a-function');
var getBuiltIn = require('../internals/get-built-in');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://github.com/tc39/proposal-promise-any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (e) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = e;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/new-promise-capability":"../node_modules/core-js/internals/new-promise-capability.js","../internals/perform":"../node_modules/core-js/internals/perform.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js"}],"../node_modules/core-js/proposals/promise-any.js":[function(require,module,exports) {
require('../modules/esnext.aggregate-error');
require('../modules/esnext.promise.any');

},{"../modules/esnext.aggregate-error":"../node_modules/core-js/modules/esnext.aggregate-error.js","../modules/esnext.promise.any":"../node_modules/core-js/modules/esnext.promise.any.js"}],"../node_modules/core-js/modules/esnext.string.replace-all.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var requireObjectCoercible = require('../internals/require-object-coercible');
var isRegExp = require('../internals/is-regexp');
var getRegExpFlags = require('../internals/regexp-flags');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var REPLACE = wellKnownSymbol('replace');
var RegExpPrototype = RegExp.prototype;

// `String.prototype.replaceAll` method
// https://github.com/tc39/proposal-string-replace-all
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, template, result, position, index;
    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = String(requireObjectCoercible('flags' in RegExpPrototype
          ? searchValue.flags
          : getRegExpFlags.call(searchValue)
        ));
        if (!~flags.indexOf('g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = searchValue[REPLACE];
      if (replacer !== undefined) {
        return replacer.call(searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return String(O).replace(searchValue, replaceValue);
      }
    }
    string = String(O);
    searchString = String(searchValue);
    if (searchString === '') return replaceAll.call(string, /(?:)/g, replaceValue);
    template = string.split(searchString);
    if (typeof replaceValue !== 'function') {
      return template.join(String(replaceValue));
    }
    result = template[0];
    position = result.length;
    for (index = 1; index < template.length; index++) {
      result += String(replaceValue(searchString, position, string));
      position += searchString.length + template[index].length;
      result += template[index];
    }
    return result;
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/is-regexp":"../node_modules/core-js/internals/is-regexp.js","../internals/regexp-flags":"../node_modules/core-js/internals/regexp-flags.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/modules/esnext.symbol.replace-all.js":[function(require,module,exports) {
// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

defineWellKnownSymbol('replaceAll');

},{"../internals/define-well-known-symbol":"../node_modules/core-js/internals/define-well-known-symbol.js"}],"../node_modules/core-js/proposals/string-replace-all.js":[function(require,module,exports) {
require('../modules/esnext.string.replace-all');
require('../modules/esnext.symbol.replace-all');

},{"../modules/esnext.string.replace-all":"../node_modules/core-js/modules/esnext.string.replace-all.js","../modules/esnext.symbol.replace-all":"../node_modules/core-js/modules/esnext.symbol.replace-all.js"}],"../node_modules/core-js/modules/esnext.global-this.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('./es.global-this');

},{"./es.global-this":"../node_modules/core-js/modules/es.global-this.js"}],"../node_modules/core-js/proposals/global-this.js":[function(require,module,exports) {

require('../modules/esnext.global-this');
var global = require('../internals/global');

module.exports = global;

},{"../modules/esnext.global-this":"../node_modules/core-js/modules/esnext.global-this.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/modules/esnext.promise.all-settled.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('./es.promise.all-settled.js');

},{"./es.promise.all-settled.js":"../node_modules/core-js/modules/es.promise.all-settled.js"}],"../node_modules/core-js/proposals/promise-all-settled.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/esnext.promise.all-settled');

},{"../modules/esnext.promise.all-settled":"../node_modules/core-js/modules/esnext.promise.all-settled.js"}],"../node_modules/core-js/modules/esnext.string.match-all.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('./es.string.match-all');

},{"./es.string.match-all":"../node_modules/core-js/modules/es.string.match-all.js"}],"../node_modules/core-js/proposals/string-match-all.js":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/esnext.string.match-all');

},{"../modules/esnext.string.match-all":"../node_modules/core-js/modules/esnext.string.match-all.js"}],"../node_modules/core-js/stage/4.js":[function(require,module,exports) {
require('../proposals/global-this');
require('../proposals/promise-all-settled');
require('../proposals/string-match-all');
var path = require('../internals/path');

module.exports = path;

},{"../proposals/global-this":"../node_modules/core-js/proposals/global-this.js","../proposals/promise-all-settled":"../node_modules/core-js/proposals/promise-all-settled.js","../proposals/string-match-all":"../node_modules/core-js/proposals/string-match-all.js","../internals/path":"../node_modules/core-js/internals/path.js"}],"../node_modules/core-js/stage/3.js":[function(require,module,exports) {
require('../proposals/promise-any');
require('../proposals/string-replace-all');
var parent = require('./4');

module.exports = parent;

},{"../proposals/promise-any":"../node_modules/core-js/proposals/promise-any.js","../proposals/string-replace-all":"../node_modules/core-js/proposals/string-replace-all.js","./4":"../node_modules/core-js/stage/4.js"}],"../node_modules/core-js/stage/2.js":[function(require,module,exports) {
require('../proposals/array-is-template-object');
require('../proposals/iterator-helpers');
require('../proposals/map-upsert');
require('../proposals/set-methods');
require('../proposals/using-statement');
var parent = require('./3');

module.exports = parent;

},{"../proposals/array-is-template-object":"../node_modules/core-js/proposals/array-is-template-object.js","../proposals/iterator-helpers":"../node_modules/core-js/proposals/iterator-helpers.js","../proposals/map-upsert":"../node_modules/core-js/proposals/map-upsert.js","../proposals/set-methods":"../node_modules/core-js/proposals/set-methods.js","../proposals/using-statement":"../node_modules/core-js/proposals/using-statement.js","./3":"../node_modules/core-js/stage/3.js"}],"../node_modules/core-js/stage/1.js":[function(require,module,exports) {
require('../proposals/array-last');
require('../proposals/collection-methods');
require('../proposals/collection-of-from');
require('../proposals/keys-composition');
require('../proposals/math-extensions');
require('../proposals/math-signbit');
require('../proposals/number-from-string');
require('../proposals/observable');
require('../proposals/pattern-matching');
require('../proposals/promise-try');
require('../proposals/seeded-random');
require('../proposals/string-code-points');
var parent = require('./2');

module.exports = parent;

},{"../proposals/array-last":"../node_modules/core-js/proposals/array-last.js","../proposals/collection-methods":"../node_modules/core-js/proposals/collection-methods.js","../proposals/collection-of-from":"../node_modules/core-js/proposals/collection-of-from.js","../proposals/keys-composition":"../node_modules/core-js/proposals/keys-composition.js","../proposals/math-extensions":"../node_modules/core-js/proposals/math-extensions.js","../proposals/math-signbit":"../node_modules/core-js/proposals/math-signbit.js","../proposals/number-from-string":"../node_modules/core-js/proposals/number-from-string.js","../proposals/observable":"../node_modules/core-js/proposals/observable.js","../proposals/pattern-matching":"../node_modules/core-js/proposals/pattern-matching.js","../proposals/promise-try":"../node_modules/core-js/proposals/promise-try.js","../proposals/seeded-random":"../node_modules/core-js/proposals/seeded-random.js","../proposals/string-code-points":"../node_modules/core-js/proposals/string-code-points.js","./2":"../node_modules/core-js/stage/2.js"}],"../node_modules/core-js/stage/0.js":[function(require,module,exports) {
require('../proposals/efficient-64-bit-arithmetic');
require('../proposals/string-at');
require('../proposals/url');
var parent = require('./1');

module.exports = parent;

},{"../proposals/efficient-64-bit-arithmetic":"../node_modules/core-js/proposals/efficient-64-bit-arithmetic.js","../proposals/string-at":"../node_modules/core-js/proposals/string-at.js","../proposals/url":"../node_modules/core-js/proposals/url.js","./1":"../node_modules/core-js/stage/1.js"}],"../node_modules/core-js/stage/pre.js":[function(require,module,exports) {
require('../proposals/reflect-metadata');
var parent = require('./0');

module.exports = parent;

},{"../proposals/reflect-metadata":"../node_modules/core-js/proposals/reflect-metadata.js","./0":"../node_modules/core-js/stage/0.js"}],"../node_modules/core-js/stage/index.js":[function(require,module,exports) {
var proposals = require('./pre');

module.exports = proposals;

},{"./pre":"../node_modules/core-js/stage/pre.js"}],"../node_modules/core-js/proposals/index.js":[function(require,module,exports) {
require('../stage');

},{"../stage":"../node_modules/core-js/stage/index.js"}],"../node_modules/core-js/internals/dom-iterables.js":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],"../node_modules/core-js/modules/web.dom-collections.for-each.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/dom-iterables":"../node_modules/core-js/internals/dom-iterables.js","../internals/array-for-each":"../node_modules/core-js/internals/array-for-each.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/core-js/modules/web.dom-collections.iterator.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/dom-iterables":"../node_modules/core-js/internals/dom-iterables.js","../modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');
var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate;

// http://w3c.github.io/setImmediate/
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/task":"../node_modules/core-js/internals/task.js"}],"../node_modules/core-js/modules/web.queue-microtask.js":[function(require,module,exports) {


var $ = require('../internals/export');
var global = require('../internals/global');
var microtask = require('../internals/microtask');
var classof = require('../internals/classof-raw');

var process = global.process;
var isNode = classof(process) == 'process';

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$({ global: true, enumerable: true, noTargetGet: true }, {
  queueMicrotask: function queueMicrotask(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/microtask":"../node_modules/core-js/internals/microtask.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

var $ = require('../internals/export');
var global = require('../internals/global');
var userAgent = require('../internals/user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/user-agent":"../node_modules/core-js/internals/user-agent.js"}],"../node_modules/core-js/web/index.js":[function(require,module,exports) {
require('../modules/web.dom-collections.for-each');
require('../modules/web.dom-collections.iterator');
require('../modules/web.immediate');
require('../modules/web.queue-microtask');
require('../modules/web.timers');
require('../modules/web.url');
require('../modules/web.url.to-json');
require('../modules/web.url-search-params');
var path = require('../internals/path');

module.exports = path;

},{"../modules/web.dom-collections.for-each":"../node_modules/core-js/modules/web.dom-collections.for-each.js","../modules/web.dom-collections.iterator":"../node_modules/core-js/modules/web.dom-collections.iterator.js","../modules/web.immediate":"../node_modules/core-js/modules/web.immediate.js","../modules/web.queue-microtask":"../node_modules/core-js/modules/web.queue-microtask.js","../modules/web.timers":"../node_modules/core-js/modules/web.timers.js","../modules/web.url":"../node_modules/core-js/modules/web.url.js","../modules/web.url.to-json":"../node_modules/core-js/modules/web.url.to-json.js","../modules/web.url-search-params":"../node_modules/core-js/modules/web.url-search-params.js","../internals/path":"../node_modules/core-js/internals/path.js"}],"../node_modules/core-js/index.js":[function(require,module,exports) {
require('./es');
require('./proposals');
require('./web');
var path = require('./internals/path');

module.exports = path;

},{"./es":"../node_modules/core-js/es/index.js","./proposals":"../node_modules/core-js/proposals/index.js","./web":"../node_modules/core-js/web/index.js","./internals/path":"../node_modules/core-js/internals/path.js"}],"../node_modules/object-assign/index.js":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}
module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
},{}],"../node_modules/vary/index.js":[function(require,module,exports) {
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module exports.
 */
module.exports = vary;
module.exports.append = append;

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */

function append(header, field) {
  if (typeof header !== 'string') {
    throw new TypeError('header argument is required');
  }
  if (!field) {
    throw new TypeError('field argument is required');
  }

  // get fields array
  var fields = !Array.isArray(field) ? parse(String(field)) : field;

  // assert on invalid field names
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError('field argument contains an invalid header name');
    }
  }

  // existing, unspecified vary
  if (header === '*') {
    return header;
  }

  // enumerate current values
  var val = header;
  var vals = parse(header.toLowerCase());

  // unspecified vary
  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
    return '*';
  }
  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase();

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld);
      val = val ? val + ', ' + fields[i] : fields[i];
    }
  }
  return val;
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */

function parse(header) {
  var end = 0;
  var list = [];
  var start = 0;

  // gather tokens
  for (var i = 0, len = header.length; i < len; i++) {
    switch (header.charCodeAt(i)) {
      case 0x20:
        /*   */
        if (start === end) {
          start = end = i + 1;
        }
        break;
      case 0x2c:
        /* , */
        list.push(header.substring(start, end));
        start = end = i + 1;
        break;
      default:
        end = i + 1;
        break;
    }
  }

  // final token
  list.push(header.substring(start, end));
  return list;
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */

function vary(res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError('res argument is required');
  }

  // get existing header
  var val = res.getHeader('Vary') || '';
  var header = Array.isArray(val) ? val.join(', ') : String(val);

  // set new header
  if (val = append(header, field)) {
    res.setHeader('Vary', val);
  }
}
},{}],"../node_modules/cors/lib/index.js":[function(require,module,exports) {
(function () {
  'use strict';

  var assign = require('object-assign');
  var vary = require('vary');
  var defaults = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  function isString(s) {
    return typeof s === 'string' || s instanceof String;
  }
  function isOriginAllowed(origin, allowedOrigin) {
    if (Array.isArray(allowedOrigin)) {
      for (var i = 0; i < allowedOrigin.length; ++i) {
        if (isOriginAllowed(origin, allowedOrigin[i])) {
          return true;
        }
      }
      return false;
    } else if (isString(allowedOrigin)) {
      return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    } else {
      return !!allowedOrigin;
    }
  }
  function configureOrigin(options, req) {
    var requestOrigin = req.headers.origin,
      headers = [],
      isAllowed;
    if (!options.origin || options.origin === '*') {
      // allow any origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: '*'
      }]);
    } else if (isString(options.origin)) {
      // fixed origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: options.origin
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    } else {
      isAllowed = isOriginAllowed(requestOrigin, options.origin);
      // reflect origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: isAllowed ? requestOrigin : false
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    }
    return headers;
  }
  function configureMethods(options) {
    var methods = options.methods;
    if (methods.join) {
      methods = options.methods.join(','); // .methods is an array, so turn it into a string
    }

    return {
      key: 'Access-Control-Allow-Methods',
      value: methods
    };
  }
  function configureCredentials(options) {
    if (options.credentials === true) {
      return {
        key: 'Access-Control-Allow-Credentials',
        value: 'true'
      };
    }
    return null;
  }
  function configureAllowedHeaders(options, req) {
    var allowedHeaders = options.allowedHeaders || options.headers;
    var headers = [];
    if (!allowedHeaders) {
      allowedHeaders = req.headers['access-control-request-headers']; // .headers wasn't specified, so reflect the request headers
      headers.push([{
        key: 'Vary',
        value: 'Access-Control-Request-Headers'
      }]);
    } else if (allowedHeaders.join) {
      allowedHeaders = allowedHeaders.join(','); // .headers is an array, so turn it into a string
    }

    if (allowedHeaders && allowedHeaders.length) {
      headers.push([{
        key: 'Access-Control-Allow-Headers',
        value: allowedHeaders
      }]);
    }
    return headers;
  }
  function configureExposedHeaders(options) {
    var headers = options.exposedHeaders;
    if (!headers) {
      return null;
    } else if (headers.join) {
      headers = headers.join(','); // .headers is an array, so turn it into a string
    }

    if (headers && headers.length) {
      return {
        key: 'Access-Control-Expose-Headers',
        value: headers
      };
    }
    return null;
  }
  function configureMaxAge(options) {
    var maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString();
    if (maxAge && maxAge.length) {
      return {
        key: 'Access-Control-Max-Age',
        value: maxAge
      };
    }
    return null;
  }
  function applyHeaders(headers, res) {
    for (var i = 0, n = headers.length; i < n; i++) {
      var header = headers[i];
      if (header) {
        if (Array.isArray(header)) {
          applyHeaders(header, res);
        } else if (header.key === 'Vary' && header.value) {
          vary(res, header.value);
        } else if (header.value) {
          res.setHeader(header.key, header.value);
        }
      }
    }
  }
  function cors(options, req, res, next) {
    var headers = [],
      method = req.method && req.method.toUpperCase && req.method.toUpperCase();
    if (method === 'OPTIONS') {
      // preflight
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureMethods(options, req));
      headers.push(configureAllowedHeaders(options, req));
      headers.push(configureMaxAge(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);
      if (options.preflightContinue) {
        next();
      } else {
        // Safari (and potentially other browsers) need content-length 0,
        //   for 204 or they just hang waiting for a body
        res.statusCode = options.optionsSuccessStatus;
        res.setHeader('Content-Length', '0');
        res.end();
      }
    } else {
      // actual response
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);
      next();
    }
  }
  function middlewareWrapper(o) {
    // if options are static (either via defaults or custom options passed in), wrap in a function
    var optionsCallback = null;
    if (typeof o === 'function') {
      optionsCallback = o;
    } else {
      optionsCallback = function (req, cb) {
        cb(null, o);
      };
    }
    return function corsMiddleware(req, res, next) {
      optionsCallback(req, function (err, options) {
        if (err) {
          next(err);
        } else {
          var corsOptions = assign({}, defaults, options);
          var originCallback = null;
          if (corsOptions.origin && typeof corsOptions.origin === 'function') {
            originCallback = corsOptions.origin;
          } else if (corsOptions.origin) {
            originCallback = function (origin, cb) {
              cb(null, corsOptions.origin);
            };
          }
          if (originCallback) {
            originCallback(req.headers.origin, function (err2, origin) {
              if (err2 || !origin) {
                next(err2);
              } else {
                corsOptions.origin = origin;
                cors(corsOptions, req, res, next);
              }
            });
          } else {
            next();
          }
        }
      });
    };
  }

  // can pass either an options hash, an options delegate, or nothing
  module.exports = middlewareWrapper;
})();
},{"object-assign":"../node_modules/object-assign/index.js","vary":"../node_modules/vary/index.js"}],"js/modules/modals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.indentifierBrowser = indentifierBrowser;
var _coreJs = require("core-js");
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let flag = true;
let pressed = false;
const modals = () => {
  function bindModal(openSelector, modalSelector, closeSelector) {
    let destroy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const open = document.querySelectorAll(openSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const popups = document.querySelectorAll('[data-modal]');
    open.forEach(elem => elem.addEventListener('click', e => {
      if (e.target) {
        e.preventDefault();
      }
      if (destroy) {
        elem.remove();
      }
      popups.forEach(popup => popup.style.display = 'none');
      modal.style.display = 'block';
      modal.classList.add('faded');
      //! library -- animate.css -- modal.classList.add('animated', 'fadeIn');
      document.body.style.overflow = 'hidden';
      flag = false;
      pressed = true;
    }));
    close.addEventListener('click', () => {
      popups.forEach(popup => popup.style.display = 'none');
      modal.style.display = 'none';
      indentifierBrowser();
      flag = true;
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        popups.forEach(popup => popup.style.display = 'none');
        modal.style.display = 'none';
        indentifierBrowser();
      }
    });
  }
  bindModal('.button-design', '.popup-design', 'div.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  // bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

function showModalByTime(selector) {
  document.querySelector(selector).style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function indentifierBrowser() {
  if (navigator.userAgent.match('Firefox') || /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
    document.body.style.overflow = '';
  } else {
    document.body.style.overflow = 'overlay';
  }
}
function openModalByScroll(selector) {
  window.addEventListener('scroll', () => {
    const maxScrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    //!document.body.scrollHeight -- for old browsers
    if (!pressed && window.scrollY + document.documentElement.clientHeight >= maxScrollHeight) {
      document.querySelector(selector).click();
    }
  });
}
openModalByScroll('.fixed-gift');
(0, _coreJs.setTimeout)(() => {
  if (flag) {
    showModalByTime(".popup-consultation");
  }
}, 60000);
var _default = modals;
exports.default = _default;
},{"core-js":"../node_modules/core-js/index.js","cors":"../node_modules/cors/lib/index.js"}],"../node_modules/ee-first/index.js":[function(require,module,exports) {
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = first

/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */

function first(stuff, done) {
  if (!Array.isArray(stuff))
    throw new TypeError('arg must be an array of [ee, events...] arrays')

  var cleanups = []

  for (var i = 0; i < stuff.length; i++) {
    var arr = stuff[i]

    if (!Array.isArray(arr) || arr.length < 2)
      throw new TypeError('each array member must be [ee, events...]')

    var ee = arr[0]

    for (var j = 1; j < arr.length; j++) {
      var event = arr[j]
      var fn = listener(event, callback)

      // listen to the event
      ee.on(event, fn)
      // push this listener to the list of cleanups
      cleanups.push({
        ee: ee,
        event: event,
        fn: fn,
      })
    }
  }

  function callback() {
    cleanup()
    done.apply(null, arguments)
  }

  function cleanup() {
    var x
    for (var i = 0; i < cleanups.length; i++) {
      x = cleanups[i]
      x.ee.removeListener(x.event, x.fn)
    }
  }

  function thunk(fn) {
    done = fn
  }

  thunk.cancel = cleanup

  return thunk
}

/**
 * Create the event listener.
 * @private
 */

function listener(event, done) {
  return function onevent(arg1) {
    var args = new Array(arguments.length)
    var ee = this
    var err = event === 'error'
      ? arg1
      : null

    // copy args to prevent arguments escaping scope
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }

    done(err, ee, event, args)
  }
}

},{}],"js/modules/sliders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eeFirst = _interopRequireDefault(require("ee-first"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sliders = (slides, direction, previous, nexter) => {
  let firstSlide = 1;
  let interval;
  const items = document.querySelectorAll(slides);
  function toSlide(n) {
    if (n > items.length) {
      firstSlide = 1;
    }
    if (n < 1) {
      firstSlide = items.length;
    }
    items.forEach(item => {
      item.style.display = 'none';
      item.classList.add('animated');
    });
    items[firstSlide - 1].style.display = 'block';
  }
  toSlide(firstSlide);
  function slideStep(step) {
    toSlide(firstSlide += step);
  }
  try {
    const prev = document.querySelector(previous);
    const next = document.querySelector(nexter);
    prev.addEventListener('click', () => {
      slideStep(-1);
      items[firstSlide - 1].classList.remove('slideInLeft');
      items[firstSlide - 1].classList.add('slideInRight');
    });
    next.addEventListener('click', () => {
      slideStep(1);
      items[firstSlide - 1].classList.remove('slideInRight');
      items[firstSlide - 1].classList.add('slideInLeft');
    });
  } catch (e) {}
  function runVertical() {
    slideStep(1);
    items[firstSlide - 1].classList.add('slideInDown');
    interval = setTimeout(runVertical, 3000);
  }
  function runHorizontal() {
    slideStep(1);
    items[firstSlide - 1].classList.remove('slideInRight');
    items[firstSlide - 1].classList.add('slideInLeft');
    interval = setTimeout(runHorizontal, 3000);
  }
  function slideAnimate(dir) {
    if (dir === 'vertical') {
      runVertical();
    } else {
      runHorizontal();
    }
    items[0].parentNode.addEventListener('mouseenter', () => {
      clearTimeout(interval);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
      slideAnimate(direction);
    });
  }
  slideAnimate(direction);
};
var _default = sliders; // sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
// sliders('.main-slider-item', 'vertical', '', '');
exports.default = _default;
},{"ee-first":"../node_modules/ee-first/index.js"}],"js/modules/forms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// const checkNum = (selector) => {
// const inputs = document.querySelectorAll(selector);
// inputs.forEach((input) => {
// input.addEventListener('input', () => {
// input.value = input.value.replace(/\D/, '');
// });
// });
// };

const formsFn = () => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const uploads = document.querySelectorAll('[name="upload"]');
  //checkNum('input[name="user_phone"]');
  const messege = {
    loading: "Загрузка ваших данных",
    success: "Спасибо, мы скоро с Вами свяжемся!",
    failure: "Что-то сломалось :(",
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    failureImg: 'assets/img/fail.png'
  };
  const clearInputs = () => {
    inputs.forEach(input => input.value = '');
    uploads.forEach(load => load.previousElementSibling.innerText = 'Файл не выбран');
  };
  const urls = {
    postText: 'https://jsonplaceholder.typicode.com/users',
    postImg: 'https://jsonplaceholder.typicode.com/photos'
  };
  const postData = async (url, data) => {
    const dataObject = {};
    data.forEach((value, key) => {
      dataObject[key] = value;
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(dataObject)
    });
    return await response.text();
  };
  uploads.forEach(load => {
    load.addEventListener('input', () => {
      let dots;
      const array = load.files[0].name.split('.');
      array[0].length > 6 ? dots = '...' : dots = '.';
      const nameImg = array[0].substring(0, 6) + dots + array[1];
      load.previousElementSibling.innerText = nameImg;
    });
  });
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const messegeBox = document.createElement('div');
      form.classList.add('animated', 'fadeOutUp');
      messegeBox.classList.add('status');
      form.parentElement.append(messegeBox);
      setTimeout(() => {
        form.style.display = 'none';
      }, 400);
      const showImg = document.createElement('img');
      showImg.src = messege.spinner;
      //showImg.setAttribute('src', messege.spinner);
      showImg.classList.add('animated', 'fadeInUp');
      messegeBox.append(showImg);
      const textMessege = document.createElement('div');
      textMessege.innerText = messege.loading;
      messegeBox.append(textMessege);
      const formData = new FormData(form);
      let api;
      form.closest('.popup-design') || form.classList.contains('calc_form') ? api = urls.postImg : api = urls.postText;
      console.log(api);
      postData(api, formData).then(response => {
        console.log(response);
        showImg.setAttribute('src', messege.ok);
        textMessege.textContent = messege.success;
      }).catch(() => {
        showImg.setAttribute('src', messege.failureImg);
        textMessege.textContent = messege.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          messegeBox.remove();
          form.style.display = 'block';
          form.classList.remove('fadeOutUp');
          form.classList.add('fadeInUp');
          document.body.style.overflow = 'visible';
        }, 4000);
      });
    });
  });
};
var _default = formsFn;
exports.default = _default;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _modals = _interopRequireWildcard(require("./modules/modals"));
var _sliders = _interopRequireDefault(require("./modules/sliders"));
var _forms = _interopRequireDefault(require("./modules/forms"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  (0, _modals.indentifierBrowser)();
  (0, _modals.default)();
  (0, _sliders.default)('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0, _sliders.default)('.main-slider-item', 'vertical');
  (0, _forms.default)();
});
},{"./modules/modals":"js/modules/modals.js","./modules/sliders":"js/modules/sliders.js","./modules/forms":"js/modules/forms.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59244" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map