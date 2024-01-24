export function drawColorPanel(canvas: HTMLCanvasElement): void {
    let context = canvas.getContext("2d");

    if (context == null)
        return;

    const gradientHeight = canvas.height / 255;

    for (let y = 0; y <= canvas.height; y += gradientHeight) {
        let gradient = context.createLinearGradient(0, y, canvas.width, 1);
        gradient.addColorStop(0, "#ff0000");
        gradient.addColorStop(0.2, "#ffff00");
        gradient.addColorStop(0.4, "#00ff00");
        gradient.addColorStop(0.6, "#00ffff");
        gradient.addColorStop(0.8, "#0000ff");
        gradient.addColorStop(1, "#ff00ff");
        context.fillStyle = gradient;
        context.fillRect(0, y, canvas.width, gradientHeight);
    }
}
