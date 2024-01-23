export type CSSColor = string;

type RGBColorParameter = number;

export class RGBColor {
    constructor(
        readonly red: RGBColorParameter,
        readonly green: RGBColorParameter,
        readonly blue: RGBColorParameter,
    ) {
        this.red = RGBColor._validated(red);
        this.green = RGBColor._validated(green);
        this.blue = RGBColor._validated(blue);
    }

    private static _validated(parameter: RGBColorParameter): RGBColorParameter {
        if (!RGBColor.isParameter(parameter))
            throw new Error("Color parameter must be between 0 and 1");

        return parameter;
    }

    static isParameter(parameter: RGBColorParameter): parameter is RGBColorParameter {
        return parameter >= 0 && parameter <= 255;
    }
}

export type HEXColor = CSSColor;

export function hexColorOf(color: RGBColor): HEXColor {
    let red = color.red.toString(16);
    let green = color.green.toString(16);
    let blue = color.blue.toString(16);

    return red + green + blue;
}

export function rgbColorOf(color: HEXColor): RGBColor | undefined {
    let red = parseInt(color.slice(0, 3), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (NaN in [red, green, blue])
        return undefined;

    return new RGBColor(red, green, blue);
}
