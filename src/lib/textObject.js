class TextObject {
    constructor(scene, x, y, size, font, color, text) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.size = size;
        this.font = font;
        this.color = normalizeColor(color);
        this.text = text;
    }

    draw(ctx) {
        ctx.font = `${this.size}px ${this.font}`;
        ctx.fillStyle = serializeColor(this.color);
        ctx.textBaseline = "top";
        ctx.fillText(this.text, this.x, this.y);
    }
}
