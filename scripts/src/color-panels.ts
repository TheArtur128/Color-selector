import { Vector, combine, map } from "./vectors";
import { RGBColor } from "./colors"

function drawColorPanel(
    canvas: HTMLCanvasElement,
    colorIn: (position: Vector) => string,
): void {
    let context = canvas.getContext("2d");

    if (context == null)
        return;

    for (let y = 0; y <= canvas.height; y++) {
        for (let x = 0; x <= canvas.width; x++) {
            context.fillStyle = colorIn({x: x , y: y});
            context.fillRect(x, y, 1, 1);
        }
    }
}

type ColorSpace = Map<Vector, RGBColor>

function colorCircleOf(
    lengthFactor: number = 1,
    center: Vector = {x: 0, y: 0},
): ColorSpace {
    const colorCircle: ColorSpace = new Map();

    const redUnit: Vector = {x: 0, y: lengthFactor};
    const greenUnit: Vector = {
        x: lengthFactor * Math.cos(-0.785398),
        y: lengthFactor * Math.sin(-0.785398),
    }
    const blueUnit: Vector = {
        x: lengthFactor * Math.cos(3.92699),
        y: lengthFactor * Math.sin(3.92699),
    }

    let position: Vector;

    for (let red = 0; red <= 255; red++) {
        for (let green = 0; green <= 255; green++) {
            for (let blue = 0; blue <= 255; blue++) {
                position = [
                    center,
                    map(redUnit, v => v * red),
                    map(greenUnit, v => v * green),
                    map(blueUnit, v => v * blue),
                ].reduce((a, b) => combine(a, b, (x, y) => x + y));

                colorCircle.set(position, new RGBColor(red, green, blue));
            }
        }
    }

    return colorCircle;
}
