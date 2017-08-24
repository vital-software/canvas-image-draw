'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// TODO: Test this works on iOS devices
var getOrientationFromImage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(image) {
        var _this = this;

        var orientation;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        orientation = null;
                        _context.next = 3;
                        return _exifJs2.default.getData(image, function () {
                            orientation = _exifJs2.default.getTag(_this, 'Orientation');
                        });

                    case 3:
                        return _context.abrupt('return', orientation);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getOrientationFromImage(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = draw;

var _canvasDraw = require('./canvas-draw');

var _canvasDraw2 = _interopRequireDefault(_canvasDraw);

var _exifJs = require('exif-js');

var _exifJs2 = _interopRequireDefault(_exifJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DEFAULT_PROPERTIES = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
};function draw(image, canvasElement, props) {
    var properties = _extends({}, DEFAULT_PROPERTIES, props);
    var height = properties.height,
        width = properties.width,
        x = properties.x,
        y = properties.y;


    if (!image) {
        throw TypeError('No Image provided');
    }

    if (!canvasElement) {
        throw TypeError('No <canvas> element provided');
    }

    var canvas = new _canvasDraw2.default(canvasElement);

    return getOrientationFromImage(image).then(function (orientation) {
        canvas.setOrientation(orientation);

        canvas.setCanvasOrientation(width, height);
        canvas.draw(image, x, y, width, height);
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DEFAULT_PROPERTIES, 'DEFAULT_PROPERTIES', 'app/index.js');

    __REACT_HOT_LOADER__.register(getOrientationFromImage, 'getOrientationFromImage', 'app/index.js');

    __REACT_HOT_LOADER__.register(draw, 'draw', 'app/index.js');
}();

;