import { Vector, combine, map } from "./vectors.js";
import { RGBColor, HEXColor, hexColorOf } from "./colors.js"

export type ColorSpace = Map<Vector, RGBColor>

export function colorCircleOf(
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
                ].reduce((a, b) => combine(a, b, (v1, v2) => v1 + v2));

                colorCircle.set(position, new RGBColor(red, green, blue));
            }
        }
    }

    return colorCircle;
}

export type ColorSelector = (position: Vector) => HEXColor;

export function colorSelectorFrom(colorSpace: ColorSpace, defaultColor = "#ffffff"): ColorSelector {
    return (position: Vector) => {
        let rgbColor = colorSpace.get(position);
        return rgbColor !== undefined ? hexColorOf(rgbColor) : defaultColor;
    };
}
