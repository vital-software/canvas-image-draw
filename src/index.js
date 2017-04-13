import CanvasDraw from 'canvas-draw'
import Exif from 'exif-js'
import 'regenerator-runtime/runtime'

const DEFAULT_PROPERTIES = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
}

// TODO: Test this works on iOS devices
async function getOrientationFromImage(image) {
    let orientation = null

    await Exif.getData(image, () => {
        orientation = Exif.getTag(this, 'Orientation')
    })

    return orientation
}

export default function draw(image, canvasElement, properties = DEFAULT_PROPERTIES) {
    const { height, width, x, y } = properties

    if (!image) {
        throw TypeError('No Image provided')
    }

    if (!canvasElement) {
        throw TypeError('No <canvas> element provided')
    }

    const canvas = new CanvasDraw(canvasElement)

    return getOrientationFromImage(image)
    .then((orientation) => {
        canvas.setOrientation(orientation)

        canvas.setCanvasOrientation(width, height)
        canvas.draw(image, x, y, width, height)
    })
}
