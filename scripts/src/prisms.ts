import { Vector3, map } from "./vectors.js";

export function offsetOf(
    colorVertex: Vector3,
    lighteningFactor: number,
    darkeningFactor: number,
    inRrange: (value: number) => number,
): Vector3 {
    return map(colorVertex, v => {
        let lightenedValue = inRrange(v + lighteningFactor);

        return inRrange(lightenedValue - darkeningFactor);
    });
}
