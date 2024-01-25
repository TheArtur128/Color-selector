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
    let x = parseInt(color.slice(0, 3), 16);
    let y = parseInt(color.slice(2, 4), 16);
    let z = parseInt(color.slice(4, 6), 16);

    if (NaN in [x, y, z])
        return undefined;

    return {x: x, y: y, z: z};
}
