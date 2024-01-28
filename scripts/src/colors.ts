import { Vector3 } from "./vectors.js";

export type CSSColor = string;
export type HEXColor = CSSColor;

export function hexColorOf(position: Vector3): HEXColor {
    let red = _HEXColorValueOf(position.x);
    let green = _HEXColorValueOf(position.y);
    let blue = _HEXColorValueOf(position.z);

    return `#${red + green + blue}`;
}

function _HEXColorValueOf(value: number): string {
    let hexColorValue = inHEXValueRange(value).toString(16);

    return hexColorValue.length == 1 ? '0' + hexColorValue : hexColorValue;
}

export function inHEXValueRange(value: number): number {
    if (value < 0)
        return 0;
    else if (value > 255)
        return 255;
    else
        return value;
}

export function vectorOf(color: HEXColor): Vector3 | undefined {
    let x: number;
    let y: number;
    let z: number;

    if (color.length === 7) { 
        x = parseInt(color.slice(1, 3), 16);
        y = parseInt(color.slice(3, 5), 16);
        z = parseInt(color.slice(5, 8), 16);
    }
    else if (color.length === 4) {
        x = parseInt(color[1], 16);
        y = parseInt(color[2], 16);
        z = parseInt(color[3], 16);
    }
    else
        return;

    if ([x, y, z].includes(NaN))
        return;

    return {x: x, y: y, z: z};
}
