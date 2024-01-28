import { HEXColor, hexColorOf, vectorOf } from "./colors.js";
import { SubscriberOn, UpdateSubscription } from "./subscriptions.js";
import { numeric, inHEXValueRange } from "./validators.js";

function _updatingEventFor(element: HTMLInputElement, handler: () => any): void {
    element.addEventListener("input", handler);
}

export function hexColorViewOf(
    updateColorSubscription: UpdateSubscription<HEXColor>,
    element: HTMLInputElement,
): SubscriberOn<HEXColor, void> {
    const setValue = (color: HEXColor) => element.value = color.slice(1);

    _updatingEventFor(element, () => {
        element.value = element.value.replaceAll(/[^0-9^a-f]/gi, '');

        if (element.value.length > 6)
            element.value = element.value.slice(0, 7);

        if ([3, 6].includes(element.value.length))
            updateColorSubscription(`#${element.value}`, [setValue]);
    });

    return setValue;
}

export function rgbColorViewOf(
    updateColorSubscription: UpdateSubscription<HEXColor>,
    redEelement: HTMLInputElement,
    greenEelement: HTMLInputElement,
    blueEelement: HTMLInputElement
): SubscriberOn<HEXColor, void> {
    const setRGBColor = (color: HEXColor) => {
        const colorVector = vectorOf(color);

        if (colorVector === undefined)
            return;

        redEelement.value = colorVector.x.toString();
        greenEelement.value = colorVector.y.toString();
        blueEelement.value = colorVector.z.toString();
    }

    const activateColorSubscription = () => {
        const red = parseInt(redEelement.value);
        const green = parseInt(greenEelement.value);
        const blue = parseInt(blueEelement.value);

        if ([red, green, blue].includes(NaN))
            return;

        const color = hexColorOf({x: red, y: green, z: blue});
        updateColorSubscription(color, [setRGBColor]);
    }

    [redEelement, greenEelement, blueEelement].forEach(element => _updatingEventFor(
        element,
        _rgbColorValueUpdatingFor(element, activateColorSubscription),
    ))

    return setRGBColor;
}

export function _rgbColorValueUpdatingFor(
    colorValueElement: HTMLInputElement,
    updateRGBColor: () => void,
): () => void {
    return () => {
        colorValueElement.value = numeric(colorValueElement.value, inHEXValueRange);
        updateRGBColor();
    }
}

export function selectedColorViewOf(
    selectedColorElement: HTMLDivElement,
): SubscriberOn<HEXColor, void> {
    return (color: HEXColor) => selectedColorElement.style.backgroundColor = color;
}
