class TextObject {
    constructor(scene, x, y, size, font, color, text) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.size = size;
        this.font = font;
        this.color = color;
        this.text = text;
    }

    draw(ctx) {
        ctx.font = `${this.size}px ${this.font}`;
        ctx.fillStyle = this.color;
        ctx.textBaseline = "top";
        ctx.fillText(this.text, this.x, this.y);
    }
}

class Scene {

    constructor() {
        this.objects = [];
        this.events = [];
    }

    text(x, y, size, font, color, text) {
        const textObject = new TextObject(this, x, y, size, font, color, text);
        this.objects.push(textObject);
        return textObject;
    }
}