import { HEXColor, hexColorOf, vectorOf } from "./colors.js";
import { RainbowVertex } from "./ui.js";
import { offsetOf } from "./prisms.js";
import { inHEXValueRange } from "./validators.js";
import { Vector3 } from "./vectors";

export function colorOf(rainbowVertex: RainbowVertex, lighteningFactor: number): HEXColor {
    return hexColorOf(offsetOf(
        <Vector3>vectorOf(rainbowVertex),
        lighteningFactor,
        0,
        inHEXValueRange,
    ));
}
