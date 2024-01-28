import { colorOf } from "./color-selectors.js";
import { CSSColor, HEXColor, hexColorOf, vectorOf, inHEXValueRange } from "./colors.js";
import { SubscriberOn, UpdateSubscription, subscriptionFor } from "./subscriptions.js";
import { constructRecoveringButton, drawColorPanel } from "./ui.js";
import { Vector3 } from "./vectors.js";

constructRecoveringButton(
    <HTMLImageElement>document.querySelector("#darkening-factor-copy-button"),
    "./images/done.png",
    "./images/failed.png",
    3,
    () => {
        const darkeningFactor = <HTMLInputElement>document.querySelector("#darkening-factor");
        navigator.clipboard.writeText(darkeningFactor.value);

        return true;
    },
);

constructRecoveringButton(
    <HTMLImageElement>document.querySelector("#hex-copy-button"),
    "./images/done.png",
    "./images/failed.png",
    3,
    () => {
        const hexColorElement = <HTMLInputElement>document.querySelector("#hex-attribute");
        navigator.clipboard.writeText(`#${hexColorElement.value}`);

        return true;
    },
);

constructRecoveringButton(
    <HTMLImageElement>document.querySelector("#rgb-copy-button"),
    "./images/done.png",
    "./images/failed.png",
    3,
    () => {
        const redColor = <HTMLInputElement>document.querySelector("#red-attribute");
        const greenColor = <HTMLInputElement>document.querySelector("#green-attribute");
        const blueColor = <HTMLInputElement>document.querySelector("#blue-attribute");

        const colorText = `${redColor.value}, ${greenColor.value}, ${blueColor.value}`;
        navigator.clipboard.writeText(colorText);

        return true;
    },
);

function updatingEventFor(element: HTMLInputElement, handler: () => any): void {
    element.addEventListener("input", handler);
}

function hexColorViewOf(
    updateColorSubscription: UpdateSubscription<HEXColor>,
    element: HTMLInputElement,
): SubscriberOn<HEXColor, void> {
    const setValue = (color: HEXColor) => element.value = color.slice(1);

    updatingEventFor(element, () => {
        element.value = element.value.replaceAll(/[^0-9^a-f]/gi, '');

        if (element.value.length > 6)
            element.value = element.value.slice(0, 7);

        if ([3, 6].includes(element.value.length))
            updateColorSubscription(`#${element.value}`, [setValue]);
    });

    return setValue;
}

function rgbColorViewOf(
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

    [redEelement, greenEelement, blueEelement].forEach(element => updatingEventFor(
        element,
        rgbColorValueUpdatingFor(element, activateColorSubscription),
    ))

    return setRGBColor;
}

function rgbColorValueUpdatingFor(
    colorValueElement: HTMLInputElement,
    updateRGBColor: () => void,
): () => void {
    return () => {
        const numericValue = colorValueElement.value.replaceAll(/[a-z]/gi, '');
        colorValueElement.value = inHEXValueRange(parseInt(numericValue)).toString();

        updateRGBColor();
    }
}

function visualizeSelectedColor(color: CSSColor, selectedColor: HTMLDivElement): void {
    selectedColor.style.backgroundColor = color;
}

drawColorPanel(<HTMLCanvasElement>document.querySelector("#color-panel"), colorOf);

subscriptionFor(
    (update: UpdateSubscription<HEXColor>) => hexColorViewOf(
        update, <HTMLInputElement>document.querySelector("#hex-attribute")
    ),

    (update: UpdateSubscription<HEXColor>) => rgbColorViewOf(
        update,
        <HTMLInputElement>document.querySelector("#red-attribute"),
        <HTMLInputElement>document.querySelector("#green-attribute"),
        <HTMLInputElement>document.querySelector("#blue-attribute"),
    ),

    (update: UpdateSubscription<HEXColor>) => (color: CSSColor) => visualizeSelectedColor(
        color,
        <HTMLInputElement>document.querySelector("#selected-color"),
    ),
);
