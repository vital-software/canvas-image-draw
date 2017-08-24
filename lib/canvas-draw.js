'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasDraw = function () {
    function CanvasDraw(canvas) {
        _classCallCheck(this, CanvasDraw);

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.orientation = null;

        this.setup();
    }

    CanvasDraw.prototype.setup = function setup() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    };

    CanvasDraw.prototype.setCanvasOrientation = function setCanvasOrientation(width, height) {
        var rotateAngle = void 0;

        switch (this.orientation) {
            case _constants.ORIENTATION_HORIZONTAL_REVERSED:
                this.context.translate(width, 0);
                this.context.scale(-1, 1);
                break;
            case _constants.ORIENTATION_BOTH_REVERSED:
                rotateAngle = 180; // eslint-disable-line

                this.context.translate(width, height);
                this.context.rotate(rotateAngle * _constants.RADIAN_CONVERT);
                break;
            case _constants.ORIENTATION_VERTICAL_REVERSED:
                this.context.translate(0, height);
                this.context.scale(1, -1);
                break;
            case _constants.ORIENTATION_FLIPPED_AND_ROTATED:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * _constants.RADIAN_CONVERT);
                this.context.scale(1, -1);
                break;
            case _constants.ORIENTATION_ROTATED_RIGHT:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * _constants.RADIAN_CONVERT);
                this.context.translate(0, -height);
                break;
            case _constants.ORIENTATION_HORIZONTAL_FLIPPED_AND_ROTATED:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * _constants.RADIAN_CONVERT);
                this.context.translate(width, -height);
                this.context.scale(-1, 1);
                break;
            case _constants.ORIENTATION_ROTATED_LEFT:
                rotateAngle = -90; // eslint-disable-line

                this.context.rotate(-0.5 * Math.PI); // eslint-disable-line
                this.context.translate(-width, 0);
                break;
            default:
                break;
        }
    };

    CanvasDraw.prototype.setOrientation = function setOrientation(orientation) {
        this.orientation = orientation;
    };

    CanvasDraw.prototype.draw = function draw(image, x, y, width, height) {
        var aspectRatio = void 0,
            calculatedHeight = void 0,
            calculatedWidth = void 0,
            calculatedX = void 0,
            calculatedY = void 0,
            newHeight = void 0,
            newWidth = void 0;

        // Default offset is center
        var offsetX = 0.5;
        var offsetY = 0.5;

        // Calculate image measurements
        var imageHeight = image.height;
        var imageWidth = image.width;
        var ratio = Math.min(width / imageWidth, height / imageHeight);

        aspectRatio = 1;
        newWidth = imageWidth * ratio;
        newHeight = imageHeight * ratio;

        // Decide which gap to fill
        if (newWidth < width) aspectRatio = width / newWidth;
        if (newHeight < height) aspectRatio = height / newHeight;
        newWidth *= aspectRatio;
        newHeight *= aspectRatio;

        // Calculate source rectangle
        calculatedWidth = imageWidth / (newWidth / width);
        calculatedHeight = imageHeight / (newHeight / height);

        calculatedX = (imageWidth - calculatedWidth) * offsetX;
        calculatedY = (imageHeight - calculatedHeight) * offsetY;

        // Ensure source rectangle is valid
        if (calculatedX < 0) calculatedX = 0;
        if (calculatedY < 0) calculatedY = 0;
        if (calculatedWidth > imageWidth) calculatedWidth = imageWidth;
        if (calculatedHeight > imageHeight) calculatedHeight = imageHeight;

        // Draw image to canvas
        this.context.drawImage(image, calculatedX, calculatedY, calculatedWidth, calculatedHeight, x, y, width, height);
    };

    return CanvasDraw;
}();

var _default = CanvasDraw;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(CanvasDraw, 'CanvasDraw', 'app/canvas-draw.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'app/canvas-draw.js');
}();

;