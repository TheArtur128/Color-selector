import { ColorSelector } from "./color-spaces";

export function drawColorPanel(
    canvas: HTMLCanvasElement,
    colorIn: ColorSelector,
): void {
    let context = canvas.getContext("2d");

    if (context == null)
        return;

    for (let y = 0; y <= canvas.height; y++) {
        for (let x = 0; x <= canvas.width; x++) {
            context.fillStyle = colorIn({x: x , y: y});
            context.fillRect(x, y, 1, 1);
        }
    }
}
