import { colorOf } from "./color-selectors.js";
import { HEXColor, hexColorOf, vectorOf } from "./colors.js";
import { SubscriberOn, UpdateSubscription } from "./subscriptions.js";
import { drawColorPanel, RainbowVertex, pixelColorIn } from "./ui.js";
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

export function selectionColorPanelViewOf(
    updateColorSubscription: UpdateSubscription<HEXColor>,
    colorPanelElement: HTMLCanvasElement,
): boolean {
    let isSelection = false;

    const activateColorSubscription = (x: number, y: number) => {
        if (!isSelection)
            return;

        const pixelColor = pixelColorIn(colorPanelElement, x, y);

        if (pixelColor === undefined)
            return;

        updateColorSubscription(pixelColor, []);
    }

    colorPanelElement.addEventListener("mousedown", () => isSelection = true);
    colorPanelElement.addEventListener("mouseup", () => isSelection = false);
    colorPanelElement.addEventListener("mouseleave", () => isSelection = false);
    colorPanelElement.addEventListener("mousemove", event => {
        activateColorSubscription(event.offsetX, event.offsetY);
    });

    colorPanelElement.addEventListener("touchstart", () => isSelection = true);
    colorPanelElement.addEventListener("touchend", () => isSelection = false);
    colorPanelElement.addEventListener("touchleave", () => isSelection = false);
    colorPanelElement.addEventListener("touchcancel", () => isSelection = false);
    colorPanelElement.addEventListener("touchmove", event => {
        const boundingRect = colorPanelElement.getBoundingClientRect();

        activateColorSubscription(
            event.touches[0].clientX - boundingRect.left,
            event.touches[0].clientY - boundingRect.top,
        );
    });

    return true;
}

export function darkeningFactorViewOf(
    updateDarkeningFactorSubscription: UpdateSubscription<number>,
    element: HTMLInputElement,
): SubscriberOn<number, void> {
    const setValue = (factor: number) => {
        element.value = inHEXValueRange(factor).toString();
    }

    _updatingEventFor(element, () => {
        element.value = numeric(element.value, inHEXValueRange);
        updateDarkeningFactorSubscription(parseInt(element.value), [setValue]);
    });

    return setValue;
}

export function darkeningColorPanelViewOf(
    colorPanelElement: HTMLCanvasElement,
    secondsRenderingDelay: number,
): SubscriberOn<number, void> {
    let renderingTimeoutID: number;

    return (darkeningFactor: number) => {
        renderingTimeoutID = setTimeout(
            () => drawColorPanel(
                colorPanelElement,
                (vertex: RainbowVertex, lighteningFactor: number) => colorOf(
                    vertex, lighteningFactor, darkeningFactor
                )
            ),
            secondsRenderingDelay * 1000,
        );
    }
}
