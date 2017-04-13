import {
    ORIENTATION_BOTH_REVERSED,
    ORIENTATION_FLIPPED_AND_ROTATED,
    ORIENTATION_HORIZONTAL_FLIPPED_AND_ROTATED,
    ORIENTATION_HORIZONTAL_REVERSED,
    ORIENTATION_ROTATED_LEFT,
    ORIENTATION_ROTATED_RIGHT,
    ORIENTATION_VERTICAL_REVERSED,
    RADIAN_CONVERT
} from './constants'

export default class CanvasDraw {
    constructor(canvas) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.orientation = null

        this.setup()
    }

    setup() {
        this.context.setTransform(1, 0, 0, 1, 0, 0)
    }

    setCanvasOrientation(width, height) {
        let rotateAngle

        switch (this.orientation) {
            case ORIENTATION_HORIZONTAL_REVERSED:
                this.context.translate(width, 0)
                this.context.scale(-1, 1)
                break
            case ORIENTATION_BOTH_REVERSED:
                rotateAngle = 180; // eslint-disable-line

                this.context.translate(width, height)
                this.context.rotate(rotateAngle * RADIAN_CONVERT)
                break
            case ORIENTATION_VERTICAL_REVERSED:
                this.context.translate(0, height)
                this.context.scale(1, -1)
                break
            case ORIENTATION_FLIPPED_AND_ROTATED:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * RADIAN_CONVERT)
                this.context.scale(1, -1)
                break
            case ORIENTATION_ROTATED_RIGHT:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * RADIAN_CONVERT)
                this.context.translate(0, -height)
                break
            case ORIENTATION_HORIZONTAL_FLIPPED_AND_ROTATED:
                rotateAngle = 90; // eslint-disable-line

                this.context.rotate(rotateAngle * RADIAN_CONVERT)
                this.context.translate(width, -height)
                this.context.scale(-1, 1)
                break
            case ORIENTATION_ROTATED_LEFT:
                rotateAngle = -90; // eslint-disable-line

                this.context.rotate(-0.5 * Math.PI); // eslint-disable-line
                this.context.translate(-width, 0)
                break
            default:
                break
        }
    }

    setOrientation(orientation) {
        this.orientation = orientation
    }

    draw(image, x, y, width, height) {
        let aspectRatio,
            calculatedHeight,
            calculatedWidth,
            calculatedX,
            calculatedY,
            newHeight,
            newWidth

        // Default offset is center
        const offsetX = 0.5
        const offsetY = 0.5

        // Calculate image measurements
        const imageHeight = image.height
        const imageWidth = image.width
        const ratio = Math.min(width / imageWidth, height / imageHeight)

        aspectRatio = 1
        newWidth = imageWidth * ratio
        newHeight = imageHeight * ratio

        // Decide which gap to fill
        if (newWidth < width) aspectRatio = width / newWidth
        if (newHeight < height) aspectRatio = height / newHeight
        newWidth *= aspectRatio
        newHeight *= aspectRatio

        // Calculate source rectangle
        calculatedWidth = imageWidth / (newWidth / width)
        calculatedHeight = imageHeight / (newHeight / height)

        calculatedX = (imageWidth - calculatedWidth) * offsetX
        calculatedY = (imageHeight - calculatedHeight) * offsetY

        // Ensure source rectangle is valid
        if (calculatedX < 0) calculatedX = 0
        if (calculatedY < 0) calculatedY = 0
        if (calculatedWidth > imageWidth) calculatedWidth = imageWidth
        if (calculatedHeight > imageHeight) calculatedHeight = imageHeight

        // Draw image to canvas
        this.context.drawImage(image, calculatedX, calculatedY, calculatedWidth, calculatedHeight, x, y, width, height)
    }
}
