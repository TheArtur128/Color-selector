export type Vector3 = {
    x: number
    y: number
    z: number
}

export function combine(
    first: Vector3,
    second: Vector3,
    operation: (a: number, b: number) => number,
): Vector3 {
    return {
        x: operation(first.x, second.x),
        y: operation(first.y, second.y),
        z: operation(first.z, second.z),
    }
}

export function map(
    vector: Vector3,
    operation: (v: number) => number,
): Vector3 {
    return {
        x: operation(vector.x),
        y: operation(vector.y),
        z: operation(vector.z),
    }
}
