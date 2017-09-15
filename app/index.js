import CanvasDraw from './canvas-draw'
import Exif from 'exif-js'

const DEFAULT_PROPERTIES = {
    x: 0,
    y: 0,
    width: 200,
    height: 200
}

async function getOrientationFromImage(image) {
    const orientation = await new Promise((resolve) =>
        Exif.getData(image, function() {
            const orientation = Exif.getTag(this, 'Orientation')

            if (orientation) {
                resolve(orientation)
            } else {
                resolve(null)
            }
        })
    )

    return orientation
}

export default function draw(image, canvasElement, props) {
    const properties = { ...DEFAULT_PROPERTIES, ...props }
    const { height, width, x, y } = properties

    if (!image) {
        throw TypeError('No Image provided')
    }

    if (!canvasElement) {
        throw TypeError('No <canvas> element provided')
    }

    const canvas = new CanvasDraw(canvasElement)

    return getOrientationFromImage(image).then((orientation) => {
        canvas.setOrientation(orientation)

        canvas.setCanvasOrientation(width, height)
        canvas.draw(image, x, y, width, height)
    })
}
