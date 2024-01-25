import { colorOf } from "./color-selectors.js";
import { constructCopyButton, drawColorPanel } from "./ui.js";

constructCopyButton("#hex-copy-button", () => {
    const hexColorElement = document.querySelector("#hex-attribute");

    if (!(hexColorElement instanceof HTMLInputElement))
        return false;

    navigator.clipboard.writeText(`#${hexColorElement.value}`)
    return true;
});

constructCopyButton("#rgb-copy-button", () => {
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
});

let colorPanelElement = document.querySelector("#color-panel");
if (colorPanelElement instanceof HTMLCanvasElement) {
    drawColorPanel(colorPanelElement, colorOf);
}
