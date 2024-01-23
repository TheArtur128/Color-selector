import { ColorSelector } from "./color-spaces.js";
import { CSSColor } from "./colors.js";

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

export function drawColorPanel(
    canvas: HTMLCanvasElement,
    colorIn: ColorSelector<CSSColor>,
    defaultColor: CSSColor = "black",
): void {
    let context = canvas.getContext("2d");

    if (context == null)
        return;

    for (let y = 0; y <= canvas.height; y++) {
        for (let x = 0; x <= canvas.width; x++) {
            let color = colorIn({x: x , y: y});

            context.fillStyle = color === undefined ? defaultColor : color;
            context.fillRect(x, y, 1, 1);
        }
    }
}
