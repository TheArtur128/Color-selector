export type Vector3 = {
    x: number
    y: number
    z: number
}

export function map(
    operation: (a: number, b: number) => number,
    first: Vector3,
    second: Vector3,
): Vector3 {
    return {
        x: operation(first.x, second.x),
        y: operation(first.y, second.y),
        z: operation(first.z, second.z),
    }
}
