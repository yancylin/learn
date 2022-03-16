function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import classNames from 'classnames';
import './index.less';

var Button = function Button(props) {
  var _classNames;

  var children = props.children,
    _props$size = props.size,
    size = _props$size === void 0 ? 'middle' : _props$size,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'round' : _props$shape,
    _props$type = props.type,
    type = _props$type === void 0 ? 'default' : _props$type,
    className = props.className;
  var classes = classNames(
    ((_classNames = {}),
    _defineProperty(_classNames, 'btn-shape-'.concat(shape), shape),
    _defineProperty(_classNames, 'btn-type-'.concat(type), type),
    _defineProperty(_classNames, 'btn-size-'.concat(size), size),
    _classNames),
    className,
  );
  return /*#__PURE__*/ React.createElement(
    'button',
    {
      className: classes,
    },
    children,
  );
};

export default Button;
