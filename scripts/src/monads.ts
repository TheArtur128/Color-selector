export class Ok<V> {
    constructor(readonly value: V) {
        this.value = value;
    }
}

export type Maybe<V> = V | Ok<V> | undefined;

export function maybe<V, R>(func: (value: V) => R): (value: Maybe<V>) => R | undefined {
    return (value) => {
        if (value === undefined)
            return undefined;

        else if (value instanceof Ok)
            return func(value.value);

        return func(value)
    }
}
