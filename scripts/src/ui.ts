import { CSSColor } from "./colors.js";
import { Vector3 } from "./vectors.js";

export function constructRecoveringButton(
    buttonElement: HTMLImageElement,
    doneImagePath: string,
    failedImagePath: string,
    lockSeconds: number,
    action: () => boolean,
): void {
    let isReady = true;
    const readyImagePath = buttonElement.src;

    function restoreAbilities() {
        isReady = true;
        buttonElement.src = readyImagePath;
    }

    buttonElement.onmouseover = () => {
        buttonElement.style.cursor = isReady ? "pointer" : "default";
    };

    buttonElement.onclick = () =>  {
        if (!isReady)
            return;

        let ok = action();

        buttonElement.src = ok ? doneImagePath : failedImagePath;
        isReady = false;

        setTimeout(restoreAbilities, lockSeconds * 1000);
    }
}

export function constructCopyButton(querySelection: string, copy: () => boolean): boolean {
    let copyButtonElement = document.querySelector(querySelection);

    if (!(copyButtonElement instanceof HTMLImageElement))
        return false;

    constructRecoveringButton(
        copyButtonElement,
        "/images/done.png",
        "/images/failed.png",
        3,
        copy,
    );

    return true;
}

export type RainbowVertex = (
    "#ff0000" | "#ffff00" | "#00ff00" | "#00ffff" | "#0000ff" | "#ff00ff" | "#ff0000"
);

export function drawColorPanel(
    canvas: HTMLCanvasElement,
    colorOf: (vertex: RainbowVertex, lighteningFactor: number) => CSSColor,
): void {
    let context = canvas.getContext("2d");

    if (context == null)
        return;

    const gradientHeight = canvas.height / 256;
    const distance = 1 / 6;

    let gradient: CanvasGradient;

    for (let lighteningFactor = 0; lighteningFactor <= 255; lighteningFactor++) {
        gradient = context.createLinearGradient(0, 0, canvas.width, 1);

        gradient.addColorStop(0, colorOf("#ff0000", lighteningFactor));
        gradient.addColorStop(distance, colorOf("#ffff00", lighteningFactor));
        gradient.addColorStop(distance * 2, colorOf("#00ff00", lighteningFactor));
        gradient.addColorStop(distance * 3, colorOf("#00ffff", lighteningFactor));
        gradient.addColorStop(distance * 4, colorOf("#0000ff", lighteningFactor));
        gradient.addColorStop(distance * 5, colorOf("#ff00ff", lighteningFactor));
        gradient.addColorStop(1, colorOf("#ff0000", lighteningFactor));

        context.fillStyle = gradient;
        context.fillRect(0, gradientHeight * lighteningFactor, canvas.width, gradientHeight + 1);
    }
}