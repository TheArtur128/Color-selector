import { HEXColor, hexColorOf, vectorOf, inHEXValueRange } from "./colors.js";
import { RainbowVertex } from "./renders.js";
import { offsetOf } from "./prisms.js"
import { Vector3 } from "./vectors";

export function colorOf(rainbowVertex: RainbowVertex, lighteningFactor: number): HEXColor {
    return hexColorOf(offsetOf(
        <Vector3>vectorOf(rainbowVertex),
        lighteningFactor,
        0,
        inHEXValueRange,
    ));
}
