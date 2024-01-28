export function same<V>(value: V): V {
    return value;
}

export function inHEXValueRange(value: number): number {
    if (value < 0)
        return 0;
    else if (value > 255)
        return 255;
    else
        return value;
}

export function numeric(line: string, changed: (n: number) => number): string {    
    return changed(parseInt(line.replaceAll(/[a-z]/gi, ''))).toString();
}
