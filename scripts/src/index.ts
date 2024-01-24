import { constructRecoveringButton } from "./html.js";
import { drawColorPanel } from "./renders.js";

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

function constructCopyButton(querySelection: string, copy: () => boolean) {
    let copyButtonElement = document.querySelector(querySelection);
    if (copyButtonElement instanceof HTMLImageElement) {
        constructRecoveringButton(
            copyButtonElement,
            "/images/done.png",
            "/images/failed.png",
            3,
            copy,
        );
    }
}

constructCopyButton("#hex-copy-button", copyHEXColor);
constructCopyButton("#rgb-copy-button", copyRGBColor);

let colorPanelElement = document.querySelector("#color-panel");
if (colorPanelElement instanceof HTMLCanvasElement) {
    drawColorPanel(colorPanelElement);
}
