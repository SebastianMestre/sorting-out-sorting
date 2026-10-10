const colorCanvas = document.createElement("canvas");
const colorContext = colorCanvas.getContext("2d");

function normalizeColor(color) {
    if (color instanceof Array) {
        return color;
    }

    colorContext.fillStyle = "#010101";
    const firstProbe = colorContext.fillStyle;
    colorContext.fillStyle = color;
    if (colorContext.fillStyle === firstProbe) {
        colorContext.fillStyle = "#020202";
        const secondProbe = colorContext.fillStyle;
        colorContext.fillStyle = color;
        if (colorContext.fillStyle === secondProbe) {
            throw new Error("Unknown color: " + color);
        }
    }

    return rgbFromSerialized(colorContext.fillStyle);
}

function rgbFromSerialized(serialized) {
    if (serialized[0] === "#") {
        const hex = serialized.slice(1);
        const value = parseInt(hex, 16);
        return [
            (value >> 16 & 255) / 255,
            (value >> 8 & 255) / 255,
            (value & 255) / 255
        ];
    }

    const match = serialized.match(/rgba?\(([^)]+)\)/);
    if (match) {
        const parts = match[1].split(",");
        return [
            Number(parts[0]) / 255,
            Number(parts[1]) / 255,
            Number(parts[2]) / 255
        ];
    }

    throw new Error("Unknown color: " + serialized);
}

function serializeColor(color) {
    const red = Math.round(color[0] * 255);
    const green = Math.round(color[1] * 255);
    const blue = Math.round(color[2] * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function lerpColor(color1, color2, progress) {
    return [
        color1[0] + (color2[0] - color1[0]) * progress,
        color1[1] + (color2[1] - color1[1]) * progress,
        color1[2] + (color2[2] - color1[2]) * progress,
    ];
}