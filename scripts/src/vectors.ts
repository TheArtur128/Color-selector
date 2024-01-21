export type Vector = {x: number, y: number}

export function combine(
    first: Vector,
    second: Vector,
    operation: (x: number, y: number) => number,
): Vector {
    return {
        x: operation(first.x, second.x),
        y: operation(first.y, second.y),
    }
}

export function map(vector: Vector, operation: (v: number) => number) {
    return {x: operation(vector.x), y: operation(vector.y)};
}
