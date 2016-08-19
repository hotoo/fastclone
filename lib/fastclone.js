/**
 * The fast way to deep clone datas.
 *
 * @author 闲耘 <hotoo.cn@gmail.com> (http://hotoo.me/)
 */
'use strict';

// function typeOf(type) {
  // return function(obj) {
    // return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  // };
// }
// const isArray = typeOf('Array');
// const isObject = typeOf('Object');
// const isDate = typeOf('Date');
// const isRegExp = typeOf('RegExp');
// const isString = typeOf('String');
// const isNumber = typeOf('Number');
// const isBoolean = typeOf('Boolean');
// const isFunction = typeOf('Function');

function deepClone(obj) {
  const type = typeof obj;
  if (type === 'object') {
    if (obj === null) return obj;
    if (obj instanceof Array) {
      return cloneArray(obj);
    } else if (obj instanceof Date) {
      return new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      return new RegExp(obj.source, [ obj.ignoreCase, obj.global, obj.multiline ].join(''));
    }
    return cloneObject(obj);
  }
  return obj;
}

// function deepClone2(obj) {
  // if (isObject(obj)) {
    // return cloneObject(obj);
  // } else if (isArray(obj)) {
    // return cloneArray(obj);
  // // } else if (isDate(obj)) {
    // // return new Date(obj.getTime());
  // // } else if (isRegExp(obj)) {
    // // return new RegExp(obj.source, [ obj.ignoreCase, obj.global, obj.multiline ].join(''));
  // }
  // // String, Number, Boolean, Function, null, undefined.
  // return obj;
// }

function cloneArray(arr) {
  const a = [];
  for (let i = 0; i < arr.length; i++) {
    a[i] = deepClone(arr[i]);
  }
  return a;
}
function cloneObject(from) {
  const to = {};
  for (const key in from) {
    to[key] = deepClone(from[key]);
  }
  return to;
}

module.exports = deepClone;
