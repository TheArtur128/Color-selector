import { colorSelectorFrom, colorCircleOf } from "./color-spaces.js";
import { drawColorPanel, constructRecoveringButton } from "./html.js";

function copyHEXColor(): boolean {
    const hexColorElement = document.querySelector("#hex-attribute");

    if (!(hexColorElement instanceof HTMLInputElement))
        return false;

    navigator.clipboard.writeText(`#${hexColorElement.value}`)
    return true;
}

function copyRGBColor(): boolean {
    const redColor = document.querySelector("#red-attribute");
    const greenColor = document.querySelector("#green-attribute");
    const blueColor = document.querySelector("#blue-attribute");

    if (!(
        redColor instanceof HTMLInputElement
        && greenColor instanceof HTMLInputElement
        && blueColor instanceof HTMLInputElement
    ))
        return false;

    const colorText = `${redColor.value}, ${greenColor.value}, ${blueColor.value}`;
    navigator.clipboard.writeText(colorText);

    return true;
}

let hexCopyButtonElement = document.querySelector("#hex-copy-button");
if (hexCopyButtonElement instanceof HTMLImageElement) {
    constructRecoveringButton(
        hexCopyButtonElement,
        "/images/done.png",
        "/images/failed.png",
        3,
        copyHEXColor,
    );
}

// let colorPanelElement = document.querySelector("#color-panel");
// if (colorPanelElement instanceof HTMLCanvasElement) {
//     drawColorPanel(colorPanelElement, colorSelectorFrom(colorCircleOf()));
// }
