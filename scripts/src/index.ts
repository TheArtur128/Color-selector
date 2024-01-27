import { colorOf } from "./color-selectors.js";
import { constructRecoveringButton, drawColorPanel } from "./ui.js";

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

drawColorPanel(<HTMLCanvasElement>document.querySelector("#color-panel"), colorOf);
