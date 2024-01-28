import { colorOf } from "./color-selectors.js";
import { HEXColor } from "./colors.js";
import { UpdateSubscription, subscriptionFor } from "./subscriptions.js";
import { constructRecoveringButton, drawColorPanel } from "./ui.js";
import { hexColorViewOf, rgbColorViewOf, selectedColorViewOf, darkeningFactorViewOf } from "./views.js";

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

    _ => selectedColorViewOf(<HTMLInputElement>document.querySelector("#selected-color")),
);

subscriptionFor(
    (update: UpdateSubscription<number>) => darkeningFactorViewOf(
        update,
        <HTMLInputElement>document.querySelector("#darkening-factor-selector"),
    ),

    (update: UpdateSubscription<number>) => darkeningFactorViewOf(
        update,
        <HTMLInputElement>document.querySelector("#darkening-factor"),
    ),
);

drawColorPanel(<HTMLCanvasElement>document.querySelector("#color-panel"), colorOf);
