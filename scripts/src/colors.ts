import { Vector3 } from "./vectors.js";

export type CSSColor = string;
export type HEXColor = CSSColor;

export function hexColorOf(position: Vector3): HEXColor | undefined {
    if (!_isHexValue(position.x) || !_isHexValue(position.y) || !_isHexValue(position.z))
        return;

    let red = position.x.toString(16);
    let green = position.y.toString(16);
    let blue = position.z.toString(16);

    return `#${red + green + blue}`;
}

export function vectorOf(color: HEXColor): Vector3 | undefined {
    let x = parseInt(color.slice(0, 3), 16);
    let y = parseInt(color.slice(2, 4), 16);
    let z = parseInt(color.slice(4, 6), 16);

    if (NaN in [x, y, z])
        return undefined;

    return {x: x, y: y, z: z};
}

function _isHexValue(value: number): boolean {
    return value >= 0 && value <= 255;
}
