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
