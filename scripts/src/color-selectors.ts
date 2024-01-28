import { HEXColor, hexColorOf, vectorOf } from "./colors.js";
import { RainbowVertex } from "./ui.js";
import { offsetOf } from "./prisms.js";
import { inHEXValueRange } from "./validators.js";
import { Vector3 } from "./vectors";

export function colorOf(
    rainbowVertex: RainbowVertex,
    lighteningFactor: number = 0,
    darkeningFactor: number = 0,
): HEXColor {
    return hexColorOf(offsetOf(
        <Vector3>vectorOf(rainbowVertex),
        lighteningFactor,
        darkeningFactor,
        inHEXValueRange,
    ));
}
