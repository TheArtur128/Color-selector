import { Vector, combine, map } from "./vectors.js";
import { HEXColor, RGBColor, hexColorOf } from "./colors.js"

export type ColorSpace<Color> = Map<Vector, Color>

export type ColorSpaceMetric<Color> = {
    redMax: number,
    greenMax: number,
    blueMax: number,
    colorOf: (red: number, green: number, blue: number) => Color,
}

export const rgbColorSpaceMetric: ColorSpaceMetric<RGBColor> = {
    redMax: 255,
    greenMax: 255,
    blueMax: 255,
    colorOf: (red: number, green: number, blue: number) => {
        return new RGBColor(red, green, blue);
    }
}

export function colorCircleOf<Color>(
    metric: ColorSpaceMetric<Color>,
    lengthFactor: number = 1,
    center: Vector = {x: 0, y: 0},
): ColorSpace<Color> {
    const colorCircle: ColorSpace<Color> = new Map();

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

    for (let red = 0; red <= metric.redMax; red++) {
        for (let green = 0; green <= metric.greenMax; green++) {
            for (let blue = 0; blue <= metric.blueMax; blue++) {
                position = [
                    center,
                    map(redUnit, v => v * red),
                    map(greenUnit, v => v * green),
                    map(blueUnit, v => v * blue),
                ].reduce((a, b) => combine(a, b, (v1, v2) => v1 + v2));

                colorCircle.set(position, metric.colorOf(red, green, blue));
            }
        }
    }

    return colorCircle;
}

export type ColorSelector<Color> = (position: Vector) => Color | undefined;

export function colorSelectorOf<Color>(colorSpace: ColorSpace<Color>): ColorSelector<Color> {
    return colorSpace.get;
}
